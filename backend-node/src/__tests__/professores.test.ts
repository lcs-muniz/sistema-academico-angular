import request from 'supertest';
import server from '../server';
import { sequelize } from '../instances/mysql';
import { Professores } from '../models/Professores';
import bcrypt from 'bcrypt';

describe('API de Professores - CRUD Protegido', () => {
    let tokenAdminOuProfessorLogado: string;
    let professorIdCriado: number;

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        const senhaAdminHash = await bcrypt.hash('senhaAdminCrud', 10);
        const adminProf = await Professores.create({
            nome: 'Admin Prof Crud',
            email: 'adminprofcrud@example.com',
            siape: 'ADMINPROFCRUD',
            senha: senhaAdminHash
        });
        const resLogin = await request(server)
            .post('/api/login')
            .send({ identificador: 'ADMINPROFCRUD', senha: 'senhaAdminCrud' });
        tokenAdminOuProfessorLogado = resLogin.body.token;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('1. Deve CRIAR um novo professor', async () => {
        const novoProfessor = {
            nome: "Professor Teste CRUD",
            email: "profcrud@example.com",
            siape: "PROF123CRUD",
            senha: "senhaProf123"
        };
        const response = await request(server)
            .post('/api/professores')
            .set('Authorization', `Bearer ${tokenAdminOuProfessorLogado}`)
            .send(novoProfessor);

        expect(response.status).toBe(201);
        expect(response.body.professor).toHaveProperty('id');
        expect(response.body.professor.nome).toBe(novoProfessor.nome);
        professorIdCriado = response.body.professor.id;
    });

    it('2. Deve BUSCAR o professor criado', async () => {
        const response = await request(server)
            .get(`/api/professores/${professorIdCriado}`)
            .set('Authorization', `Bearer ${tokenAdminOuProfessorLogado}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(professorIdCriado);
    });


    it('3. Deve ATUALIZAR o professor criado', async () => {
        const dadosAtualizados = { nome: "Professor CRUD Atualizado" };
        const response = await request(server)
            .put(`/api/professores/${professorIdCriado}`)
            .set('Authorization', `Bearer ${tokenAdminOuProfessorLogado}`)
            .send(dadosAtualizados);
        expect(response.status).toBe(200);
        expect(response.body.professor.nome).toBe(dadosAtualizados.nome);
    });

    it('4. Deve DELETAR o professor criado', async () => {
        const response = await request(server)
            .delete(`/api/professores/${professorIdCriado}`)
            .set('Authorization', `Bearer ${tokenAdminOuProfessorLogado}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Professor deletado com sucesso');
    });

    it('5. Deve retornar 404 ao tentar BUSCAR professor deletado', async () => {
        const response = await request(server)
            .get(`/api/professores/${professorIdCriado}`)
            .set('Authorization', `Bearer ${tokenAdminOuProfessorLogado}`);
        expect(response.status).toBe(404);
    });
});