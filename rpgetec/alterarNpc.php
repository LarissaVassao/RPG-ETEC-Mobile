<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_npc = $_GET['id_npc'] ?? '';
$atributo = $_GET['atributo'] ?? '';
$valor = $_GET['valor'] ?? '';

if ($id_npc == '' || $atributo == '') {
    echo json_encode([
        'success' => false,
        'error' => 'Parâmetros incompletos'
    ]);
    exit;
}

// Lista de atributos permitidos para atualização
try {
    $queryStr = "UPDATE npc SET $atributo = :valor WHERE id = :id_npc";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':valor', $valor);
    $query->bindParam(':id_npc', $id_npc);
    $query->execute();

    echo json_encode([
        'success' => true,
        'message' => 'NPC atualizado com sucesso'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>