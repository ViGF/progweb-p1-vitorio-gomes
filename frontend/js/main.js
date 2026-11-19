// Ponto de entrada: liga store, service e view. Nenhuma regra mora aqui.
import { criarStore } from './state/store.js';
import { investidorService } from './services/investidorService.js';
import { investidorView } from './ui/investidorView.js';
import { aviso } from './ui/aviso.js';
import { contaService } from './services/contaService.js';
import { contaView } from './ui/contaView.js';

// ===================== INVESTIDORES =====================
const investidores = criarStore({
  status: 'carregando', // 'carregando' | 'erro' | 'vazio' | 'sucesso'
  investidores: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

// Toda vez que o estado mudar, a view redesenha.
investidores.assinar(investidorView.render);

async function carregarInvestidores() {
  investidores.set({ status: 'carregando', erro: null });
  try {
    const lista = await investidorService.listar();
    investidores.set({ status: lista.length ? 'sucesso' : 'vazio', investidores: lista });
  } catch (e) {
    investidores.set({ status: 'erro', erro: e.message });
  }
}

async function salvarInvestidor(dados) {
  const { editandoId } = investidores.get();
  aviso.limpar();
  investidores.set({ salvando: true });
  try {
    if (editandoId) await investidorService.atualizar(editandoId, dados);
    else await investidorService.criar(dados);

    aviso.sucesso(editandoId ? 'Investidor atualizado.' : 'Investidor cadastrado.');
    investidorView.limparForm();
    investidores.set({ editandoId: null });
    await carregarInvestidores();
  } catch (e) {
    aviso.erro(e.message); // o formulário fica como está, para corrigir
  } finally {
    investidores.set({ salvando: false });
  }
}

function editarInvestidor(id) {
  const investidor = investidores.get().investidores.find((c) => c.id === id);
  investidorView.preencherForm(investidor);
  investidores.set({ editandoId: id });
}

function cancelarEdicaoInvestidor() {
  investidorView.limparForm();
  investidores.set({ editandoId: null });
}

async function removerInvestidor(id) {
  if (!confirm(`Remover o investidor #${id}?`)) return;
  aviso.limpar();
  try {
    await investidorService.remover(id);
    aviso.sucesso('Investidor removido.');
    if (investidores.get().editandoId === id) cancelarEdicaoInvestidor();
    await carregarInvestidores();
  } catch (e) {
    aviso.erro(e.message);
  }
}

investidorView.aoEnviar(salvarInvestidor);
investidorView.aoCancelar(cancelarEdicaoInvestidor);
investidorView.aoRecarregar(carregarInvestidores);
investidorView.aoClicarNaLista({ editar: editarInvestidor, remover: removerInvestidor });

// ===================== CONTAS =====================
const contas = criarStore({
  status: 'carregando',
  contas: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

contas.assinar(contaView.render);

// As contas dependem dos investidores: mudou a lista de investidores,
// refaz o <select> e redesenha os nomes na tabela de contas.
investidores.assinar((estado) => {
  contaView.preencherInvestidores(estado.investidores);
  contaView.render(contas.get());
});

async function carregarContas() {
  contas.set({ status: 'carregando', erro: null });
  try {
    const lista = await contaService.listar();
    contas.set({ status: lista.length ? 'sucesso' : 'vazio', contas: lista });
  } catch (e) {
    contas.set({ status: 'erro', erro: e.message });
  }
}

async function salvarConta(dados) {
  const { editandoId } = contas.get();
  aviso.limpar();
  contas.set({ salvando: true });
  try {
    console.log({ editandoId });
    if (editandoId) await contaService.atualizar(editandoId, dados);
    else await contaService.criar(dados);

    aviso.sucesso(editandoId ? 'Conta atualizada.' : 'Conta aberta.');
    contaView.limparForm();
    contas.set({ editandoId: null });
    await carregarContas();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    contas.set({ salvando: false });
  }
}

function editarConta(id) {
  const conta = contas.get().contas.find((c) => c.id === id);
  contaView.preencherForm(conta);
  contas.set({ editandoId: id });
}

function cancelarEdicaoConta() {
  contaView.limparForm();
  contas.set({ editandoId: null });
}

async function removerConta(id) {
  if (!confirm(`Remover a conta #${id}?`)) return;
  aviso.limpar();
  try {
    await contaService.remover(id);
    aviso.sucesso('Conta removida.');
    if (contas.get().editandoId === id) cancelarEdicaoConta();
    await carregarContas();
  } catch (e) {
    aviso.erro(e.message);
  }
}

contaView.aoEnviar(salvarConta);
contaView.aoCancelar(cancelarEdicaoConta);
contaView.aoRecarregar(carregarContas);
contaView.aoClicarNaLista({ editar: editarConta, remover: removerConta });

// // ===================== INÍCIO =====================
carregarInvestidores();
carregarContas();
