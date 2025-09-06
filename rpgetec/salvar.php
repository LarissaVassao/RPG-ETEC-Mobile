<?php 
require_once("conexao.php");
$tabela = 'usuario';

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['user'] ?? '';
$email = $input['email'] ?? '';
$senhaBase = $input['senha'] ?? '';

$senha = password_hash($senhaBase, PASSWORD_DEFAULT);

$res = $pdo->prepare("INSERT INTO $tabela SET nome = :nome, email = :email, senha = :senha");	


$res->bindValue(":nome", "$nome");
$res->bindValue(":email", "$email");
$res->bindValue(":senha", "$senha");


$res->execute();

$result = json_encode(array('mensagem'=>'Salvo com sucesso!', 'sucesso'=>true));

echo $result;

?>