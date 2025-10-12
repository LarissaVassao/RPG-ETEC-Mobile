<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Headers primeiro
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Lidar com preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

try {
    // Incluir conexão
    require_once 'conexao.php';
    
    // Log inicial
    error_log("=== UPLOAD INICIADO ===");
    error_log("Method: " . $_SERVER['REQUEST_METHOD']);
    error_log("Files: " . (isset($_FILES['file']) ? 'SIM' : 'NÃO'));
    error_log("POST: " . print_r($_POST, true));

    // Verificar dados
    $id_personagem = $_POST['id_personagem'] ?? null;
    
    if (!$id_personagem) {
        throw new Exception('ID do personagem não fornecido');
    }

    if (!isset($_FILES['file'])) {
        throw new Exception('Nenhum arquivo recebido');
    }

    // Configurar diretório
    $baseDir = $_SERVER['DOCUMENT_ROOT'] . '/rpgetec/perfil/';
    
    // Garantir que o diretório existe
    if (!is_dir($baseDir)) {
        if (!mkdir($baseDir, 0777, true)) {
            throw new Exception('Não foi possível criar o diretório: ' . $baseDir);
        }
    }

    // Verificar se é gravável
    if (!is_writable($baseDir)) {
        throw new Exception('Diretório não tem permissão de escrita: ' . $baseDir);
    }

    $file = $_FILES['file'];
    
    // Verificar erro de upload
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $uploadErrors = [
            UPLOAD_ERR_INI_SIZE => 'Arquivo muito grande (limite do PHP)',
            UPLOAD_ERR_FORM_SIZE => 'Arquivo muito grande (limite do formulário)',
            UPLOAD_ERR_PARTIAL => 'Upload parcial',
            UPLOAD_ERR_NO_FILE => 'Nenhum arquivo',
            UPLOAD_ERR_NO_TMP_DIR => 'Pasta temporária não existe',
            UPLOAD_ERR_CANT_WRITE => 'Não pode escrever no disco',
            UPLOAD_ERR_EXTENSION => 'Extensão PHP interrompeu'
        ];
        throw new Exception($uploadErrors[$file['error']] ?? 'Erro desconhecido no upload');
    }

    // Gerar nome do arquivo
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg';
    $fileName = 'personagem_' . $id_personagem . '_' . time() . '.' . $extension;
    $targetFile = $baseDir . $fileName;

    error_log("Tentando mover arquivo para: " . $targetFile);
    error_log("Arquivo temporário: " . $file['tmp_name']);

    // Mover arquivo
    if (!move_uploaded_file($file['tmp_name'], $targetFile)) {
        throw new Exception('Falha ao mover arquivo para: ' . $targetFile);
    }

    // Verificar se arquivo foi criado
    if (!file_exists($targetFile)) {
        throw new Exception('Arquivo não foi criado: ' . $targetFile);
    }

    error_log("Arquivo movido com sucesso: " . $targetFile);
    error_log("Tamanho do arquivo: " . filesize($targetFile) . " bytes");

    // Atualizar banco de dados
    $sql = "UPDATE personagem SET profileImage = :img WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":img", $fileName);
    $stmt->bindValue(":id", $id_personagem);
    
    if (!$stmt->execute()) {
        throw new Exception('Falha ao atualizar banco de dados');
    }

    error_log("Banco de dados atualizado com sucesso");

    // Resposta de sucesso
    echo json_encode([
        'success' => true,
        'message' => 'Upload realizado com sucesso!',
        'file' => $fileName,
        'file_url' => '/rpgetec/perfil/' . $fileName
    ]);

} catch (Exception $e) {
    error_log("ERRO NO UPLOAD: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>