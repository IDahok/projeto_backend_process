import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

export interface Processo {
  id: number;
  nome: string;
  descricao: string;
  area_id: number;
  processo_pai_id: number | null;
  sistemas: string[];
  responsaveis: string[];
  documentacao: string[];
}

export class ProcessoModel {
  static async findAll(): Promise<Processo[]> {
    const result = await pool.query('SELECT * FROM processos');
    return result.rows;
  }

  static async findById(id: number): Promise<Processo | null> {
    const result = await pool.query('SELECT * FROM processos WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByAreaId(areaId: number): Promise<Processo[]> {
    const result = await pool.query('SELECT * FROM processos WHERE area_id = $1', [areaId]);
    return result.rows;
  }

  static async findSubprocessos(processoId: number): Promise<Processo[]> {
    const result = await pool.query('SELECT * FROM processos WHERE processo_pai_id = $1', [processoId]);
    return result.rows;
  }

  static async create(processo: Omit<Processo, 'id'>): Promise<Processo> {
    const result = await pool.query(
      `INSERT INTO processos (
        nome, descricao, area_id, processo_pai_id, 
        sistemas, responsaveis, documentacao
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        processo.nome,
        processo.descricao,
        processo.area_id,
        processo.processo_pai_id,
        processo.sistemas,
        processo.responsaveis,
        processo.documentacao
      ]
    );
    return result.rows[0];
  }

  static async update(id: number, processo: Partial<Omit<Processo, 'id'>>): Promise<Processo | null> {
    const result = await pool.query(
      `UPDATE processos SET 
        nome = COALESCE($1, nome),
        descricao = COALESCE($2, descricao),
        area_id = COALESCE($3, area_id),
        processo_pai_id = COALESCE($4, processo_pai_id),
        sistemas = COALESCE($5, sistemas),
        responsaveis = COALESCE($6, responsaveis),
        documentacao = COALESCE($7, documentacao)
      WHERE id = $8 RETURNING *`,
      [
        processo.nome,
        processo.descricao,
        processo.area_id,
        processo.processo_pai_id,
        processo.sistemas,
        processo.responsaveis,
        processo.documentacao,
        id
      ]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM processos WHERE id = $1 RETURNING *', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
} 