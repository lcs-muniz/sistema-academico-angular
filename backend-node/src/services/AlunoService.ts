import { Aluno } from '../models/Aluno';
import bcrypt from 'bcrypt';
import { IAlunoRepository, AlunoCreateDTO, AlunoUpdateDTO } from '../repositories/interfaces/IAlunoRepository';

const SALT_ROUNDS = 10;

export class AlunoService {
  constructor(private readonly repo: IAlunoRepository) {}

  async listar() {
    return this.repo.listar();
  }

  async buscarPorId(alunoId: number) {
    const aluno = await this.repo.buscarPorId(alunoId);
    if (!aluno) throw new Error('Aluno não encontrado');
    return aluno;
  }

  async criar({ nome, email, matricula, senha }: { nome: string; email: string; matricula: string; senha?: string }) {
    if (!senha) {
      throw new Error('Senha é obrigatória para criar aluno.');
    }
    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);
    const dados: AlunoCreateDTO = { nome, email, matricula, senha: hashedPassword };
    return this.repo.criar(dados);
  }

  async atualizar(alunoId: number, dados: Partial<{ nome: string; email: string; matricula: string; senha?: string }>) {
    const aluno = await this.buscarPorId(alunoId);
    const update: AlunoUpdateDTO = { ...dados };
    if (update.senha) {
      update.senha = await bcrypt.hash(update.senha, SALT_ROUNDS);
    }
    const atualizado = await this.repo.atualizar(alunoId, update);
    return atualizado ?? aluno; // fallback, mas repo deve retornar atualizado
  }

  async deletar(alunoId: number) {
    await this.buscarPorId(alunoId);
    const possuiVinculo = await this.repo.possuiVinculoDisciplina(alunoId);
    if (possuiVinculo) {
      throw new Error('Aluno vinculado a disciplina');
    }
    await this.repo.deletar(alunoId);
  }
}