package com.sp.recall.dto.email;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
public class ResendVerificationRequest {
    
    @Email
    @NotBlank
    private String email;
}
