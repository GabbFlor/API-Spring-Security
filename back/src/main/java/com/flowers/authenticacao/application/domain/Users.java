package com.flowers.authenticacao.application.domain;

import com.flowers.authenticacao.adapters.out.persistense.UserRole;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    private String id;

    private String login;

    private String password;

    private UserRole role;
}
