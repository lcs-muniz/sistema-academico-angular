import { Professores } from '../models/Professores';

export class ProfessorService {
  async listar() {
    return Professores.findAll();
  }

  async buscarPorId(professorId: number) {
    const professor = await Professores.findByPk(professorId);
    if (!professor) throw new Error('Professor não encontrado');
    return professor;
  }

  async criar(data: { nome: string; email: string; matricula: string }) {
    return Professores.create(data);
  }

  async atualizar(
    professorId: number,
    dados: Partial<{ nome: string; email: string; matricula: string }>
  ) {
    const professor = await this.buscarPorId(professorId);
    await professor.update(dados);
    return professor;
  }

  async deletar(professorId: number) {
    const professor = await this.buscarPorId(professorId);
    await professor.destroy();
  }
}