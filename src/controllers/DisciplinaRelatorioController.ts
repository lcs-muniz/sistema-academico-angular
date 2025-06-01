import { Request, Response } from 'express';

import { DisciplinaRelatorioService } from '../services/DisciplinaRelatorioService';

const service = new DisciplinaRelatorioService();

export const listarReprovados = async (req: Request, res: Response) => {
  try {
    const disciplinaId = +req.params.disciplinaId;
    const reprovados = await service.listarReprovadosPorDisciplina(disciplinaId);
    return res.json(reprovados);
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};
