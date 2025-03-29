import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clienteRoutes } from './routes/cliente.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clientes', clienteRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 