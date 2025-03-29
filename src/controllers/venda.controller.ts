import { Request, Response } from 'express';
import pool from '../config/database';
import { Venda, ItemVenda } from '../models/produto.model';

export const vendaController = {
  // Listar todas as vendas
  async listarTodas(req: Request, res: Response) {
    try {
      const result = await pool.query(`
        SELECT v.*, c.nome as cliente_nome,
               json_agg(json_build_object(
                 'id', iv.id,
                 'produto_id', iv.produto_id,
                 'quantidade', iv.quantidade,
                 'preco_unitario', iv.preco_unitario,
                 'subtotal', iv.subtotal,
                 'produto_nome', p.nome
               )) as itens
        FROM vendas v
        JOIN clientes c ON v.cliente_id = c.id
        LEFT JOIN itens_venda iv ON v.id = iv.venda_id
        LEFT JOIN produtos p ON iv.produto_id = p.id
        GROUP BY v.id, c.nome
        ORDER BY v.id
      `);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar vendas' });
    }
  },

  // Buscar venda por ID
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await pool.query(`
        SELECT v.*, c.nome as cliente_nome,
               json_agg(json_build_object(
                 'id', iv.id,
                 'produto_id', iv.produto_id,
                 'quantidade', iv.quantidade,
                 'preco_unitario', iv.preco_unitario,
                 'subtotal', iv.subtotal,
                 'produto_nome', p.nome
               )) as itens
        FROM vendas v
        JOIN clientes c ON v.cliente_id = c.id
        LEFT JOIN itens_venda iv ON v.id = iv.venda_id
        LEFT JOIN produtos p ON iv.produto_id = p.id
        WHERE v.id = $1
        GROUP BY v.id, c.nome
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar venda' });
    }
  },

  // Criar nova venda
  async criar(req: Request, res: Response) {
    const { cliente_id, itens } = req.body;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Calcular valor total
      let valorTotal = 0;
      for (const item of itens) {
        const produtoResult = await client.query(
          'SELECT preco, quantidade_estoque FROM produtos WHERE id = $1',
          [item.produto_id]
        );

        if (produtoResult.rows.length === 0) {
          throw new Error(`Produto ${item.produto_id} não encontrado`);
        }

        const produto = produtoResult.rows[0];
        if (produto.quantidade_estoque < item.quantidade) {
          throw new Error(`Estoque insuficiente para o produto ${item.produto_id}`);
        }

        const subtotal = produto.preco * item.quantidade;
        valorTotal += subtotal;

        // Atualizar estoque
        await client.query(
          'UPDATE produtos SET quantidade_estoque = quantidade_estoque - $1 WHERE id = $2',
          [item.quantidade, item.produto_id]
        );
      }

      // Criar venda
      const vendaResult = await client.query(
        'INSERT INTO vendas (cliente_id, valor_total) VALUES ($1, $2) RETURNING *',
        [cliente_id, valorTotal]
      );

      const venda = vendaResult.rows[0];

      // Criar itens da venda
      for (const item of itens) {
        const produtoResult = await client.query(
          'SELECT preco FROM produtos WHERE id = $1',
          [item.produto_id]
        );

        const precoUnitario = produtoResult.rows[0].preco;
        const subtotal = precoUnitario * item.quantidade;

        await client.query(
          'INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario, subtotal) VALUES ($1, $2, $3, $4, $5)',
          [venda.id, item.produto_id, item.quantidade, precoUnitario, subtotal]
        );
      }

      await client.query('COMMIT');

      // Buscar venda completa com itens
      const result = await pool.query(`
        SELECT v.*, c.nome as cliente_nome,
               json_agg(json_build_object(
                 'id', iv.id,
                 'produto_id', iv.produto_id,
                 'quantidade', iv.quantidade,
                 'preco_unitario', iv.preco_unitario,
                 'subtotal', iv.subtotal,
                 'produto_nome', p.nome
               )) as itens
        FROM vendas v
        JOIN clientes c ON v.cliente_id = c.id
        LEFT JOIN itens_venda iv ON v.id = iv.venda_id
        LEFT JOIN produtos p ON iv.produto_id = p.id
        WHERE v.id = $1
        GROUP BY v.id, c.nome
      `, [venda.id]);

      res.status(201).json(result.rows[0]);
    } catch (error: any) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: error?.message || 'Erro ao criar venda' });
    } finally {
      client.release();
    }
  },

  // Atualizar status da venda
  async atualizarStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    const statusValidos = ['pendente', 'concluida', 'cancelada'] as const;
    if (!statusValidos.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    try {
      const result = await pool.query(
        'UPDATE vendas SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar status da venda' });
    }
  }
}; 