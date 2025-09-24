<?php 
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$descricao = $input['descricao'] ?? '';
$senhaBase = $input['senha'] ?? '';
//$usuario = PEGAR O ID DO USUARIO LOGADO AQ.

$senha = password_hash($senhaBase, PASSWORD_DEFAULT);
try {
    $res = $pdo->prepare("INSERT INTO campanha SET nome = :nome, descricao = :descricao, senha = :senha");	
    $res->bindValue(":nome", $nome);
    $res->bindValue(":descricao", $descricao);
    $res->bindValue(":senha", $senha);
    $res->execute();

	//Inserir na tabela campanha_usuario
	//$res = $pdo->prepare("INSERT INTO campanha_usuario SET id_usuario = :usuario, id_campanha = $lastId, mestre = 1");	
    //$res->bindValue(":usuario", $usuario);
    //$res->execute();

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
} catch (Exception $e) {
     $result = json_encode([
         'mensagem' => 'Erro ao salvar: ' . $e->getMessage(),
         'sucesso' => false
     ]);
     echo $result;
 }
 ?>