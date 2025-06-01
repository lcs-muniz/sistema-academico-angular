import { Aluno } from '../models/Aluno';
import { Disciplina } from '../models/Disciplina';

export class AlunoDisciplinaService {
  async listarDisciplinasDoAluno(alunoId: number): Promise<Disciplina[]> {
    const aluno = await Aluno.findByPk(alunoId, {
      include: { model: Disciplina }
    });
    if (!aluno) throw new Error('Aluno não encontrado');
    return (aluno as any).Disciplinas as Disciplina[];
  }

  async vincular(alunoId: number, disciplinaId: number): Promise<void> {
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) throw new Error('Aluno não encontrado');

    const disciplina = await Disciplina.findByPk(disciplinaId);
    if (!disciplina) throw new Error('Disciplina não encontrada');

    await (aluno as any).addDisciplina(disciplina);
  }

  async desvincular(alunoId: number, disciplinaId: number): Promise<void> {
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) throw new Error('Aluno não encontrado');

    await (aluno as any).removeDisciplina(disciplinaId);
  }
}
