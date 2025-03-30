# API de Clientes, Produtos e Vendas

API REST para gerenciamento de clientes, produtos e vendas desenvolvida com Node.js, Express, TypeScript e PostgreSQL.

## Requisitos

- Docker
- Docker Compose

## Como executar

1. Clone o repositório
2. Execute o comando para iniciar os containers:
```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`

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