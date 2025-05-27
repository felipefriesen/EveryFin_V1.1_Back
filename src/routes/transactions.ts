import { Router } from 'express';
import { getEntradas, getSaidas, createTransaction } from '../controllers/transactionsController';

const router = Router();

router.get('/entrada', getEntradas);
router.get('/saida', getSaidas);
router.post('/', createTransaction);

export default router;
