import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponse {
  token: string;
  mensagem: string;
}

export interface UserPayload {
    id: number;
    nome: string;
    tipo: 'professor' | 'aluno';
    iat?: number;
    exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';
  private tokenKey = 'jwtToken';

  private currentUserSubject: BehaviorSubject<UserPayload | null>;
  public currentUser: Observable<UserPayload | null>;


  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    let initialUser = null;
    if (token) {
        initialUser = this.decodeToken(token);
    }
    this.currentUserSubject = new BehaviorSubject<UserPayload | null>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserPayload | null {
    return this.currentUserSubject.value;
  }

  login(credentials: { identificador: string; senha?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
            const userPayload = this.decodeToken(response.token);
            this.currentUserSubject.next(userPayload);
          }
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
        const payload = this.decodeToken(token);
        if (payload && payload.exp) {
            return (payload.exp * 1000) > Date.now();
        }
        return !!payload;
    }
    return false;
  }

  decodeToken(token: string): UserPayload | null {
    try {
      return JSON.parse(atob(token.split('.')[1])) as UserPayload;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  getUserType(): 'professor' | 'aluno' | null {
    const user = this.currentUserValue;
    return user ? user.tipo : null;
  }

  getUserName(): string | null {
    const user = this.currentUserValue;
    return user ? user.nome : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
