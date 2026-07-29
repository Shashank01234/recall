package com.sp.recall.service;

import java.time.LocalDateTime;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sp.recall.dto.AuthRequest;
import com.sp.recall.dto.RegisterRequest;
import com.sp.recall.dto.UserResponse;
import com.sp.recall.exception.BadRequestException;
import com.sp.recall.model.AuthProvider;
import com.sp.recall.model.Role;
import com.sp.recall.model.User;
import com.sp.recall.repository.UserRepository;
import com.sp.recall.security.JwtUtil;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

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
            .orElseThrow();

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
}
