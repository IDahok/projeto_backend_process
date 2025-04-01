import { Pool } from 'pg';
console.log(process.env);
// Configuração do pool de conexões
const pool = new Pool({
  host: process.env["DB_HOST"],
  user: process.env["DB_USER"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
  port: 5432,
});

export default pool;
