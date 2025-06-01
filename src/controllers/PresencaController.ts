import { Request, Response } from 'express';

import { PresencaService } from '../services/PresencaService';

const service = new PresencaService();

export const listarPresencas = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const presencas = await service.listar();
  return res.json(presencas);
};

export const cadastrarPresenca = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const nova = await service.criar(req.body);
    return res
      .status(201)
      .json({ message: 'Presença cadastrada com sucesso', presenca: nova });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const atualizarPresenca = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const presencaId = +req.params.presencaId;
    const atualizada = await service.atualizar(presencaId, req.body);
    return res.json({
      message: 'Presença atualizada com sucesso',
      presenca: atualizada,
    });
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const deletarPresenca = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const presencaId = +req.params.presencaId;
    await service.deletar(presencaId);
    return res.json({ message: 'Presença deletada com sucesso' });
  } catch (err: any) {
    const status = err.message.includes('não encontrada') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};
