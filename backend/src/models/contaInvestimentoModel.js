import { db } from '../db.js';

const COLUNAS = `id, saldo,
  investidor_id AS investidorId, criada_em AS criadaEm`;

export const contaInvestimentoModel = {
  listar() {
    return db.prepare(`SELECT ${COLUNAS} FROM contas_investimento ORDER BY id`).all();
  },

  listarPorInvestidor(investidorId) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM contas_investimento WHERE investidor_id = ? ORDER BY id`)
      .all(investidorId);
  },

  buscarPorId(id) {
    return db
      .prepare(`SELECT ${COLUNAS} FROM contas_investimento WHERE id = ?`)
      .get(id) ?? null;
  },

  inserir({ saldo, investidorId }) {
    const r = db
      .prepare(`INSERT INTO contas_investimento (saldo, investidor_id, criada_em)
                VALUES (?, ?, ?)`)
      .run(Number(saldo), Number(investidorId), new Date().toISOString());
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE contas_investimento SET saldo = ?, investidor_id = ? WHERE id = ?')
      .run(Number(novo.saldo), Number(novo.investidorId), id);
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM contas_investimento WHERE id = ?').run(id);
    return r.changes > 0;
  },
};