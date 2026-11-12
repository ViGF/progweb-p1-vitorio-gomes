# Testes da API — Projeto 1 (S3)

API: Simulador de Home Broker · entidades: Investidor e ContaInvestimento · servidor: `npm run dev` em http://localhost:3000

| # | Método | URL | Body | Status obtido | Observação |
|---|---|---|---|---|---|
| 1 | POST | /investidores | {"nome":"Bruno Costa","cpf":"987.654.321-00", "email": "bruno@email.com", "celular": "+55 11 98765-4321"} | 201 | |
| 2 | POST | /contas | {"saldo": 1000, "investidorId": 1} | 201 | |
| 3 | GET | /contas/99 | — | 404 | |
| 4 | POST | /contas | {"saldo": 1000, "investidorId": 99} | 422 | regra: investidor inexistente |
| 5 | POST | /contas | {"saldo": -1, "investidorId": 1} | 400 | regra: saldo negativo |
| 6 | DELETE | /investidores/1 | — | 204 | |