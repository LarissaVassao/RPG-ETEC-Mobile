<?php 
require_once("conexao.php");
$tabela = 'usuario';

$postjson = json_decode(file_get_contents('php://input'), true);

$nome = @$postjson['nome'];
$email = @$postjson['email'];
$senha = @$postjson['senha'];


$res = $pdo->prepare("INSERT INTO $tabela SET nome = :nome, classe = :classe, raca = :raca, idade = :idade, nivel = :nivel");	


$res->bindValue(":nome", "$nome");
$res->bindValue(":email", "$email");
$res->bindValue(":senha", "$senha");


$res->execute();

$result = json_encode(array('mensagem'=>'Salvo com sucesso!', 'sucesso'=>true));

echo $result;

?>