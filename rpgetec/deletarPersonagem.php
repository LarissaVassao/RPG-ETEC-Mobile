<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$data = json_decode(file_get_contents('php://input'), true);
$id_personagem = $data['id_personagem'] ?? '';

if ($id_personagem == '') {
    echo json_encode([
        'success' => false,
        'error' => 'id_personagem not provided'
    ]);
    exit;
}

try {
    // Primeiro, verificar se o personagem existe
    $checkQuery = $pdo->prepare("SELECT * FROM personagem WHERE id = :id_personagem");
    $checkQuery->bindParam(':id_personagem', $id_personagem);
    $checkQuery->execute();
    
    if ($checkQuery->rowCount() === 0) {
        echo json_encode([
            'success' => false,
            'error' => 'Personagem não encontrado'
        ]);
        exit;
    }

    // Deletar o personagem (as foreign keys cuidarão das deleções em cascata)
    $deleteQuery = $pdo->prepare("DELETE FROM personagem WHERE id = :id_personagem");
    $deleteQuery->bindParam(':id_personagem', $id_personagem);
    $deleteQuery->execute();

    echo json_encode([
        'success' => true,
        'message' => 'Personagem deletado com sucesso'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>