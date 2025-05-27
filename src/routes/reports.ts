import { Router } from 'express';
import { generateReport } from '../controllers/reportsController';

const router = Router();

router.post('/generate', generateReport);

export default router;
