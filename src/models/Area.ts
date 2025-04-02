import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

export interface Area {
  id: number;
  nome: string;
  descricao: string;
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
      'INSERT INTO areas (nome, descricao) VALUES ($1, $2) RETURNING *',
      [area.nome, area.descricao]
    );
    return result.rows[0];
  }

  static async update(id: number, area: Partial<Omit<Area, 'id'>>): Promise<Area | null> {
    const result = await pool.query(
      'UPDATE areas SET nome = COALESCE($1, nome), descricao = COALESCE($2, descricao) WHERE id = $3 RETURNING *',
      [area.nome, area.descricao, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM areas WHERE id = $1 RETURNING *', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
} 