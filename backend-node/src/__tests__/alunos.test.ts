import request from 'supertest';
import server from '../server';
import { sequelize } from '../instances/mysql';

describe('API de Alunos - CRUD Protegido', () => {
    let tokenProfessor: string;
    let alunoIdCriado: number;

    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Recria tabelas para esta suíte 
                                               // -> IMPORTANTE: APENAS PARA TESTES
        const resLogin = await request(server)
            .post('/api/login')
            .send({ identificador: 'PROFCRUDALUNOS', senha: 'senhaProfCrud' });
        tokenProfessor = resLogin.body.token;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('🟢 1. Deve CRIAR um novo aluno com autenticação de professor', async () => {
        const novoAluno = {
            nome: "Aluno Teste CRUD",
            email: "alunocrud@teste.com",
            matricula: "CRUDALUNO123",
            senha: "senhaAluno123",
        };

        const response = await request(server)
            .post('/api/alunos')
            .set('Authorization', `Bearer ${tokenProfessor}`)
            .send(novoAluno);

        expect(response.status).toBe(201);
        expect(response.body.aluno).toHaveProperty('id');
        expect(response.body.aluno.nome).toBe(novoAluno.nome);
        expect(response.body.aluno.email).toBe(novoAluno.email);
        alunoIdCriado = response.body.aluno.id;
    });

    it('🟢 2. Deve BUSCAR o aluno criado com autenticação de professor', async () => {
        expect(alunoIdCriado).toBeDefined();
        const response = await request(server)
            .get(`/api/alunos/${alunoIdCriado}`)
            .set('Authorization', `Bearer ${tokenProfessor}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(alunoIdCriado);
        expect(response.body.nome).toBe("Aluno Teste CRUD");
    });

    it('🟢 3. Deve ATUALIZAR o aluno criado com autenticação de professor', async () => {
        const dadosAtualizados = { nome: "Aluno CRUD Atualizado" };
        const response = await request(server)
            .put(`/api/alunos/${alunoIdCriado}`)
            .set('Authorization', `Bearer ${tokenProfessor}`)
            .send(dadosAtualizados);

        expect(response.status).toBe(200);
        expect(response.body.aluno.nome).toBe(dadosAtualizados.nome);
    });

    it('🟢 4. Deve DELETAR o aluno criado com autenticação de professor', async () => {
        const response = await request(server)
            .delete(`/api/alunos/${alunoIdCriado}`)
            .set('Authorization', `Bearer ${tokenProfessor}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Aluno deletado com sucesso');
    });

    it('🔴 5. Deve retornar 404 ao tentar BUSCAR aluno deletado', async () => {
        const response = await request(server)
            .get(`/api/alunos/${alunoIdCriado}`)
            .set('Authorization', `Bearer ${tokenProfessor}`);
        expect(response.status).toBe(404);
    });
});