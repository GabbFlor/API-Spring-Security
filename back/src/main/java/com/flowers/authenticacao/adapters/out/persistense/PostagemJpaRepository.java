package com.flowers.authenticacao.adapters.out.persistense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostagemJpaRepository extends JpaRepository<PostagemEntity, Long> {
}
