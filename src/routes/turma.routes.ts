import { Router } from 'express';

import * as TurmaController from '../controllers/TurmaController';

const router = Router();

router.post('/', TurmaController.cadastrarTurma);
router.get('/', TurmaController.listarTurmas);
router.get('/:turmaId', TurmaController.buscarTurmaPorId);
router.put('/:turmaId', TurmaController.atualizarTurma);
router.delete('/:turmaId', TurmaController.deletarTurma);

export default router;
