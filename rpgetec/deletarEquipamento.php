<?php
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$id_equipamento = $input['id_equipamento'] ?? '';

if ($id_equipamento == '') {
    echo json_encode([
        'success' => false,
        'error' => 'id_equipamento é obrigatório'
    ]);
    exit;
}

try {
    $queryStr = "DELETE FROM equipamento WHERE id = :id_equipamento";
    
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_equipamento', $id_equipamento);
    $query->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Equipamento deletado com sucesso'
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao deletar equipamento: ' . $e->getMessage()
    ]);
}
?>