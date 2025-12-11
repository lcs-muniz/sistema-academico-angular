import { AlunoDisciplinaService } from '../../services/AlunoDisciplinaService';
import { IAlunoDisciplinaRepository } from '../../repositories/interfaces/IAlunoDisciplinaRepository';

class MockAlunoDisciplinaRepository implements IAlunoDisciplinaRepository {
  private alunoToDisciplinas = new Map<number, number[]>();
  private disciplinaToAlunos = new Map<number, number[]>();
  async listarDisciplinasDoAluno(alunoId: number) {
    const ids = this.alunoToDisciplinas.get(alunoId) ?? [];
    return ids.map(id => ({ id } as any));
  }
  async listarAlunosDaDisciplina(disciplinaId: number) {
    const ids = this.disciplinaToAlunos.get(disciplinaId) ?? [];
    return ids.map(id => ({ id } as any));
  }
  async vincular(alunoId: number, disciplinaId: number) {
    const ds = this.alunoToDisciplinas.get(alunoId) ?? [];
    if (!ds.includes(disciplinaId)) ds.push(disciplinaId);
    this.alunoToDisciplinas.set(alunoId, ds);

    const as = this.disciplinaToAlunos.get(disciplinaId) ?? [];
    if (!as.includes(alunoId)) as.push(alunoId);
    this.disciplinaToAlunos.set(disciplinaId, as);
  }
  async desvincular(alunoId: number, disciplinaId: number) {
    const ds = (this.alunoToDisciplinas.get(alunoId) ?? []).filter(id => id !== disciplinaId);
    this.alunoToDisciplinas.set(alunoId, ds);
    const as = (this.disciplinaToAlunos.get(disciplinaId) ?? []).filter(id => id !== alunoId);
    this.disciplinaToAlunos.set(disciplinaId, as);
  }
}

describe('AlunoDisciplinaService (unit)', () => {
  let repo: MockAlunoDisciplinaRepository;
  let service: AlunoDisciplinaService;

  beforeEach(() => {
    repo = new MockAlunoDisciplinaRepository();
    service = new AlunoDisciplinaService(repo);
  });

  it('vincula aluno a disciplina e lista corretamente', async () => {
    await service.vincular(1, 100);
    const disciplinas = await service.listarDisciplinasDoAluno(1);
    expect(disciplinas.map(d => d.id)).toContain(100);

    const alunos = await service.listarAlunosDaDisciplina(100);
    expect(alunos.map(a => a.id)).toContain(1);
  });

  it('desvincula aluno da disciplina', async () => {
    await service.vincular(1, 100);
    await service.desvincular(1, 100);
    const disciplinas = await service.listarDisciplinasDoAluno(1);
    expect(disciplinas.map(d => d.id)).not.toContain(100);
  });
});
