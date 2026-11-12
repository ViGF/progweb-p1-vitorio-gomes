import { Router } from 'express';
import { contaInvestimentoController  } from '../controllers/contaInvestimentoController.js';

const router = Router();

router.get('/', contaInvestimentoController.listar);
router.get('/:id', contaInvestimentoController.buscarPorId);
router.post('/', contaInvestimentoController.criar);
router.put('/:id', contaInvestimentoController.atualizar);
router.delete('/:id', contaInvestimentoController.remover);

export default router;
