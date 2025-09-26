<?php 
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$usuario = $input['id_usuario'] ?? '';
$campanha = $input['id_campanha'] ?? '';
$antepassado = $input['antepassado'] ?? '';
$nivel = $input['nivel'] ?? '';
//$atributos = $input['atributos'] ?? '';
$atributos = [
    'forca' => 1,
    'agilidade' => 1,
    'constituicao' => 1,
    'inteligencia' => 1,
    'percepcao' => 1,
    'vontade' => 1,
    'sorte' => 1
];

$vida = $atributos['constituicao'] + 9;
$mental = $atributos['vontade'] + 9;
$energia = 10;
$ca = $atributos['agilidade'] + 3;
$credito = $antepassado['credito'] + 5;
try {
    $res = $pdo->prepare("INSERT INTO personagem SET nome = :nome, id_campanha = :id_campanha, id_usuario = :id_usuario, vida = :vida, vidaAtual = :vida, mental = :mental,
    mentalAtual = :mental, energia = :energia, energiaAtual = :energia, ca = :ca, credito = 0, creditoMax = :credito, movimento = 6, forca = :forca,
    agilidade = :agilidade, constituicao = :constituicao, inteligencia = :inteligencia, percepcao = :percepcao, vontade = :vontade, sorte = :sorte");	
    $res->bindValue(":nome", $nome);
    $res->bindValue(":id_campanha", $campanha);
    $res->bindValue(":id_usuario", $usuario);
    $res->bindValue(":vida", $vida);
    $res->bindValue(":energia", $energia);
    $res->bindValue(":mental", $mental);
    $res->bindValue(":ca", $ca);
    $res->bindValue(":credito", $credito);
    $res->bindValue(":forca", $atributos['forca']);
    $res->bindValue(":agilidade", $atributos['agilidade']);
    $res->bindValue(":constituicao", $atributos['constituicao']);
    $res->bindValue(":inteligencia", $atributos['inteligencia']);
    $res->bindValue(":percepcao", $atributos['percepcao']);
    $res->bindValue(":vontade", $atributos['vontade']);
    $res->bindValue(":sorte", $atributos['sorte']);
    $res->execute();

if ($res->rowCount() === 0) {
    echo json_encode([
        'mensagem' => 'Nenhuma linha foi inserida.',
        'sucesso' => false
    ]);
    exit;
}

$lastId = $pdo->lastInsertId();
if ($lastId == 0) {
    echo json_encode([
        'mensagem' => 'Falha ao obter ID da campanha.',
        'sucesso' => false
    ]);
    exit;
}

echo json_encode([
    'mensagem' => 'Salvo com sucesso!',
    'sucesso' => true,
    'id' => $lastId 
]);
} catch (Exception $e) {
     $result = json_encode([
         'mensagem' => 'Erro ao salvar: ' . $e->getMessage(),
         'sucesso' => false
     ]);
     echo $result;
 }
 ?>