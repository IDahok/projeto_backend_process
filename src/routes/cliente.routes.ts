import { Router } from 'express';
import { clienteController } from '../controllers/cliente.controller';

const router = Router();

router.get('/', clienteController.listarTodos);
router.get('/:id', clienteController.buscarPorId);
router.post('/', clienteController.criar);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.deletar);

export const clienteRoutes = router; 