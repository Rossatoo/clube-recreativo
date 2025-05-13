export interface Reserva {
  id?: number;
  espacoId: number;
  espacoNome?: string;
  usuarioId: number;
  usuarioNome?: string;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  status: 'pendente' | 'confirmada' | 'cancelada';
  observacoes?: string;
  criadoEm?: string;
}