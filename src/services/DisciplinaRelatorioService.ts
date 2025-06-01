import { Aluno } from '../models/Aluno';
import { Disciplina } from '../models/Disciplina';
import { NotasService } from './NotasService';
import { PresencaService } from './PresencaService';

export class DisciplinaRelatorioService {
  private notasService = new NotasService();
  private presencaService = new PresencaService();

  async listarReprovadosPorDisciplina(disciplinaId: number) {
    const disciplina = await Disciplina.findByPk(disciplinaId, {
      include: { model: Aluno }
    });
    if (!disciplina) throw new Error('Disciplina não encontrada');

    const alunos: Aluno[] = (disciplina as any).Alunos;
    const reprovados = [];

    for (const aluno of alunos) {
      const media = await this.notasService.calcularMedia(aluno.id, disciplinaId);
      const percentual = await this.presencaService.calcularPercentual(aluno.id, disciplinaId);
      if (media < 7 || percentual < 75) {
        reprovados.push({
          alunoId: aluno.id,
          nomeAluno: aluno.nome,
          media,
          percentual
        });
      }
    }

    return reprovados;
  }
}
