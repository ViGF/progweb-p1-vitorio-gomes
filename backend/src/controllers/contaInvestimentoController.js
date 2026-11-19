import { contaInvestimentoService } from '../services/contaInvestimentoService.js';

export const contaInvestimentoController = {
  listar(req, res) {
    res.json(contaInvestimentoService.listar(req.query.clienteId));
  },

  buscarPorId(req, res) {
    res.json(contaInvestimentoService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const nova = contaInvestimentoService.criar(req.body);
    res.status(201).json(nova);
  },

  atualizar(req, res) {
    res.json(contaInvestimentoService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    contaInvestimentoService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
