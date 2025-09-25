<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_campanha = $_GET['id_campanha'] ?? '';
$mestre = $_GET['mestre'] ?? '';

if ($id_campanha == '') {
    echo json_encode(['success' => false,
        'error' => 'id_campanha not provided']);
    exit;
}

if ($mestre == '') {
    echo json_encode(['success' => false,
        'error' => 'mestre not provided']);
    exit;
}
// if ($mestre != 1) {
//     echo json_encode(['success' => true,
//         'mapas' => false,
//     ]);
//     exit;
// }

try {
	$queryStr = "SELECT * FROM mapa WHERE id_campanha = :id_campanha";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_campanha', $id_campanha);
    $query->execute();
    $res = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'mapas' => $res 
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

?>
