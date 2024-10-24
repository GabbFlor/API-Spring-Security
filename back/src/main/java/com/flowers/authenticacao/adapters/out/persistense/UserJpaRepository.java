package com.flowers.authenticacao.adapters.out.persistense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserJpaRepository extends JpaRepository<UsersEntity, String> {
    Optional<UsersEntity> findByLogin(String login);
}
