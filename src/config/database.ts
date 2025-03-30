import { Pool } from 'pg';

// Configuração do pool de conexões
const pool = new Pool({
  host: '20.206.149.115',
  user: 'postgres',
  password: '123456',
  database: 'postgres',
  port: 5432,
});

export default pool;
