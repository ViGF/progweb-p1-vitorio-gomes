import { investidorModel } from '../models/investidorModel.js';
import { erro } from '../utils/erro.js';

export const investidorService = {
  listar() {
    return investidorModel.listar();
  },

  buscarPorId(id) {
    const investidor = investidorModel.buscarPorId(id);
    if (!investidor) throw new erro(404, 'Investidor não encontrado');
    
    return investidor;
  },

  criar({ nome, cpf, email, celular } = {}) {
    if (!nome || !cpf) throw erro(400, 'Campos "nome" e "cpf" são obrigatórios');
    if (!email) throw erro(400, 'Campo "email" é obrigatório');
    if (!celular) throw erro(400, 'Campo "celular" é obrigatório');

    if (investidorModel.existeCpf(cpf)) throw erro(409, 'Já existe um investidor com este CPF');

    return investidorModel.inserir({ nome, cpf, email, celular });
  },

  atualizar(id, dados = {}) {
    const atualizado = investidorModel.atualizar(id, dados);
    if (!atualizado) throw erro(404, 'Investidor não encontrado');

    return atualizado;
  },

  remover(id) {
    const removido = investidorModel.remover(id);
    if (!removido) throw erro(404, 'Investidor não encontrado');
  },
}