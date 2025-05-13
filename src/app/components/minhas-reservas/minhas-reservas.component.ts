import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-minhas-reservas',
  templateUrl: './minhas-reservas.component.html',
  styleUrls: ['./minhas-reservas.component.scss']
})
export class MinhasReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  loading = true;
  error = false;
  
  constructor(private reservaService: ReservaService) {}
  
  ngOnInit(): void {
    this.carregarReservas();
  }
  
  carregarReservas(): void {
    this.loading = true;
    this.reservaService.getMinhasReservas().subscribe({
      next: (reservas) => {
        this.reservas = reservas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar reservas', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  
  cancelarReserva(id: number): void {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(id).subscribe({
        next: () => {
          this.carregarReservas();
        },
        error: (err) => {
          console.error('Erro ao cancelar reserva', err);
          alert('Ocorreu um erro ao cancelar a reserva. Por favor, tente novamente.');
        }
      });
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmada': return 'status-confirmada';
      case 'pendente': return 'status-pendente';
      case 'cancelada': return 'status-cancelada';
      default: return '';
    }
  }
  
  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}