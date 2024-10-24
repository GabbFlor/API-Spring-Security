package com.flowers.authenticacao.application;

import com.flowers.authenticacao.adapters.out.persistense.UserJpaRepository;
import com.flowers.authenticacao.application.domain.Users;
import com.flowers.authenticacao.application.ports.in.UsersUseCases;
import com.flowers.authenticacao.application.ports.out.UsersRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class AuthorizationService implements UserDetailsService, UsersUseCases {

    @Autowired
    UserJpaRepository userJpaRepository;

    @Autowired
    UsersRespository usersRespository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userJpaRepository.findByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com login: " + username));
    }


    @Override
    public Users PegarUmUsuario(String login) {
        return usersRespository.findByLogin(login).orElseThrow(() ->
            new NoSuchElementException("Usuário com o nome: " + login + " não foi encontrado"));
    }
}
