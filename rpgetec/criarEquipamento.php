<?php
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$id_personagem = $input['id_personagem'] ?? '';
$nome = $input['nome'] ?? '';
$tipo = $input['tipo'] ?? 'item';
$preco = $input['preco'] ?? 0;
$volume = $input['volume'] ?? 0;
$descricao = $input['descricao'] ?? '';
$requisito = $input['requisito'] ?? '';
$dano = $input['dano'] ?? '';
$critico = $input['critico'] ?? '';

if ($id_personagem == '' || $nome == '') {
    echo json_encode([
        'success' => false,
        'error' => 'id_personagem e nome são obrigatórios'
    ]);
    exit;
}

try {
    $queryStr = "INSERT INTO equipamento 
                (id_personagem, nome, tipo, preco, volume, descricao, requisito, dano, critico) 
                VALUES 
                (:id_personagem, :nome, :tipo, :preco, :volume, :descricao, :requisito, :dano, :critico)";
    
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_personagem', $id_personagem);
    $query->bindParam(':nome', $nome);
    $query->bindParam(':tipo', $tipo);
    $query->bindParam(':preco', $preco);
    $query->bindParam(':volume', $volume);
    $query->bindParam(':descricao', $descricao);
    $query->bindParam(':requisito', $requisito);
    $query->bindParam(':dano', $dano);
    $query->bindParam(':critico', $critico);
    
    $query->execute();

    $id_equipamento = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'Equipamento criado com sucesso',
        'id' => $id_equipamento
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao criar equipamento: ' . $e->getMessage()
    ]);
}
?>