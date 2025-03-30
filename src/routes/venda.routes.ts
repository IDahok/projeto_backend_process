import { Router } from 'express';
import { vendaController } from '../controllers/venda.controller';

const router = Router();

router.get('/', vendaController.listarTodos);
router.get('/:id', vendaController.buscarPorId);
router.post('/', vendaController.criar);
router.put('/:id', vendaController.atualizar);
router.delete('/:id', vendaController.deletar);

export const vendaRoutes = router; 