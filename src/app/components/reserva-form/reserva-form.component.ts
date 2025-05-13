import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspacoService } from '../../services/espaco.service';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { Espaco } from '../../models/espaco.model';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss']
})
export class ReservaFormComponent implements OnInit {
  reservaForm: FormGroup;
  espaco: Espaco | null = null;
  loading = false;
  submitting = false;
  error = '';
  success = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private espacoService: EspacoService,
    private reservaService: ReservaService,
    private authService: AuthService
  ) {
    this.reservaForm = this.formBuilder.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      observacoes: ['']
    });
  }
  
  ngOnInit(): void {
    const espacoId = Number(this.route.snapshot.paramMap.get('id'));
    if (espacoId) {
      this.loading = true;
      this.espacoService.getEspaco(espacoId).subscribe({
        next: (espaco) => {
          this.espaco = espaco;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar espaço', err);
          this.error = 'Não foi possível carregar os dados do espaço.';
          this.loading = false;
        }
      });
    } else {
      this.router.navigate(['/espacos']);
    }
  }
  
  get f() { return this.reservaForm.controls; }
  
  calcularValorTotal(): number {
    if (!this.espaco) return 0;
    
    const dataInicio = new Date(this.f['dataInicio'].value);
    const dataFim = new Date(this.f['dataFim'].value);
    
    if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
      return 0;
    }
    
    // Calcular diferença em dias
    const diffTime = Math.abs(dataFim.getTime() - dataInicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Se for o mesmo dia, conta como 1 dia
    const dias = diffDays === 0 ? 1 : diffDays;
    
    return this.espaco.valorDiaria * dias;
  }
  
  onSubmit() {
    if (this.reservaForm.invalid || !this.espaco) {
      return;
    }
    
    this.submitting = true;
    this.error = '';
    
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.error = 'Usuário não autenticado';
      this.submitting = false;
      return;
    }
    
    const reserva: Reserva = {
      espacoId: this.espaco.id,
      usuarioId: currentUser.id,
      dataInicio: this.f['dataInicio'].value,
      dataFim: this.f['dataFim'].value,
      valorTotal: this.calcularValorTotal(),
      status: 'pendente',
      observacoes: this.f['observacoes'].value
    };
    
    this.reservaService.criarReserva(reserva).subscribe({
      next: () => {
        this.success = true;
        this.submitting = false;
        setTimeout(() => {
          this.router.navigate(['/minhas-reservas']);
        }, 3000);
      },
      error: error => {
        this.error = error.message || 'Ocorreu um erro ao fazer a reserva';
        this.submitting = false;
      }
    });
  }
}