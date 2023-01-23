# desafio-Fabritech-fullstack

Esse projeto foi desenvolvido para um teste técnico!

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos técnicos necessários para a entrega do desafio.

# Descrição
Aplicação Fullstack onde é possivel administrar clientes, criando, deletando e atualizando informações sobre os clientes.

# Habilidades desenvolvidas

Neste projeto, fui capaz de:

- Utilizar o banco de dados relacional SQL SERVER;
- Utilizar o ORM Sequelize para trabalhar com o banco de dados SQL SERVER;
- Construir uma API CRUD com Node.js e Express;
- Criar rotas para uma API com Express;
- Realizar Validação e criptografia com JWT;
- Desenvolver Testes de Integração no backend;
- Estilizar uma página web com CSS;
- Desenvolver aplicação Frontend com Vue.JS;
   
---

# Funcionamento da aplicação

Para iniciar o projeto, é necessário possuir o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado.

⚠ **Atenção:** ⚠
- Todos os seguintes comandos devem ser realizados na RAIZ DO PROJETO.

**Instalação de dependências na raiz do projeto:** 

```
npm run postinstall
```

**Utilizando o docker**

```
docker-compose up
```

Após isso, você pode acessar a aplicação através do endereço http://localhost:5173/login acessando com o email `admin@admin.com` e senha `secret_admin` ou se cadastrando com um novo usuário na página de registro.

# Sobre os testes
## Executando todos os testes

Para poder executar os testes, na raiz, utilize o comando o comando `npm run test` e **todos** os seus testes serão executado.

---

## 📚 Documentação (endpoints BACKEND)

## :warning: Validando token nas requisições

Todos endpoints abaixo devem respeitar a regra de autenticação (login). Assim sendo, todas as requisições abaixo devem, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido após realizar o login ou cadastrar um usuário).

### 👨🏻‍🦱 Login
| Método | Funcionalidade                            | URL                        |
| ------ | ----------------------------------------- | -------------------------- |
| `POST`  | Valida o Usuário no Banco de dados e retorna o token de acesso. | http://localhost:3001/login |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2ODEwNjkxMSwiZXhwIjoxNjY4MTkzMzExfQ.SPctMpf4MCWzotwvfXNnzihbfyd_ECPUv70W2F8AeOw"
}
```

</details>
<br>
<br>

### 👨🏻‍🦱 Registro
| Método | Funcionalidade                                                | URL                            |
| ------ | ------------------------------------------------------------- | ------------------------------ |
| `POST`  | Valida as informações de criação, cadastra no banco de dados e retorna a criação do usuário. | http://localhost:3001/register |

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>

```json
{
  "id": 1,
  "username": "Kaio Ruan Oliveira",
  "role": "user",
  "email": "admiiin@admin.com",
  "token": "$2a$10$cMLGw2Q49ROG9ywd3gReWersqSxpGDe/udJdMJPA33k4QTTguKU/q"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A mensagem <code>'User already exists'</code> caso o email já tenha cadastro no banco de dados.
</details>

<br>
<br>

### 👨🏻‍🦱 Validação de Token
| Método   | Funcionalidade                                                                  | URL                           |
| -------- | ------------------------------------------------------------------------------- | ----------------------------- |
| `POST` | Ao acessar a rota Login, caso o usuário tenha um token válido, será validado no banco de dados e redirecionado para página principal /admin. | http://localhost:3001/logn/validate|
<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o status <code>401</code>, <code>'Incorrect email or password'</code>.
</details>
<br>
<br>

### 🗒️ ADmin
| Método | Funcionalidade                              | URL                              |
| ------ | ------------------------------------------- | -------------------------------- |
| `GET`  | Retorna uma lista de todos os clientes cadastrados | http://localhost:3001/admin |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "username": "Kaio Oliveira",
    "email": "kaio@teste.com",
    "role": "client",
    "addressId": 1,
    "relationship": "Irmão/Irmã",
    "address.id": 1,
    "address.cep": "49090500",
    "address.street": "Rua da Paz",
    "address.district": "Jardim Centenário",
    "address.city": "Aracaju",
    "address.state": "Sergipe",
    "address.country": "Brasil"
  },
  {
    "id": 2,
    "username": "Jackson Santos",
    "email": "jackson@teste.com",
    "role": "client",
    "addressId": 2,
    "relationship": "Pai/Mãe",
    "address.id": 2,
    "address.cep": "49090701",
    "address.street": "Rua da Gloria",
    "address.district": "Jardim Centenário",
    "address.city": "Aracaju",
    "address.state": "Sergipe",
    "address.country": "Brasil"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                | URL                              |
| ------ | --------------------------------------------- | -------------------------------- |
| `POST` | Adiciona um novo cliente ao banco de dados, ocorrendo a validação de todas as informações. | http://localhost:3001/admin |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{        
  "email": "kaio@rruan.com",
  "username": "Kaio Teste",
  "role": "client",
  "relationship": "Irmão/Irmã",
  "address": {
    "cep": "49090630",
    "street": "Rua Jardins",
    "district": "Jardins",
    "city": "Aracaju",
    "state": "SE",
    "country": "Brasil"
  }
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>

```json
{
  "id": 1,
  "email": "kaio@rruan.com",
  "username": "Kaio Teste",
  "role": "client",
  "relationship": "Irmão/Irmã",
  "addressId": 12
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retornar a mensagem <code>'this email is already registered'</code> caso já tenha um cliente com este email cadastrado.
</details>
<br>

| Método | Funcionalidade                            | URL                        |
| ------ | ----------------------------------------- | -------------------------- |
| `DELETE`  | Deleta o cliente do banco de dados. | http://localhost:3001/admin/:id |

<details>
  <summary>A resposta da requisição é o status 200.</summary>


</details>
<br>
<br>

| Método | Funcionalidade                               | URL                        |
| ------ | -------------------------------------------- | -------------------------- |
| `PUT` | Atualiza/Modifica informações sobre um cliente. | http://localhost:3001/admin/:id |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{        
  "email": "kaio@rruan.com",
  "username": "Kaio Teste",
  "role": "client",
  "relationship": "Irmão/Irmã",
   "addressId": 1,
  "address": {
    "cep": "49090630",
    "street": "Rua Jardins",
    "district": "Jardins",
    "city": "Aracaju",
    "state": "SE",
    "country": "Brasil"
  }
}
```

</details>

<details>
  <summary>A requisição retorna o status 200.</summary>

</details>

<br>
<br>
