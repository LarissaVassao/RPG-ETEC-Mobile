<?php
header('Content-Type: application/json; charset=utf-8');
include_once('conexao.php');

$id_mapa = $_GET['id_mapa'] ?? '';

if ($id_mapa == '') {
    echo json_encode(['success' => false, 'error' => 'id_mapa not provided']);
    exit;
}

try {
    $queryStr = "SELECT t.*, p.nome, p.tokenImage 
                 FROM token t 
                 LEFT JOIN personagem p ON t.id_personagem = p.id 
                 LEFT JOIN npc n ON t.id_npc = n.id 
                 WHERE t.id_mapa = :id_mapa";
    
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_mapa', $id_mapa);
    $query->execute();
    $tokens = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'tokens' => $tokens
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>