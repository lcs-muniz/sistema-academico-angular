export interface UsuarioBase {
  id: number;
  nome: string;
  senha: string;
}

export interface IAuthRepository {
  buscarAlunoPorMatricula(matricula: string): Promise<UsuarioBase | null>;
  buscarProfessorPorSiape(siape: string): Promise<UsuarioBase | null>;
}
