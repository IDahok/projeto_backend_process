-- Criar tabela de áreas
CREATE TABLE IF NOT EXISTS areas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Criar tabela de processos
CREATE TABLE IF NOT EXISTS processos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    area_id INTEGER REFERENCES areas(id),
    processo_pai_id INTEGER REFERENCES processos(id),
    sistemas_ferramentas TEXT[]
);

-- Criar índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_processos_area_id ON processos(area_id);
CREATE INDEX IF NOT EXISTS idx_processos_processo_pai_id ON processos(processo_pai_id);
