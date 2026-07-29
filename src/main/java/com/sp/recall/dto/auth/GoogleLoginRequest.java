package com.sp.recall.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
public class GoogleLoginRequest {
    @NotBlank(message = "Google ID Token is required")
    private String idToken;
}
