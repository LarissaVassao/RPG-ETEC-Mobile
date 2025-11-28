<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_campanha = $_GET['id_campanha'] ?? '';
$id_usuario = $_GET['id_usuario'] ?? '';
$mestre = $_GET['mestre'] ?? '';

if ($id_campanha == '') {
    echo json_encode(['success' => false,
        'error' => 'id_campanha not provided']);
    exit;
}

if($mestre == 1){
try {
    $queryStr = "SELECT id, nome, profileImage, id_usuario FROM personagem WHERE id_campanha = :id_campanha"; // ← ADICIONADO id_usuario
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_campanha', $id_campanha);
    $query->execute();
    $res = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'personagens' => $res 
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
}
else{
    try {
    $queryStr = "SELECT id, nome, profileImage, id_usuario FROM personagem WHERE id_campanha = :id_campanha AND id_usuario = :id_usuario"; // ← ADICIONADO id_usuario
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_campanha', $id_campanha);
    $query->bindParam(':id_usuario', $id_usuario);
    $query->execute();
    $res = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'personagens' => $res 
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
}
?>