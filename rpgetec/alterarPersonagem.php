<?php
header('Content-Type: application/json; charset=utf-8');

include_once('conexao.php');

$id_personagem = $_GET['id_personagem'] ?? '';
$atributo = $_GET['atributo'] ?? '';
$pericia = $_GET['pericia'] ?? '';
$valor = $_GET['valor'] ?? '';

if ($id_personagem == '') {
    echo json_encode(['success' => false, 'error' => 'id_personagem not provided']);
    exit;
}
if ($valor == '') {
    echo json_encode(['success' => false, 'error' => 'valor not provided']);
    exit;
}

if ($atributo != '') {
    try {
        $queryStr = "UPDATE personagem SET $atributo = :valor WHERE id = :id_personagem";
        $query = $pdo->prepare($queryStr);
        $query->bindParam(':id_personagem', $id_personagem);
        $query->bindParam(':valor', $valor);
        $query->execute();

        echo json_encode(['success' => true, 'message' => 'Atributo atualizado com sucesso']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} 
else if ($pericia != '') {
    try {
        // 1. Busca o id da perícia
        $query = $pdo->prepare("SELECT id FROM pericia WHERE nome = :nome");
        $query->bindParam(':nome', $pericia);
        $query->execute();
        $res = $query->fetch(PDO::FETCH_ASSOC);

        if (!$res) {
            echo json_encode(['success' => false, 'error' => 'Perícia não encontrada']);
            exit;
        }

        $id_pericia = $res['id'];

        // 2. Atualiza o valor da perícia do personagem
        $query = $pdo->prepare("
            UPDATE personagem_pericia 
            SET valor = :valor 
            WHERE id_personagem = :id_personagem AND id_pericia = :id_pericia
        ");
        $query->bindParam(':valor', $valor);
        $query->bindParam(':id_personagem', $id_personagem);
        $query->bindParam(':id_pericia', $id_pericia);
        $query->execute();

        echo json_encode(['success' => true, 'message' => 'Perícia atualizada com sucesso']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} 
else {
    echo json_encode(['success' => false, 'error' => 'neither atributo nor pericia provided']);
}
?>
