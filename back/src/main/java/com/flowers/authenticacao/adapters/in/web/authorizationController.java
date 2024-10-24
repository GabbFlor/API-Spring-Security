package com.flowers.authenticacao.adapters.in.web;

import com.flowers.authenticacao.adapters.out.persistense.*;
import com.flowers.authenticacao.application.DTO.AuthenticationDTO;
import com.flowers.authenticacao.application.DTO.LoginResponseDTO;
import com.flowers.authenticacao.application.DTO.RegistroDTO;
import com.flowers.authenticacao.application.DTO.UserInfoDTO;
import com.flowers.authenticacao.application.domain.Users;
import com.flowers.authenticacao.application.infra.security.TokenService;
import com.flowers.authenticacao.application.ports.in.UsersUseCases;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class authorizationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserJpaRepository userJpaRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsersUseCases usersUseCases;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
//        criando sistema para proteger a senha no banco de dados com hash
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UsersEntity) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/registro")
    public ResponseEntity register(@RequestBody @Valid RegistroDTO data) {
        if(this.userJpaRepository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        UsersEntity newUser = new UsersEntity(data.login(), encryptedPassword, data.role());

        this.userJpaRepository.save(newUser);

//        após fazer a criação do usuário, ele retorna o token do mesmo no corpo da requisição
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UsersEntity) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @GetMapping("/info")
    public ResponseEntity<?> pegarInfosDoUsuario() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String login = authentication.getName();

            Users users = usersUseCases.PegarUmUsuario(login);

//        usa o DTO para evitar de retornar a senha do usuário para o front-end
            UserInfoDTO userResponse = new UserInfoDTO(users.getLogin(), users.getRole());

            return ResponseEntity.status(HttpStatus.OK).body(userResponse);
        }
        catch (NoSuchElementException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
