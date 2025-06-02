import { Request, Response } from 'express';

import { NotasService } from '../services/NotasService';

const service = new NotasService();

export const listarNotas = async (_req: Request, res: Response) => {
  const notas = await service.listar();
  return res.json(notas);
};

export const buscarNotaPorId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const notaId = +req.params.notaId;
    if (isNaN(notaId)) {
      return res.status(400).json({ error: 'ID da nota inválido' });
    }

    const nota = await service.buscarPorId(notaId);
    return res.json(nota);
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 500;
    return res.status(status).json({ error: err.message });
  }
};

export const cadastrarNota = async (req: Request, res: Response) => {
  try {
    const nova = await service.criar(req.body);
    return res.status(201).json({ message: 'Nota cadastrada', nota: nova });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const atualizarNota = async (req: Request, res: Response) => {
  try {
    const notaId = +req.params.notaId;
    if (isNaN(notaId)) {
      return res.status(400).json({ error: 'ID da nota inválido' });
    }

    const updated = await service.atualizar(notaId, req.body);
    return res.json({ message: 'Nota atualizada', nota: updated });
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const deletarNota = async (req: Request, res: Response) => {
  try {
    const notaId = +req.params.notaId;
    if (isNaN(notaId)) {
      return res.status(400).json({ error: 'ID da nota inválido' });
    }

    await service.deletar(notaId);
    return res.json({ message: 'Nota deletada' });
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const mediaPorAlunoDisciplina = async (req: Request, res: Response) => {
  try {
    const alunoId = +req.params.alunoId;
    const disciplinaId = +req.params.disciplinaId;

    if (isNaN(alunoId) || isNaN(disciplinaId)) {
      return res.status(400).json({ error: 'IDs inválidos' });
    }

    const media = await service.calcularMedia(alunoId, disciplinaId);
    return res.json({ alunoId, disciplinaId, media });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};
