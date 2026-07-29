package com.sp.recall.dto.auth;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class RegisterRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50)
    private String name;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 30)
    private String username;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    private String phoneNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Confirm Password")
    private String confirmPassword;
}
