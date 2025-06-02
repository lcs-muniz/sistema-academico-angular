import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Aluno } from '../models/Aluno';
import { Professores } from '../models/Professores';

const JWT_SECRET = process.env.JWT_SECRET || 'senha-super-secreta';

export class AuthService {
  async login(identificador: string, senhaPlaintext: string): Promise<{ token: string; nome: string; id: number; tipo: 'aluno' | 'professor' }> {
    let usuario: Aluno | Professores | null = null;
    let tipoUsuario: 'aluno' | 'professor' | null = null;

    usuario = await Aluno.findOne({ where: { matricula: identificador } });
    if (usuario) {
      tipoUsuario = 'aluno';
    } else {
      usuario = await Professores.findOne({ where: { siape: identificador } });
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