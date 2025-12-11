export interface AlunoCreateDTO {
  nome: string;
  email: string;
  matricula: string;
  senha: string;
}

export interface AlunoUpdateDTO {
  nome?: string;
  email?: string;
  matricula?: string;
  senha?: string;
}

export interface IAlunoRepository {
  listar(): Promise<any[]>;
  buscarPorId(id: number): Promise<any | null>;
  criar(dados: AlunoCreateDTO): Promise<any>;
  atualizar(id: number, dados: AlunoUpdateDTO): Promise<any>;
  deletar(id: number): Promise<void>;
  possuiVinculoDisciplina(id: number): Promise<boolean>;
}
