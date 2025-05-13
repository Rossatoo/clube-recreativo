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
  espacosFiltrados: Espaco[] = [];
  loading = true;
  error = false;
  searchTerm = '';

  constructor(private espacoService: EspacoService) {}

  ngOnInit(): void {
    this.carregarEspacos();
  }

  carregarEspacos(): void {
    this.loading = true;
    this.espacoService.getEspacos().subscribe({
      next: (espacos) => {
        this.espacos = espacos;
        this.espacosFiltrados = [...espacos];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar espaços', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  
  filtrarEspacos(): void {
    if (!this.searchTerm.trim()) {
      this.espacosFiltrados = [...this.espacos];
      return;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    this.espacosFiltrados = this.espacos.filter(espaco => 
      espaco.nome.toLowerCase().includes(term) || 
      espaco.descricao.toLowerCase().includes(term)
    );
  }
  
  limparFiltros(): void {
    this.searchTerm = '';
    this.filtrarEspacos();
  }
}