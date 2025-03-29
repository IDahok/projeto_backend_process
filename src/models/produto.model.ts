export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade_estoque: number;
  data_criacao?: Date;
}

export interface ItemVenda {
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
  subtotal: number;
}

export interface Venda {
  id?: number;
  cliente_id: number;
  data_venda?: Date;
  valor_total: number;
  status: 'pendente' | 'concluida' | 'cancelada';
  itens: ItemVenda[];
} 