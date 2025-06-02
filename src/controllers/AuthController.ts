import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { identificador, senha } = req.body;

  if (!identificador || !senha) {
    return res.status(400).json({ error: 'Identificador (siape/matrícula) e senha são obrigatórios.' });
  }

  try {
    const loginResult = await authService.login(identificador, senha);
    return res.json({
      token: loginResult.token,
      mensagem: 'Login realizado com sucesso',
    });
  } catch (err: any) {
    if (err.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Senha inválida') {
      return res.status(401).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};