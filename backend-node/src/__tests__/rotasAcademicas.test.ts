import request from 'supertest';
import server from '../server';
import { sequelize } from '../instances/mysql';
import { Aluno } from '../models/Aluno';
import { Professores } from '../models/Professores';
import { Disciplina } from '../models/Disciplina';
import { Turmas } from '../models/Turmas';
import { Cursos } from '../models/Cursos';
import { Notas } from '../models/Notas';
import { Presencas } from '../models/Presencas';
import { AlunoDisciplina } from '../models/AlunoDisciplina';
import bcrypt from 'bcrypt';

describe('📊 Testes das Rotas Acadêmicas', () => {
    let tokenAluno: string;
    let alunoId: number;
    let tokenProfessor: string;
    let professorId: number;
    let disciplinaIdComDados: number;
    let disciplinaIdSemDados: number;
    let alunoReprovadoId: number;
    let turmaIdParaTestes: number;

    beforeAll(async () => {
        await sequelize.sync({ force: true });  // Recria tabelas para esta suíte 
                                                // -> IMPORTANTE: APENAS PARA TESTES

        const curso = await Cursos.create({ nome: 'Curso Acadêmico' });
        const turma = await Turmas.create({ nome: 'Turma Acadêmica', id_curso: curso.id });
        turmaIdParaTestes = turma.id;
        
        const senhaHash = await bcrypt.hash('senhaAcad123', 10);

        const aluno = await Aluno.create({
            nome: 'Aluno Acadêmico Teste', email: 'aluno.acad@example.com', matricula: 'ACAD001',
            senha: senhaHash, id_turma: turmaIdParaTestes,
        });
        alunoId = aluno.id;

        const alunoReprovado = await Aluno.create({
            nome: 'Aluno Reprovado Teste', email: 'aluno.reprov@example.com', matricula: 'ACAD002_REPROV',
            senha: senhaHash, id_turma: turmaIdParaTestes,
        });
        alunoReprovadoId = alunoReprovado.id;


        const professor = await Professores.create({
            nome: 'Professor Acadêmico Teste', email: 'prof.acad@example.com', siape: 'ACADPROF001',
            senha: senhaHash
        });
        professorId = professor.id;

        const disciplinaComDados = await Disciplina.create({ nome: 'Disciplina Com Dados', id_professor: professorId });
        disciplinaIdComDados = disciplinaComDados.id;

        const disciplinaSemDados = await Disciplina.create({ nome: 'Disciplina Sem Dados', id_professor: professorId });
        disciplinaIdSemDados = disciplinaSemDados.id;

        await AlunoDisciplina.create({ alunoId: alunoId, disciplinaId: disciplinaIdComDados });
        await AlunoDisciplina.create({ alunoId: alunoReprovadoId, disciplinaId: disciplinaIdComDados });


        await Notas.create({ alunoId: alunoId, disciplinaId: disciplinaIdComDados, nota: 8.0, data_avaliacao: new Date() });
        await Notas.create({ alunoId: alunoId, disciplinaId: disciplinaIdComDados, nota: 9.0, data_avaliacao: new Date() }); // Média 8.5
        await Presencas.create({ alunoId: alunoId, disciplinaId: disciplinaIdComDados, data: '2025-03-01', presente: true });
        await Presencas.create({ alunoId: alunoId, disciplinaId: disciplinaIdComDados, data: '2025-03-02', presente: true });
        await Presencas.create({ alunoId: alunoId, disciplinaId: disciplinaIdComDados, data: '2025-03-03', presente: true });
        await Presencas.create({ alunoId: alunoId, disciplinaId: disciplinaIdComDados, data: '2025-03-04', presente: true }); // 100% presença

        await Notas.create({ alunoId: alunoReprovadoId, disciplinaId: disciplinaIdComDados, nota: 4.0, data_avaliacao: new Date() });
        await Notas.create({ alunoId: alunoReprovadoId, disciplinaId: disciplinaIdComDados, nota: 5.0, data_avaliacao: new Date() }); // Média 4.5
        await Presencas.create({ alunoId: alunoReprovadoId, disciplinaId: disciplinaIdComDados, data: '2025-03-01', presente: true });
        await Presencas.create({ alunoId: alunoReprovadoId, disciplinaId: disciplinaIdComDados, data: '2025-03-02', presente: true }); // 100% presença

        const resAluno = await request(server).post('/api/login').send({ identificador: 'ACAD001', senha: 'senhaAcad123' });
        tokenAluno = resAluno.body.token;
        const resProf = await request(server).post('/api/login').send({ identificador: 'ACADPROF001', senha: 'senhaAcad123' });
        tokenProfessor = resProf.body.token;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('📝 GET /api/alunos/:alunoId/notas', () => {
        it('🟢 Professor deve ver notas e médias do aluno', async () => {
            const response = await request(server)
                .get(`/api/alunos/${alunoId}/notas`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            const notaDisciplina = response.body.find((n: any) => n.disciplinaId === disciplinaIdComDados);
            expect(notaDisciplina).toBeDefined();
            expect(notaDisciplina.media).toBe(8.50);
        });
        it('🔴 Aluno não deve ter acesso', async () => {
            const response = await request(server)
                .get(`/api/alunos/${alunoId}/notas`)
                .set('Authorization', `Bearer ${tokenAluno}`);
            expect(response.status).toBe(403);
        });
        it('🔴 Deve retornar 404 para aluno inexistente', async () => {
            const response = await request(server)
                .get(`/api/alunos/99999/notas`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(404);
            expect(response.body.error).toContain('Aluno não encontrado');
        });
    });

    describe('📅 GET /api/alunos/:alunoId/presencas', () => {
        it('🟢 Professor deve ver percentual de presença do aluno', async () => {
            const response = await request(server)
                .get(`/api/alunos/${alunoId}/presencas`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            const presencaDisciplina = response.body.find((p: any) => p.disciplinaId === disciplinaIdComDados);
            expect(presencaDisciplina).toBeDefined();
            expect(presencaDisciplina.percentual).toBe(100.00);
        });
        it('🔴 Aluno não deve ter acesso', async () => {
            const response = await request(server)
                .get(`/api/alunos/${alunoId}/presencas`)
                .set('Authorization', `Bearer ${tokenAluno}`);
            expect(response.status).toBe(403);
        });
        it('🔴 Deve retornar 404 para aluno inexistente', async () => {
            const response = await request(server)
                .get(`/api/alunos/99999/presencas`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(404);
        });
    });

    describe('📉 GET /api/disciplinas/:disciplinaId/reprovados', () => {
        it('🟢 Professor deve ver lista de alunos reprovados na disciplina', async () => {
            const response = await request(server)
                .get(`/api/disciplinas/${disciplinaIdComDados}/reprovados`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            const alunoReprovadoEncontrado = response.body.find((r: any) => r.alunoId === alunoReprovadoId);
            expect(alunoReprovadoEncontrado).toBeDefined();
            expect(alunoReprovadoEncontrado.media).toBe(4.50);
        });
        it('🔴 Aluno não deve ter acesso', async () => {
            const response = await request(server)
                .get(`/api/disciplinas/${disciplinaIdComDados}/reprovados`)
                .set('Authorization', `Bearer ${tokenAluno}`);
            expect(response.status).toBe(403);
        });
        it('🔴 Deve retornar 404 para disciplina inexistente', async () => {
            const response = await request(server)
                .get(`/api/disciplinas/99999/reprovados`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(404);
            expect(response.body.error).toContain('Disciplina não encontrada');
        });
        it('🟢 Deve retornar lista vazia se não houver reprovados', async () => {
            const alunoAprovado = await Aluno.create({
                nome: 'Aluno Aprovado Temp',
                email: 'aprov.temp@example.com',
                matricula: 'APROVTEMP',
                senha: await bcrypt.hash('test',10),
                id_turma: turmaIdParaTestes,
            });
            await AlunoDisciplina.create({ alunoId: alunoAprovado.id, disciplinaId: disciplinaIdSemDados });
            await Notas.create({ alunoId: alunoAprovado.id, disciplinaId: disciplinaIdSemDados, nota: 10});
            await Presencas.create({ alunoId: alunoAprovado.id, disciplinaId: disciplinaIdSemDados, data: '2025-01-01', presente: true});


            const response = await request(server)
                .get(`/api/disciplinas/${disciplinaIdSemDados}/reprovados`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });

    describe('🧾 GET /api/alunos/:alunoId/situacao', () => {
        it('🟢 Professor deve ver situação do aluno (aprovado/reprovado)', async () => {
            const response = await request(server)
                .get(`/api/alunos/${alunoId}/situacao`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            const situacaoDisciplina = response.body.find((s: any) => s.disciplinaId === disciplinaIdComDados);
            expect(situacaoDisciplina).toBeDefined();
            expect(situacaoDisciplina.aprovado).toBe(true);
        });
         it('🟢 Professor deve ver situação do aluno (reprovado)', async () => {
            const response = await request(server)
                .get(`/api/alunos/${alunoReprovadoId}/situacao`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            const situacaoDisciplina = response.body.find((s: any) => s.disciplinaId === disciplinaIdComDados);
            expect(situacaoDisciplina).toBeDefined();
            expect(situacaoDisciplina.aprovado).toBe(false);
        });
        it('🔴 Aluno não deve ter acesso', async () => {
            const response = await request(server)
                .get(`/api/alunos/${alunoId}/situacao`)
                .set('Authorization', `Bearer ${tokenAluno}`);
            expect(response.status).toBe(403);
        });
        it('🔴 Deve retornar 404 para aluno inexistente', async () => {
            const response = await request(server)
                .get(`/api/alunos/99999/situacao`)
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(404);
        });
    });
});
