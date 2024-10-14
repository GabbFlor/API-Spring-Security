package com.flowers.authenticacao.application.ports.out;

import com.flowers.authenticacao.application.domain.Postagem;

import java.util.List;
import java.util.Optional;

public interface PostagemRepository {
    List<Postagem> findAll();

    Optional<Postagem> findById(Long id);

    Postagem save(Postagem postagem);

    void deletePostagem(Long id);
}
