import request from 'supertest';
import server from '../server';
import { sequelize } from '../instances/mysql';
import { Aluno } from '../models/Aluno';
import { Professores } from '../models/Professores';
import { Turmas } from '../models/Turmas';
import { Cursos } from '../models/Cursos';
import bcrypt from 'bcrypt';

describe('🔐 Middleware de Autenticação e 🔒 Rotas Protegidas', () => {
    let tokenAluno: string;
    let tokenProfessor: string;
    let alunoNome: string = 'Aluno Teste RP';
    let professorNome: string = 'Professor Teste RP';


    beforeAll(async () => {
        await sequelize.sync({ force: true });  // Recria tabelas para esta suíte 
                                                // -> IMPORTANTE: APENAS PARA TESTES


        const curso = await Cursos.create({ nome: 'Curso RP' });
        const turma = await Turmas.create({ nome: 'Turma RP', id_curso: curso.id });
        const senhaHash = await bcrypt.hash('senhaRP123', 10);

        await Aluno.create({
            nome: alunoNome, email: 'alunorp@example.com', matricula: 'RP_ALUNO',
            senha: senhaHash, id_turma: turma.id
        });
        await Professores.create({
            nome: professorNome, email: 'profrp@example.com', siape: 'RP_PROF',
            senha: senhaHash
        });

        const resAluno = await request(server).post('/api/login').send({ identificador: 'RP_ALUNO', senha: 'senhaRP123' });
        tokenAluno = resAluno.body.token;
        const resProf = await request(server).post('/api/login').send({ identificador: 'RP_PROF', senha: 'senhaRP123' });
        tokenProfessor = resProf.body.token;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('Testes do Middleware', () => {
        it('🟢 Token válido deve permitir acesso e extrair tipo de usuário (dashboard)', async () => {
            const response = await request(server)
                .get('/api/dashboard')
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(response.body.mensagem).toContain(professorNome);
            expect(response.body.mensagem).toContain('Professor');
        });

        it('🔴 Token inválido deve negar acesso', async () => {
            const response = await request(server)
                .get('/api/dashboard')
                .set('Authorization', 'Bearer tokenmuitoinvalido123');
            expect(response.status).toBe(403);
            expect(response.body.error).toBe('Token inválido ou expirado.');
        });

        it('🔴 Token ausente deve negar acesso', async () => {
            const response = await request(server).get('/api/dashboard');
            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Token não fornecido.');
        });
    });

    describe('🧭 Rota /api/dashboard', () => {
        it('🟢 Qualquer usuário logado (aluno) pode acessar', async () => {
            const response = await request(server)
                .get('/api/dashboard')
                .set('Authorization', `Bearer ${tokenAluno}`);
            expect(response.status).toBe(200);
            expect(response.body.mensagem).toContain(alunoNome);
        });
        it('🟢 Qualquer usuário logado (professor) pode acessar', async () => {
            const response = await request(server)
                .get('/api/dashboard')
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(response.body.mensagem).toContain(professorNome);
        });
    });

    describe('👨‍🏫 Rota /api/professores (GET para listar todos)', () => {
        it('🟢 Professor pode acessar /listarProfessores', async () => {
            const response = await request(server)
                .get('/api/professores')
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
        it('🟢 Aluno pode acessar /listarProfessores', async () => {
            const response = await request(server)
                .get('/api/professores')
                .set('Authorization', `Bearer ${tokenAluno}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('👨‍🎓 Rota /api/alunos (GET para listar todos)', () => {
        it('🟢 Professor pode acessar /listarAlunos', async () => {
            const response = await request(server)
                .get('/api/alunos')
                .set('Authorization', `Bearer ${tokenProfessor}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
        it('🔴 Aluno recebe acesso negado (403) para /listarAlunos', async () => {
            const response = await request(server)
                .get('/api/alunos')
                .set('Authorization', `Bearer ${tokenAluno}`);
            expect(response.status).toBe(403);
            expect(response.body.error).toBe('Acesso negado. Somente professores podem realizar esta ação.');
        });
    });
});
