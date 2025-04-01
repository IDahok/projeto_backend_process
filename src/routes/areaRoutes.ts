import { Router } from 'express';
import { AreaController } from '../controllers/AreaController';

const router = Router();

router.get('/areas', AreaController.listarAreas);
router.get('/areas/:id', AreaController.buscarArea);
router.post('/areas', AreaController.criarArea);
router.put('/areas/:id', AreaController.atualizarArea);
router.delete('/areas/:id', AreaController.deletarArea);

export default router; 