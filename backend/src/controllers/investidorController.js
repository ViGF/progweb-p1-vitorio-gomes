import { investidorService } from '../services/investidorService.js';

export const investidorController = {
  listar(req, res) {
    res.json(investidorService.listar());
  },

  buscarPorId(req, res) {
    res.json(investidorService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    const novo = investidorService.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar(req, res) {
    res.json(investidorService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    investidorService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
