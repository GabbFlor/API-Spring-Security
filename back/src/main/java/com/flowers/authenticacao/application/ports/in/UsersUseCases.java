package com.flowers.authenticacao.application.ports.in;

import com.flowers.authenticacao.application.domain.Users;

public interface UsersUseCases {
    Users PegarUmUsuario(String login);
}
