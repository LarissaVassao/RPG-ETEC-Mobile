<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Conexão com banco
$conn = new mysqli("localhost", "root", "", "chatodonto_db");
if ($conn->connect_error) {
    die(json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]));
}

// Pega JSON enviado pelo React Native
$input = json_decode(file_get_contents("php://input"), true);
$paciente = $conn->real_escape_string($input['paciente']);
$mensagem = $conn->real_escape_string($input['mensagem']);

// Insere mensagem no banco
$sql = "INSERT INTO mensagens (paciente, mensagem, status) VALUES ('$paciente', '$mensagem', 'enviado')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["sucesso" => true, "id" => $conn->insert_id]);
} else {
    echo json_encode(["erro" => "Erro ao salvar mensagem: " . $conn->error]);
}

$conn->close();
