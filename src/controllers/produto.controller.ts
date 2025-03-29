import { Request, Response } from 'express';
import pool from '../config/database';
import { Produto } from '../models/produto.model';

export const produtoController = {
  // Listar todos os produtos
  async listarTodos(req: Request, res: Response) {
    try {
      const result = await pool.query('SELECT * FROM produtos ORDER BY id');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  },

  // Buscar produto por ID
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  // Criar novo produto
  async criar(req: Request, res: Response) {
    const { nome, descricao, preco, quantidade_estoque } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO produtos (nome, descricao, preco, quantidade_estoque) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, descricao, preco, quantidade_estoque]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar produto' });
    }
  },

  // Atualizar produto
  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade_estoque } = req.body;
    try {
      const result = await pool.query(
        'UPDATE produtos SET nome = $1, descricao = $2, preco = $3, quantidade_estoque = $4 WHERE id = $5 RETURNING *',
        [nome, descricao, preco, quantidade_estoque, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  // Deletar produto
  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
}; 