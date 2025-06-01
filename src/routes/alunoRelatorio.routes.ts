import { Router } from 'express';

import { 
    relatorioNotasDoAluno, 
    relatorioPresencasDoAluno,
    situacaoDoAluno 
} from '../controllers/AlunoRelatorioController';

console.log('▶️ carregando alunoRelatorio.routes.ts');

const router = Router();

router.get('/:alunoId/notas', relatorioNotasDoAluno);
router.get('/:alunoId/presencas', relatorioPresencasDoAluno);
router.get('/:alunoId/situacao', situacaoDoAluno);


export default router;
