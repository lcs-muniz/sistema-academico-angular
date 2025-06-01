import { Request, Response } from 'express';

import { TurmaService } from '../services/TurmaService';

const turmaService = new TurmaService();

export const listarTurmas = async (_req: Request, res: Response) => {
  const turmas = await turmaService.listar();
  return res.json(turmas);
};

export const cadastrarTurma = async (req: Request, res: Response) => {
  try {
    const nova = await turmaService.criar(req.body);
    return res.status(201).json({ message: 'Turma cadastrada com sucesso', turma: nova });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const atualizarTurma = async (req: Request, res: Response) => {
  try {
    const updated = await turmaService.atualizar(+req.params.turmaId, req.body);
    return res.json({ message: 'Turma atualizada com sucesso', turma: updated });
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const deletarTurma = async (req: Request, res: Response) => {
  try {
    await turmaService.deletar(+req.params.turmaId);
    return res.json({ message: 'Turma deletada com sucesso' });
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};