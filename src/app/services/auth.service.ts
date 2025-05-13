import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  
  // Usuários mockados para desenvolvimento
  private mockUsers = [
    { id: 1, nome: 'Admin', email: 'admin@exemplo.com', password: 'admin123', role: 'admin' },
    { id: 2, nome: 'Usuário', email: 'usuario@exemplo.com', password: 'usuario123', role: 'user' }
  ];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verificar se há um usuário logado no localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar o código mockado
    // return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
    //   map(response => {
    //     const user = response.user;
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     localStorage.setItem('token', response.token);
    //     this.currentUserSubject.next(user);
    //     return user;
    //   }),
    //   catchError(error => {
    //     return throwError(() => new Error('Credenciais inválidas'));
    //   })
    // );
    
    // Login mockado para desenvolvimento
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', 'mock-jwt-token');
      this.currentUserSubject.next(userWithoutPassword as User);
      return of(userWithoutPassword as User);
    } else {
      return throwError(() => new Error('Credenciais inválidas'));
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === 'admin' : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}