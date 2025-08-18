<?php 

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id_usu = @$_GET['user'];

$total_usuarios = 0;

$query = $pdo->query("SELECT * from personagem ");
$res = $query->fetchAll(PDO::FETCH_ASSOC);
$total_usuarios = @count($res);


$result = json_encode(array('success'=>true, 
    'total_usuarios'=>$total_usuarios
        
));

echo $result;

?>
