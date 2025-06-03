import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';
import { NotaAluno } from '../models/nota.model';
import { PresencaAluno } from '../models/presenca.model';
import { SituacaoAlunoDisciplina } from '../models/situacao.model';
import { AlunoReprovado } from '../models/reprovado.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }

  getProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}/professores`);
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/alunos`);
  }

  getAlunoNotas(alunoId: string | number): Observable<NotaAluno[]> {
    return this.http.get<NotaAluno[]>(`${this.apiUrl}/alunos/${alunoId}/notas`);
  }

  getAlunoPresencas(alunoId: string | number): Observable<PresencaAluno[]> {
    return this.http.get<PresencaAluno[]>(`${this.apiUrl}/alunos/${alunoId}/presencas`);
  }

  getDisciplinaReprovados(disciplinaId: string | number): Observable<SituacaoAlunoDisciplina[]> {
    return this.http.get<SituacaoAlunoDisciplina[]>(`${this.apiUrl}/disciplinas/${disciplinaId}/reprovados`);
  }

  getAlunoSituacao(alunoId: string | number): Observable<AlunoReprovado[]> {
    return this.http.get<AlunoReprovado[]>(`${this.apiUrl}/alunos/${alunoId}/situacao`);
  }
}
