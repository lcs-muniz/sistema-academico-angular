import { Request, Response } from 'express';

export const getDashboard = (req: Request, res: Response) => {
  if (!req.usuario) {
    return res.status(401).json({ error: "Usuário não autenticado." });
  }
  const { nome, tipo } = req.usuario;
  const mensagem = tipo === 'professor' ? `Bem-vindo, Professor ${nome}` : `Bem-vindo, Aluno ${nome}`;
  return res.json({ mensagem });
};