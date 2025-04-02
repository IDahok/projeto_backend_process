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
  sistemas_ferramentas: string[];
  subprocessos?: Processo[];
  area?: {
    id: number;
    nome: string;
    descricao: string;
  };
  processo_pai?: {
    id: number;
    nome: string;
    descricao: string;
  };
}

export class ProcessoModel {
  static async findAll(): Promise<Processo[]> {
    const result = await pool.query(`
      SELECT p.*, 
             a.id as area_id, a.nome as area_nome, a.descricao as area_descricao,
             pp.id as processo_pai_id, pp.nome as processo_pai_nome, pp.descricao as processo_pai_descricao
      FROM processos p
      LEFT JOIN areas a ON p.area_id = a.id
      LEFT JOIN processos pp ON p.processo_pai_id = pp.id
    `);
    
    return this.formatProcessos(result.rows);
  }

  static async findById(id: number): Promise<Processo | null> {
    const result = await pool.query(`
      SELECT p.*, 
             a.id as area_id, a.nome as area_nome, a.descricao as area_descricao,
             pp.id as processo_pai_id, pp.nome as processo_pai_nome, pp.descricao as processo_pai_descricao
      FROM processos p
      LEFT JOIN areas a ON p.area_id = a.id
      LEFT JOIN processos pp ON p.processo_pai_id = pp.id
      WHERE p.id = $1
    `, [id]);
    
    const processos = this.formatProcessos(result.rows);
    return processos[0] || null;
  }

  static async findByAreaId(areaId: number): Promise<Processo[]> {
    const result = await pool.query(`
      SELECT p.*, 
             a.id as area_id, a.nome as area_nome, a.descricao as area_descricao,
             pp.id as processo_pai_id, pp.nome as processo_pai_nome, pp.descricao as processo_pai_descricao
      FROM processos p
      LEFT JOIN areas a ON p.area_id = a.id
      LEFT JOIN processos pp ON p.processo_pai_id = pp.id
      WHERE p.area_id = $1
    `, [areaId]);
    
    return this.formatProcessos(result.rows);
  }

  static async findArvoreProcessos(areaId?: number, processoId?: number): Promise<Processo[]> {
    let query = `
      SELECT p.*, 
             a.id as area_id, a.nome as area_nome, a.descricao as area_descricao,
             pp.id as processo_pai_id, pp.nome as processo_pai_nome, pp.descricao as processo_pai_descricao
      FROM processos p
      LEFT JOIN areas a ON p.area_id = a.id
      LEFT JOIN processos pp ON p.processo_pai_id = pp.id
      WHERE p.processo_pai_id IS NULL
    `;
    const params: number[] = [];

    if (areaId) {
      query += ' AND p.area_id = $1';
      params.push(areaId);
    }

    if (processoId) {
      query = `
        SELECT p.*, 
               a.id as area_id, a.nome as area_nome, a.descricao as area_descricao,
               pp.id as processo_pai_id, pp.nome as processo_pai_nome, pp.descricao as processo_pai_descricao
        FROM processos p
        LEFT JOIN areas a ON p.area_id = a.id
        LEFT JOIN processos pp ON p.processo_pai_id = pp.id
        WHERE p.id = $1
      `;
      params.push(processoId);
    }
    
    const result = await pool.query(query, params);
    const processos = this.formatProcessos(result.rows);

    for (const processo of processos) {
      processo.subprocessos = await this.findArvoreProcessos(areaId, processo.id);
    }

    return processos;
  }

  static async create(processo: Omit<Processo, 'id'>): Promise<Processo> {
    const result = await pool.query(
      'INSERT INTO processos (nome, descricao, area_id, processo_pai_id, sistemas_ferramentas) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [processo.nome, processo.descricao, processo.area_id, processo.processo_pai_id, processo.sistemas_ferramentas]
    );
    const novoProcesso = await this.findById(result.rows[0].id);
    if (!novoProcesso) {
      throw new Error('Erro ao criar processo');
    }
    return novoProcesso;
  }

  static async update(id: number, processo: Partial<Omit<Processo, 'id'>>): Promise<Processo | null> {
    const result = await pool.query(
      'UPDATE processos SET nome = COALESCE($1, nome), descricao = COALESCE($2, descricao), area_id = COALESCE($3, area_id), processo_pai_id = COALESCE($4, processo_pai_id), sistemas_ferramentas = COALESCE($5, sistemas_ferramentas) WHERE id = $6 RETURNING *',
      [processo.nome, processo.descricao, processo.area_id, processo.processo_pai_id, processo.sistemas_ferramentas, id]
    );
    return this.findById(result.rows[0].id) || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM processos WHERE id = $1 RETURNING *', [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }

  private static formatProcessos(rows: any[]): Processo[] {
    return rows.map(row => ({
      id: row.id,
      nome: row.nome,
      descricao: row.descricao,
      area_id: row.area_id,
      processo_pai_id: row.processo_pai_id,
      sistemas_ferramentas: row.sistemas_ferramentas || [],
      area: row.area_id ? {
        id: row.area_id,
        nome: row.area_nome,
        descricao: row.area_descricao
      } : undefined,
      processo_pai: row.processo_pai_id ? {
        id: row.processo_pai_id,
        nome: row.processo_pai_nome,
        descricao: row.processo_pai_descricao
      } : undefined
    }));
  }
} 