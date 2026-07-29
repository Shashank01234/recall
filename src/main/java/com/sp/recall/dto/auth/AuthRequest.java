package com.sp.recall.dto.auth;

import lombok.*;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class AuthRequest {
    
    @NotBlank(message = "Username or Email is required")
    private String identifier;

    @NotBlank(message = "Password is required")
    private String password;
}
