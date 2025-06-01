import { Aluno } from '../models/Aluno';
import { AlunoDisciplina } from '../models/AlunoDisciplina';

export class AlunoService {
  async listar() {
    return Aluno.findAll();
  }

  async buscarPorId(alunoId: number) {
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) throw new Error('Aluno não encontrado');
    return aluno;
  }

  async criar({ nome, email, matricula }: { nome: string; email: string; matricula: string }) {
    return Aluno.create({ nome, email, matricula });
  }

  async atualizar(alunoId: number, dados: Partial<{ nome: string; email: string; matricula: string }>) {
    const aluno = await this.buscarPorId(alunoId);
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