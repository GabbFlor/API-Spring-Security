package com.flowers.authenticacao.adapters.out.persistense;

import com.flowers.authenticacao.application.domain.Postagem;
import com.flowers.authenticacao.application.ports.out.PostagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PostagemRespositoryImp implements PostagemRepository {

    @Autowired
    private PostagemJpaRepository postagemJpaRepository;

    @Override
    public List<Postagem> findAll() {
        return postagemJpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Optional<Postagem> findById(Long id) {
        return postagemJpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public Postagem save(Postagem postagem) {
        PostagemEntity postagemEntity = toEntity(postagem);
        return toDomain(postagemJpaRepository.save(postagemEntity));
    }

    @Override
    public void deletePostagem(Long id) {
        postagemJpaRepository.deleteById(id);
    }

    private Postagem toDomain(PostagemEntity entity) {
        Postagem postagem = new Postagem();
        postagem.setId(entity.getId());
        postagem.setNome(entity.getNome());
        postagem.setTitulo(entity.getTitulo());
        postagem.setConteudo(entity.getConteudo());
        return postagem;
    }

    private PostagemEntity toEntity(Postagem postagem) {
        PostagemEntity entity = new PostagemEntity();
        entity.setId(postagem.getId());
        entity.setNome(postagem.getNome());
        entity.setTitulo(postagem.getTitulo());
        entity.setConteudo(postagem.getConteudo());
        return entity;
    }
}
