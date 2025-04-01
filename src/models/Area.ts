import { Pool } from 'pg';

const pool = new Pool();

export interface Area {
  id: number;
  nome: string;
  descricao: string;
  responsavel: string;
}

export class AreaModel {
  static async findAll(): Promise<Area[]> {
    const result = await pool.query('SELECT * FROM areas');
    return result.rows;
  }

  static async findById(id: number): Promise<Area | null> {
    const result = await pool.query('SELECT * FROM areas WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(area: Omit<Area, 'id'>): Promise<Area> {
    const result = await pool.query(
      'INSERT INTO areas (nome, descricao, responsavel) VALUES ($1, $2, $3) RETURNING *',
      [area.nome, area.descricao, area.responsavel]
    );
    return result.rows[0];
  }

  static async update(id: number, area: Partial<Omit<Area, 'id'>>): Promise<Area | null> {
    const result = await pool.query(
      'UPDATE areas SET nome = COALESCE($1, nome), descricao = COALESCE($2, descricao), responsavel = COALESCE($3, responsavel) WHERE id = $4 RETURNING *',
      [area.nome, area.descricao, area.responsavel, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM areas WHERE id = $1 RETURNING *', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
} 