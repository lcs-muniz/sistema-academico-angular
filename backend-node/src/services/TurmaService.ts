import { Turmas } from '../models/Turmas';

export class TurmaService {
  async listar() {
    return Turmas.findAll();
  }

  async buscarTurmaPorId(id: number) {
    const turma = await Turmas.findByPk(id);
    if (!turma) throw new Error('Turma não encontrada');
    return turma;
  }

  async criar(data: { nome: string; periodo?: string; id_curso?: number }) {
    return Turmas.create(data);
  }

  async atualizar(id: number, dados: Partial<{ nome: string; periodo?: string; id_curso?: number }>) {
    const turma = await Turmas.findByPk(id);
    if (!turma) throw new Error('Turma não encontrada');
    await turma.update(dados);
    return turma;
  }

  async deletar(id: number) {
    const turma = await Turmas.findByPk(id);
    if (!turma) throw new Error('Turma não encontrada');
    await turma.destroy();
  }
}