import { Request, Response } from 'express';
import pool from '../config/database';
import { Venda } from '../models/venda.model';

export const vendaController = {
  // Listar todas as vendas
  async listarTodos(req: Request, res: Response) {
    try {
      const result = await pool.query('SELECT * FROM vendas ORDER BY data_venda DESC');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar vendas' });
    }
  },

  // Buscar venda por ID
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM vendas WHERE id = $1', [id]);
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
    const { cliente_id, valor_total, produto_ids, status } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO vendas (cliente_id, valor_total, produto_ids, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [cliente_id, valor_total, produto_ids, status || 'pendente']
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log('Erro ao criar venda:', error);
      res.status(500).json({ error: 'Erro ao criar venda' });
    }
  },

  // Atualizar venda
  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { cliente_id, valor_total, produto_ids, status } = req.body;
    try {
      const result = await pool.query(
        'UPDATE vendas SET cliente_id = $1, valor_total = $2, produto_ids = $3, status = $4 WHERE id = $5 RETURNING *',
        [cliente_id, valor_total, produto_ids, status, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar venda' });
    }
  },

  // Deletar venda
  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM vendas WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar venda' });
    }
  }
}; 