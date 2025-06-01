import { Router } from 'express';

import { listarReprovados } from '../controllers/DisciplinaRelatorioController';

console.log('▶️ carregando disciplinaRelatorio.routes.ts');

const router = Router();
router.get('/:disciplinaId/reprovados', listarReprovados);

export default router;
