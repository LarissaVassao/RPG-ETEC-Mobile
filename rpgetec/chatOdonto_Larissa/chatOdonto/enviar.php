<?php

include_once('conexao.php');
// Conexão com banco
$conn = new mysqli("localhost", "root", "", "chatodonto_db");

// Pega JSON enviado pelo React Native
$input = json_decode(file_get_contents("php://input"), true);
$user = $conn->real_escape_string($input['user']);
$mensagem = $conn->real_escape_string($input['mensagem']);
$campanha = $conn->real_escape_string($input['campanha']);


// Insere mensagem no banco
$sql = "INSERT INTO chat (user_id, mensagem, campanha_id) VALUES ('$user', '$mensagem', '$campanha')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["sucesso" => true, "id" => $conn->insert_id]);
} else {
    echo json_encode(["erro" => "Erro ao salvar mensagem: " . $conn->error]);
}

$conn->close();
