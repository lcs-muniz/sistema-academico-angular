import { Cursos } from '../models/Cursos';

export class CursoService {
  async listar() {
    return Cursos.findAll();
  }

  async buscarCursoPorId(cursoId: number) {
    const curso = await Cursos.findByPk(cursoId);
    if (!curso) throw new Error('Curso não encontrado');
    return curso;
  }

  async criar({ nome, descricao }: { nome: string; descricao: string }) {
    return Cursos.create({ nome, descricao });
  }

  async atualizar(id: number, dados: Partial<{ nome: string; descircao : string }>) {
    const curso = await Cursos.findByPk(id);
    if (!curso) throw new Error ('Curso não encontrado');
    await curso.update(dados);
    return curso;
  }

  async deletar(id: number) {
    const curso = await Cursos.findByPk(id);
    if (!curso) throw new Error('Curso não encontrado');
    await curso.destroy();
  }
}