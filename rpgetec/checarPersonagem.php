<?php
header('Content-Type: application/json; charset=utf-8');
include_once('conexao.php');

$id_personagem = $_GET['id_personagem'] ?? '';

if ($id_personagem == '') {
    echo json_encode(['success' => false, 'error' => 'id_personagem not provided']);
    exit;
}

try {
    // Buscar personagem
    $queryPersonagem = $pdo->prepare("SELECT * FROM personagem WHERE id = :id_personagem");
    $queryPersonagem->bindParam(':id_personagem', $id_personagem);
    $queryPersonagem->execute();
    $personagem = $queryPersonagem->fetch(PDO::FETCH_ASSOC);

    if (!$personagem) {
        echo json_encode([
            'success' => false,
            'error' => 'Personagem não encontrado.'
        ]);
        exit;
    }

    // Buscar perícias associadas ao personagem
    $queryPericias = $pdo->prepare("
        SELECT p.nome, pp.valor 
        FROM personagem_pericia pp
        INNER JOIN pericia p ON pp.id_pericia = p.id
        WHERE pp.id_personagem = :id_personagem
    ");
    $queryPericias->bindParam(':id_personagem', $id_personagem);
    $queryPericias->execute();

    $pericias = [];
    while ($row = $queryPericias->fetch(PDO::FETCH_ASSOC)) {
        $pericias[$row['nome']] = (int)$row['valor'];
    }

    echo json_encode([
        'success' => true,
        'personagem' => $personagem,
        'pericias' => $pericias
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
