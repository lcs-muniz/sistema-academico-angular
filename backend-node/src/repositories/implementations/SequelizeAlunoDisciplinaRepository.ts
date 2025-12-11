import { Aluno } from '../../models/Aluno';
import { Disciplina } from '../../models/Disciplina';
import { IAlunoDisciplinaRepository } from '../interfaces/IAlunoDisciplinaRepository';

export class SequelizeAlunoDisciplinaRepository implements IAlunoDisciplinaRepository {
  async listarDisciplinasDoAluno(alunoId: number) {
    const aluno = await Aluno.findByPk(alunoId, { include: { model: Disciplina } });
    if (!aluno) return [];
    return (aluno as any).Disciplinas as Disciplina[];
  }
  async listarAlunosDaDisciplina(disciplinaId: number) {
    const disciplina = await Disciplina.findByPk(disciplinaId, { include: { model: Aluno } });
    if (!disciplina) return [];
    return (disciplina as any).Alunos as Aluno[];
  }
  async vincular(alunoId: number, disciplinaId: number) {
    const aluno = await Aluno.findByPk(alunoId);
    const disciplina = await Disciplina.findByPk(disciplinaId);
    if (!aluno || !disciplina) return;
    await (aluno as any).addDisciplina(disciplina);
  }
  async desvincular(alunoId: number, disciplinaId: number) {
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) return;
    await (aluno as any).removeDisciplina(disciplinaId);
  }
}
