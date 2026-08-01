package com.sp.recall.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void sendVerificationEmail(String to, String name, String verificationLink) {
        try {
            Context context = new Context();

            context.setVariable("name", name);
            context.setVariable("verificationLink", verificationLink);
            
            String html = templateEngine.process("verify-email", context);

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo(to);
            helper.setSubject("Verify your Recall account");
            helper.setText(html, true);

            mailSender.send(mimeMessage);

        } catch(Exception e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }
}
