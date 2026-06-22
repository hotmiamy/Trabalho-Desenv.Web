-- ============================================
-- SETUP DO BANCO DE DADOS (OPCIONAL)
-- ============================================
-- Este arquivo é opcional! As tabelas são criadas automaticamente 
-- ao acessar http://localhost:8000
-- 
-- Use este arquivo APENAS se preferir criar o banco manualmente:
-- sudo -i -u postgres psql
-- \i /caminho/para/setup.sql

CREATE DATABASE IF NOT EXISTS projeto_times;
\c projeto_times

CREATE TABLE IF NOT EXISTS times (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    vitorias INT DEFAULT 0,
    derrotas INT DEFAULT 0,  
    gols_marcados INT DEFAULT 0,
    gols_sofridos INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\echo 'Setup concluído! Banco de dados e tabelas criados.'
