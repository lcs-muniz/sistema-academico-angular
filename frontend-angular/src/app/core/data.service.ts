import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }

  getProfessores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/professores`);
  }

  getAlunos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alunos`);
  }

  getAlunoNotas(alunoId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alunos/${alunoId}/notas`);
  }

  getAlunoPresencas(alunoId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alunos/${alunoId}/presencas`);
  }

  getDisciplinaReprovados(disciplinaId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/disciplinas/${disciplinaId}/reprovados`);
  }

  getAlunoSituacao(alunoId: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alunos/${alunoId}/situacao`);
  }
}
