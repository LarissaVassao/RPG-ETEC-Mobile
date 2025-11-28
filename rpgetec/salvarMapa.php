<?php 
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$id_campanha = $input['id_campanha'] ?? ''; // Corrigido: era $campanha
$largura = $input['largura'] ?? '';
$altura = $input['altura'] ?? '';
$cellSize = $input['cellSize'] ?? '';

if (empty($nome) || empty($id_campanha) || empty($largura) || empty($altura) || empty($cellSize)) {
    echo json_encode([
        'mensagem' => 'Todos os campos são obrigatórios.',
        'sucesso' => false
    ]);
    exit;
}

try {
    $res = $pdo->prepare("INSERT INTO mapa (nome, id_campanha, largura, altura, cellSize) 
                         VALUES (:nome, :id_campanha, :largura, :altura, :cellSize)");	
    
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
        'mensagem' => 'Mapa criado com sucesso!',
        'sucesso' => true,
        'id' => $lastId 
    ]);
} catch (Exception $e) {
     echo json_encode([
         'mensagem' => 'Erro ao salvar: ' . $e->getMessage(),
         'sucesso' => false
     ]);
}
?>