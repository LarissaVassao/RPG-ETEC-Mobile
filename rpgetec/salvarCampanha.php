<?php 
require_once("conexao.php");
$tabela = 'campanha';

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$descricao = $input['descricao'] ?? '';

try {
    $res = $pdo->prepare("INSERT INTO $tabela SET nome = :nome, descricao = :descricao");	
    $res->bindValue(":nome", $nome);
    $res->bindValue(":descricao", $descricao);
    $res->execute();

    $lastId = $pdo->lastInsertId();

    $result = json_encode([
        'mensagem' => 'Salvo com sucesso!',
        'sucesso' => true,
        'id' => $lastId 
    ]);
    echo $result;

} catch (Exception $e) {
    $result = json_encode([
        'mensagem' => 'Erro ao salvar: ' . $e->getMessage(),
        'sucesso' => false
    ]);
    echo $result;
}
?>
