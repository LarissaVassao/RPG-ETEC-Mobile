<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "chatodonto_db");
if ($conn->connect_error) {
    die(json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]));
}

$input = json_decode(file_get_contents("php://input"), true);
$paciente = $conn->real_escape_string($input['paciente']);

$sql = "UPDATE mensagens SET status = 'lido' WHERE paciente != '$paciente' AND status = 'entregue'";
$conn->query($sql);

echo json_encode(["sucesso" => true]);
$conn->close();
