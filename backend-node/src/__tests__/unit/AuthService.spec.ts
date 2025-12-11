import bcrypt from 'bcrypt';
import { AuthService } from '../../services/AuthService';
import { IAuthRepository, UsuarioBase } from '../../repositories/interfaces/IAuthRepository';

class MockAuthRepository implements IAuthRepository {
  private alunos = new Map<string, UsuarioBase>();
  private professores = new Map<string, UsuarioBase>();
  addAluno(matricula: string, user: UsuarioBase) { this.alunos.set(matricula, user); }
  addProfessor(siape: string, user: UsuarioBase) { this.professores.set(siape, user); }
  async buscarAlunoPorMatricula(matricula: string) { return this.alunos.get(matricula) ?? null; }
  async buscarProfessorPorSiape(siape: string) { return this.professores.get(siape) ?? null; }
}

describe('AuthService (unit)', () => {
  let repo: MockAuthRepository;
  let service: AuthService;

  beforeEach(async () => {
    repo = new MockAuthRepository();
    service = new AuthService(repo);
    const senhaAluno = await bcrypt.hash('senhaA', 10);
    const senhaProf = await bcrypt.hash('senhaP', 10);
    repo.addAluno('MAT1', { id: 1, nome: 'Aluno', senha: senhaAluno });
    repo.addProfessor('SIAPE1', { id: 2, nome: 'Professor', senha: senhaProf });
  });

  it('loga aluno por matrícula com senha correta', async () => {
    const res = await service.login('MAT1', 'senhaA');
    expect(res.tipo).toBe('aluno');
    expect(res.nome).toBe('Aluno');
    expect(res.token).toBeDefined();
  });

  it('loga professor por siape com senha correta', async () => {
    const res = await service.login('SIAPE1', 'senhaP');
    expect(res.tipo).toBe('professor');
    expect(res.nome).toBe('Professor');
    expect(res.token).toBeDefined();
  });

  it('falha com usuário não encontrado', async () => {
    await expect(service.login('NAOEXISTE', 'x')).rejects.toThrow('Usuário não encontrado');
  });

  it('falha com senha inválida', async () => {
    await expect(service.login('MAT1', 'errada')).rejects.toThrow('Senha inválida');
  });
});
