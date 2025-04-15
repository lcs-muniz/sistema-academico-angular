# 🎯 Objetivo Geral

Você foi contratado para desenvolver uma API RESTful para gerenciar um sistema escolar. A escola possui alunos, professores, turmas, cursos, disciplinas, notas e controle de presença. Sua missão é criar endpoints que possibilitem o gerenciamento completo desses dados, além de realizar cálculos como médias de notas, percentual de presença e identificar aprovação ou reprovação dos alunos.


# 📌 Requisitos da API

Implemente os seguintes endpoints:
📁 CRUDs básicos:

    POST /alunos – Cadastrar novo aluno.

    GET /disciplinas/:id/alunos – Listar alunos matriculados em uma disciplina.

    POST /disciplinas/:id/alunos – Matricular aluno na disciplina.

    POST /disciplinas/:id/notas – Registrar nota de um aluno.

    POST /disciplinas/:id/presencas – Registrar presença de um aluno em uma data.

# 📊 Funcionalidades intermediárias:

    GET /alunos/:id/notas – Listar todas as notas de um aluno com as médias por disciplina.

    GET /alunos/:id/presencas – Retornar percentual de presença do aluno em cada disciplina.

    GET /disciplinas/:id/reprovados – Listar alunos reprovados por nota ou presença.

    GET /alunos/:id/situacao – Mostrar se o aluno está aprovado ou reprovado em cada disciplina.

    Critério de aprovação:

        Média ≥ 7.0

        Presença ≥ 75%

# ✅ Critérios de Avaliação

    Utilização adequada do TypeScript.

    Uso correto de relacionamentos no banco de dados.

    Código modular e organizado (por exemplo: separação de rotas, controllers, services).

    Uso de boas práticas REST.

    Testes com Jest (ao menos para uma das regras de negócio: média ou presença).


# 🧱 Base de Dados

A estrutura do banco já está definida com as seguintes entidades principais, todas as tabelas devem ter softdelete e timestamps:

    alunos (com vínculo a uma turma)

    professores

    cursos

    turmas (vinculadas a cursos)

    disciplinas (ministradas por professores)

    aluno_disciplinas (matrícula do aluno nas disciplinas)

    notas (avaliativas, por aluno/disciplina)

    presencas (controle de frequência por disciplina)
