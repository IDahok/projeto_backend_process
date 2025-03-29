import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clienteRoutes } from './routes/cliente.routes';
import { produtoRoutes } from './routes/produto.routes';
import { vendaRoutes } from './routes/venda.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clientes', clienteRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/vendas', vendaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 