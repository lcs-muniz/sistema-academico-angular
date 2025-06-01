import { Request, Response } from 'express';

import { AlunoRelatorioService } from '../services/AlunoRelatorioService';

const service = new AlunoRelatorioService();

export const relatorioNotasDoAluno = async (req: Request, res: Response) => {
  try {
    const alunoId = +req.params.alunoId;
    const relatorio = await service.relatorioNotasPorAluno(alunoId);
    return res.json(relatorio);
  } catch (err: any) {
    const status = err.message.includes('não encontrado') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const relatorioPresencasDoAluno = async (req: Request, res: Response) => {
  try {
    const alunoId = +req.params.alunoId;
    const relatorio = await service.relatorioPresencasPorAluno(alunoId);
    return res.json(relatorio);
  } catch (err: any) {
    const status = err.message.includes('não encontrado') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const situacaoDoAluno = async (req: Request, res: Response) => {
  try {
    const alunoId = +req.params.alunoId;
    const situacao = await service.situacaoDoAluno(alunoId);
    return res.json(situacao);
  } catch (err: any) {
    const status = err.message.includes('não encontrado') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};


