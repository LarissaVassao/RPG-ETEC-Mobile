<?php
include_once('conexao.php');

$campanha = $_GET['id_campanha'] ?? '';

try {
    $query = $pdo->prepare(" SELECT 
            c.id,
            c.id_usuario,
            u.nome AS usuario,
            c.mensagem,
            c.data_hora
        FROM chat c
        INNER JOIN usuario u ON c.id_usuario = u.id
        WHERE c.id_campanha = :campanha
");
    $query->bindParam(':campanha', $campanha, PDO::PARAM_INT);
    $query->execute();
    $res = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['mensagens' => $res ?: []]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
