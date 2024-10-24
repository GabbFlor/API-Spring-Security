package com.flowers.authenticacao.application.ports.out;

import com.flowers.authenticacao.application.domain.Users;

import java.util.Optional;

public interface UsersRespository {
    Optional<Users> findByLogin(String login);
}
