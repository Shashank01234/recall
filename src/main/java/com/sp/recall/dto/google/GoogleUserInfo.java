package com.sp.recall.dto.google;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class GoogleUserInfo {

    private String googleId;

    private String email;

    private String name;

    private String picture;

    private boolean emailVerified;
}
