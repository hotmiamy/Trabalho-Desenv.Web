<?php

require "../includes/functions.php";

header("Content-Type: application/json");

try {
    // Listar todos os times do banco
    $teams = getTeamsFromDB();
    
    jsonResponse($teams);
} catch (Exception $e) {
    jsonResponse([
        "success" => false,
        "error" => "Erro ao listar times: " . $e->getMessage()
    ]);
}