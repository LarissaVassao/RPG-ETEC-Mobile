<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$diretorio = 'img/';
$imagens = [];

if (!is_dir($diretorio)) {
    echo json_encode(["error" => "Diretório não encontrado"]);
    exit;
}

$arquivos = scandir($diretorio);

foreach ($arquivos as $arquivo) {
    $caminhoCompleto = $diretorio . $arquivo;

    if (is_file($caminhoCompleto) && preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $arquivo)) {
        
        $urlCompleta = "http://10.239.0.139/imagem/{$caminhoCompleto}";
        $imagens[] = $urlCompleta;
    }
}

echo json_encode($imagens, JSON_UNESCAPED_UNICODE);
