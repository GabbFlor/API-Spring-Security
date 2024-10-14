package com.flowers.authenticacao.application.ports.in;

import com.flowers.authenticacao.application.domain.Postagem;

import java.util.List;

public interface PostagemUseCases {
    Postagem AddPostagem(Postagem postagem);

    List<Postagem> PegarTodasPostagns();

    Postagem PegarUmaPostagem(Long id);

    void deletarPostagem(Long id);
}
