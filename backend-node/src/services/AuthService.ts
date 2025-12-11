import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthRepository } from '../repositories/interfaces/IAuthRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'senha-super-secreta';

export class AuthService {
  constructor(private readonly repo: IAuthRepository) {}
  async login(identificador: string, senhaPlaintext: string): Promise<{ token: string; nome: string; id: number; tipo: 'aluno' | 'professor' }> {
    let usuario: { id: number; nome: string; senha: string } | null = null;
    let tipoUsuario: 'aluno' | 'professor' | null = null;

    usuario = await this.repo.buscarAlunoPorMatricula(identificador);
    if (usuario) {
      tipoUsuario = 'aluno';
    } else {
      usuario = await this.repo.buscarProfessorPorSiape(identificador);
      if (usuario) {
        tipoUsuario = 'professor';
      }
    }

    if (!usuario || !tipoUsuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(senhaPlaintext, usuario.senha);
    if (!senhaValida) {
      throw new Error('Senha inválida');
    }

    const tokenPayload = {
      id: usuario.id,
      nome: usuario.nome,
      tipo: tipoUsuario,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora

    return { token, nome: usuario.nome, id: usuario.id, tipo: tipoUsuario };
  }
}