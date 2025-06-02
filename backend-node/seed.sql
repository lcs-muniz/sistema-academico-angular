-- backend-node/seed.sql

-- CURSOS
INSERT INTO cursos (id, nome, descricao, createdAt, updatedAt) VALUES
(1, 'Engenharia de Software', 'Curso focado no desenvolvimento e manutenção de software.', NOW(), NOW()),
(2, 'Ciência da Computação', 'Curso com base teórica sólida em computação.', NOW(), NOW());

-- TURMAS
INSERT INTO turmas (id, nome, periodo, id_curso, createdAt, updatedAt) VALUES
(1, 'ES2025-A', 'Noturno', 1, NOW(), NOW()),
(2, 'CC2025-B', 'Integral', 2, NOW(), NOW());

-- DISCIPLINAS
INSERT INTO disciplinas (id, nome, id_professor, createdAt, updatedAt) VALUES
(1, 'Programação Orientada a Objetos', 1, NOW(), NOW()),
(2, 'Estruturas de Dados', 2, NOW(), NOW()),
(3, 'Inteligência Artificial', 2, NOW(), NOW());

-- ALUNO_DISCIPLINAS (Matrículas)
INSERT INTO aluno_disciplinas (id, alunoId, disciplinaId, createdAt, updatedAt) VALUES
(1, 1, 1, NOW(), NOW()), -- Fulano em POO
(2, 1, 2, NOW(), NOW()), -- Fulano em Estruturas de Dados
(3, 2, 2, NOW(), NOW()), -- Ciclano em Estruturas de Dados
(4, 2, 3, NOW(), NOW()); -- Ciclano em IA

-- NOTAS
INSERT INTO notas (id, alunoId, disciplinaId, nota, data_avaliacao, createdAt, updatedAt) VALUES
(1, 1, 1, 8.5, '2025-04-15', NOW(), NOW()),
(2, 1, 1, 9.0, '2025-05-20', NOW(), NOW()),
(3, 1, 2, 7.0, '2025-04-22', NOW(), NOW()),
(4, 2, 2, 9.5, '2025-04-22', NOW(), NOW());

-- PRESENCAS
INSERT INTO presencas (id, alunoId, disciplinaId, data, presente, createdAt, updatedAt) VALUES
(1, 1, 1, '2025-03-05', 1, NOW(), NOW()),
(2, 1, 1, '2025-03-07', 1, NOW(), NOW()),
(3, 1, 1, '2025-03-12', 0, NOW(), NOW()),
(4, 1, 1, '2025-03-14', 1, NOW(), NOW()),
(5, 2, 2, '2025-03-06', 1, NOW(), NOW()),
(6, 2, 2, '2025-03-08', 1, NOW(), NOW());
