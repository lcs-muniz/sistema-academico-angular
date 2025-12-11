import { Professores } from '../../models/Professores';
import { IProfessorRepository, ProfessorCreateDTO, ProfessorUpdateDTO } from '../interfaces/IProfessorRepository';

export class SequelizeProfessorRepository implements IProfessorRepository {
  async listar() {
    return Professores.findAll();
  }

  async buscarPorId(id: number) {
    return Professores.findByPk(id);
  }

  async criar(dados: ProfessorCreateDTO) {
    return Professores.create(dados as any);
  }

  async atualizar(id: number, dados: ProfessorUpdateDTO) {
    const professor = await Professores.findByPk(id);
    if (!professor) return null;
    await professor.update(dados);
    return professor;
  }

  async deletar(id: number) {
    const professor = await Professores.findByPk(id);
    if (!professor) return;
    await professor.destroy();
  }
}
