import { Router } from 'express';

import {
  desvincularAlunoDisciplina,
  listarDisciplinasDoAluno,
  vincularAlunoDisciplina,
} from '../controllers/AlunoDisciplinaController';

console.log('▶️ carregando alunoDisciplina.routes.ts');

const router = Router();

router.get('/:alunoId', listarDisciplinasDoAluno);
router.post('/', vincularAlunoDisciplina);
router.delete('/:alunoId/:disciplinaId', desvincularAlunoDisciplina);

export default router;
