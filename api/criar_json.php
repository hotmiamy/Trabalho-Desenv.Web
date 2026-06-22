<?php

require "../includes/functions.php";

header("Content-Type: application/json");

$data = readJsonInput();

// Validar se o nome foi enviado
if (!isset($data["name"]) || empty($data["name"])) {
    jsonResponse([
        "success" => false,
        "error" => "Nome é obrigatório"
    ]);
    exit;
}

try {
    // Criar o novo time no banco
    $newId = createTeamInDB($data["name"]);
    
    jsonResponse([
        "success" => true,
        "team" => [
            "id" => $newId,
            "name" => $data["name"]
        ]
    ]);
} catch (Exception $e) {
    jsonResponse([
        "success" => false,
        "error" => "Erro ao criar time: " . $e->getMessage()
    ]);
}