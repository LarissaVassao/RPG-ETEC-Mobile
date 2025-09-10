<?php 

include_once('conexao.php');

$id = $_GET['id'] ?? '';
$senha = $_GET['senha'] ?? '';


    $queryStr = "SELECT senha FROM campanha WHERE id = :id";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id', $id);
    $query->execute();
    $res = $query->fetch(PDO::FETCH_ASSOC);


    if ($res && password_verify($senha, $res['senha'])) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'res' => $res]);
}
?>