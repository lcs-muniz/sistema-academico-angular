import { Router } from 'express';

import { listarReprovados } from '../controllers/DisciplinaRelatorioController';

console.log('▶️ carregando disciplinaRelatorio.routes.ts');

import { autenticarToken, somenteProfessores } from '../middlewares/auth.middleware';

const router = Router();

router.use(autenticarToken, somenteProfessores);

router.get('/:disciplinaId/reprovados', listarReprovados);

export default router;
