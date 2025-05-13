import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  destaques = [
    {
      id: 1,
      nome: 'Salão de Festas Principal',
      descricao: 'Ideal para eventos de grande porte',
      imagemUrl: '/assets/images/salao-principal.jpg'
    },
    {
      id: 2,
      nome: 'Churrasqueira Coberta',
      descricao: 'Perfeita para reuniões familiares',
      imagemUrl: '/assets/images/churrasqueira.jpg'
    },
    {
      id: 3,
      nome: 'Quadra Poliesportiva',
      descricao: 'Para prática de diversos esportes',
      imagemUrl: '/assets/images/quadra.jpg'
    }
  ];
}