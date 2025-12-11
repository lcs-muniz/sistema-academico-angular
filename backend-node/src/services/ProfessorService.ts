import bcrypt from 'bcrypt';
import { IProfessorRepository, ProfessorCreateDTO, ProfessorUpdateDTO } from '../repositories/interfaces/IProfessorRepository';

const SALT_ROUNDS = 10;

export class ProfessorService {
  constructor(private readonly repo: IProfessorRepository) {}

  async listar() {
    return this.repo.listar();
  }

  async buscarPorId(professorId: number) {
    const professor = await this.repo.buscarPorId(professorId);
    if (!professor) throw new Error('Professor não encontrado');
    return professor;
  }

  async criar({ nome, senha, siape, email }: { nome: string; senha?: string; siape: string; email: string }) {
    if (!senha) {
      throw new Error('Senha é obrigatória para criar professor.');
    }
    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);
    const dados: ProfessorCreateDTO = { nome, email, siape, senha: hashedPassword };
    return this.repo.criar(dados);
  }

  async atualizar(professorId: number, dados: Partial<{ nome: string; senha?: string; siape: string; email: string }>) {
    await this.buscarPorId(professorId);
    const update: ProfessorUpdateDTO = { ...dados };
    if (update.senha) {
      update.senha = await bcrypt.hash(update.senha, SALT_ROUNDS);
    }
    const atualizado = await this.repo.atualizar(professorId, update);
    return atualizado!;
  }

  async deletar(professorId: number) {
    await this.buscarPorId(professorId);
    await this.repo.deletar(professorId);
  }
}