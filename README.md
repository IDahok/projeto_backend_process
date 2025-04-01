# Sistema de Gestão de Áreas e Processos

API REST para gerenciamento de áreas e processos desenvolvida com Node.js, Express, TypeScript e PostgreSQL.

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

### Áreas

- `GET /api/areas` - Lista todas as áreas
- `GET /api/areas/:id` - Busca uma área específica
- `POST /api/areas` - Cria uma nova área
- `PUT /api/areas/:id` - Atualiza uma área existente
- `DELETE /api/areas/:id` - Remove uma área

### Processos

- `GET /api/processos` - Lista todos os processos
- `GET /api/processos/:id` - Busca um processo específico
- `POST /api/processos` - Cria um novo processo
- `PUT /api/processos/:id` - Atualiza um processo existente
- `DELETE /api/processos/:id` - Remove um processo
- `GET /api/processos/:id/subprocessos` - Lista os subprocessos de um processo

## Exemplos de Payload

### Área
```json
{
  "nome": "Nome da Área",
  "descricao": "Descrição da área",
  "responsavel": "Nome do Responsável"
}
```

### Processo
```json 
{
  "nome": "Nome do Processo",
  "descricao": "Descrição do processo",
  "area_id": 1,
  "processo_pai_id": null,
  "sistemas": ["Sistema 1", "Sistema 2"],
  "responsaveis": ["Responsável 1", "Responsável 2"],
  "documentacao": ["Link 1", "Link 2"]
}
```

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- PostgreSQL
- Docker
- Docker Compose 