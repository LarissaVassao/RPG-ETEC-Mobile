<?php
header('Content-Type: application/json; charset=utf-8');
include_once('conexao.php');

$id_personagem = $_GET['id_personagem'] ?? '';

if ($id_personagem == '') {
    echo json_encode([
        'success' => false,
        'error' => 'id_personagem not provided'
    ]);
    exit;
}

try {
    $queryStr = "SELECT * FROM equipamento WHERE id_personagem = :id_personagem ORDER BY nome";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_personagem', $id_personagem);
    $query->execute();
    $equipamentos = $query->fetchAll(PDO::FETCH_ASSOC);

    // Formatar os dados para o frontend
    $equipamentosFormatados = array_map(function($equip) {
        return [
            'id' => $equip['id'],
            'name' => $equip['nome'],
            'type' => $equip['tipo'],
            'price' => $equip['preco'],
            'weight' => $equip['volume'],
            'description' => $equip['descricao'] ?? '',
            'requirement' => $equip['requisito'] ?? '',
            'damage' => $equip['dano'] ?? '',
            'critical' => $equip['critico'] ?? ''
        ];
    }, $equipamentos);

    echo json_encode([
        'success' => true,
        'equipamentos' => $equipamentosFormatados
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>