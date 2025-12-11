import { Aluno } from '../../models/Aluno';
import { AlunoDisciplina } from '../../models/AlunoDisciplina';
import { IAlunoRepository, AlunoCreateDTO, AlunoUpdateDTO } from '../interfaces/IAlunoRepository';

export class SequelizeAlunoRepository implements IAlunoRepository {
  async listar() {
    return Aluno.findAll();
  }

  async buscarPorId(id: number) {
    return Aluno.findByPk(id);
  }

  async criar(dados: AlunoCreateDTO) {
    return Aluno.create(dados as any);
  }

  async atualizar(id: number, dados: AlunoUpdateDTO) {
    const aluno = await Aluno.findByPk(id);
    if (!aluno) return null;
    await aluno.update(dados);
    return aluno;
  }

  async deletar(id: number) {
    const aluno = await Aluno.findByPk(id);
    if (!aluno) return;
    await aluno.destroy();
  }

  async possuiVinculoDisciplina(id: number): Promise<boolean> {
    const vinculo = await AlunoDisciplina.findOne({ where: { alunoId: id } });
    return !!vinculo;
  }
}
