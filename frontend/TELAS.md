# Telas do Projeto 1 (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/` · API: `npm run dev` em `backend/`

| Lista | Estado | Como provocar | O que aparece |
|---|---|---|---|
| Investidores | carregando | Network → throttling 3G → F5 | spinner "Carregando investidores…" |
| Investidores | vazio | API recém-iniciada | "Nenhum investidor ainda..." |
| Investidores | erro | Ctrl+C na API → F5 | "Não consegui falar com a API…" + Tentar de novo |
| Investidores | sucesso | cadastrar "Ana Lima 111.111.111-11 analima@gmail.com 33" | tabela com 1 linha |
| Contas | vazio | sem contas | "Nenhuma conta ainda…" |
| Contas | erro de regra | investidor com conta já cadastrada | aviso "Investidor informado já possui conta" (422) |

## Camadas
- api: `js/api.js` · services: `js/services/` · state: `js/state/store.js` · ui: `js/ui/`