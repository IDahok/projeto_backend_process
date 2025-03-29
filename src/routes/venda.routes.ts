import { Router } from 'express';
import { vendaController } from '../controllers/venda.controller';

const router = Router();

router.get('/', vendaController.listarTodas);
router.get('/:id', vendaController.buscarPorId);
router.post('/', vendaController.criar);
router.patch('/:id/status', vendaController.atualizarStatus);

export const vendaRoutes = router; 