// "Banco de dados" em memória: um array. Na S5 vira SQLite.
let investidores = [];
let proximoId = 1;

export const investidorModel = {
  listar() {
    return investidores;
  },

  buscarPorId(id) {
    return investidores.find((c) => c.id == id) ?? null;
  },

  existeCpf(cpf) {
    return investidores.some((c) => c.cpf === cpf);
  },

  inserir({ nome, cpf, email, celular }) {
    const novo = { id: proximoId++, nome, cpf, email, celular };
    investidores.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const i = investidores.findIndex((c) => c.id === id);
    if (i === -1) return null;
    investidores[i] = { ...investidores[i], ...dados, id }; // o id nunca muda
    return investidores[i];
  },

  remover(id) {
    const antes = investidores.length;
    investidores = investidores.filter((c) => c.id !== id);
    return investidores.length < antes; // true = removeu
  },
}