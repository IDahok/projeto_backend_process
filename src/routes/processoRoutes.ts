import { Router } from 'express';
import { ProcessoController } from '../controllers/ProcessoController';

const router = Router();

router.get('/processos', ProcessoController.listarProcessos);
router.get('/processos/:id', ProcessoController.buscarProcesso);
router.get('/processos/arvore/:id?', ProcessoController.buscarArvoreProcessos);
router.post('/processos', ProcessoController.criarProcesso);
router.put('/processos/:id', ProcessoController.atualizarProcesso);
router.delete('/processos/:id', ProcessoController.deletarProcesso);

export default router; 