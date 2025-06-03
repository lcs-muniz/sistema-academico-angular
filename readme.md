# Sistema de Autenticação e Controle Acadêmico (Fullstack)

Este projeto implementa um sistema de autenticação e controle acadêmico com um backend em Node.js/Express e um frontend em Angular. Ele permite o login de professores e alunos, controle de acesso a rotas baseado em papéis (JWT), e funcionalidades acadêmicas.

## 🚀 Estrutura do Projeto

O repositório está organizado da seguinte forma:

-   **/backend-node**: Contém todo o código da API backend (Node.js, Express, Sequelize).
-   **/frontend-angular**: Contém todo o código da aplicação frontend (Angular).

## 📋 Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão LTS recomendada, que inclui npm)
-   [Angular CLI](https://angular.io/cli) instalado globalmente: `npm install -g @angular/cli`
-   Um servidor de banco de dados MySQL.
-   Git

## ⚙️ Configuração Inicial do Projeto

1.  **Clone o Repositório**

2.  **Configure as Variáveis de Ambiente do Backend:**
    * Crie um arquivo chamado `.env` nesta pasta (`backend-node/.env`).
    * Copie o conteúdo do arquivo `backend-node/.env.example` (se você criar um) ou adicione as seguintes variáveis, substituindo pelos seus dados:
        ```env
        MYSQL_DB=nome_do_seu_banco_de_dados
        MYSQL_USER=seu_usuario_mysql
        MYSQL_PASSWORD=sua_senha_mysql
        MYSQL_HOST=localhost
        MYSQL_PORT=3306
        JWT_SECRET=coloqueUmSegredoBemForte
        PORT=3000
        ```
    * **Importante:** Certifique-se de que o banco de dados (`MYSQL_DB`) já exista no seu servidor MySQL e que o usuário (`MYSQL_USER`) tenha as permissões necessárias.
    * Volte para a pasta raiz do projeto: `cd ..`

3.  **Instale Todas as Dependências (Backend e Frontend):**
    Na **pasta raiz** do projeto, execute o comando:
    ```bash
    npm run install:all
    ```

4.  **(Criação das Tabelas no Banco de Dados):**
    O backend está configurado para usar `sequelize.sync({ alter: true })` durante o desenvolvimento. Isso significa que, na primeira vez que o servidor backend for iniciado com sucesso após a configuração do banco de dados no arquivo `.env`, o Sequelize tentará criar ou alterar as tabelas automaticamente para corresponder aos modelos definidos na aplicação.
    Para referência, a estrutura DDL das tabelas também pode ser encontrada no arquivo `tables.sql`.

## ▶️ Como Rodar o Projeto em Desenvolvimento

1.  **Abra um terminal na pasta raiz do projeto.**
2.  **Execute o script de desenvolvimento principal:**
    ```bash
    npm run dev
    ```
    Este comando utiliza o `concurrently` para iniciar simultaneamente:
    * O servidor backend Node.js (geralmente escutando na porta definida em `PORT`, ex: `http://localhost:3000`).
    * O servidor de desenvolvimento do Angular (geralmente acessível em `http://localhost:4200`).

3.  **Acesse a aplicação frontend** no seu navegador web através do endereço `http://localhost:4200`.

O frontend Angular está configurado com um proxy (`proxy.conf.json`) para redirecionar as chamadas de API (prefixadas com `/api`) para o servidor backend.

## 🧑‍🏫 Popular Dados Iniciais (Professores/Alunos)

**Lembrando:** As senhas são armazenadas no banco de forma criptografada (usando `bcrypt`). O sistema de cadastro de usuários via API já cuida do hashing da senha.

**IMPORTANTE:** Você deve criar o cadastro de Aluno e Professor com o método abaixo, por possuirem senha criptografada

**Usar os Endpoints de Cadastro da API**

Com o backend rodando (`npm run dev`), você pode usar uma ferramenta como Postman, Insomnia, ThunderClient (extensão com VScode) ou `curl` para fazer requisições `POST` para os endpoints de cadastro:

* **Cadastrar Aluno:**
    * **URL:** `POST http://localhost:3000/api/alunos`
    * **Headers:** `Content-Type: application/json`
    * **Corpo (JSON):**
        ```json
        {
          "nome": "Fulano de Tal Aluno",
          "email": "aluno.fulano@exemplo.com",
          "matricula": "2025001",
          "senha": "senhaAluno123"
        }
        ```

* **Cadastrar Professor:**
    * **URL:** `POST http://localhost:3000/api/professores`
    * **Headers:** `Content-Type: application/json`
    * **Corpo (JSON):**
        ```json
        {
          "nome": "Ciclano Professor",
          "email": "professor.ciclano@exemplo.com",
          "siape": "1000001",
          "senha": "senhaProf456"
        }
        ```
    A API fará o hash da `senha` antes de salvá-la.

**Credenciais para Login no Frontend:**
* Para **Aluno**, use o valor do campo `matricula` como "Identificador" e a senha em texto plano (a mesma que você usou para cadastrar via API).
* Para **Professor**, use o valor do campo `siape` como "Identificador" e a senha em texto plano.

**Também no `/backend-node` contém um arquivo para população para fins de testes das funcionalidades do aplicativo: `/backend-node/seed.sql`, lembrando que precisa conter os Alunos e Professores cadastrados via /POST para ser autenticado no login**

## 🧪 Testes Automatizados do Backend

Para executar os testes unitários e de integração do backend (Jest + Supertest):

1.  Navegue até a pasta do backend:
    ```bash
    cd backend-node
    ```
2.  Execute o comando de teste (conforme definido no `package.json` do backend):
    ```bash
    npm test
    ```

---