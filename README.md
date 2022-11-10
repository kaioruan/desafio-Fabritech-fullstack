# desafio-Fabritech-fullstack

Esse projeto foi desenvolvido para um teste técnico!

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos técnicos necessários para a entrega do desafio.
---

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
- Para rodar a aplicação é necessário ter a imagem do SQL SERVER instalado, segue comando para instalação.
- OBS: neste comando está definida a senha da imagem como `aA12345678@`, caso ja tenha o SQL SERVER, será necessário alterar a senha localmente no diretório `/backend/src/database/config/database.ts`.

```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=aA12345678@" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```
Clonagem do projeto:
```
git clone git@github.com:kaioruan/desafio-Fabritech-fullstack.git
```
⚠ **Atenção:** ⚠
- Todos os seguintes comandos devem ser realizados na RAIZ DO PROJETO.
- Após clonar o projeto em seu computador, para iniciá-lo é necessário instalar as dependências.
```
npm run postinstall
```
E em seguida, executar os dois seguinte comando na raíz do projeto em dois terminais diferentes. 
```
npm run dev:backend
```
```
npm run dev:frontend
```

Após isso, você pode acessar a aplicação através do endereço http://localhost:5173/login acessando com o email `admin@admin.com` e senha `secret_admin` ou se cadastrando com um novo usuário na página de registro.

# Sobre os testes
## Executando todos os testes

Para poder executar os testes, na raiz, utilize o comando o comando `npm run test` e **todos** os seus testes serão executado.

---
