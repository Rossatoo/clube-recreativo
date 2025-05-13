export interface Espaco {
  id: number;
  nome: string;
  descricao: string;
  capacidade: number;
  valorDiaria: number;
  imagemUrl: string;
  recursos: string[];
  disponivel: boolean;
}