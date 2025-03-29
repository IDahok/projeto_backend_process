import { Router } from 'express';
import { produtoController } from '../controllers/produto.controller';

const router = Router();

router.get('/', produtoController.listarTodos);
router.get('/:id', produtoController.buscarPorId);
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

export const produtoRoutes = router; 