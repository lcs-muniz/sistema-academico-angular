import { Router } from 'express';

import * as DisciplinaController from '../controllers/DisciplinaController';

const router = Router();

router.post('/', DisciplinaController.cadastrarDisciplina);
router.get('/', DisciplinaController.listarDisciplinas);
router.get('/:disciplinaId', DisciplinaController.buscarDisciplinaPorId);
router.put('/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.delete('/:disciplinaId', DisciplinaController.deletarDisciplina);

export default router;
