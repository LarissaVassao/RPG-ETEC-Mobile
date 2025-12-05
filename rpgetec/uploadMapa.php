<?php
require_once("conexao.php");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Verificar se é upload de arquivo
if (isset($_FILES['imagem']) && isset($_POST['id_mapa'])) {
    $id_mapa = $_POST['id_mapa'];
    $file = $_FILES['imagem'];
    
    // Validar arquivo
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro no upload: ' . $file['error']]);
        exit;
    }
    
    // Validar tipo de arquivo
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
    $file_type = mime_content_type($file['tmp_name']);
    
    if (!in_array($file_type, $allowed_types)) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Tipo de arquivo não permitido. Use JPEG, PNG ou GIF.']);
        exit;
    }
    
    // Criar diretório se não existir
    $upload_dir = 'mapas/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    
    // Gerar nome único para o arquivo
    $file_extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $file_name = 'mapa_' . $id_mapa . '_' . uniqid() . '.' . $file_extension;
    $file_path = $upload_dir . $file_name;
    
    // Mover arquivo
    if (move_uploaded_file($file['tmp_name'], $file_path)) {
        // Atualizar banco de dados com o nome da imagem
        try {
            $stmt = $pdo->prepare("UPDATE mapa SET mapImage = :mapImage WHERE id = :id");
            $stmt->bindValue(":mapImage", $file_name);
            $stmt->bindValue(":id", $id_mapa);
            $stmt->execute();
            
            echo json_encode([
                'sucesso' => true, 
                'mensagem' => 'Imagem salva com sucesso!',
                'file_name' => $file_name
            ]);
        } catch (Exception $e) {
            // Se der erro no banco, deletar o arquivo
            unlink($file_path);
            echo json_encode([
                'sucesso' => false, 
                'mensagem' => 'Erro ao salvar no banco: ' . $e->getMessage()
            ]);
        }
    } else {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao mover arquivo.']);
    }
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados insuficientes.']);
}
?>