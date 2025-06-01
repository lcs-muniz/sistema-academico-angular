import { Aluno } from '../models/Aluno';
import { Disciplina } from '../models/Disciplina';
import { NotasService } from './NotasService';
import { PresencaService } from './PresencaService';

export class AlunoRelatorioService {
  private notasService = new NotasService();
  private presencaService = new PresencaService();

  async relatorioNotasPorAluno(alunoId: number) {
    const aluno = await Aluno.findByPk(alunoId, {
      include: { model: Disciplina }
    });
    if (!aluno) throw new Error('Aluno não encontrado');

    const disciplinas: Disciplina[] = (aluno as any).Disciplinas;
    const resultado = await Promise.all(
      disciplinas.map(async (disc) => {
        const media = await this.notasService.calcularMedia(alunoId, disc.id);
        return {
          disciplinaId: disc.id,
          nomeDisciplina: disc.nome,
          media
        };
      })
    );
    return resultado;
  }

  async relatorioPresencasPorAluno(alunoId: number) {
    const aluno = await Aluno.findByPk(alunoId, {
      include: { model: Disciplina }
    });
    if (!aluno) throw new Error('Aluno não encontrado');
  
    const disciplinas: Disciplina[] = (aluno as any).Disciplinas;
    const resultado = await Promise.all(
      disciplinas.map(async (disc) => {
        const percentual = await this.presencaService.calcularPercentual(alunoId, disc.id);
        return {
          disciplinaId: disc.id,
          nomeDisciplina: disc.nome,
          percentual
        };
      })
    );
    return resultado;
  }

  async situacaoDoAluno(alunoId: number) {
    const notasPorDisc = await this.relatorioNotasPorAluno(alunoId);
    const presencasPorDisc = await this.relatorioPresencasPorAluno(alunoId);
  
    return notasPorDisc.map((n) => {
      const p = presencasPorDisc.find((x) => x.disciplinaId === n.disciplinaId)!;
      return {
        disciplinaId: n.disciplinaId,
        nomeDisciplina: n.nomeDisciplina,
        media: n.media,
        percentual: p.percentual,
        aprovado: n.media >= 7 && p.percentual >= 75
      };
    });
  }
  
}
