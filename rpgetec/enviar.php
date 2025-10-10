<?php

include_once('conexao.php');
// Conexão com banco

// Pega JSON enviado pelo React Native
$input = json_decode(file_get_contents("php://input"), true);
$user = $input['user'];
$mensagem = $input['mensagem'];
$id_campanha = $input['campanha'];


// Insere mensagem no banco
try{
    $res = $pdo->prepare("INSERT INTO chat (id_usuario, mensagem, id_campanha) VALUES (:user, :mensagem, :id_campanha)");	
    $res->bindValue(":user", $user);
    $res->bindValue(":id_campanha", $id_campanha);
    $res->bindValue(":mensagem", $mensagem);
    $res->execute();

if ($res->rowCount() === 0) {
    echo json_encode([
        'mensagem' => 'Nenhuma linha foi inserida.',
        'sucesso' => false
    ]);
    exit;
}
echo json_encode([
    'mensagem' => 'Salvo com sucesso!',
    'sucesso' => true,
]);

} catch (Exception $e) {
     $result = json_encode([
         'mensagem' => 'Erro ao salvar: ' . $e->getMessage(),
         'sucesso' => false
     ]);
     echo $result;
 }