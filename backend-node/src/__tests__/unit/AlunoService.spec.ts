import bcrypt from 'bcrypt';
import { AlunoService } from '../../services/AlunoService';
import { IAlunoRepository, AlunoCreateDTO, AlunoUpdateDTO } from '../../repositories/interfaces/IAlunoRepository';

class MockAlunoRepository implements IAlunoRepository {
  private data: any[] = [];
  private vinculos: Set<number> = new Set();

  async listar() { return this.data; }
  async buscarPorId(id: number) { return this.data.find(a => a.id === id) ?? null; }
  async criar(dados: AlunoCreateDTO) {
    const obj = { id: this.data.length + 1, ...dados };
    this.data.push(obj);
    return obj;
  }
  async atualizar(id: number, dados: AlunoUpdateDTO) {
    const idx = this.data.findIndex(a => a.id === id);
    if (idx === -1) return null;
    this.data[idx] = { ...this.data[idx], ...dados };
    return this.data[idx];
  }
  async deletar(id: number) {
    this.data = this.data.filter(a => a.id !== id);
    this.vinculos.delete(id);
  }
  async possuiVinculoDisciplina(id: number): Promise<boolean> {
    return this.vinculos.has(id);
  }
  // helpers
  vincular(id: number) { this.vinculos.add(id); }
}

describe('AlunoService (unit)', () => {
  let repo: MockAlunoRepository;
  let service: AlunoService;

  beforeEach(() => {
    repo = new MockAlunoRepository();
    service = new AlunoService(repo);
  });

  it('não deve criar aluno sem senha', async () => {
    await expect(service.criar({ nome: 'A', email: 'a@a.com', matricula: 'M1' }))
      .rejects.toThrow('Senha é obrigatória para criar aluno.');
  });

  it('deve criar aluno com senha hasheada', async () => {
    const aluno = await service.criar({ nome: 'A', email: 'a@a.com', matricula: 'M1', senha: 'segredo' });
    expect(aluno.id).toBeDefined();
    expect(aluno.senha).not.toBe('segredo');
    const ok = await bcrypt.compare('segredo', aluno.senha);
    expect(ok).toBe(true);
  });

  it('deve atualizar senha re-hasheando', async () => {
    const aluno = await service.criar({ nome: 'A', email: 'a@a.com', matricula: 'M1', senha: 'segredo' });
    const atualizado = await service.atualizar(aluno.id, { senha: 'nova' });
    const okOld = await bcrypt.compare('segredo', atualizado.senha);
    expect(okOld).toBe(false);
    const okNew = await bcrypt.compare('nova', atualizado.senha);
    expect(okNew).toBe(true);
  });

  it('não deve deletar se possuir vínculo em disciplina', async () => {
    const aluno = await service.criar({ nome: 'A', email: 'a@a.com', matricula: 'M1', senha: 'segredo' });
    repo.vincular(aluno.id);
    await expect(service.deletar(aluno.id)).rejects.toThrow('Aluno vinculado a disciplina');
  });

  it('deve lançar erro ao buscar por id inexistente', async () => {
    await expect(service.buscarPorId(999)).rejects.toThrow('Aluno não encontrado');
  });
});
