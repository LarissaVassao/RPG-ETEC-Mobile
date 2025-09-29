<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Conexão com banco
$conn = new mysqli("localhost", "root", "", "chatodonto_db");
if ($conn->connect_error) {
    die(json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]));
}

// Atualiza todas as mensagens "enviadas" para "entregue"
$conn->query("UPDATE mensagens SET status = 'entregue' WHERE status = 'enviado'");

// Busca todas as mensagens
$sql = "SELECT id, paciente, mensagem, data_hora, status FROM mensagens ORDER BY id DESC";
$result = $conn->query($sql);

$mensagens = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $mensagens[] = $row;
    }
}

echo json_encode($mensagens);
$conn->close();
