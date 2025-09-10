<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_campanha = $_GET['id_campanha'] ?? '';

if ($id_campanha === '') {
    echo json_encode(['success' => false,
        'error' => 'id_campanha not provided']);
    exit;
}

try {
	$queryStr = "SELECT * FROM personagem WHERE id_campanha = :id_campanha";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_campanha', $id_campanha);
    $query->execute();
    $res = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $res
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
