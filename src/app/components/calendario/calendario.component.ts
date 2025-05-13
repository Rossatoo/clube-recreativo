import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  @Input() dataInicial: Date = new Date();
  @Input() dataMinima: Date = new Date();
  @Input() dataMaxima: Date | null = null;
  @Input() datasIndisponiveis: Date[] = [];
  @Output() dataSelecionada = new EventEmitter<Date>();
  
  mesAtual: Date = new Date();
  diasDoMes: any[] = [];
  diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  constructor() {}
  
  ngOnInit(): void {
    this.mesAtual = new Date(this.dataInicial);
    this.gerarDiasDoMes();
  }
  
  gerarDiasDoMes(): void {
    this.diasDoMes = [];
    
    const ano = this.mesAtual.getFullYear();
    const mes = this.mesAtual.getMonth();
    
    // Primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1);
    // Último dia do mês
    const ultimoDia = new Date(ano, mes + 1, 0);
    
    // Dias do mês anterior para preencher a primeira semana
    const diaDaSemanaInicial = primeiroDia.getDay();
    for (let i = diaDaSemanaInicial; i > 0; i--) {
      const dia = new Date(ano, mes, 1 - i);
      this.diasDoMes.push({
        data: dia,
        diaDoMes: dia.getDate(),
        outroMes: true,
        hoje: this.ehHoje(dia),
        selecionavel: false
      });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      const dia = new Date(ano, mes, i);
      this.diasDoMes.push({
        data: dia,
        diaDoMes: i,
        outroMes: false,
        hoje: this.ehHoje(dia),
        selecionavel: this.ehSelecionavel(dia)
      });
    }
    
    // Dias do próximo mês para preencher a última semana
    const diaDaSemanaFinal = ultimoDia.getDay();
    for (let i = 1; i < 7 - diaDaSemanaFinal; i++) {
      const dia = new Date(ano, mes + 1, i);
      this.diasDoMes.push({
        data: dia,
        diaDoMes: dia.getDate(),
        outroMes: true,
        hoje: this.ehHoje(dia),
        selecionavel: false
      });
    }
  }
  
  ehHoje(data: Date): boolean {
    const hoje = new Date();
    return data.getDate() === hoje.getDate() &&
           data.getMonth() === hoje.getMonth() &&
           data.getFullYear() === hoje.getFullYear();
  }
  
  ehSelecionavel(data: Date): boolean {
    // Verificar se a data está dentro do intervalo permitido
    if (this.dataMinima && data < this.dataMinima) {
      return false;
    }
    
    if (this.dataMaxima && data > this.dataMaxima) {
      return false;
    }
    
    // Verificar se a data está na lista de datas indisponíveis
    return !this.datasIndisponiveis.some(dataIndisponivel => 
      dataIndisponivel.getDate() === data.getDate() &&
      dataIndisponivel.getMonth() === data.getMonth() &&
      dataIndisponivel.getFullYear() === data.getFullYear()
    );
  }
  
  mesAnterior(): void {
    this.mesAtual = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() - 1, 1);
    this.gerarDiasDoMes();
  }
  
  proximoMes(): void {
    this.mesAtual = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() + 1, 1);
    this.gerarDiasDoMes();
  }
  
  selecionarData(dia: any): void {
    if (dia.selecionavel) {
      this.dataSelecionada.emit(dia.data);
    }
  }
  
  getNomeMes(): string {
    return `${this.meses[this.mesAtual.getMonth()]} ${this.mesAtual.getFullYear()}`;
  }
}