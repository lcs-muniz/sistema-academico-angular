import { Request, Response } from 'express';

import { ProfessorService } from '../services/ProfessorService';

const service = new ProfessorService();

export const listarProfessores = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const professores = await service.listar();
  return res.json(professores);
};

export const buscarProfessorPorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const professor = await service.buscarPorId(+req.params.professorId);
    return res.json(professor);
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
};

export const cadastrarProfessor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const novo = await service.criar(req.body);
    return res
      .status(201)
      .json({ message: 'Professor cadastrado com sucesso', professor: novo });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const atualizarProfessor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updated = await service.atualizar(+req.params.professorId, req.body);
    return res.json({ message: 'Professor atualizado com sucesso', professor: updated });
  } catch (err: any) {
    const status = err.message.includes('não encontrado') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const deletarProfessor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await service.deletar(+req.params.professorId);
    return res.json({ message: 'Professor deletado com sucesso' });
  } catch (err: any) {
    const status = err.message.includes('não encontrado') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};
