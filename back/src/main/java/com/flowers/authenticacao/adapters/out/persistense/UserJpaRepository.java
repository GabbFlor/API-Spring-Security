package com.flowers.authenticacao.adapters.out.persistense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserJpaRepository extends JpaRepository<UsersEntity, String> {
    UserDetails findByLogin(String login);
}
