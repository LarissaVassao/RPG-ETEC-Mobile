<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_campanha = $_GET['id_campanha'] ?? '';
$id_usuario = $_GET['id_usuario'] ?? '';


if ($id_campanha == '') {
    echo json_encode(['success' => false, 'error' => 'campanha not provided']);
    exit;
}
if ($id_usuario == '') {
    echo json_encode(['success' => false, 'error' => 'usuario not provided']);
    exit;
}
try {
	$queryStr = "SELECT mestre FROM campanha_usuario WHERE id_campanha = :id_campanha AND id_usuario = :id_usuario";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_campanha', $id_campanha);
    $query->bindParam(':id_usuario', $id_usuario);

    $query->execute();
    $res = $query->fetch(PDO::FETCH_ASSOC);

    if($res){
    echo json_encode([
        'success' => true,
        'mestre' => $res['mestre']
    ]);
        exit;
    ;
}
else{
    echo json_encode([
        'success' => false,
        'error' => 'no matching record'
    ]);
    exit;
}
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
