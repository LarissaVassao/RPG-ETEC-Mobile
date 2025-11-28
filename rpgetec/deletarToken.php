<?php
header('Content-Type: application/json; charset=utf-8');
include_once('conexao.php');

$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'] ?? '';

if ($id == '') {
    echo json_encode(['success' => false, 'error' => 'id not provided']);
    exit;
}

try {
    $queryStr = "DELETE FROM token WHERE id = :id";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id', $id);
    $query->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Token deletado com sucesso'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>