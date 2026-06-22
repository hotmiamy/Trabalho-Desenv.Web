<?php

require "includes/config.php";

try {
    // Verificar se a tabela 'times' já existe
    $stmt = $pdo->query("SELECT 1 FROM information_schema.tables WHERE table_name = 'times'");
    $tableExists = $stmt->fetch();
    
    if (!$tableExists) {
        // Se não existir, criar a tabela
        $pdo->exec("
            CREATE TABLE times (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                vitorias INT DEFAULT 0,
                derrotas INT DEFAULT 0,  
                gols_marcados INT DEFAULT 0,
                gols_sofridos INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        echo "✅ Banco de dados e tabelas criados com sucesso!<br>";
        echo "Redirecionando em 2 segundos...";
        sleep(2);
    }
    
    // Redirecionar para a página inicial
    header("Location: inicial.html");
    exit;
    
} catch (Exception $e) {
    echo "❌ Erro ao criar tabelas: " . $e->getMessage();
    exit;
}
?>
