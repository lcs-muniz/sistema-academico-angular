import { Router } from 'express';

import {
  desvincularAlunoDisciplina,
  listarDisciplinasDoAluno,
  vincularAlunoDisciplina,
  listarAlunosDaDisciplina
} from '../controllers/AlunoDisciplinaController';

console.log('▶️ carregando alunoDisciplina.routes.ts');

const router = Router();

router.get('/:alunoId', listarDisciplinasDoAluno);
router.get('/disciplinas/:disciplinaId/alunos', listarAlunosDaDisciplina);
router.post('/', vincularAlunoDisciplina);
router.delete('/:alunoId/:disciplinaId', desvincularAlunoDisciplina);

export default router;
