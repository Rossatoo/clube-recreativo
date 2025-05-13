import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reserva } from '../models/reserva.model';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.apiUrl}/reservas`;
  
  // Dados mockados para desenvolvimento
  private reservasMock: Reserva[] = [
    {
      id: 1,
      espacoId: 1,
      espacoNome: 'Salão de Festas Principal',
      usuarioId: 2,
      usuarioNome: 'Usuário',
      dataInicio: '2023-06-15',
      dataFim: '2023-06-15',
      valorTotal: 1200.00,
      status: 'confirmada',
      observacoes: 'Festa de aniversário',
      criadoEm: '2023-05-20T10:30:00'
    },
    {
      id: 2,
      espacoId: 2,
      espacoNome: 'Churrasqueira Coberta',
      usuarioId: 2,
      usuarioNome: 'Usuário',
      dataInicio: '2023-07-10',
      dataFim: '2023-07-10',
      valorTotal: 500.00,
      status: 'pendente',
      observacoes: 'Churrasco familiar',
      criadoEm: '2023-06-01T14:15:00'
    }
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getReservas(): Observable<Reserva[]> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar a linha com dados mockados
    // return this.http.get<Reserva[]>(this.apiUrl).pipe(
    //   catchError(this.handleError<Reserva[]>('getReservas', []))
    // );
    
    // Usando dados mockados para desenvolvimento
    return of(this.reservasMock);
  }

  getMinhasReservas(): Observable<Reserva[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return of([]);
    
    // Em ambiente de produção, descomentar a linha abaixo e comentar a linha com dados mockados
    // return this.http.get<Reserva[]>(`${this.apiUrl}/minhas`).pipe(
    //   catchError(this.handleError<Reserva[]>('getMinhasReservas', []))
    // );
    
    // Usando dados mockados para desenvolvimento
    return of(this.reservasMock.filter(r => r.usuarioId === currentUser.id));
  }

  getReserva(id: number): Observable<Reserva> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar a linha com dados mockados
    // return this.http.get<Reserva>(`${this.apiUrl}/${id}`).pipe(
    //   catchError(this.handleError<Reserva>(`getReserva id=${id}`))
    // );
    
    // Usando dados mockados para desenvolvimento
    return of(this.reservasMock.find(reserva => reserva.id === id)!);
  }

  criarReserva(reserva: Reserva): Observable<Reserva> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar o código mockado
    // return this.http.post<Reserva>(this.apiUrl, reserva).pipe(
    //   catchError(this.handleError<Reserva>('criarReserva'))
    // );
    
    // Simulando criação de reserva
    const novaReserva = {
      ...reserva,
      id: this.reservasMock.length + 1,
      status: 'pendente' as const,
      criadoEm: new Date().toISOString()
    };
    this.reservasMock.push(novaReserva);
    return of(novaReserva);
  }

  atualizarReserva(id: number, reserva: Partial<Reserva>): Observable<Reserva> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar o código mockado
    // return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva).pipe(
    //   catchError(this.handleError<Reserva>('atualizarReserva'))
    // );
    
    // Simulando atualização de reserva
    const index = this.reservasMock.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservasMock[index] = { ...this.reservasMock[index], ...reserva };
      return of(this.reservasMock[index]);
    }
    return of({} as Reserva);
  }

  cancelarReserva(id: number): Observable<Reserva> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar o código mockado
    // return this.http.patch<Reserva>(`${this.apiUrl}/${id}/cancelar`, {}).pipe(
    //   catchError(this.handleError<Reserva>('cancelarReserva'))
    // );
    
    // Simulando cancelamento de reserva
    return this.atualizarReserva(id, { status: 'cancelada' });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}