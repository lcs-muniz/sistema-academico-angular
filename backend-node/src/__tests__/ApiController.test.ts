import request from 'supertest';
import server from '../server';

jest.setTimeout(20000);

describe("Teste para verificar listagem de alunos", () => {
    it ("Esse teste precisa verificar o status da response, se a resposta contem um array de alunos e se o array contém ao menos 1 aluno", async () => {
        const response = await request(server).get ("/listarTodosAlunos");
        console.log(response.body);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    }); 
});

describe("Teste para o cadastro do aluno", () => {
    it("Esse teste precisa fazer um cadastro de um novo aluno(objeto aluno deve ser criado nesse teste), deve verificar o status da response , a mensagem do response e se no body contém o novo aluno", async() => {
        const novoAluno = {
            nome: "Testee",
            email: "tesste@teste",
            matricula: "23456789"
        };

        const response = await request(server)
            .post("/cadastrarAluno")
            .send(novoAluno);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Aluno cadastrado com sucesso.");
        expect(response.body).toHaveProperty("novoAluno");
        expect(response.body.novoAluno).toHaveProperty("id");
        expect(response.body.novoAluno).toHaveProperty("nome", novoAluno.nome);
        expect(response.body.novoAluno).toHaveProperty("email", novoAluno.email);
        expect(response.body.novoAluno).toHaveProperty("matricula", novoAluno.matricula);
    
    });
});

describe("Teste de API de Alunos - Atualizar", () => {
    it("Deve atualizar um aluno na rota /atualizarAluno/:alunoId", async () => {
        const alunoId = 16;
        const dadosAtualizados = {
            nome: "Felipao da silva Atualizado",
            email: "felipao@example",
        };
        
        const response = await request(server).put (`/atualizarAluno/${alunoId}`).send(dadosAtualizados);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno atualizado com sucesso.");
        expect(response.body.aluno).toHaveProperty("nome", dadosAtualizados.nome);
        expect(response.body.aluno).toHaveProperty("email", dadosAtualizados.email);

    });
});