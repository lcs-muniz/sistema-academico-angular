import { AlunoDisciplina } from '../models/AlunoDisciplina';
import { Disciplina } from '../models/Disciplina';

export class DisciplinaService {
  async listar() {
    return Disciplina.findAll();
  }

  async buscarDisciplinaPorId(disciplinaId: number) {
    const disciplina = await Disciplina.findByPk(disciplinaId);
    if (!disciplina) throw new Error('Disciplina não encontrado');
    return disciplina;
  }

  async criar(data: { nome: string; id_professor?: number }) {
    return Disciplina.create(data);
  }

  async atualizar(id: number, dados: Partial<{ nome: string; id_professor?: number }>) {
    const disc = await Disciplina.findByPk(id);
    if (!disc) throw new Error('Disciplina não encontrada');
    await disc.update(dados);
    return disc;
  }

  async deletar(id: number) {
    const vinculo = await AlunoDisciplina.findOne({ where: { disciplinaId: id } });
    if (vinculo) throw new Error('Disciplina vinculada a aluno');
    const disc = await Disciplina.findByPk(id);
    if (!disc) throw new Error('Disciplina não encontrada');
    await disc.destroy();
  }
}