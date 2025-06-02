import { Router } from 'express';
import * as DashboardController from '../controllers/DashboardController';
import { autenticarToken } from '../middlewares/auth.middleware';

const router = Router();
router.get('/dashboard', autenticarToken, DashboardController.getDashboard);
export default router;