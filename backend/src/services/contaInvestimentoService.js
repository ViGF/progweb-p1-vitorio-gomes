import { contaInvestimentoModel } from '../models/contaInvestimentoModel.js';
import { investidorModel } from '../models/investidorModel.js';
import { erro } from '../utils/erro.js';

export const contaInvestimentoService = {
  listar(investidorId) {
    if (investidorId) return contaInvestimentoModel.listarPorCliente(Number(investidorId));

    return contaInvestimentoModel.listar();
  },

  buscarPorId(id) {
    const conta = contaInvestimentoModel.buscarPorId(id);
    if (!conta) throw erro(404, 'Conta não encontrada');

    return conta;
  },

  criar({ saldo, investidorId } = {}) {
    if (saldo === undefined || !investidorId) {
      throw erro(400, 'Campos "saldo" e "investidorId" são obrigatórios');
    }

    if (saldo < 0) {
      throw erro(400, 'Saldo deve ser maior ou igual a zero');
    }

    // Regra: o investidor precisa existir
    if (!investidorModel.buscarPorId(Number(investidorId))) throw erro(422, 'Investidor informado não existe');

    // Regra: o investidor já possui conta
    if (contaInvestimentoModel.listarPorCliente(Number(investidorId)).length > 0) {
      throw erro(422, 'Investidor informado já possui conta');
    }

    return contaInvestimentoModel.inserir({ saldo, investidorId });
  },

  atualizar(id, dados = {}) {
    const atualizada = contaInvestimentoModel.atualizar(id, dados);
    if (!atualizada) throw erro(404, 'Conta não encontrada');
    return atualizada;
  },

  remover(id) {
    const removida = contaInvestimentoModel.remover(id);
    if (!removida) throw erro(404, 'Conta não encontrada');
  },
};
