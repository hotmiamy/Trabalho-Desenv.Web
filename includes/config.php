<?php

// ===== CARREGAR VARIÁVEIS DE AMBIENTE (.env) =====

$envFile = __DIR__ . "/../.env";

if (file_exists($envFile)) {
    $env = parse_ini_file($envFile);
} else {
    // Valores padrão se .env não existir
    $env = [
        'DB_HOST' => 'localhost',
        'DB_PORT' => '5432',
        'DB_NAME' => 'projeto_times',
        'DB_USER' => 'joao_app',
        'DB_PASSWORD' => 'senha123'
    ];
}

// ===== CONFIGURAÇÃO DO BANCO DE DADOS =====

$host = $env['DB_HOST'];
$port = $env['DB_PORT'];
$database = $env['DB_NAME'];
$user = $env['DB_USER'];
$password = $env['DB_PASSWORD'];

try {
    $pdo = new PDO(
        "pgsql:host=$host;port=$port;dbname=$database",
        $user,
        $password,
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
    );
} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode([
        "error" => "Erro ao conectar no banco: " . $e->getMessage()
    ]));
}