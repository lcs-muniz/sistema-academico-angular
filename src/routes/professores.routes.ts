import { Router } from 'express';

import * as ProfessoresControllers from '../controllers/ProfessorController';

import { autenticarToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', ProfessoresControllers.cadastrarProfessor);
router.get('/', autenticarToken, ProfessoresControllers.listarProfessores);
router.get('/:professorId', ProfessoresControllers.buscarProfessorPorId);
router.put('/:professorId', ProfessoresControllers.atualizarProfessor);
router.delete('/:professorId', ProfessoresControllers.deletarProfessor);

export default router;
