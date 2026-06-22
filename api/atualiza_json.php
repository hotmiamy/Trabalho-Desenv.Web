<?php

require "../includes/functions.php";

header("Content-Type: application/json");

$data = readJsonInput();

// Validar se ID e nome foram enviados
if (!isset($data["id"]) || !isset($data["name"])) {
    jsonResponse([
        "success" => false,
        "error" => "ID e nome são obrigatórios"
    ]);
    exit;
}

try {
    // Atualizar o time no banco
    $updated = updateTeamInDB($data["id"], $data["name"]);
    
    if ($updated) {
        jsonResponse([
            "success" => true,
            "message" => "Time atualizado com sucesso"
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
        "error" => "Erro ao atualizar time: " . $e->getMessage()
    ]);
}