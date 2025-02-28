<?php

require_once "functions.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";

    $nome = isset($_POST['nome']) ? $_POST['nome'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    (!empty($nome) && !empty($email)) ? insertData($conn, $nome, $email) : print "Tutti i campi sono obbligatori.";
}
?>
