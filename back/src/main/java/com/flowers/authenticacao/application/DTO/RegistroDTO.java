package com.flowers.authenticacao.application.DTO;

import com.flowers.authenticacao.adapters.out.persistense.UserRole;

public record RegistroDTO(String login, String password, UserRole role) {
}
