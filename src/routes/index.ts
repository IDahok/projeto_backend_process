import { Router } from 'express';
import areaRoutes from './areaRoutes';
import processoRoutes from './processoRoutes';

const router = Router();

router.use('/api', areaRoutes);
router.use('/api', processoRoutes);

export default router; 