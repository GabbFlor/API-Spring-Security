package com.flowers.authenticacao.adapters.out.persistense;

public record RegistroDTO(String login, String password, UserRole role) {
}
