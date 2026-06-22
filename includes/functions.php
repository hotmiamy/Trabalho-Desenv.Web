<?php

require "config.php";

// Ler dados do formulário (JSON)
function readJsonInput() {
    return json_decode(
        file_get_contents("php://input"),
        true
    );
}

// Retornar resposta em JSON
function jsonResponse($data) {
    header("Content-Type: application/json");
    echo json_encode($data);
}

// ===== FUNÇÕES DO BANCO DE DADOS =====

// Listar todos os times
function getTeamsFromDB() {
    global $pdo;
    $stmt = $pdo->query("SELECT id, nome AS name FROM times ORDER BY id ASC");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Criar um novo time
function createTeamInDB($name) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO times (nome) VALUES (:nome)");
    $stmt->execute([':nome' => $name]);
    
    // Retorna o ID do novo time
    return $pdo->lastInsertId();
}

// Atualizar um time
function updateTeamInDB($id, $name) {
    global $pdo;
    $stmt = $pdo->prepare("UPDATE times SET nome = :nome WHERE id = :id");
    return $stmt->execute([':nome' => $name, ':id' => $id]);
}

// Deletar um time
function deleteTeamInDB($id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM times WHERE id = :id");
    return $stmt->execute([':id' => $id]);
}