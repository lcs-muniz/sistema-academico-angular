import { Router } from 'express';

import {
  listarPresencas,
  cadastrarPresenca,
  atualizarPresenca,
  deletarPresenca,
} from '../controllers/PresencaController';

const router = Router();

router.get('/', listarPresencas);
router.post('/', cadastrarPresenca);
router.put('/:presencaId', atualizarPresenca);
router.delete('/:presencaId', deletarPresenca);

export default router;
