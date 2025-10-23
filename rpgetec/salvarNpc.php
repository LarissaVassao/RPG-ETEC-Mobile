<?php 
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$campanha = $input['id_campanha'] ?? '';
$vida = $input['vida'] ?? 10;
$mental = $input['mental'] ?? 10;
$energia = $input['energia'] ?? 10;
$ca = $input['ca'] ?? 3;
$movimento = $input['movimento'] ?? 6;

$atributos = $input['atributos'] ?? [
    'forca' => 1,
    'agilidade' => 1,
    'constituicao' => 1,
    'inteligencia' => 1,
    'percepcao' => 1,
    'vontade' => 1,
    'sorte' => 1
];

try {
    $pdo->beginTransaction();

    // 🎲 1. Inserir NPC
    $res = $pdo->prepare("INSERT INTO npc 
        (nome, id_campanha, vida, vidaAtual, mental, mentalAtual, energia, energiaAtual, ca, movimento,
         forca, agilidade, constituicao, inteligencia, percepcao, vontade, sorte, tokenImage)
        VALUES (:nome, :id_campanha, :vida, :vidaAtual, :mental, :mentalAtual, :energia, :energiaAtual, :ca, :movimento,
                :forca, :agilidade, :constituicao, :inteligencia, :percepcao, :vontade, :sorte, '')");	
    
    $res->bindValue(":nome", $nome);
    $res->bindValue(":id_campanha", $campanha);
    $res->bindValue(":vida", $vida);
    $res->bindValue(":vidaAtual", $vida); // 🔥 NOVO: vidaAtual começa igual à vida máxima
    $res->bindValue(":mental", $mental);
    $res->bindValue(":mentalAtual", $mental); // 🔥 NOVO: mentalAtual começa igual ao mental máximo
    $res->bindValue(":energia", $energia);
    $res->bindValue(":energiaAtual", $energia); // 🔥 NOVO: energiaAtual começa igual à energia máxima
    $res->bindValue(":ca", $ca);
    $res->bindValue(":movimento", $movimento);
    $res->bindValue(":forca", $atributos['forca']);
    $res->bindValue(":agilidade", $atributos['agilidade']);
    $res->bindValue(":constituicao", $atributos['constituicao']);
    $res->bindValue(":inteligencia", $atributos['inteligencia']);
    $res->bindValue(":percepcao", $atributos['percepcao']);
    $res->bindValue(":vontade", $atributos['vontade']);
    $res->bindValue(":sorte", $atributos['sorte']);
    $res->execute();

    if ($res->rowCount() === 0) {
        throw new Exception("Nenhuma linha foi inserida em NPC.");
    }

    $id_npc = $pdo->lastInsertId();

    $pdo->commit();

    echo json_encode([
        'mensagem' => 'NPC criado com sucesso!',
        'sucesso' => true,
        'id' => $id_npc
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode([
        'mensagem' => 'Erro ao salvar NPC: ' . $e->getMessage(),
        'sucesso' => false
    ]);
}
?>