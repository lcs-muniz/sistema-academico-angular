import { Router } from 'express';

import {
  listarPresencas,
  cadastrarPresenca,
  atualizarPresenca,
  deletarPresenca,
  buscarPresencaPorId
} from '../controllers/PresencaController';

const router = Router();

router.get('/', listarPresencas);
router.get('/:presencaId', buscarPresencaPorId);
router.post('/', cadastrarPresenca);
router.put('/:presencaId', atualizarPresenca);
router.delete('/:presencaId', deletarPresenca);

export default router;
