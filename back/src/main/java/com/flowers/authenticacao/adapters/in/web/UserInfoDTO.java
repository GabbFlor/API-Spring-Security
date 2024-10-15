package com.flowers.authenticacao.adapters.in.web;

import com.flowers.authenticacao.adapters.out.persistense.UserRole;

public record UserInfoDTO(String login, UserRole role) {
}
