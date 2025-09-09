<?php 
require_once("conexao.php");
$tabela = 'campanha';

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$descricao = $input['descricao'] ?? '';
$senhaBase = $input['senha'] ?? '';

$senha = password_hash($senhaBase, PASSWORD_DEFAULT);
try {
    $res = $pdo->prepare("INSERT INTO $tabela SET nome = :nome, descricao = :descricao, senha = :senha");	
    $res->bindValue(":nome", $nome);
    $res->bindValue(":descricao", $descricao);
    $res->bindValue(":senha", $senha);
    $res->execute();

// Error Check
if ($res->rowCount() === 0) {
    echo json_encode([
        'mensagem' => 'Nenhuma linha foi inserida.',
        'sucesso' => false
    ]);
    exit;
}

$lastId = $pdo->lastInsertId();
if ($lastId == 0) {
    echo json_encode([
        'mensagem' => 'Falha ao obter ID da campanha.',
        'sucesso' => false
    ]);
    exit;
}

echo json_encode([
    'mensagem' => 'Salvo com sucesso!',
    'sucesso' => true,
    'id' => $lastId 
]);
//     $lastId = $pdo->lastInsertId();

//     $result = json_encode([
//         'mensagem' => 'Salvo com sucesso!',
//         'sucesso' => true,
//         'id' => $lastId 
//     ]);
//     echo $result;
} catch (Exception $e) {
     $result = json_encode([
         'mensagem' => 'Erro ao salvar: ' . $e->getMessage(),
         'sucesso' => false
     ]);
     echo $result;
 }
 ?>

