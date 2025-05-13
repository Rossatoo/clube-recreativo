import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspacoService } from '../../services/espaco.service';
import { Espaco } from '../../models/espaco.model';

@Component({
  selector: 'app-espaco-detalhe',
  templateUrl: './espaco-detalhe.component.html',
  styleUrls: ['./espaco-detalhe.component.scss']
})
export class EspacoDetalheComponent implements OnInit {
  espaco: Espaco | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private espacoService: EspacoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.carregarEspaco(id);
    }
  }

  carregarEspaco(id: number): void {
    this.loading = true;
    this.espacoService.getEspaco(id).subscribe({
      next: (espaco) => {
        this.espaco = espaco;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar espaço', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}