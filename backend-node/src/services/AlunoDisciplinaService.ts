import { Aluno } from '../models/Aluno';
import { Disciplina } from '../models/Disciplina';
import { IAlunoDisciplinaRepository } from '../repositories/interfaces/IAlunoDisciplinaRepository';

export class AlunoDisciplinaService {
  constructor(private readonly repo: IAlunoDisciplinaRepository) {}

  async listarDisciplinasDoAluno(alunoId: number): Promise<Disciplina[]> {
    const disciplinas = await this.repo.listarDisciplinasDoAluno(alunoId);
    if (!disciplinas || disciplinas.length === 0) {
      // Garantir erro coerente se aluno inexistente; repo retorna [] se não encontrou
      // Mantemos regra simples: vazio significa sem dados ou não encontrado
    }
    return disciplinas;
  }

  async listarAlunosDaDisciplina(disciplinaId: number): Promise<Aluno[]> {
    const alunos = await this.repo.listarAlunosDaDisciplina(disciplinaId);
    return alunos;
  }

  async vincular(alunoId: number, disciplinaId: number): Promise<void> {
    await this.repo.vincular(alunoId, disciplinaId);
  }

  async desvincular(alunoId: number, disciplinaId: number): Promise<void> {
    await this.repo.desvincular(alunoId, disciplinaId);
  }
}
