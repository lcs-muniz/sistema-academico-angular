import { Professores } from '../models/Professores';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class ProfessorService {
  async listar() {
    return Professores.findAll();
  }

  async buscarPorId(professorId: number) {
    const professor = await Professores.findByPk(professorId);
    if (!professor) throw new Error('Professor não encontrado');
    return professor;
  }

  async criar({ nome, senha, siape, email }: { nome: string; senha?: string; siape: String; email: string }) {
    if (!senha) {
      throw new Error('Senha é obrigatória para criar professor.');
    }
    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);
    return Professores.create({ nome, email, siape, senha: hashedPassword });
  }

  async atualizar(professorId: number, dados: Partial<{ nome: string; senha?: string; siape: String; email: string }>) {
    const professor = await this.buscarPorId(professorId);
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, SALT_ROUNDS);
    }
    await professor.update(dados);
    return professor;
  }

  async deletar(professorId: number) {
    const professor = await this.buscarPorId(professorId);
    await professor.destroy();
  }
}