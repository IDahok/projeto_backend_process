# API de Clientes

API REST para gerenciamento de clientes desenvolvida com Node.js, Express, TypeScript e PostgreSQL.

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

### Exemplo de payload para criação/atualização de cliente

```json
{
  "nome": "Nome do Cliente",
  "email": "email@exemplo.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Endereço completo do cliente"
}
``` 