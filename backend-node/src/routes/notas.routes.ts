import { Router } from 'express';

import * as NotasController from '../controllers/NotasController';

const router = Router();

router.post('/', NotasController.cadastrarNota);
router.get('/', NotasController.listarNotas);

router.get('/:notaId', NotasController.buscarNotaPorId);
router.put('/:notaId', NotasController.atualizarNota);
router.delete('/:notaId', NotasController.deletarNota);

router.get('/aluno/:alunoId/disciplina/:disciplinaId/media', NotasController.mediaPorAlunoDisciplina);

export default router;
