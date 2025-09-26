<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id = $_GET['id_mapa'] ?? '';

if ($id == '') {
    echo json_encode(['success' => false, 'error' => 'id_mapa not provided']);
    exit;
}
try {
	$queryStr = "SELECT * FROM mapa WHERE id = :id";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id', $id);
    $query->execute();
    $res = $query->fetch(PDO::FETCH_ASSOC);
    echo json_encode([
        'success' => true,
        'mapa' => $res 
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
