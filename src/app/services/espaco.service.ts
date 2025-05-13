import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Espaco } from '../models/espaco.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspacoService {
  private apiUrl = `${environment.apiUrl}/espacos`;
  
  // Dados mockados para desenvolvimento
  private espacosMock: Espaco[] = [
    {
      id: 1,
      nome: 'Salão de Festas Principal',
      descricao: 'Amplo salão com capacidade para 150 pessoas, ideal para festas e eventos de grande porte. Inclui cozinha equipada, sistema de som e iluminação.',
      capacidade: 150,
      valorDiaria: 1200.00,
      imagemUrl: '/assets/images/salao-principal.jpg',
      recursos: ['Cozinha equipada', 'Sistema de som', 'Ar condicionado', 'Mesas e cadeiras', 'Estacionamento'],
      disponivel: true
    },
    {
      id: 2,
      nome: 'Churrasqueira Coberta',
      descricao: 'Espaço com churrasqueira profissional, mesas e cadeiras para 50 pessoas. Área coberta e ao ar livre.',
      capacidade: 50,
      valorDiaria: 500.00,
      imagemUrl: '/assets/images/churrasqueira.jpg',
      recursos: ['Churrasqueira', 'Pia', 'Freezer', 'Mesas e cadeiras', 'Banheiros'],
      disponivel: true
    },
    {
      id: 3,
      nome: 'Quadra Poliesportiva',
      descricao: 'Quadra coberta para prática de diversos esportes como futsal, basquete e vôlei.',
      capacidade: 30,
      valorDiaria: 300.00,
      imagemUrl: '/assets/images/quadra.jpg',
      recursos: ['Iluminação', 'Vestiários', 'Arquibancada', 'Equipamentos esportivos'],
      disponivel: true
    },
    {
      id: 4,
      nome: 'Sala de Reuniões',
      descricao: 'Sala equipada para reuniões empresariais ou pequenos eventos.',
      capacidade: 20,
      valorDiaria: 250.00,
      imagemUrl: '/assets/images/sala-reunioes.jpg',
      recursos: ['Projetor', 'Wi-Fi', 'Ar condicionado', 'Mesa de reunião', 'Cadeiras executivas'],
      disponivel: true
    }
  ];

  constructor(private http: HttpClient) {}

  getEspacos(): Observable<Espaco[]> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar a linha com dados mockados
    // return this.http.get<Espaco[]>(this.apiUrl).pipe(
    //   catchError(this.handleError<Espaco[]>('getEspacos', []))
    // );
    
    // Usando dados mockados para desenvolvimento
    return of(this.espacosMock);
  }

  getEspaco(id: number): Observable<Espaco> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar a linha com dados mockados
    // return this.http.get<Espaco>(`${this.apiUrl}/${id}`).pipe(
    //   catchError(this.handleError<Espaco>(`getEspaco id=${id}`))
    // );
    
    // Usando dados mockados para desenvolvimento
    return of(this.espacosMock.find(espaco => espaco.id === id)!);
  }

  verificarDisponibilidade(espacoId: number, dataInicio: string, dataFim: string): Observable<boolean> {
    // Em ambiente de produção, descomentar a linha abaixo e comentar a linha com dados mockados
    // return this.http.get<boolean>(`${this.apiUrl}/${espacoId}/disponibilidade?dataInicio=${dataInicio}&dataFim=${dataFim}`).pipe(
    //   catchError(this.handleError<boolean>('verificarDisponibilidade', false))
    // );
    
    // Simulando verificação de disponibilidade
    return of(true);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}