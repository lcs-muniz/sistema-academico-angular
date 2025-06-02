import { Request, Response } from 'express';

import { DisciplinaService } from '../services/DisciplinaService';

const disciplinaService = new DisciplinaService();

export const listarDisciplinas = async (_req: Request, res: Response) => {
  const list = await disciplinaService.listar();
  return res.json(list);
};

export const buscarDisciplinaPorId = async (req: Request, res: Response) : Promise<Response> => {
  try {
    const disciplina = await disciplinaService.buscarDisciplinaPorId(+req.params.disciplinaId);
    return res.json(disciplina);
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
};

export const cadastrarDisciplina = async (req: Request, res: Response) => {
  try {
    const nova = await disciplinaService.criar(req.body);
    return res.status(201).json({ message: 'Disciplina cadastrada com sucesso', disciplina: nova });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const atualizarDisciplina = async (req: Request, res: Response) => {
  try {
    const updated = await disciplinaService.atualizar(+req.params.disciplinaId, req.body);
    return res.json({ message: 'Disciplina atualizada com sucesso', disciplina: updated });
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const deletarDisciplina = async (req: Request, res: Response) => {
  try {
    await disciplinaService.deletar(+req.params.disciplinaId);
    return res.json({ message: 'Disciplina deletada com sucesso' });
  } catch (err: any) {
    const status = err.message.includes('vinculada') ? 400 : 404;
    return res.status(status).json({ error: err.message });
  }
};