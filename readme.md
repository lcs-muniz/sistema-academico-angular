# Sistema de Autenticação e Controle Acadêmico (Fullstack)

Este projeto implementa um sistema de autenticação e controle acadêmico com um backend em Node.js/Express e um frontend em Angular. Ele permite o login de professores e alunos, controle de acesso a rotas baseado em papéis (JWT), e funcionalidades acadêmicas.

## 🚀 Estrutura do Projeto

O repositório está organizado da seguinte forma:

-   **/backend-node**: Contém todo o código da API backend (Node.js, Express, Sequelize).
-   **/frontend-angular**: Contém todo o código da aplicação frontend (Angular).

## 📘 Contexto e Objetivos

O sistema de gestão acadêmica simula um ambiente escolar com operações de alunos, professores, cursos, turmas, disciplinas, matrículas (N:N), notas e presenças. Objetivos principais:
- Autenticar alunos e professores (JWT) e proteger rotas conforme perfil.
- Executar casos de uso acadêmicos (CRUDs, matrícula, lançamento de notas e presença, relatórios).
- Aplicar princípios de OO (encapsulamento, abstração, polimorfismo) e padrões de projeto.
- Manter cobertura de testes unitários e de integração.


### Entidades e Relacionamentos
- Entidades: `Aluno`, `Professores`, `Cursos`, `Turmas`, `Disciplina`, `AlunoDisciplina`, `Notas`, `Presencas`.
- Relacionamentos: 1:N (Curso → Turmas, Professor → Turmas) e N:N (Aluno ↔ Disciplina via `AlunoDisciplina`).

### Casos de Uso Principais
- Autenticar usuário (aluno por matrícula, professor por SIAPE) e obter token JWT.
- CRUD de Alunos e Professores (com regras de negócio e hashing de senhas).
- Matrícula de Aluno em Disciplina (vincular/desvincular, listar por aluno/por disciplina).
- Lançamento e consulta de Notas.
- Registro e consulta de Presenças.
- Relatórios acadêmicos (demonstrados via Decorator).

### Conceitos de OO
- Encapsulamento: controllers (HTTP) e services (regras de negócio) separados; hashing e validações nos services.
- Abstração e Polimorfismo: services recebem interfaces de repositório via injeção de dependência (`IAlunoRepository`, `IProfessorRepository`, `IAuthRepository`, `IAlunoDisciplinaRepository`).
- Herança: uso de `Model` do Sequelize nos modelos e hierarquia do Decorator (`RelatorioDecorator`).

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

### Cobertura de Testes (mínimos exigidos)
- Testes unitários (≥5) com mocks: `AlunoService`, `ProfessorService`, `AuthService`, `AlunoDisciplinaService`, Decorator de Relatórios, Adapter de Notificações.
- Testes de integração (≥2): rotas de alunos, professores, autenticação e protegidas usando `supertest`.
> Estado atual: todos os testes passam (vide saída do CI/local).

## Padrões de Projeto Aplicados
- Decorator: `services/relatorio` com `RelatorioBase`, `RelatorioDecorator`, `CabecalhoDecorator`, `HtmlDecorator` para composição de saída de relatórios.
- Adapter: `adapters/EmailAdapter` adapta a interface `INotificador` a uma lib externa mock (`ExternalEmailLib`) usada pelo `NotificacaoService`. Integrado em `AlunoController` e `ProfessorController` para enviar boas-vindas.
- Repository (Complementar mas não implementado em todos ainda): interfaces e implementações para Aluno, Professor, Auth, AlunoDisciplina, desacoplando Sequelize dos services e habilitando TDD com mocks.

## Justificativa dos Padrões
- Repository: reduz acoplamento ao ORM, facilita testes unitários (mocks), melhora manutenção das regras de negócio.
- Decorator: permite enriquecer relatórios sem modificar a implementação base, favorecendo extensão e composição.
- Adapter: integra serviços internos com APIs externas heterogêneas por meio de uma interface estável (`INotificador`).

---