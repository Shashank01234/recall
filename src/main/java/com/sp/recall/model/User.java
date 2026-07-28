package com.sp.recall.model;

import lombok.*;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


// =============================
// Basic Information
// =============================

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false, length = 30)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(unique = true, length = 20)
    private String phoneNumber; 

    @Column
    private String profileImage;

    // Null for Google-only accoumnts
    @Column
    private String password;


// =============================
// Authentication    
// =============================

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    @Builder.Default
    private Boolean emailVerified = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean phoneVerified = false;


// ==============================
// Timestamps
// ==============================

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    private LocalDateTime lastLogin;

    @PrePersist
    public void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if(provider == null){
            provider = AuthProvider.LOCAL;
        }

        if(role == null) {
            role = Role.USER;
        }

        if(emailVerified == null) {
            emailVerified = false;
        }

        if(phoneVerified == null) {
            phoneVerified = false;
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
