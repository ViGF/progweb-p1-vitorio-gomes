import { api } from '../api.js';

function preparar({ saldo, investidorId }) {
  if (!investidorId) throw new Error('Selecione o investidor.');
  if (saldo === '' || Number.isNaN(Number(saldo))) {
    throw new Error('Informe o saldo em números.');
  }
  if (saldo < 0) {
    throw new Error('O saldo não pode ser negativo.');
  }
  
  // Formulário só entrega string: convertemos antes de enviar
  return { saldo: Number(saldo), investidorId: Number(investidorId) };
}

export const contaService = {
  listar() {
    return api.get('/contas');
  },

  async criar(dados) {
    return api.post('/contas', preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/contas/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/contas/${id}`);
  },
};
