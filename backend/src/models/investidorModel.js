import { db } from '../db.js';

export const investidorModel = {
  listar() {
    return db.prepare('SELECT * FROM investidores ORDER BY id').all();
  },

  buscarPorId(id) {
    return db.prepare('SELECT * FROM investidores WHERE id = ?').get(id) ?? null;
  },

  existeCpf(cpf) {
    const linha = db.prepare('SELECT 1 FROM investidores WHERE cpf = ?').get(cpf);
    return linha !== undefined;
  },

  inserir({ nome, cpf, email, celular }) {
    const r = db
      .prepare('INSERT INTO investidores (nome, cpf, email, celular) VALUES (?, ?, ?, ?)')
      .run(nome, cpf, email, celular);
    return this.buscarPorId(r.lastInsertRowid);
  },

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) return null;
    const novo = { ...atual, ...dados };
    db.prepare('UPDATE investidores SET nome = ?, cpf = ?, email = ?, celular = ? WHERE id = ?')
      .run(novo.nome, novo.cpf, novo.email ?? null, novo.celular ?? null, id); // o id nunca muda
    return this.buscarPorId(id);
  },

  remover(id) {
    const r = db.prepare('DELETE FROM investidores WHERE id = ?').run(id);
    return r.changes > 0; // true = removeu
  },
};