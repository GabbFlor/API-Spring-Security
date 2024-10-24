package com.flowers.authenticacao.adapters.out.persistense;

import com.flowers.authenticacao.application.domain.Users;
import com.flowers.authenticacao.application.ports.out.UsersRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UsersRepositoryImp implements UsersRespository {

    @Autowired
    private UserJpaRepository userJpaRepository;

    @Override
    public Optional<Users> findByLogin(String login) {
        return userJpaRepository.findByLogin(login).map(this::toDomain);
    }

    private Users toDomain(UsersEntity entity) {
        Users users = new Users();
        users.setId(entity.getId());
        users.setLogin(entity.getLogin());
        users.setPassword(entity.getPassword());
        users.setRole(entity.getRole());
        return users;
    }

    private UsersEntity toEntity(Users users) {
        UsersEntity entity = new UsersEntity();
        entity.setId(users.getId());
        entity.setLogin(users.getLogin());
        entity.setPassword(users.getPassword());
        entity.setRole(users.getRole());
        return entity;
    }
}
