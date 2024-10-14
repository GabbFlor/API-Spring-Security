package com.flowers.authenticacao.adapters.in.web;

import com.flowers.authenticacao.application.domain.Postagem;
import com.flowers.authenticacao.application.ports.in.PostagemUseCases;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/postagens")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PostagemController {

    @Autowired
    private PostagemUseCases postagemUseCases;

    @PostMapping()
    public ResponseEntity<?> AdicionarPostagem(@RequestBody Postagem postagem) {
        try {
            Postagem resultado = postagemUseCases.AddPostagem(postagem);
            return ResponseEntity.status(HttpStatus.CREATED).body(postagem);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping
    public ResponseEntity<List<Postagem>> listarTudo() {
        try {
            List<Postagem> postagemList = postagemUseCases.PegarTodasPostagns();

            if (postagemList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            return ResponseEntity.ok(postagemList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> PegarCardapioPeloId(@PathVariable(value = "id") Long id) {
        try {
            Postagem postagem = postagemUseCases.PegarUmaPostagem(id);
            return ResponseEntity.status(HttpStatus.OK).body(postagem);
        } catch (NoSuchElementException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletepostagem(@PathVariable(value = "id") Long id) {
        try {
            List<Postagem> todasPostagens = postagemUseCases.PegarTodasPostagns();

            boolean idExiste = todasPostagens.stream().anyMatch(postagem -> postagem.getId().equals(id));

            if (!idExiste) {
                Map<String, String> errorRepsponse = new HashMap<>();
                errorRepsponse.put("Mensagem", "Postagem com o ID " + id + " não foi encontrada");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorRepsponse);
            }

            postagemUseCases.deletarPostagem(id);

            Map<String, String> response = new HashMap<>();
            response.put("Mensagem", "Postagem com o ID: " + id + " foi deletada com sucesso");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
