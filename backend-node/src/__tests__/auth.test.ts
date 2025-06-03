import request from 'supertest';
import server from '../server';
import { sequelize } from '../instances/mysql';
import { Aluno } from '../models/Aluno';
import { Professores } from '../models/Professores';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

describe('🔐 API de Autenticação - POST /api/login', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });  // Recria tabelas para esta suíte 
                                                // -> IMPORTANTE: APENAS PARA TESTES

        const hashedPassword = await bcrypt.hash('senhaSegura123', SALT_ROUNDS);
        await Aluno.create({
            nome: 'Aluno Teste Login',
            email: 'alunologin@example.com',
            matricula: 'AUTH_ALUNO_123',
            senha: hashedPassword,
        });
        await Professores.create({
            nome: 'Professor Teste Login',
            email: 'proflogin@example.com',
            siape: 'AUTH_PROF_123',
            senha: hashedPassword,
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('🟢 Deve logar um ALUNO com sucesso e retornar token (status 200)', async () => {
        const response = await request(server)
            .post('/api/login')
            .send({ identificador: 'AUTH_ALUNO_123', senha: 'senhaSegura123' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.mensagem).toBe('Login realizado com sucesso');
    });

    it('🟢 Deve logar um professor com sucesso e retornar token (status 200)', async () => {
        const response = await request(server)
            .post('/api/login')
            .send({ identificador: 'AUTH_PROF_123', senha: 'senhaSegura123' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.mensagem).toBe('Login realizado com sucesso');
    });

    it('🔴 Deve retornar 401 para login com SENHA INCORRETA', async () => {
        const response = await request(server)
            .post('/api/login')
            .send({ identificador: 'AUTH_ALUNO_123', senha: 'senhaErrada123' });
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Senha inválida');
    });

    it('🔴 Deve retornar 404 para login com USUÁRIO INEXISTENTE', async () => {
        const response = await request(server)
            .post('/api/login')
            .send({ identificador: 'NAO_EXISTE_999', senha: 'senhaQualquer' });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Usuário não encontrado');
    });

    it('🔴 Deve retornar 400 para login SEM CAMPO OBRIGATÓRIO (identificador)', async () => {
        const response = await request(server)
            .post('/api/login')
            .send({ senha: 'senhaSegura123' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Identificador (siape/matrícula) e senha são obrigatórios.');
    });

    it('🔴 Deve retornar 400 para login SEM CAMPO OBRIGATÓRIO (senha)', async () => {
        const response = await request(server)
            .post('/api/login')
            .send({ identificador: 'AUTH_ALUNO_123' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Identificador (siape/matrícula) e senha são obrigatórios.');
    });
});
