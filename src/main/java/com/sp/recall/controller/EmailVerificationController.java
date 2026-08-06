package com.sp.recall.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sp.recall.dto.auth.MessageResponse;
import com.sp.recall.dto.email.ResendVerificationRequest;
import com.sp.recall.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailVerificationController {
    
    private final AuthService authService;

    @GetMapping("/verify")
    public ResponseEntity<MessageResponse> verify(@RequestParam String token) {
        authService.verifyEmail(token);

        return ResponseEntity.ok(new MessageResponse("Email verified successfully"));
    }

    @PostMapping("/resend")
    public ResponseEntity<MessageResponse> resend(@RequestBody ResendVerificationRequest request) {
        authService.resendVerificationEmail(request.getEmail());

        return ResponseEntity.ok(new MessageResponse("Verification email sent"));
    }
}
