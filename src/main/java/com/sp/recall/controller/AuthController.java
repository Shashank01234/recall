package com.sp.recall.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.sp.recall.model.User;
import com.sp.recall.security.JwtUtil;
import com.sp.recall.repository.UserRepository;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if(userRepository.findByUsername(username).isPresent()){
            return ResponseEntity.badRequest().body("Username already taken");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid credential");
        }

        String token = jwtUtil.generateToken((username));
        return ResponseEntity.ok(Map.of("token", token));
    }
    
}
