<?php
require_once 'config.php';
session_start();

function handleFormSubmission() {
    $inserimentoSuccesso = false;
    $errore = null;

    if (isset($_SESSION['success'])) {
        $inserimentoSuccesso = true;
        unset($_SESSION['success']);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        try {
            $nome = trim($_POST['nome']);
            $cognome = trim($_POST['cognome']);
            $email = trim($_POST['email']);
            
            sendData($nome, $cognome, $email);
            $_SESSION['success'] = true;
            
            header("Location: " . $_SERVER['PHP_SELF']);
            exit();
        } catch(PDOException $e) {
            $errore = "Errore durante l'inserimento: " . $e->getMessage();
        }
    }

    return ['success' => $inserimentoSuccesso, 'error' => $errore];
}

function sendData($nome, $cognome, $email) {
    global $pdo;
    $desc = "Nome: $nome, Cognome: $cognome, Email: $email";
    $stmt = $pdo->prepare("INSERT INTO todo (`desc`) VALUES (:desc)");
    $stmt->execute(['desc' => $desc]);
}

function getTable() {
    global $pdo;
    $stmt = $pdo->query("SELECT `desc` FROM todo");
    $results = [];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $dati = explode(", ", $row['desc']);
        $results[] = [
            'nome' => trim(substr($dati[0], 6)),
            'cognome' => trim(substr($dati[1], 9)),
            'email' => trim(substr($dati[2], 7))
        ];
    }
    return $results;
}
?>