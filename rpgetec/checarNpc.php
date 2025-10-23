<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_npc = $_GET['id_npc'] ?? '';

if ($id_npc == '') {
    echo json_encode([
        'success' => false,
        'error' => 'id_npc not provided'
    ]);
    exit;
}

try {
    $queryStr = "SELECT * FROM npc WHERE id = :id_npc";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_npc', $id_npc);
    $query->execute();
    
    $npc = $query->fetch(PDO::FETCH_ASSOC);

    if ($npc) {
        echo json_encode([
            'success' => true,
            'npc' => $npc
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'NPC não encontrado'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>