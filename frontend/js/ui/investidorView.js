// Camada de UI: a única que toca no DOM dos investidores.
// Não faz fetch e não valida regra: desenha o estado e avisa dos eventos.
const el = {
  form: document.querySelector('#form-investidor'),
  salvar: document.querySelector('#inv-salvar'),
  cancelar: document.querySelector('#inv-cancelar'),
  carregando: document.querySelector('#investidores-carregando'),
  erro: document.querySelector('#investidores-erro'),
  erroMsg: document.querySelector('#investidores-erro-msg'),
  recarregar: document.querySelector('#investidores-recarregar'),
  vazio: document.querySelector('#investidores-vazio'),
  sucesso: document.querySelector('#investidores-sucesso'),
  linhas: document.querySelector('#investidores-linhas'),
};

function formatarCpf(cpf) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto; // dado do usuário entra como TEXTO, nunca como HTML
  td.className = classe;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao; // vira data-acao="editar" no HTML
  b.dataset.id = id;
  return b;
}

function linha(investidor, editandoId) {
  const tr = document.createElement('tr');
  if (investidor.id === editandoId) tr.className = 'editando';

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', investidor.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', investidor.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(investidor.id),
    celula(investidor.nome),
    celula(formatarCpf(investidor.cpf), 'numero text-nowrap'),
    celula(investidor.email),
    celula(investidor.celular),
    acoes,
  );
  return tr;
}

export const investidorView = {
  // Desenha a tela a partir do estado: a UI é função do estado.
  render({ status, investidores, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...investidores.map((c) => linha(c, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Cadastrar investidor';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(investidor) {
    el.form.nome.value = investidor.nome;
    el.form.cpf.value = formatarCpf(investidor.cpf);
    el.form.email.value = investidor.email;
    el.form.celular.value = investidor.celular;
    el.form.nome.focus();
  },

  limparForm() {
    el.form.reset();
  },

  // --- Eventos: a view avisa; quem decide o que fazer é o main.js ---
  aoEnviar(fn) {
    el.form.addEventListener('submit', (evento) => {
      evento.preventDefault(); // sem isto, o navegador recarrega a página
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener('click', fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener('click', fn);
  },

  // Delegação: UM listener no <tbody> atende os botões de todas as linhas.
  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]');
      if (!alvo) return;
      const id = Number(alvo.dataset.id); // tudo que vem do DOM é string
      if (alvo.dataset.acao === 'editar') editar(id);
      if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};
