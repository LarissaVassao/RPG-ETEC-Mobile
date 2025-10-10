<?php 
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$campanha = $input['id_campanha'] ?? '';
$largura = $input['largura'] ?? '';
$altura = $input['altura'] ?? ''?
$cellSize = $input['cellSize'] ?? ''?


try {
    $res = $pdo->prepare("INSERT INTO mapa SET nome = :nome, id_campanha = :id_campanha, largura = :largura, altura = :altura, cellSize = :cellSize");	
    $res->bindValue(":nome", $nome);
    $res->bindValue(":id_campanha", $id_campanha);
    $res->bindValue(":largura", $largura);
    $res->bindValue(":altura", $altura);
    $res->bindValue(":cellSize", $cellSize);

    $res->execute();

    $lastId = $pdo->lastInsertId();

// Error Check
if ($res->rowCount() === 0) {
    echo json_encode([
        'mensagem' => 'Nenhuma linha foi inserida.',
        'sucesso' => false
    ]);
    exit;
}

if ($lastId == 0) {
    echo json_encode([
        'mensagem' => 'Falha ao obter ID do mapa.',
        'sucesso' => false
    ]);
    exit;
}

echo json_encode([
    'mensagem' => 'Salvo com sucesso!',
    'sucesso' => true,
    'id' => $lastId 
]);
} catch (Exception $e) {
     $result = json_encode([
         'mensagem' => 'Erro ao salvar: ' . $e->getMessage(),
         'sucesso' => false
     ]);
     echo $result;
 }
 ?>