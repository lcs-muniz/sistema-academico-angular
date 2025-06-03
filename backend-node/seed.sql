-- Tabela apenas para testar funcionalidades do front

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM presencas;
DELETE FROM notas;
DELETE FROM aluno_disciplinas;
DELETE FROM alunos;
DELETE FROM disciplinas;
DELETE FROM professores;
DELETE FROM turmas;
DELETE FROM cursos;

SET FOREIGN_KEY_CHECKS = 1;

-- CURSOS
INSERT INTO cursos (id, nome, descricao, createdAt, updatedAt) VALUES
(1, 'Engenharia de Software', 'Formação para engenheiros de software', NOW(), NOW()),
(2, 'Ciência da Computação', 'Base teórica e prática em computação.', NOW(), NOW()),
(3, 'Análise e Desenvolvimento de Sistemas', 'Curso focado no desenvolvimento prático de software', NOW(), NOW()),
(4, 'Gestão Ambiental', 'Formação para profissionais que buscam soluções sustentáveis e gerenciamento ambientais.', NOW(), NOW()),
(5, 'Administração de Empresas', 'Prepara líderes e gestores, com foco em estratégia, finanças e marketing.', NOW(), NOW());

-- PROFESSORES
-- senha será 'senha_padrao_hash' APENAS para testes
INSERT INTO professores (id, nome, email, siape, senha, createdAt, updatedAt) VALUES
(1, 'Prof. Alan Turing', 'alan.turing@universidade.edu', '100001', '$2b$10$abcdefghijklmnopqrstuv', NOW(), NOW()),
(2, 'Prfa. Marie Curie', 'marie.curie@universidade.edu', '100002', '$2b$10$abcdefghijklmnopqrstuv', NOW(), NOW()),
(3, 'Prof. Linus Pauling', 'linus.torvalds@universidade.edu', '100003', '$2b$10$abcdefghijklmnopqrstuv', NOW(), NOW()),
(4, 'Profa. Ada Lovelace', 'ada.lovelace@universidade.edu', '200001', '$2b$10$abcdefghijklmnopqrstuv', NOW(), NOW()),
(5, 'Prof. Isaac Newton', 'isaac.newton@universidade.edu', '300001', '$2b$10$abcdefghijklmnopqrstuv', NOW(), NOW());

-- TURMAS
INSERT INTO turmas (id, nome, periodo, id_curso, createdAt, updatedAt) VALUES
(1, 'ES2025-N-A', 'Noturno', 1, NOW(), NOW()),  -- Engenharia de Software
(2, 'CC2025-I-A', 'Integral', 2, NOW(), NOW()), -- Ciência da Computação
(3, 'ADS2024-M-B', 'Matutino', 3, NOW(), NOW()), -- Análise e Desenvolvimento de Sistemas
(4, 'GA2025-V-A', 'Vespertino', 4, NOW(), NOW()),-- Gestão Ambiental
(5, 'ADM2024-N-C', 'Noturno', 5, NOW(), NOW()); -- Administração

-- ALUNOS
-- senha será 'senha_aluno_hash'
INSERT INTO alunos (id, nome, email, matricula, senha, id_turma, createdAt, updatedAt) VALUES
(1, 'Jorge "Jorgin" Silva', 'jorgin.silva@email.com', 'MAT2025001', '$2b$10$xyzabcdefghijklmnopqrstu', 1, NOW(), NOW()),
(2, 'Felipe "Felipin" Costa', 'felipin.costa@email.com', 'MAT2025002', '$2b$10$xyzabcdefghijklmnopqrstu', 2, NOW(), NOW()),
(3, 'Gustavo "Guga" Lima', 'guga.lima@email.com', 'MAT2024003', '$2b$10$xyzabcdefghijklmnopqrstu', 3, NOW(), NOW()),
(4, 'Beatriz "Bia" Santos', 'bia.santos@email.com', 'MAT2025004', '$2b$10$xyzabcdefghijklmnopqrstu', 1, NOW(), NOW()),
(5, 'Vinicius "Vini" Pereira', 'vini.pereira@email.com', 'MAT2025005', '$2b$10$xyzabcdefghijklmnopqrstu', 2, NOW(), NOW()),
(6, 'Diana "Di" Almeida', 'diana.almeida@email.com', 'MAT2024006', '$2b$10$xyzabcdefghijklmnopqrstu', 4, NOW(), NOW()),
(7, 'Eduardo "Edu" Ferreira', 'edu.ferreira@email.com', 'MAT2024007', '$2b$10$xyzabcdefghijklmnopqrstu', 5, NOW(), NOW());

-- DISCIPLINAS
INSERT INTO disciplinas (id, nome, id_professor, createdAt, updatedAt) VALUES
(1, 'Programação Orientada a Objetos Avançada', 1, NOW(), NOW()), -- Prof. Alan Turing
(2, 'Algoritmos e Estruturas de Dados Complexas', 2, NOW(), NOW()), -- Profa. Marie Curie
(3, 'Inteligência Artificial Aplicada', 2, NOW(), NOW()),          -- Profa. Marie Curie
(4, 'Sistemas Operacionais Modernos', 3, NOW(), NOW()),          -- Prof. Linus Paulin
(5, 'Ecologia e Sustentabilidade', 4, NOW(), NOW()),            -- Profa. aDA Lovelace
(6, 'Gestão Estratégica de Negócios', 5, NOW(), NOW()),         -- Prof. Peter Drucker
(7, 'Banco de Dados NoSQL', 1, NOW(), NOW());                     -- Prof. Alan Turing

-- ALUNO_DISCIPLINAS
INSERT INTO aluno_disciplinas (id, alunoId, disciplinaId, createdAt, updatedAt) VALUES
(1, 1, 1, NOW(), NOW()), -- Jorgin em POO
(2, 1, 2, NOW(), NOW()), -- Jorgin em Algoritmos
(3, 1, 7, NOW(), NOW()), -- Jorgin em Banco de Dados
(4, 2, 2, NOW(), NOW()), -- Felipin em Algoritmos
(5, 2, 3, NOW(), NOW()), -- Felipin em IA
(6, 3, 4, NOW(), NOW()), -- Guga em Sistemas Operacionais
(7, 4, 1, NOW(), NOW()), -- Bia em POO
(8, 4, 7, NOW(), NOW()), -- Bia em Banco de Dados
(9, 5, 3, NOW(), NOW()), -- Vini em IA
(10, 5, 4, NOW(), NOW()),-- Vini em IA
(11, 6, 5, NOW(), NOW()),-- Diana em Ecologia e Sustentabilidade
(12, 7, 6, NOW(), NOW());-- Edu em Gestão Estratégica

-- NOTAS
INSERT INTO notas (id, alunoId, disciplinaId, nota, data_avaliacao, createdAt, updatedAt) VALUES
-- Jorgin (Aluno 1)
(1, 1, 1, 8.5, '2025-04-15', NOW(), NOW()), -- POO
(2, 1, 1, 9.0, '2025-05-20', NOW(), NOW()), -- POO
(3, 1, 2, 7.5, '2025-04-20', NOW(), NOW()), -- Algoritmos
(4, 1, 2, 8.0, '2025-05-25', NOW(), NOW()), -- Algoritmos
(5, 1, 7, 9.5, '2025-04-25', NOW(), NOW()), -- Banco de Dados
-- Felipin (Aluno 2)
(6, 2, 2, 7.0, '2025-04-22', NOW(), NOW()), -- Algoritmos
(7, 2, 2, 6.5, '2025-05-28', NOW(), NOW()), -- Algoritmos
(8, 2, 3, 9.0, '2025-04-25', NOW(), NOW()), -- IA
(9, 2, 3, 9.8, '2025-05-30', NOW(), NOW()), -- IA
-- Guga (Aluno 3)
(10, 3, 4, 6.0, '2025-04-18', NOW(), NOW()),-- Sistemas Operacionais
(11, 3, 4, 5.5, '2025-05-22', NOW(), NOW()),-- Sistemas Operacionais
-- Bia (Aluno 4)
(12, 4, 1, 10.0, '2025-04-16', NOW(), NOW()),-- POO
(13, 4, 7, 8.8, '2025-04-26', NOW(), NOW()),-- Banco de Dados
-- Vinicius (Aluno 5)
(14, 5, 3, 7.0, '2025-04-27', NOW(), NOW()),-- IA
(15, 5, 4, 8.0, '2025-04-20', NOW(), NOW()),-- Sistemas Operacionais
-- Diana (Aluno 6)
(16, 6, 5, 9.2, '2025-04-10', NOW(), NOW()),-- Ecologia
-- Edu (Aluno 7)
(17, 7, 6, 8.5, '2025-04-12', NOW(), NOW());-- Gestão Estratégica

-- PRESENCAS
INSERT INTO presencas (id, alunoId, disciplinaId, data, presente, createdAt, updatedAt) VALUES
-- Jorgin (Aluno 1)
(1, 1, 1, '2025-03-05', 1, NOW(), NOW()), (2, 1, 1, '2025-03-07', 1, NOW(), NOW()),
(3, 1, 1, '2025-03-12', 0, NOW(), NOW()), (4, 1, 1, '2025-03-14', 1, NOW(), NOW()),
(5, 1, 1, '2025-03-19', 1, NOW(), NOW()), (6, 1, 1, '2025-03-21', 1, NOW(), NOW()), -- 6 aulas, 1 falta (83.3%)
(7, 1, 2, '2025-03-06', 1, NOW(), NOW()), (8, 1, 2, '2025-03-08', 1, NOW(), NOW()),
(9, 1, 2, '2025-03-13', 1, NOW(), NOW()), (10, 1, 2, '2025-03-15', 0, NOW(), NOW()), -- 4 aulas, 1 falta (75%)
-- Felipin (Aluno 2)
(11, 2, 2, '2025-03-06', 1, NOW(), NOW()), (12, 2, 2, '2025-03-08', 1, NOW(), NOW()),
(13, 2, 2, '2025-03-13', 1, NOW(), NOW()), (14, 2, 2, '2025-03-15', 1, NOW(), NOW()), -- 100%
(15, 2, 3, '2025-03-05', 1, NOW(), NOW()), (16, 2, 3, '2025-03-07', 0, NOW(), NOW()),
(17, 2, 3, '2025-03-12', 0, NOW(), NOW()), (18, 2, 3, '2025-03-14', 1, NOW(), NOW()), -- 4 aulas, 2 faltas (50%)
-- Guga (Aluno 3)
(19, 3, 4, '2025-03-05', 1, NOW(), NOW()), (20, 3, 4, '2025-03-07', 1, NOW(), NOW()), -- 100%
-- Bia (Aluno 4)
(21, 4, 1, '2025-03-05', 1, NOW(), NOW()), (22, 4, 1, '2025-03-07', 1, NOW(), NOW()),
(23, 4, 1, '2025-03-12', 1, NOW(), NOW()), (24, 4, 1, '2025-03-14', 1, NOW(), NOW()), -- 100%
-- Vini (Aluno 5)
(25, 5, 3, '2025-03-05', 0, NOW(), NOW()), (26, 5, 3, '2025-03-07', 0, NOW(), NOW()),
(27, 5, 3, '2025-03-12', 0, NOW(), NOW()), (28, 5, 3, '2025-03-14', 0, NOW(), NOW()), -- 0% (Reprovado por falta)
-- Diana (Aluno 6)
(29, 6, 5, '2025-03-06', 1, NOW(), NOW()), (30, 6, 5, '2025-03-13', 1, NOW(), NOW()), -- 100%
-- Edu (Aluno 7)
(31, 7, 6, '2025-03-07', 1, NOW(), NOW()), (32, 7, 6, '2025-03-14', 1, NOW(), NOW()); -- 100%