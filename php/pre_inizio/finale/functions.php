<?php

require_once "config.php";

function insertData($conn, $nome, $email) {
    try {
        $query = "INSERT INTO utenti (nome, email) VALUES (:nome, :email)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        echo "Dati inseriti con successo!";
    } catch (PDOException $e) {
        echo "Errore: " . $e->getMessage();
    }
}
?>