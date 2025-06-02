import { Router } from 'express';

import { autenticarToken, somenteProfessores } from '../middlewares/auth.middleware';

import {
  atualizarAluno,
  buscarAlunoPorId,
  cadastrarAluno,
  deletarAluno,
  listarAlunos,
} from '../controllers/AlunoController';

const router = Router();

router.get('/', autenticarToken, somenteProfessores, listarAlunos);
router.post('/', cadastrarAluno);
router.get('/:alunoId', buscarAlunoPorId);
router.put('/:alunoId', atualizarAluno);
router.delete('/:alunoId', deletarAluno);

export default router;
