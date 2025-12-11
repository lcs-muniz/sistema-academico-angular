export interface ProfessorCreateDTO {
  nome: string;
  email: string;
  siape: string;
  senha: string;
}

export interface ProfessorUpdateDTO {
  nome?: string;
  email?: string;
  siape?: string;
  senha?: string;
}

export interface IProfessorRepository {
  listar(): Promise<any[]>;
  buscarPorId(id: number): Promise<any | null>;
  criar(dados: ProfessorCreateDTO): Promise<any>;
  atualizar(id: number, dados: ProfessorUpdateDTO): Promise<any>;
  deletar(id: number): Promise<void>;
}
