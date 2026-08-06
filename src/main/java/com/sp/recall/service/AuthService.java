package com.sp.recall.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sp.recall.dto.auth.AuthRequest;
import com.sp.recall.dto.auth.RegisterRequest;
import com.sp.recall.dto.auth.UserResponse;
import com.sp.recall.dto.google.GoogleUserInfo;
import com.sp.recall.exception.BadRequestException;
import com.sp.recall.model.AuthProvider;
import com.sp.recall.model.EmailVerificationToken;
import com.sp.recall.model.Role;
import com.sp.recall.model.User;
import com.sp.recall.repository.EmailVerificationTokenRepository;
import com.sp.recall.repository.UserRepository;
import com.sp.recall.security.GoogleTokenVerifier;
import com.sp.recall.security.JwtUtil;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final GoogleTokenVerifier googleTokenVerifier;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final MailService mailService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, JwtUtil jwtUtil, GoogleTokenVerifier googleTokenVerifier, EmailVerificationTokenRepository emailVerificationTokenRepository, MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.googleTokenVerifier = googleTokenVerifier;
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.mailService = mailService;
    }

    @Value("${app.fromtend-url}")
    private String frontendUrl;

    public void register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already exist");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        if (request.getPhoneNumber() != null &&
                !request.getPhoneNumber().isBlank() &&
                userRepository.existsByPhoneNumber(request.getPhoneNumber().trim())) {

            throw new BadRequestException("Phone number already registered");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        User user = User.builder()
                .name(request.getName().trim())
                .username(request.getUsername().trim())
                .email(request.getEmail().trim().toLowerCase())
                .phoneNumber(
                        request.getPhoneNumber() == null || request.getPhoneNumber().isBlank()
                                ? null
                                : request.getPhoneNumber().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .provider(AuthProvider.LOCAL)
                .role(Role.USER)
                .emailVerified(false)
                .phoneVerified(false)
                .build();

        userRepository.save(user);

        User savedUser = userRepository.save(user);

        emailVerificationTokenRepository.deleteByUser(savedUser);

        EmailVerificationToken token = EmailVerificationToken.builder()
                                            .user(savedUser)
                                            .build();
        
        emailVerificationTokenRepository.save(token);

        String verificationLink = frontendUrl + "/verify-email?token=" + token.getToken();

        mailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getName(), verificationLink);
    }

    public String login(AuthRequest request) throws AuthenticationException {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getIdentifier(), 
                request.getPassword()
            )
        );

        User user = userRepository
            .findByUsernameOrEmail(
                request.getIdentifier(), 
                request.getIdentifier()
            )
            .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getEmailVerified() && user.getProvider() == AuthProvider.LOCAL) {
            throw new BadRequestException("Please verify your email first.");
        }

        user.setLastLogin(LocalDateTime.now());

        userRepository.save(user);

        return jwtUtil.generateToken((user.getUsername()));
    }

    public UserResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new RuntimeException("User is not authenticated");
        }

        return new UserResponse(authentication.getName());
    }

    public void logout() {

    }

    @Transactional
    public String googleLogin(String idToken) throws GeneralSecurityException, IOException {
        GoogleUserInfo googleUser = googleTokenVerifier.verify(idToken);

        User user = userRepository
                        .findByEmail(googleUser.getEmail())
                        .orElseGet(() -> createGoogleUser(googleUser));
        
        syncGoogleProfile(user, googleUser);

        userRepository.save(user);

        return jwtUtil.generateToken(user.getUsername());
    }

    private User createGoogleUser(GoogleUserInfo googleUser) {
        User user = User.builder()
                .name(googleUser.getName())
                .username(generateUsername(googleUser.getName()))
                .email(googleUser.getEmail())
                .profileImage(googleUser.getPicture())
                .password(null)
                .provider(AuthProvider.GOOGLE)
                .role(Role.USER)
                .emailVerified(true)
                .phoneVerified(false)
                .build();

        return userRepository.save(user);
    }

    private String generateUsername(String fullName) {
        String baseUsername = fullName
                    .trim()
                    .toLowerCase()
                    .replaceAll("[^a-z0-9\\s]", "")
                    .replaceAll("\\s+", "_");

        String username = baseUsername;

        int count = 1;

        while(userRepository.existsByUsername(username)) {
            username = baseUsername + count++;
        }

        return username;
    }

    private void syncGoogleProfile(User user, GoogleUserInfo googleUser) {
        user.setLastLogin(LocalDateTime.now());

        if(googleUser.isEmailVerified()) {
            user.setEmailVerified(true);
        }

        if(googleUser.getName() != null && !googleUser.getName().isBlank()) {
            user.setName(googleUser.getName());
        }

        if(googleUser.getPicture() != null && !googleUser.getPicture().isBlank()) {
            user.setProfileImage((googleUser.getPicture()));
        }
    }

    @Transactional
    public void verifyEmail(String token) {
        EmailVerificationToken emailVerificationToken = emailVerificationTokenRepository.findByToken(token)
                                                                    .orElseThrow(() -> new BadRequestException( "Invalid verification token"));

        if(emailVerificationToken.isUsed()) {
            throw new BadRequestException("Token already used");
        }

        if(emailVerificationToken.isExpired()) {
            throw new BadRequestException("Verification token expired");
        }

        User user = emailVerificationToken.getUser();
        user.setEmailVerified(true);
        emailVerificationToken.setUsed(true);
        userRepository.save(user);
        emailVerificationTokenRepository.save(emailVerificationToken);
    }

    @Transactional
    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(
            email.toLowerCase())
            .orElseThrow(() -> new BadRequestException("User not found"));

        if(user.getEmailVerified()) {
            throw new BadRequestException("Email already verified");
        }

        emailVerificationTokenRepository.deleteByUser(user);

        EmailVerificationToken token = EmailVerificationToken.builder()
                                            .user(user)
                                            .build();

        emailVerificationTokenRepository.save(token);

        String verificationLink = frontendUrl + "/verify-email?token=" + token.getToken();

        mailService.sendVerificationEmail(user.getEmail(), user.getName(), verificationLink);
    }
}
