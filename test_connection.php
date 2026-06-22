<?php

require "includes/config.php";

// Testar a conexão
try {
    $stmt = $pdo->query("SELECT * FROM times");
    $teams = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "✅ Conexão bem-sucedida!\n";
    echo "Times no banco: " . count($teams) . "\n";
    
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n";
}
