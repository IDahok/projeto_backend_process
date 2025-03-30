export interface Venda {
  id?: number;
  cliente_id: number;
  data_venda?: Date;
  valor_total: number;
  produto_ids: string;
  status: 'pendente' | 'concluida' | 'cancelada';
} 