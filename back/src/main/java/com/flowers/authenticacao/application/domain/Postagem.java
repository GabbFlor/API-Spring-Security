package com.flowers.authenticacao.application.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Postagem {
    private Long id;
    private String nome;
    private String titulo;
    private String conteudo;
}
