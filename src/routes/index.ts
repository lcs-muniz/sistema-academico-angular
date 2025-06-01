import { Router } from 'express';

import alunoRoutes from './aluno.routes';
import alunoDisciplinaRoutes from './alunoDisciplina.routes';
import alunoRelatorioRoutes from './alunoRelatorio.routes';
import cursoRoutes from './curso.routes';
import disciplinaRoutes from './disciplina.routes';
import disciplinaRelatorioRoutes from './disciplinaRelatorio.routes';
import notaRoutes from './notas.routes';
import presencaRoutes from './presencas.routes';
import professorRoutes from './professores.routes';
import turmaRoutes from './turma.routes';

const router = Router();

router.use('/cursos', cursoRoutes);
router.use('/alunos', alunoRoutes);
router.use('/alunos', alunoRelatorioRoutes);
router.use('/disciplinas', disciplinaRoutes);
router.use('/disciplinas', disciplinaRelatorioRoutes);
router.use('/turmas', turmaRoutes);
router.use('/professores', professorRoutes);
router.use('/notas', notaRoutes);
router.use('/presencas', presencaRoutes);
router.use('/aluno-disciplina', alunoDisciplinaRoutes);

export default router;
