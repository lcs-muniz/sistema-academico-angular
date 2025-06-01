import { Request, Response } from 'express';

import { CursoService } from '../services/CursoService';

const cursoService = new CursoService();

export const listarCursos = async (_req: Request, res: Response) => {
    const cursos = await cursoService.listar();
    return res.json(cursos);
};

export const buscarCursoPorId = async (req: Request, res: Response) : Promise<Response> => {
    try {
      const curso = await cursoService.buscarCursoPorId(+req.params.cursoId);
      return res.json(curso);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

export const cadastrarCurso = async (req: Request, res: Response) => {
    try {
        const novo = await cursoService.criar(req.body);
        return res.status(201).json({message: 'Curso cadastrado com sucesso', curso: novo})
    } catch (err : any) {
        return res.status(400).json({error: err.message})        
    }
};

export const atualizarCurso = async (req: Request, res: Response ) => {
    try {
        const updated = await cursoService. atualizar (+req.params.cursoId, req.body);
        return res.json({message: 'Curso atualizado com sucesso.', curso: updated});
    } catch (err: any) {
        const status = err.message.includes('não encontrado') ? 404 : 400;
        return res.status(status).json ({ error: err.message });
    }
};

export const deletarCurso = async (req: Request, res: Response) => {
    try {
        await cursoService.deletar(+req.params.cursoId);
        return res.json({message : 'Curso deletado com sucesso'});
    } catch (err: any) {
        const status = err.message.includes('não encontrado') ? 404 : 400;
        return res.status(status).json({error: err.message});
    }
};