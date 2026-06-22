# Trabalho de Desenvolvimento Web - Simulador de Campeonato

## 📋 Descrição

Projeto de cadastro e gerenciamento de times para simulação de partidas dinâmicas. O sistema utiliza front-end em HTML/CSS/JavaScript e back-end em PHP com banco de dados PostgreSQL.

**Período:** Entrega 3 (22/06/2026)  
**Disciplina:** Desenvolvimento Web

---

## ✅ Entregas Realizadas

### Entrega 1 ✅ — HTML + CSS
- `inicial.html` - Página inicial com navegação
- `cadastro.html` - Formulário de cadastro de times
- `chaves.html` - Interface de gerenciamento de chaves
- Estilos CSS completos em `css/`

### Entrega 2 ✅ — JS + PHP (JSON)
- API PHP completa com CRUD (criar, listar, atualizar, deletar)
- JavaScript com requisições AJAX
- Armazenamento em `data/times.json`

### Entrega 3 ✅ — Banco de Dados (PostgreSQL)
- Schema SQL corrigido em `banco de dados/schema.sql`
- Migração de JSON para PostgreSQL
- `config.php` com conexão PDO
- Reescrita de `functions.php` com queries SQL
- 4 endpoints da API reformulados

---

## 🔧 Requisitos

Antes de rodar o projeto, você precisa ter instalado:

- **PHP 7.4+** (com extensão PostgreSQL)
- **PostgreSQL 10+**
- **Git** (para clonar o repositório)
- **Navegador web moderno** (Chrome, Firefox, Edge, etc)

### Verificar se você tem tudo instalado:

```bash
# Verificar PHP
php --version

# Verificar PostgreSQL
psql --version

# Verificar Git
git --version
```

---

## 📦 Instalação

### 1️⃣ Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd Trabalho-Desenv.Web
```

### 2️⃣ Instalar extensão PostgreSQL para PHP (se necessário)

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install php-pgsql -y
```

**macOS (com Homebrew):**
```bash
brew install php-pgsql
```

**Windows:**
- Descomente a linha `extension=pdo_pgsql` no arquivo `php.ini`

### 3️⃣ Configurar o banco de dados

Criar arquivo `.env` na raiz do projeto (copiar de `.env.example`):

```bash
cp .env.example .env
```

**Editar `.env` com suas credenciais PostgreSQL:**
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=projeto_times
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha
```

### 4️⃣ Criar banco de dados e tabela

Entre no PostgreSQL:

```bash
sudo -i -u postgres psql
```

Dentro do PostgreSQL, execute:

```sql
-- Criar o banco de dados
CREATE DATABASE projeto_times;

-- Conectar ao banco
\c projeto_times

-- Tabela de times
CREATE TABLE times (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    vitorias INT,
    derrotas INT,  
    gols_marcados INT,
    gols_sofridos INT
);

-- Criar usuário (se não existir)
CREATE USER seu_usuario_postgres WITH PASSWORD 'sua_senha';

-- Dar permissões
GRANT ALL PRIVILEGES ON DATABASE projeto_times TO seu_usuario_postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO seu_usuario_postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO seu_usuario_postgres;

-- Sair
\q
```

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Iniciar o servidor PHP

Na pasta do projeto, execute:

```bash
php -S localhost:8000
```

Você verá:
```
Development Server started at Mon Jun 22 14:20:00 2026
Listening on http://localhost:8000
```

### 2️⃣ Abrir no navegador

Acesse: **http://localhost:8000**

A página inicial vai carregar automaticamente! 🎉

### 3️⃣ Testar as funcionalidades

1. Clique em **"ir para cadastro dos times"**
2. Digite um nome de time e clique em **"Salvar"**
3. Teste:
   - ✅ **Criar** - Adicione novos times
   - ✅ **Listar** - Veja todos os times na tabela
   - ✅ **Editar** - Clique no botão "Editar" para renomear
   - ✅ **Deletar** - Clique no botão "Excluir" para remover

---

## 📁 Estrutura do Projeto

```
Trabalho-Desenv.Web/
├── .env                 # Variáveis de ambiente (NÃO fazer commit!)
├── .env.example         # Template de .env (para compartilhar)
├── .gitignore          # Arquivos ignorados pelo Git
├── index.php           # Redireciona para inicial.html
├── inicial.html        # Página inicial
├── cadastro.html       # Página de cadastro de times
├── chaves.html         # Página de gerenciamento de chaves
│
├── api/                # Endpoints da API PHP
│   ├── criar_json.php       # POST - Criar novo time
│   ├── listar_json.php      # GET  - Listar todos os times
│   ├── atualiza_json.php    # PUT  - Atualizar time
│   └── deleta_json.php      # DELETE - Deletar time
│
├── includes/           # Arquivos incluídos
│   ├── config.php           # Conexão com PostgreSQL
│   └── functions.php        # Funções SQL do backend
│
├── css/                # Estilos
│   ├── styles_inicial.css
│   ├── styles_cadastro.css
│   └── styles_chaves.css
│
├── js/                 # Scripts JavaScript
│   ├── cadastro.js          # Lógica de cadastro
│   └── chaves.js           # Lógica de chaves
│
├── banco de dados/     # Schema SQL
│   └── schema.sql           # Estrutura das tabelas
│
└── data/               # Dados (removido, agora usa BD)
    └── times.json          # (não é mais usado)
```

---

## 🔗 API Endpoints

Todos os endpoints retornam JSON e estão em `api/`:

### 1. **Listar todos os times** (GET)

```bash
curl http://localhost:8000/api/listar_json.php
```

**Resposta:**
```json
[
  { "id": 1, "name": "Flamengo" },
  { "id": 2, "name": "Vasco" }
]
```

### 2. **Criar novo time** (POST)

```bash
curl -X POST http://localhost:8000/api/criar_json.php \
  -H "Content-Type: application/json" \
  -d '{"name": "Palmeiras"}'
```

**Resposta:**
```json
{
  "success": true,
  "team": { "id": 3, "name": "Palmeiras" }
}
```

### 3. **Atualizar time** (PUT)

```bash
curl -X POST http://localhost:8000/api/atualiza_json.php \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "Flamengo RJ"}'
```

**Resposta:**
```json
{ "success": true, "message": "Time atualizado com sucesso" }
```

### 4. **Deletar time** (DELETE)

```bash
curl -X POST http://localhost:8000/api/deleta_json.php \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

**Resposta:**
```json
{ "success": true, "message": "Time deletado com sucesso" }
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **PHP** | 7.4+ | Backend |
| **PostgreSQL** | 10+ | Banco de dados |
| **JavaScript** | ES6+ | Frontend (AJAX) |
| **HTML** | 5 | Estrutura |
| **CSS** | 3 | Estilos |
| **PDO** | - | Driver de BD |

---

## 📝 Notas Importantes

### 🔐 Segurança

- **NÃO faça commit do arquivo `.env`** com suas credenciais reais
- Use variáveis de ambiente para produção
- Valide sempre os inputs do usuário
- Use prepared statements (já implementado com PDO)

### 🗄️ Banco de Dados

- O arquivo `data/times.json` não é mais usado
- Todos os dados estão agora no PostgreSQL
- Para resetar dados, delete a tabela e recrie via `schema.sql`

### 🐛 Troubleshooting

**Erro: "could not find driver"**
```bash
# Instale a extensão PostgreSQL para PHP
sudo apt-get install php-pgsql
```

**Erro: "connection refused"**
```bash
# Verifique se PostgreSQL está rodando
sudo service postgresql status

# Se não estiver, inicie:
sudo service postgresql start
```

**Erro: "permission denied"**
```bash
# Verifique as permissões do usuário no .env
# Execute novamente os GRANT no PostgreSQL
```

---

## 👨‍💻 Desenvolvido por

- **Bruno** - Frontend
- **Lucas** - API / Backend
- **João** - Banco de Dados / Integração

---

## 📚 Documentação Adicional

- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [PHP PDO](https://www.php.net/manual/en/book.pdo.php)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**© 2026 - Todos os direitos reservados**
