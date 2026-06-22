<?php

require "../includes/functions.php";

header("Content-Type: application/json");

$data = readJsonInput();

// Validar se ID foi enviado
if (!isset($data["id"])) {
    jsonResponse([
        "success" => false,
        "error" => "ID é obrigatório"
    ]);
    exit;
}

try {
    // Deletar o time do banco
    $deleted = deleteTeamInDB($data["id"]);
    
    if ($deleted) {
        jsonResponse([
            "success" => true,
            "message" => "Time deletado com sucesso"
        ]);
    } else {
        jsonResponse([
            "success" => false,
            "error" => "Nenhum time encontrado com esse ID"
        ]);
    }
} catch (Exception $e) {
    jsonResponse([
        "success" => false,
        "error" => "Erro ao deletar time: " . $e->getMessage()
    ]);
}