<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$data = json_decode(file_get_contents('php://input'), true);
$id_npc = $data['id_npc'] ?? '';

if ($id_npc == '') {
    echo json_encode([
        'success' => false,
        'error' => 'id_npc not provided'
    ]);
    exit;
}

try {
    // Primeiro, verificar se o NPC existe
    $checkQuery = $pdo->prepare("SELECT * FROM npc WHERE id = :id_npc");
    $checkQuery->bindParam(':id_npc', $id_npc);
    $checkQuery->execute();
    
    if ($checkQuery->rowCount() === 0) {
        echo json_encode([
            'success' => false,
            'error' => 'NPC não encontrado'
        ]);
        exit;
    }

    // Deletar o NPC
    $deleteQuery = $pdo->prepare("DELETE FROM npc WHERE id = :id_npc");
    $deleteQuery->bindParam(':id_npc', $id_npc);
    $deleteQuery->execute();

    echo json_encode([
        'success' => true,
        'message' => 'NPC deletado com sucesso'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>