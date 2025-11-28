<?php
header('Content-Type: application/json; charset=utf-8');
include_once('conexao.php');

$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'] ?? '';
$positionX = $input['positionX'] ?? 0;
$positionY = $input['positionY'] ?? 0;

if ($id == '') {
    echo json_encode(['success' => false, 'error' => 'id not provided']);
    exit;
}

try {
    $queryStr = "UPDATE token SET positionX = :positionX, positionY = :positionY WHERE id = :id";
    
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id', $id);
    $query->bindParam(':positionX', $positionX);
    $query->bindParam(':positionY', $positionY);
    $query->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Posição do token atualizada'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>