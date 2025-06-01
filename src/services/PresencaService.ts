import { Presencas } from '../models/Presencas';

export class PresencaService {
  async listar(): Promise<Presencas[]> {
    return Presencas.findAll();
  }

  async buscarPorId(presencaId: number): Promise<Presencas> {
    const presenca = await Presencas.findByPk(presencaId);
    if (!presenca) throw new Error('Presença não encontrada');
    return presenca;
  }

  async criar(data: {
    alunoId: number;
    disciplinaId: number;
    data: string;
    presente: boolean;
  }): Promise<Presencas> {
    return Presencas.create(data);
  }

  async atualizar(
    presencaId: number,
    dados: Partial<{
      alunoId: number;
      disciplinaId: number;
      data: string;
      presente: boolean;
    }>
  ): Promise<Presencas> {
    const presenca = await this.buscarPorId(presencaId);
    await presenca.update(dados);
    return presenca;
  }

  async deletar(presencaId: number): Promise<void> {
    const presenca = await this.buscarPorId(presencaId);
    await presenca.destroy();
  }

  async calcularPercentual(alunoId: number, disciplinaId: number): Promise<number> {
    const total = await Presencas.count({
      where: { alunoId, disciplinaId }
    });

    if (total === 0) {
      return 0;
    }

    const presentes = await Presencas.count({
      where: { alunoId, disciplinaId, presente: true }
    });

    const percentual = (presentes / total) * 100;
    return Number(percentual.toFixed(2));
  }
}
