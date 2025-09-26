<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_personagem = $_GET['id_personagem'] ?? '';

if ($id_personagem== '') {
    echo json_encode(['success' => false, 'error' => 'id_personagem not provided']);
    exit;
}
try {
	$queryStr = "SELECT * FROM personagem WHERE id = :id_personagem";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_personagem', $id_personagem);
    $query->execute();
    $res = $query->fetch(PDO::FETCH_ASSOC);
    echo json_encode([
        'success' => true,
        'personagem' => $res 
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
