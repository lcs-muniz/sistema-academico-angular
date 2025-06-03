export interface Aluno {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  id_turma?: number | null;
}
