package com.sp.recall.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sp.recall.model.EmailVerificationToken;
import com.sp.recall.model.User;

public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {
    Optional<EmailVerificationToken> findByToken(String token);
    Optional<EmailVerificationToken> findByUserAndUsedFalse(User user);

    void deleteByUser(User user);
}
