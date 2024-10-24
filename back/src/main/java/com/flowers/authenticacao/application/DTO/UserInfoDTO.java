package com.flowers.authenticacao.application.DTO;

import com.flowers.authenticacao.adapters.out.persistense.UserRole;

public record UserInfoDTO(String login, UserRole role) {
}
