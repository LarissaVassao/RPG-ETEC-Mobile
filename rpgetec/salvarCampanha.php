<?php 
require_once("conexao.php");
$tabela = 'campanha';

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$descricao = $input['descricao'] ?? '';
$senha = password_hash($input['senha']);

try {
    $res = $pdo->prepare("INSERT INTO $tabela SET nome = :nome, descricao = :descricao, senha = :senha");	
    $res->bindValue(":nome", $nome);
    $res->bindValue(":descricao", $descricao);
    $res->bindValue(":senha", $senha);
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
