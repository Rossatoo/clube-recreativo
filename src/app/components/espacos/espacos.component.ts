import { Component, OnInit } from '@angular/core';
import { EspacoService } from '../../services/espaco.service';
import { Espaco } from '../../models/espaco.model';

@Component({
  selector: 'app-espacos',
  templateUrl: './espacos.component.html',
  styleUrls: ['./espacos.component.scss']
})
export class EspacosComponent implements OnInit {
  espacos: Espaco[] = [];
  loading = true;
  error = false;

  constructor(private espacoService: EspacoService) {}

  ngOnInit(): void {
    this.carregarEspacos();
  }

  carregarEspacos(): void {
    this.loading = true;
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
  }
}