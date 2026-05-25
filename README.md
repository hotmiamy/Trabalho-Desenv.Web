# Trabalho de Desenvolvimento Web

## Descrição
Projeto simples de cadastro e gerenciamento de chaves utilizando front-end em HTML/CSS/JavaScript e back-end em PHP com armazenamento em arquivo JSON.

## Funcionalidades
- Cadastro de times e dados relacionados
- Listagem de registros existentes
- Atualização e exclusão de informações
- Integração com API PHP que manipula arquivo JSON

## Estrutura do projeto
- `cadastro.html` - formulário de cadastro
- `chaves.html` - interface de gerenciamento de chaves
- `inicial.html` - página inicial
- `css/` - estilos das páginas
- `js/` - scripts de interação e requisições AJAX
- `api/` - endpoints PHP para CRUD em JSON
- `data/` - arquivo `times.json` com dados salvos
- `includes/functions.php` - funções auxiliares para o back-end
- `banco de dados/schema.sql` - esquema de banco de dados (se for necessário usar MySQL)

## Instalação
1. Copie o projeto para a pasta do servidor web (por exemplo, `htdocs` ou `www`).
2. Certifique-se de ter PHP instalado.
3. Ajuste permissões de escrita na pasta `data/` para que o PHP consiga criar/atualizar `times.json`.
4. Abra `inicial.html` no navegador ou acesse via servidor local.

> Observação: este projeto não possui uma única página que exibe todo o sistema automaticamente. Ele é composto por páginas separadas (`inicial.html`, `cadastro.html`, `chaves.html`) que funcionam pelo servidor local.

## Como usar
1. Abra `inicial.html` para navegar entre as páginas.
2. Use `cadastro.html` para adicionar novos dados.
3. Acesse `chaves.html` para ver, editar ou excluir registros existentes.

## Observações
- O back-end usa arquivo JSON (`data/times.json`) para armazenar dados.
- Os scripts PHP em `api/` realizam as operações de criar, listar, atualizar e deletar.
- Caso use servidor Apache, verifique se o PHP está ativo e se a pasta `data/` tem permissão de escrita.

## Contato
Projeto desenvolvido para a disciplina de Desenvolvimento Web.
