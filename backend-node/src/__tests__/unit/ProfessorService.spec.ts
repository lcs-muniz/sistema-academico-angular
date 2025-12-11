import bcrypt from 'bcrypt';
import { ProfessorService } from '../../services/ProfessorService';
import { IProfessorRepository, ProfessorCreateDTO, ProfessorUpdateDTO } from '../../repositories/interfaces/IProfessorRepository';

class MockProfessorRepository implements IProfessorRepository {
  private data: any[] = [];
  async listar() { return this.data; }
  async buscarPorId(id: number) { return this.data.find(p => p.id === id) ?? null; }
  async criar(dados: ProfessorCreateDTO) {
    const obj = { id: this.data.length + 1, ...dados };
    this.data.push(obj);
    return obj;
  }
  async atualizar(id: number, dados: ProfessorUpdateDTO) {
    const idx = this.data.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data[idx] = { ...this.data[idx], ...dados };
    return this.data[idx];
  }
  async deletar(id: number) {
    this.data = this.data.filter(p => p.id !== id);
  }
}

describe('ProfessorService (unit)', () => {
  let repo: MockProfessorRepository;
  let service: ProfessorService;

  beforeEach(() => {
    repo = new MockProfessorRepository();
    service = new ProfessorService(repo);
  });

  it('não deve criar professor sem senha', async () => {
    await expect(service.criar({ nome: 'P', email: 'p@p.com', siape: 'S1' }))
      .rejects.toThrow('Senha é obrigatória para criar professor.');
  });

  it('deve criar professor com senha hasheada', async () => {
    const prof = await service.criar({ nome: 'P', email: 'p@p.com', siape: 'S1', senha: 'segredo' });
    expect(prof.id).toBeDefined();
    expect(prof.senha).not.toBe('segredo');
    const ok = await bcrypt.compare('segredo', prof.senha);
    expect(ok).toBe(true);
  });

  it('deve atualizar senha re-hasheando', async () => {
    const prof = await service.criar({ nome: 'P', email: 'p@p.com', siape: 'S1', senha: 'segredo' });
    const atualizado = await service.atualizar(prof.id, { senha: 'nova' });
    const okOld = await bcrypt.compare('segredo', atualizado.senha);
    expect(okOld).toBe(false);
    const okNew = await bcrypt.compare('nova', atualizado.senha);
    expect(okNew).toBe(true);
  });

  it('deve lançar erro ao buscar por id inexistente', async () => {
    await expect(service.buscarPorId(999)).rejects.toThrow('Professor não encontrado');
  });

  it('deve conseguir deletar após criar', async () => {
    const prof = await service.criar({ nome: 'P', email: 'p@p.com', siape: 'S1', senha: 'segredo' });
    await service.deletar(prof.id);
    await expect(service.buscarPorId(prof.id)).rejects.toThrow('Professor não encontrado');
  });
});
