import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { EspacoService } from '../../services/espaco.service';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../models/reserva.model';
import { Espaco } from '../../models/espaco.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reservas: Reserva[] = [];
  espacos: Espaco[] = [];
  loading = true;
  error = false;
  
  // Estatísticas
  totalReservas = 0;
  reservasPendentes = 0;
  reservasConfirmadas = 0;
  reservasCanceladas = 0;
  
  constructor(
    private reservaService: ReservaService,
    private espacoService: EspacoService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      // Redirecionar se não for admin
      return;
    }
    
    this.carregarDados();
  }
  
  carregarDados(): void {
    this.loading = true;
    
    // Carregar reservas
    this.reservaService.getReservas().subscribe({
      next: (reservas) => {
        this.reservas = reservas;
        this.calcularEstatisticas();
        
        // Carregar espaços após carregar reservas
        this.espacoService.getEspacos().subscribe({
          next: (espacos) => {
            this.espacos = espacos;
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao carregar espaços', err);
            this.error = true;
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Erro ao carregar reservas', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  
  calcularEstatisticas(): void {
    this.totalReservas = this.reservas.length;
    this.reservasPendentes = this.reservas.filter(r => r.status === 'pendente').length;
    this.reservasConfirmadas = this.reservas.filter(r => r.status === 'confirmada').length;
    this.reservasCanceladas = this.reservas.filter(r => r.status === 'cancelada').length;
  }
  
  confirmarReserva(id: number): void {
    if (confirm('Tem certeza que deseja confirmar esta reserva?')) {
      this.reservaService.atualizarReserva(id, { status: 'confirmada' }).subscribe({
        next: () => {
          this.carregarDados();
        },
        error: (err) => {
          console.error('Erro ao confirmar reserva', err);
          alert('Ocorreu um erro ao confirmar a reserva. Por favor, tente novamente.');
        }
      });
    }
  }
  
  cancelarReserva(id: number): void {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(id).subscribe({
        next: () => {
          this.carregarDados();
        },
        error: (err) => {
          console.error('Erro ao cancelar reserva', err);
          alert('Ocorreu um erro ao cancelar a reserva. Por favor, tente novamente.');
        }
      });
    }
  }
  
  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
  
  getNomeEspaco(espacoId: number): string {
    const espaco = this.espacos.find(e => e.id === espacoId);
    return espaco ? espaco.nome : 'Espaço não encontrado';
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmada': return 'status-confirmada';
      case 'pendente': return 'status-pendente';
      case 'cancelada': return 'status-cancelada';
      default: return '';
    }
  }
}