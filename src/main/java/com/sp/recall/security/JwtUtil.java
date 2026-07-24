package com.sp.recall.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;

    private final long EXPIRATION_MS = 86400000;

}
