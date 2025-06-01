import { Request, Response } from 'express';

import { AlunoService } from '../services/AlunoService';

const service = new AlunoService();

export const cadastrarAluno = async (req: Request, res: Response) : Promise<Response> => {
  try {
    const novo = await service.criar(req.body);
    return res.status(201).json({ message: 'Aluno cadastrado com sucesso', aluno: novo });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const listarAlunos = async (_req: Request, res: Response) : Promise<Response> => {
  const alunos = await service.listar();
  return res.json(alunos);
};

export const buscarAlunoPorId = async (req: Request, res: Response) : Promise<Response> => {
  try {
    const aluno = await service.buscarPorId(+req.params.alunoId);
    return res.json(aluno);
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
};

export const atualizarAluno = async (req: Request, res: Response) : Promise<Response> => {
  try {
    const updated = await service.atualizar(+req.params.alunoId, req.body);
    return res.json({ message: 'Aluno atualizado com sucesso', aluno: updated });
  } catch (err: any) {
    const status = err.message.includes('não encontrado') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const deletarAluno = async (req: Request, res: Response)  : Promise<Response> => {
  try {
    await service.deletar(+req.params.alunoId);
    return res.json({ message: 'Aluno deletado com sucesso' });
  } catch (err: any) {
    const status = err.message.includes('vinculado') ? 400 : 404;
    return res.status(status).json({ error: err.message });
  }
};
