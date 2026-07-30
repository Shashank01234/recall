package com.sp.recall.security;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.sp.recall.dto.google.GoogleUserInfo;

@Component
public class GoogleTokenVerifier {
    
    @Value("${google.client-id}")
    private String clientId;

    public GoogleUserInfo verify(String idTokenString) throws GeneralSecurityException, IOException {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                                                new NetHttpTransport(), GsonFactory.getDefaultInstance())
                                                .setAudience(Collections.singletonList(clientId))
                                                .build();

        GoogleIdToken idToken = verifier.verify(idTokenString);

        if(idToken == null) {
            throw new RuntimeException("Invalid Google ID Token");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();

        return GoogleUserInfo.builder()
                    .googleId(payload.getSubject())
                    .email(payload.getEmail())
                    .name((String) payload.get("name"))
                    .picture((String) payload.get("picture"))
                    .emailVerified(Boolean.TRUE.equals(payload.getEmailVerified()))
                    .build();
    }
}
