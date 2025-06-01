import { Router } from 'express';

import {
  atualizarAluno,
  buscarAlunoPorId,
  cadastrarAluno,
  deletarAluno,
  listarAlunos,
} from '../controllers/AlunoController';

const router = Router();

router.get('/', listarAlunos);
router.post('/', cadastrarAluno);
router.get('/:alunoId', buscarAlunoPorId);
router.put('/:alunoId', atualizarAluno);
router.delete('/:alunoId', deletarAluno);

export default router;
