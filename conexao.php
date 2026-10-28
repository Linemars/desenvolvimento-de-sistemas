<?php
$host = "sql111.infinityfree.com";
$user = "if0_43284722";
$pass = "9vARfjEfsS0sv";
$db   = "if0_43284722_SITEFOURPETALS";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Erro: " . $conn->connect_error);
}
echo "Conectado no banco SITEFOURPETALS com sucesso!";
?>