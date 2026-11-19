import { Router } from 'express';
import { investidorController } from '../controllers/investidorController.js';

const router = Router();

router.get('/', investidorController.listar);
router.get('/:id', investidorController.buscarPorId);
router.post('/', investidorController.criar);
router.put('/:id', investidorController.atualizar);
router.delete('/:id', investidorController.remover);

export default router;
