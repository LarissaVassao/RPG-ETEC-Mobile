<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_personagem = $_GET['id_personagem'] ?? '';
$atributo = $_GET['atributo'] ?? '';
$pericia = $_GET['pericia'] ?? '';
$valor = $_GET['valor'] ?? '';

if ($id_personagem == '') {
    echo json_encode(['success' => false, 'error' => 'id_personagem not provided']);
    exit;
}
else if ($valor == '') {
    echo json_encode(['success' => false, 'error' => 'valor not provided']);
    exit;
}
if($atributo != ''){
    try{
        $queryStr = "UPDATE personagem SET :atributo = :valor WHERE id = :id_personagem" ;
        $query = $pdo->prepare($queryStr);
        $query->bindParam(':id_personagem', $id_personagem);
        $query->bindParam(':atributo', $atributo);
        $query->bindParam(':valor', $valor);
        $query->execute();
    }
    catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
} 
else if($pericia != ''){
    
}
else{
    echo json_encode(['success' => false, 'error' => 'neither atributo nor pericia provided']);
}

?>
