let contasInvestimento = [];
let proximoId = 1;

export const contaInvestimentoModel = {
  listar() {
    return contasInvestimento;
  },

  listarPorCliente(investidorId) {
    return contasInvestimento.filter((c) => c.investidorId === investidorId);
  },

  buscarPorId(id) {
    return contasInvestimento.find((c) => c.id === id) ?? null;
  },

  inserir({ investidorId, saldo }) {
    const nova = {
      id: proximoId++,
      investidorId: Number(investidorId),
      dataAbertura: new Date().toISOString(),
      saldo: Number(saldo),
      criadaEm: new Date().toISOString(),
    };
    contasInvestimento.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const i = contasInvestimento.findIndex((c) => c.id === id);
    if (i === -1) return null;
    contasInvestimento[i] = { ...contasInvestimento[i], ...dados, id };
    return contasInvestimento[i];
  },

  remover(id) {
    const antes = contasInvestimento.length;
    contasInvestimento = contasInvestimento.filter((c) => c.id !== id);
    return contasInvestimento.length < antes;
  },
};
