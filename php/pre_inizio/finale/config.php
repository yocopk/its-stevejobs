<?php
$host = "localhost";
$user = "andrea";
$password = "ciao1234";
$dbname = "test_db_inizio";

// Connessione al database con gestione degli errori
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Errore: " . $e->getMessage());
}
?>