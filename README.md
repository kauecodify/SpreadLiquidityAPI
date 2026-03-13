
<img width="50" height="50" alt="excelpng" src="https://github.com/user-attachments/assets/f02a8506-c717-4682-89f8-cd96273a1eed" />

<img width="100" height="100" alt="node" src="https://github.com/user-attachments/assets/cb3367f3-64af-499c-986d-2b9c0cb7ada3" />

<img width="100" height="100" alt="imagem_2026-03-13_013101344-removebg-preview" src="https://github.com/user-attachments/assets/1641b69c-49e1-42a6-a8b4-55a2c893eb0a" />

# Simulação de Pagamentos e Liquidação Atacado

## Visão Geral

Este projeto simula um **sistema de pagamentos e liquidação B2B para transações de commodities no atacado**.
Ele demonstra como pedidos, pagamentos e liquidações financeiras podem ser processados em uma arquitetura web simples.

O sistema inclui:

* Criação de pedidos
* Simulação de pagamento
* Motor de liquidação (settlement)
* Registro contábil em ledger
* Persistência em banco de dados
* Logs e relatórios diários

---

## Arquitetura

```
Frontend (HTML + JS)
        │
        ▼
API REST (Node.js + Express)
        │
        ▼
Orders Service
Payments Service
Settlement Engine
        │
        ▼
Ledger
        │
        ▼
PostgreSQL
        │
        ▼
Logs / Relatórios Excel
```

---

## Tecnologias Utilizadas

* **Node.js**
* **Express**
* **PostgreSQL**
* **pg (driver PostgreSQL)**
* **xlsx (exportação para Excel)**
* **HTML + JavaScript**
* **Git**

---

## Estrutura do Projeto

```
wholesale-system
│
├── server.js
├── db.js
│
├── services
│   ├── orders.js
│   └── payments.js
│
├── ledger
│   └── engine.js
│
| index.html
|
├── sql
│   └── schema.sql
│
└── logs
```

O **arquivo de frontend (`index.html`) roda separadamente** e se comunica com a API por requisições HTTP.

---

## Banco de Dados

### Orders

Armazena dados das transações como preço (`value`), quantidade e valor total.

### Ledger

Registra entradas contábeis de débito e crédito geradas durante a liquidação.

---

## Instalação

Clonar o repositório:

```
git clone <url-do-repositorio>
cd wholesale-system
```

Instalar dependências:

```
npm install
```

Criar banco e executar schema:

```
psql -U postgres -d wholesale -f sql/schema.sql
```

Configurar credenciais do banco no arquivo `db.js`.

---

## Execução

Iniciar a API:

```
node server.js
```

A API será executada em:

```
http://localhost:3000
```

Abra o **arquivo frontend manualmente** para criar e pagar pedidos.

Adaptar o seu frontend...

---

## Logs

As transações são armazenadas automaticamente em pastas diárias:

```
logs/
   YYYY-MM-DD/
        ORD123.json
        orders.xlsx
```

* **JSON** → registro individual de transações
* **XLSX** → relatório financeiro diário

---

## Objetivo

Este projeto demonstra uma arquitetura simplificada semelhante a **plataformas de pagamento B2B, fintechs ou sistemas de trading de commodities**.

---

## Licença mit

Para fins **demonstrativos**.
