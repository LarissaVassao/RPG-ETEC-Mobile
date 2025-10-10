<?php
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$id_equipamento = $input['id_equipamento'] ?? '';
$nome = $input['nome'] ?? '';
$tipo = $input['tipo'] ?? 'item';
$preco = $input['preco'] ?? 0;
$volume = $input['volume'] ?? 0;
$descricao = $input['descricao'] ?? '';
$requisito = $input['requisito'] ?? '';
$dano = $input['dano'] ?? '';
$critico = $input['critico'] ?? '';

if ($id_equipamento == '' || $nome == '') {
    echo json_encode([
        'success' => false,
        'error' => 'id_equipamento e nome são obrigatórios'
    ]);
    exit;
}

try {
    $queryStr = "UPDATE equipamento SET 
                nome = :nome,
                tipo = :tipo,
                preco = :preco,
                volume = :volume,
                descricao = :descricao,
                requisito = :requisito,
                dano = :dano,
                critico = :critico
                WHERE id = :id_equipamento";
    
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_equipamento', $id_equipamento);
    $query->bindParam(':nome', $nome);
    $query->bindParam(':tipo', $tipo);
    $query->bindParam(':preco', $preco);
    $query->bindParam(':volume', $volume);
    $query->bindParam(':descricao', $descricao);
    $query->bindParam(':requisito', $requisito);
    $query->bindParam(':dano', $dano);
    $query->bindParam(':critico', $critico);
    
    $query->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Equipamento atualizado com sucesso'
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao atualizar equipamento: ' . $e->getMessage()
    ]);
}
?>