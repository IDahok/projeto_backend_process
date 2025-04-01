# API de Clientes, Produtos e Vendas

API REST para gerenciamento de clientes, produtos e vendas desenvolvida com Node.js, Express, TypeScript e PostgreSQL.

## Requisitos

- Node.js (versão 14 ou superior)
- Docker
- Docker Compose

## Configuração do Ambiente

1. Clone o repositório
2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DB_PASSWORD=sua_senha
DB_NAME=postgres
DB_USER=postgres
DB_HOST=host_do_banco
DB_PORT=5432
```

## Como executar

### Usando Docker (Recomendado)

1. Execute o comando para iniciar os containers:
```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`

### Localmente

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

3. Para build de produção:
```bash
npm run build
npm start
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Inicia o servidor em modo produção
- `npm test`: Executa os testes

## Estrutura do Projeto

```
.
├── src/                    # Código fonte
├── dist/                   # Código compilado
├── docker-compose.yml      # Configuração do Docker Compose
├── Dockerfile             # Configuração do Docker
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
└── .env                   # Variáveis de ambiente
```

## Endpoints

### Clientes

- `GET /api/clientes` - Lista todos os clientes
- `GET /api/clientes/:id` - Busca um cliente específico
- `POST /api/clientes` - Cria um novo cliente
- `PUT /api/clientes/:id` - Atualiza um cliente existente
- `DELETE /api/clientes/:id` - Remove um cliente

### Produtos

- `GET /api/produtos` - Lista todos os produtos
- `GET /api/produtos/:id` - Busca um produto específico
- `POST /api/produtos` - Cria um novo produto
- `PUT /api/produtos/:id` - Atualiza um produto existente
- `DELETE /api/produtos/:id` - Remove um produto

### Vendas

- `GET /api/vendas` - Lista todas as vendas
- `GET /api/vendas/:id` - Busca uma venda específica
- `POST /api/vendas` - Cria uma nova venda
- `PATCH /api/vendas/:id/status` - Atualiza o status de uma venda

## Exemplos de Payload

### Cliente
```json
{
  "nome": "Nome do Cliente",
  "email": "email@exemplo.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Endereço completo do cliente"
}
```

### Produto
```json
{
  "nome": "Nome do Produto",
  "descricao": "Descrição do produto",
  "preco": 99.99,
  "quantidade_estoque": 100
}
```

### Venda
```json 
{
  "cliente_id": 1,
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 2
    },
    {
      "produto_id": 2,
      "quantidade": 1
    }
  ]
}
```

### Atualização de Status da Venda
```json
{
  "status": "concluida"
}
```
Status disponíveis: "pendente", "concluida", "cancelada"

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- PostgreSQL
- Docker
- Docker Compose 