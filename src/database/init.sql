-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    endereco TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_estoque INTEGER NOT NULL DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Vendas
CREATE TABLE IF NOT EXISTS vendas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2) NOT NULL,
    produto_ids TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente',
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Criar tabela de áreas
CREATE TABLE IF NOT EXISTS areas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    responsavel VARCHAR(100) NOT NULL
);

-- Criar tabela de processos
CREATE TABLE IF NOT EXISTS processos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    area_id INTEGER REFERENCES areas(id),
    processo_pai_id INTEGER REFERENCES processos(id),
    sistemas TEXT[],
    responsaveis TEXT[],
    documentacao TEXT[]
);

-- Criar índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_processos_area_id ON processos(area_id);
CREATE INDEX IF NOT EXISTS idx_processos_processo_pai_id ON processos(processo_pai_id);
