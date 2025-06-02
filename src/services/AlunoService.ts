import { Aluno } from '../models/Aluno';
import { AlunoDisciplina } from '../models/AlunoDisciplina';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class AlunoService {
  async listar() {
    return Aluno.findAll();
  }

  async buscarPorId(alunoId: number) {
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) throw new Error('Aluno não encontrado');
    return aluno;
  }

  async criar({ nome, email, matricula, senha }: { nome: string; email: string; matricula: string; senha?: string }) {
    if (!senha) {
      throw new Error('Senha é obrigatória para criar aluno.');
    }
    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);
    return Aluno.create({ nome, email, matricula, senha: hashedPassword });
  }

  async atualizar(alunoId: number, dados: Partial<{ nome: string; email: string; matricula: string; senha?: string }>) {
    const aluno = await this.buscarPorId(alunoId);
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, SALT_ROUNDS);
    }
    await aluno.update(dados);
    return aluno;
  }

  async deletar(alunoId: number) {
    const aluno = await this.buscarPorId(alunoId);
    const vinculo = await AlunoDisciplina.findOne({ where: { alunoId } });
    if (vinculo) throw new Error('Aluno vinculado a disciplina');
    await aluno.destroy();
  }
}