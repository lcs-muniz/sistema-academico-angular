import { Router } from 'express';

import * as CursoController from '../controllers/CursoController';

const router = Router();

router.post('/', CursoController.cadastrarCurso);
router.get('/', CursoController.listarCursos);
router.get('/:cursoId', CursoController.buscarCursoPorId);
router.put('/:cursoId', CursoController.atualizarCurso);
router.delete('/:cursoId', CursoController.deletarCurso);

export default router;
