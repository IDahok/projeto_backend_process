import { Request, Response } from 'express';
import pool from '../config/database';
import { Cliente } from '../models/cliente.model';

export const clienteController = {
  // Listar todos os clientes
  async listarTodos(req: Request, res: Response) {
    try {
      const result = await pool.query('SELECT * FROM clientes ORDER BY id');
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  },

  // Buscar cliente por ID
  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  },

  // Criar novo cliente
  async criar(req: Request, res: Response) {
    const { nome, email, telefone, endereco } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO clientes (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, email, telefone, endereco]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  },

  // Atualizar cliente
  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;
    try {
      const result = await pool.query(
        'UPDATE clientes SET nome = $1, email = $2, telefone = $3, endereco = $4 WHERE id = $5 RETURNING *',
        [nome, email, telefone, endereco, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  },

  // Deletar cliente
  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      res.json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
}; 