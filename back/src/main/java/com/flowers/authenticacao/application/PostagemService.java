package com.flowers.authenticacao.application;

import com.flowers.authenticacao.application.domain.Postagem;
import com.flowers.authenticacao.application.ports.in.PostagemUseCases;
import com.flowers.authenticacao.application.ports.out.PostagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PostagemService implements PostagemUseCases {

    @Autowired
    private PostagemRepository repository;

    @Override
    public Postagem AddPostagem(Postagem postagem) {
        return repository.save(postagem);
    }

    @Override
    public List<Postagem> PegarTodasPostagns() {
        return repository.findAll();
    }

    @Override
    public Postagem PegarUmaPostagem(Long id) {
        return repository.findById(id).orElseThrow(() ->
            new NoSuchElementException("Postagem com o id " + id + " não foi encontrada."));
    }

    @Override
    public void deletarPostagem(Long id) {
        repository.deletePostagem(id);
    }
}
