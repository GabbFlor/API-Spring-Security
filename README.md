# API-Spring-Security

Esse projeto foi o resultado dos meus estudos sobre Spring Security e JWT. Basicamente ele consiste em um site simples de postagens, onde que temos 2 tipos de usuários "ADMIN" e "USER", o "ADMIN" pode adicionar, deletar, exbibir todos os posts e exibir um post por um id específico, já o "USER" pode fazer as mesmas coisas exceto postar e deletar.

Além disso, criei uma rota "/auth" que dentro dela tem "/login" e "/registro", que como o próprio nome diz, server para o usuário criar ou logar em uma conta. A parte de login foi feita com o JWT, onde verifica as credenciais passadas comparando com o conteúdo do banco de dados, caso tiver alguma correspondência, ele cria uuma sessão em cima de um token gerado e validado com o JWT, que é enviado para o navegador do usuário para que assim seja possível fazer as outras requisições.

### Importante
Caso deseje testar a API pelo Postman, envie uma requisição no formato json para a url: "localhost:8080/auth/registro" com o seguinte corpo:
```json
  {
    "login" : "[NOME_DA_CONTA]",
    "password": "[SENHA]",
    "role": "[TIPO_DA_CONTA_ADMIN_OU_USER]"
  }
```

Após ter registrado a conta, deverá fazer o login, para isso utilize a url: "localhost:8080/auth/login" com o seguinte corpo:
```json
  {
    "login" : "[NOME_DA_CONTA]",
    "password": "[SENHA]"
  }
```

Caso erre as credenciais da conta, o API vai retornar erro 403, caso contrário ela retorna:
```json
  {
    "token": "[SEU_TOKEN]"
  }
```

Agora, copie o conteúdo dentro da chave "token", entre na aba Authorization, em "type" selecione "Bearer Token", e no espaço entitulado como "token" a direita, cole o conteúdo que vc copiou anteriormente.

### OBS
Caso dê algum problema relacionado a CORS no front-end, procure o arquivo "SecurityConfiguration" no diretório "back/src/main/java/com/flowers/authenticacao/infra/security/...", na linha 48, terá a origem que está permitida enviar requisições para a API, mude conforme a url que está rodando o seu front-end