<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once 'conexao.php';
header('Content-Type: application/json');

$id_personagem = $_POST['id_personagem'] ?? null;

if (!$id_personagem) {
    echo json_encode(['success' => false, 'message' => 'Personagem ID required']);
    exit;
}

$targetDir = "rpgetec/perfil/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (isset($_FILES['file'])) {
    $fileName = time() . "_" . basename($_FILES["file"]["name"]);
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
        $sql = "UPDATE personagem SET profileImage = :img WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(":img", $fileName);
        $stmt->bindValue(":id", $id_personagem);
        $stmt->execute();

        echo json_encode([
            'success' => true,
            'message' => 'Upload successful',
            'file' => $fileName
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Upload failed']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No file received']);
}
?>
