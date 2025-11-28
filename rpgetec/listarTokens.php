<?php
header('Content-Type: application/json; charset=utf-8');
include_once('conexao.php');

$id_mapa = $_GET['id_mapa'] ?? '';

if ($id_mapa == '') {
    echo json_encode(['success' => false, 'error' => 'id_mapa not provided']);
    exit;
}

try {
    $queryStr = "SELECT t.*, 
                        p.nome as personagem_nome, 
                        p.tokenImage as personagem_tokenImage,
                        n.nome as npc_nome,
                        n.tokenImage as npc_tokenImage
                 FROM token t 
                 LEFT JOIN personagem p ON t.id_personagem = p.id 
                 LEFT JOIN npc n ON t.id_npc = n.id 
                 WHERE t.id_mapa = :id_mapa";
    
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':id_mapa', $id_mapa);
    $query->execute();
    $tokens = $query->fetchAll(PDO::FETCH_ASSOC);

    // Processar os tokens para usar a imagem correta
    $tokensProcessados = array_map(function($token) {
        // Prioridade: imagem do token > imagem do personagem > imagem do NPC > default
        if (!empty($token['tokenImage'])) {
            $imagem = $token['tokenImage'];
        } elseif (!empty($token['personagem_tokenImage'])) {
            $imagem = $token['personagem_tokenImage'];
        } elseif (!empty($token['npc_tokenImage'])) {
            $imagem = $token['npc_tokenImage'];
        } else {
            $imagem = 'default.png';
        }
        
        // Definir nome
        if (!empty($token['personagem_nome'])) {
            $nome = $token['personagem_nome'];
        } elseif (!empty($token['npc_nome'])) {
            $nome = $token['npc_nome'];
        } else {
            $nome = 'Token';
        }
        
        return [
            'id' => $token['id'],
            'id_personagem' => $token['id_personagem'],
            'id_npc' => $token['id_npc'],
            'positionX' => $token['positionX'],
            'positionY' => $token['positionY'],
            'tokenImage' => $imagem,
            'nome' => $nome
        ];
    }, $tokens);

    echo json_encode([
        'success' => true,
        'tokens' => $tokensProcessados
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>