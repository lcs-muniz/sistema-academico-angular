import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'senha-super-secreta';

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: number;
        nome: string;
        tipo: 'professor' | 'aluno';
      };
    }
  }
}

export const autenticarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, usuarioDecodificado: any) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
    req.usuario = usuarioDecodificado as { id: number; nome: string; tipo: 'professor' | 'aluno' };
    next();
  });
};

export const somenteProfessores = (req: Request, res: Response, next: NextFunction) => {
  if (req.usuario?.tipo !== 'professor') {
    return res.status(403).json({ error: 'Acesso negado. Somente professores podem realizar esta ação.' });
  }
  next();
};