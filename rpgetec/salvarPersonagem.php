<?php 
require_once("conexao.php");

$input = json_decode(file_get_contents('php://input'), true);

$nome = $input['nome'] ?? '';
$usuario = $input['id_usuario'] ?? '';
$campanha = $input['id_campanha'] ?? '';
$antepassado = $input['antepassado'] ?? '';
$nivel = $input['nivel'] ?? '';
if ($nivel > 10){$nivel = 10;}
$periciasRecebidas = $input['pericias'] ?? []; // 👈 opcional: caso venha do front

$atributos = [
    'forca' => 1,
    'agilidade' => 1,
    'constituicao' => 1,
    'inteligencia' => 1,
    'percepcao' => 1,
    'vontade' => 1,
    'sorte' => 1
];

$vida = ($atributos['constituicao'] * $nivel) + 8;
$mental = ($atributos['vontade'] * $nivel) + 8;
$energia = 8 + (2 * $nivel);
$ca = ($atributos['agilidade'] * $nivel) + 8;
$credito = (is_array($antepassado) && isset($antepassado['credito'])) ? $antepassado['credito'] + 5 : 5;

try {
    $pdo->beginTransaction();

    // 🎲 1. Inserir personagem
    $res = $pdo->prepare("INSERT INTO personagem 
        (nome, nivel, antepassado, id_campanha, id_usuario, vida, vidaAtual, mental, mentalAtual, energia, energiaAtual, ca, credito, creditoMax, movimento, 
         forca, agilidade, constituicao, inteligencia, percepcao, vontade, sorte, tokenImage, profileImage)
        VALUES (:nome, :nivel, :antepassado, :id_campanha, :id_usuario, :vida, :vida, :mental, :mental, :energia, :energia, :ca, 0, :credito, 6,
                :forca, :agilidade, :constituicao, :inteligencia, :percepcao, :vontade, :sorte, '', '')");	
    
    $res->bindValue(":nome", $nome);
    $res->bindValue(":antepassado", $antepassado['nome']);
    $res->bindValue(":nivel", $nivel);
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
        throw new Exception("Nenhuma linha foi inserida em personagem.");
    }

    $id_personagem = $pdo->lastInsertId();

    // 🧠 2. Perícias padrão
    $periciasPadrao = [
        'Acalmar', 'Acrobacia', 'Atletismo', 'Atualidades', 'Análise', 'Charme', 
        'Eletronicos', 'Enganar', 'Furtividade', 'Informática', 'Iniciativa', 
        'Intimidação', 'Intuição', 'Medicina', 'Mecânica', 'Persuasão', 
        'Primeiros-Socorros', 'Procurar'
    ];

    // 3️⃣ Garantir que todas as perícias padrão existam no banco
    foreach ($periciasPadrao as $nomePericia) {
        $stmt = $pdo->prepare("SELECT id FROM pericia WHERE nome = :nome");
        $stmt->bindParam(':nome', $nomePericia);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            $insert = $pdo->prepare("INSERT INTO pericia (nome) VALUES (:nome)");
            $insert->bindParam(':nome', $nomePericia);
            $insert->execute();
        }
    }

    // 4️⃣ Inserir perícias do personagem (padrões + opcionais)
    foreach ($periciasPadrao as $nomePericia) {
        // valor padrão: 1
        $valor = 1;
        // Se o front enviou alguma perícia com valor extra
        if (isset($periciasRecebidas[$nomePericia])) {
            $valor += intval($periciasRecebidas[$nomePericia]);
        }

        // Buscar id da perícia
        $stmt = $pdo->prepare("SELECT id FROM pericia WHERE nome = :nome");
        $stmt->bindParam(':nome', $nomePericia);
        $stmt->execute();
        $id_pericia = $stmt->fetchColumn();

        // Inserir em personagem_pericia
        $ins = $pdo->prepare("INSERT INTO personagem_pericia (id_personagem, id_pericia, valor)
                              VALUES (:id_personagem, :id_pericia, :valor)");
        $ins->bindParam(':id_personagem', $id_personagem);
        $ins->bindParam(':id_pericia', $id_pericia);
        $ins->bindParam(':valor', $valor);
        $ins->execute();
    }

    // 5️⃣ Inserir outras perícias não padrão (se enviadas)
    foreach ($periciasRecebidas as $nomePericia => $valor) {
        if (!in_array($nomePericia, $periciasPadrao)) {
            // criar perícia se não existir
            $stmt = $pdo->prepare("SELECT id FROM pericia WHERE nome = :nome");
            $stmt->bindParam(':nome', $nomePericia);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                $insert = $pdo->prepare("INSERT INTO pericia (nome) VALUES (:nome)");
                $insert->bindParam(':nome', $nomePericia);
                $insert->execute();
                $id_pericia = $pdo->lastInsertId();
            } else {
                $id_pericia = $stmt->fetchColumn();
            }

            // Inserir valor seco
            $ins = $pdo->prepare("INSERT INTO personagem_pericia (id_personagem, id_pericia, valor)
                                  VALUES (:id_personagem, :id_pericia, :valor)");
            $ins->bindParam(':id_personagem', $id_personagem);
            $ins->bindParam(':id_pericia', $id_pericia);
            $ins->bindParam(':valor', $valor);
            $ins->execute();
        }
    }

    $pdo->commit();

    echo json_encode([
        'mensagem' => 'Personagem e perícias criados com sucesso!',
        'sucesso' => true,
        'id' => $id_personagem
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode([
        'mensagem' => 'Erro ao salvar personagem: ' . $e->getMessage(),
        'sucesso' => false
    ]);
}
?>
