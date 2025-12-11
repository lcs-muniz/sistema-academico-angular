import { Aluno } from '../../models/Aluno';
import { Disciplina } from '../../models/Disciplina';

export interface IAlunoDisciplinaRepository {
  listarDisciplinasDoAluno(alunoId: number): Promise<Disciplina[]>;
  listarAlunosDaDisciplina(disciplinaId: number): Promise<Aluno[]>;
  vincular(alunoId: number, disciplinaId: number): Promise<void>;
  desvincular(alunoId: number, disciplinaId: number): Promise<void>;
}
