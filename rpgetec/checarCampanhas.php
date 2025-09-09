<?php 

include_once('conexao.php');

$user = $_GET['id'] ?? '';
$senha = $_GET['senha'] ?? '';

if ($user){
$queryStr = "SELECT * FROM usuario";

$query = $pdo->prepare($queryStr);

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);
$unique = true;
foreach ($res as $row) {
    if($row['nome'] == $user || $row['email'] == $email){
        $unique = false;
        break;
    }
}

echo json_encode(['unique' => $unique]);
}
else{
    $queryStr = "SELECT senha FROM usuario WHERE email = :email";
    $query = $pdo->prepare($queryStr);
    $query->bindParam(':email', $email);
    $query->execute();
    $res = $query->fetch(PDO::FETCH_ASSOC);
    if ($res && $res['senha'] === $senha) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
}
?>
