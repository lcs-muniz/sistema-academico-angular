import { Router } from 'express';

import { 
    relatorioNotasDoAluno, 
    relatorioPresencasDoAluno,
    situacaoDoAluno 
} from '../controllers/AlunoRelatorioController';

import { autenticarToken, somenteProfessores } from '../middlewares/auth.middleware';

console.log('▶️ carregando alunoRelatorio.routes.ts');

const router = Router();

router.use(autenticarToken, somenteProfessores);

router.get('/:alunoId/notas', relatorioNotasDoAluno);
router.get('/:alunoId/presencas', relatorioPresencasDoAluno);
router.get('/:alunoId/situacao', situacaoDoAluno);


export default router;
