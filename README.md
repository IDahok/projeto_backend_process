# Sistema de Gestão de Processos

Sistema para gerenciamento de processos e subprocessos organizados por áreas.

## Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   DB_USER=seu_usuario
   DB_HOST=localhost
   DB_NAME=nome_do_banco
   DB_PASSWORD=sua_senha
   DB_PORT=5432
   ```
4. Execute o script SQL para criar as tabelas:
   ```bash
   psql -U seu_usuario -d nome_do_banco -f src/database/init.sql
   ```

## Executando o Projeto

```bash
npm run dev
```

## Estrutura do Projeto

```
src/
├── config/
│   └── database.ts
├── controllers/
│   ├── AreaController.ts
│   └── ProcessoController.ts
├── database/
│   └── init.sql
├── models/
│   ├── Area.ts
│   └── Processo.ts
├── routes/
│   ├── areaRoutes.ts
│   ├── processoRoutes.ts
│   └── index.ts
└── server.ts
```

## API Endpoints

### Áreas

#### GET /api/areas
Lista todas as áreas.

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "TI",
    "descricao": "Área de Tecnologia da Informação"
  },
  {
    "id": 2,
    "nome": "RH",
    "descricao": "Recursos Humanos"
  }
]
```

#### GET /api/areas/:id
Busca uma área específica.

**Resposta:**
```json
{
  "id": 1,
  "nome": "TI",
  "descricao": "Área de Tecnologia da Informação"
}
```

#### POST /api/areas
Cria uma nova área.

**Request:**
```json
{
  "nome": "TI",
  "descricao": "Área de Tecnologia da Informação"
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "TI",
  "descricao": "Área de Tecnologia da Informação"
}
```

#### PUT /api/areas/:id
Atualiza uma área existente.

**Request:**
```json
{
  "nome": "Tecnologia da Informação",
  "descricao": "Área responsável por sistemas e infraestrutura"
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Tecnologia da Informação",
  "descricao": "Área responsável por sistemas e infraestrutura"
}
```

#### DELETE /api/areas/:id
Remove uma área.

**Resposta:**
```json
{
  "message": "Área removida com sucesso"
}
```

### Processos

#### GET /api/processos
Lista todos os processos.

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Desenvolvimento de Software",
    "descricao": "Processo de desenvolvimento de aplicações",
    "area_id": 1,
    "processo_pai_id": null,
    "sistemas_ferramentas": ["Git", "VS Code", "PostgreSQL", "Node.js"],
    "area": {
      "id": 1,
      "nome": "TI",
      "descricao": "Área de Tecnologia da Informação"
    }
  }
]
```

#### GET /api/processos/:id
Busca um processo específico.

**Resposta:**
```json
{
  "id": 1,
  "nome": "Desenvolvimento de Software",
  "descricao": "Processo de desenvolvimento de aplicações",
  "area_id": 1,
  "processo_pai_id": null,
  "sistemas_ferramentas": ["Git", "VS Code", "PostgreSQL", "Node.js"],
  "area": {
    "id": 1,
    "nome": "TI",
    "descricao": "Área de Tecnologia da Informação"
  }
}
```

#### GET /api/processos/arvore/:areaId?/:processoId?
Busca a árvore de processos de uma área ou a partir de um processo específico.

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Desenvolvimento de Software",
    "descricao": "Processo de desenvolvimento de aplicações",
    "area_id": 1,
    "processo_pai_id": null,
    "sistemas_ferramentas": ["Git", "VS Code", "PostgreSQL", "Node.js"],
    "area": {
      "id": 1,
      "nome": "TI",
      "descricao": "Área de Tecnologia da Informação"
    },
    "subprocessos": [
      {
        "id": 2,
        "nome": "Análise de Requisitos",
        "descricao": "Processo de análise e documentação de requisitos",
        "area_id": 1,
        "processo_pai_id": 1,
        "sistemas_ferramentas": ["Jira", "Confluence", "Draw.io"],
        "area": {
          "id": 1,
          "nome": "TI",
          "descricao": "Área de Tecnologia da Informação"
        },
        "processo_pai": {
          "id": 1,
          "nome": "Desenvolvimento de Software",
          "descricao": "Processo de desenvolvimento de aplicações"
        }
      }
    ]
  }
]
```

#### POST /api/processos
Cria um novo processo.

**Request:**
```json
{
  "nome": "Desenvolvimento de Software",
  "descricao": "Processo de desenvolvimento de aplicações",
  "area_id": 1,
  "processo_pai_id": null,
  "sistemas_ferramentas": ["Git", "VS Code", "PostgreSQL", "Node.js"]
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Desenvolvimento de Software",
  "descricao": "Processo de desenvolvimento de aplicações",
  "area_id": 1,
  "processo_pai_id": null,
  "sistemas_ferramentas": ["Git", "VS Code", "PostgreSQL", "Node.js"],
  "area": {
    "id": 1,
    "nome": "TI",
    "descricao": "Área de Tecnologia da Informação"
  }
}
```

#### PUT /api/processos/:id
Atualiza um processo existente.

**Request:**
```json
{
  "nome": "Desenvolvimento de Software",
  "descricao": "Processo de desenvolvimento e manutenção de aplicações",
  "area_id": 1,
  "processo_pai_id": null,
  "sistemas_ferramentas": ["Git", "VS Code", "PostgreSQL", "Node.js", "Docker"]
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Desenvolvimento de Software",
  "descricao": "Processo de desenvolvimento e manutenção de aplicações",
  "area_id": 1,
  "processo_pai_id": null,
  "sistemas_ferramentas": ["Git", "VS Code", "PostgreSQL", "Node.js", "Docker"],
  "area": {
    "id": 1,
    "nome": "TI",
    "descricao": "Área de Tecnologia da Informação"
  }
}
```

#### DELETE /api/processos/:id
Remove um processo.

**Resposta:**
```json
{
  "message": "Processo removido com sucesso"
}
```

## Exemplos de Payload

### Área
```