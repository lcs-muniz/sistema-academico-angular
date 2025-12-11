import { Aluno } from '../../models/Aluno';
import { Professores } from '../../models/Professores';
import { IAuthRepository, UsuarioBase } from '../interfaces/IAuthRepository';

function mapAluno(a: Aluno | null): UsuarioBase | null {
  return a ? { id: a.id, nome: a.nome, senha: a.senha } : null;
}
function mapProfessor(p: Professores | null): UsuarioBase | null {
  return p ? { id: p.id, nome: p.nome, senha: p.senha } : null;
}

export class SequelizeAuthRepository implements IAuthRepository {
  async buscarAlunoPorMatricula(matricula: string): Promise<UsuarioBase | null> {
    const a = await Aluno.findOne({ where: { matricula } });
    return mapAluno(a);
  }
  async buscarProfessorPorSiape(siape: string): Promise<UsuarioBase | null> {
    const p = await Professores.findOne({ where: { siape } });
    return mapProfessor(p);
  }
}
