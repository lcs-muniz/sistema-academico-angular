import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, UserPayload } from '../auth/auth.service';
import { DataService } from '../core/data.service';
import { Aluno } from '../models/aluno.model';
import { Professor } from '../models/professor.model';

import { NotaAluno } from '../models/nota.model';
import { PresencaAluno } from '../models/presenca.model';
import { SituacaoAlunoDisciplina } from '../models/situacao.model';
import { AlunoReprovado } from '../models/reprovado.model';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  welcomeMessage: string = 'Carregando...';
  currentUser: UserPayload | null = null;

  selectedAlunoId: string = '';
  selectedDisciplinaId: string = '';

  apiResult: Aluno[] | Professor[] | NotaAluno[] | PresencaAluno[] | SituacaoAlunoDisciplina[] | AlunoReprovado[] | any = null;
  tipoResultado: 'alunos' | 'professores' | 'notas' | 'presencas' | 'situacaoAluno' | 'reprovadosDisciplina' | 'outro' | null = null;

  apiError: string = '';
  isLoading: boolean = false;

  get Array() {
    return Array;
  }

  get Object() {
    return Object;
  }

  isObjectAndNotEmpty(item: any): boolean {
    return typeof item === 'object' && item !== null && !Array.isArray(item) && Object.keys(item).length > 0;
  }

  isObjectAndEmpty(item: any): boolean {
    return typeof item === 'object' && item !== null && !Array.isArray(item) && Object.keys(item).length === 0;
  }

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      this.welcomeMessage = `Bem-vindo, ${this.currentUser.tipo === 'professor' ? 'Professor(a)' : 'Aluno(a)'} ${this.currentUser.nome}!`;
    } else {
      this.authService.logout();
    }
  }

  isProfessor(): boolean {
    return this.currentUser?.tipo === 'professor';
  }

  logout(): void {
    this.authService.logout();
  }

  private handleApiResponse(observable: Observable<any>,tipoEsperado: 'alunos' | 'professores' | 'notas' | 'presencas' | 'situacaoAluno' | 'reprovadosDisciplina' | 'outro' = 'outro'): void {
    this.apiResult = null;
    this.apiError = '';
    this.isLoading = true;

    observable.subscribe({
      next: (data: any) => {
        this.apiResult = data;
        this.isLoading = false;

        if (Array.isArray(data)) {
          this.tipoResultado = tipoEsperado;
        } else {
          this.tipoResultado = 'outro';
          if (tipoEsperado !== 'outro') {
            console.warn(`Esperava um array para '${tipoEsperado}', mas recebeu um objeto. Exibindo como JSON bruto.`);
          }
        }
      },
      error: (err: any) => {
        this.apiError = err.error?.error || 'Ocorreu um erro ao buscar os dados.';
        if (err.status === 403) {
          this.apiError = 'Acesso negado para esta operação.';
        }
        this.isLoading = false;
        this.tipoResultado = null;
        console.error('API Error:', err);
      }
    });
  }

  verProfessores(): void {
    this.handleApiResponse(this.dataService.getProfessores(), 'professores');
  }

  verAlunos(): void {
    if (!this.isProfessor()) {
      alert('Acesso negado.');
      this.apiError = 'Acesso negado.';
      return;
    }
    this.handleApiResponse(this.dataService.getAlunos(), 'alunos');
  }

  getNotasAluno(): void {
    if (!this.isProfessor()) { alert('Acesso negado.'); this.apiError = 'Acesso negado.'; return; }
    if (!this.selectedAlunoId) {
      this.apiError = 'ID do Aluno é necessário.';
      this.apiResult = null;
      return;
    }
    this.handleApiResponse(this.dataService.getAlunoNotas(this.selectedAlunoId), 'notas');
  }

  getPresencasAluno(): void {
    if (!this.isProfessor()) { alert('Acesso negado.'); this.apiError = 'Acesso negado.'; return; }
    if (!this.selectedAlunoId) {
      this.apiError = 'ID do Aluno é necessário.';
      this.apiResult = null;
      return;
    }
    this.handleApiResponse(this.dataService.getAlunoPresencas(this.selectedAlunoId), 'presencas');
  }

  getSituacaoAluno(): void {
    if (!this.isProfessor()) { alert('Acesso negado.'); this.apiError = 'Acesso negado.'; return; }
    if (!this.selectedAlunoId) {
      this.apiError = 'ID do Aluno é necessário.';
      this.apiResult = null;
      return;
    }
    this.handleApiResponse(this.dataService.getAlunoSituacao(this.selectedAlunoId), 'situacaoAluno');
  }

  getReprovadosDisciplina(): void {
    if (!this.isProfessor()) { alert('Acesso negado.'); this.apiError = 'Acesso negado.'; return; }
    if (!this.selectedDisciplinaId) {
      this.apiError = 'ID da Disciplina é necessário.';
      this.apiResult = null;
      return;
    }
    this.handleApiResponse(this.dataService.getDisciplinaReprovados(this.selectedDisciplinaId), 'reprovadosDisciplina');
  }
}
