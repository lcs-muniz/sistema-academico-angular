import { Notas } from '../models/Notas';

export class NotasService {
  async listar() {
    return Notas.findAll();
  }

  async buscarPorId(id: number) {
    const nota = await Notas.findByPk(id);
    if (!nota) throw new Error('Nota não encontrada');
    return nota;
  }

  async criar(data: {
    alunoId: number;
    disciplinaId: number;
    nota: number;
    data_avaliacao?: string;
  }) {
    return Notas.create(data);
  }

  async atualizar(id: number, dados: Partial<{
    alunoId: number;
    disciplinaId: number;
    nota: number;
    data_avaliacao: string;
  }>) {
    const nota = await this.buscarPorId(id);
    await nota.update(dados);
    return nota;
  }

  async deletar(id: number) {
    const nota = await this.buscarPorId(id);
    await nota.destroy();
  }

  async calcularMedia(alunoId: number, disciplinaId: number): Promise<number> {
    const registros = await Notas.findAll({ where: { alunoId, disciplinaId } });
    if (!registros.length) throw new Error('Sem notas para cálculo');
    const soma = registros.reduce((acc, r) => acc + parseFloat(String(r.nota)), 0);
    return Number((soma / registros.length).toFixed(2));
  }
}
