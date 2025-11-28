<?php
header('Content-Type: application/json; charset=utf-8');
include_once('conexao.php');

$input = json_decode(file_get_contents('php://input'), true);

$id_mapa = $input['id_mapa'] ?? '';
$id_personagem = $input['id_personagem'] ?? null;
$id_npc = $input['id_npc'] ?? null;
$positionX = $input['positionX'] ?? 0;
$positionY = $input['positionY'] ?? 0;
$tokenImage = $input['tokenImage'] ?? '';

if ($id_mapa == '') {
    echo json_encode(['success' => false, 'error' => 'id_mapa not provided']);
    exit;
}

try {
    $queryStr = "INSERT INTO token (id_mapa, id_personagem, id_npc, positionX, positionY, tokenImage) 
                 VALUES (:id_mapa, :id_personagem, :id_npc, :positionX, :positionY, :tokenImage)";
    
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_mapa', $id_mapa);
    $query->bindParam(':id_personagem', $id_personagem);
    $query->bindParam(':id_npc', $id_npc);
    $query->bindParam(':positionX', $positionX);
    $query->bindParam(':positionY', $positionY);
    $query->bindParam(':tokenImage', $tokenImage);
    $query->execute();

    $id_token = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'id' => $id_token,
        'message' => 'Token adicionado com sucesso'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>