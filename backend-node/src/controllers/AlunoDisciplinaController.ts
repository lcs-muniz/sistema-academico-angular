import { Request, Response } from 'express';

import { AlunoDisciplinaService } from '../services/AlunoDisciplinaService';
import { SequelizeAlunoDisciplinaRepository } from '../repositories/implementations/SequelizeAlunoDisciplinaRepository';

const service = new AlunoDisciplinaService(new SequelizeAlunoDisciplinaRepository());

export const listarDisciplinasDoAluno = async ( req: Request, res: Response ): Promise<Response> => {
  try {
    const alunoId = +req.params.alunoId;
    const disciplinas = await service.listarDisciplinasDoAluno(alunoId);
    return res.json(disciplinas);
  } catch (err: any) {
    return res.status(err.message.includes('não encontrado') ? 404 : 400).json({
      error: err.message
    });
  }
};

export const listarAlunosDaDisciplina = async ( req: Request, res: Response ): Promise<Response> => {
  try {
    const disciplinaId = +req.params.disciplinaId;
    const alunos = await service.listarAlunosDaDisciplina(disciplinaId);
    return res.json(alunos);
  } catch (err: any) {
    return res.status(err.message.includes('não encontrado') ? 404 : 400).json({
      error: err.message
    });
  }
};

export const vincularAlunoDisciplina = async ( req: Request, res: Response): Promise<Response> => {
  try {
    const { alunoId, disciplinaId } = req.body;
    await service.vincular(+alunoId, +disciplinaId);
    return res.json({
      message: 'Aluno vinculado à disciplina com sucesso.'
    });
  } catch (err: any) {
    const status =
      err.message.includes('não encontrado') ||
      err.message.includes('Disciplina') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};

export const desvincularAlunoDisciplina = async (req: Request, res: Response): Promise<Response> => {
  try {
    const alunoId = +req.params.alunoId;
    const disciplinaId = +req.params.disciplinaId;
    await service.desvincular(alunoId, disciplinaId);
    return res.json({ message: 'Vínculo removido com sucesso.' });
  } catch (err: any) {
    const status = err.message.includes('não encontrado') ? 404 : 400;
    return res.status(status).json({ error: err.message });
  }
};
