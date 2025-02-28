<?php
$host = 'localhost';
$dbname = 'gestionedb';
$username = 'andrea'; // Cambia se usi un altro utente
$password = 'ciao1234'; // Cambia se hai una password per MySQL

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Errore nella connessione al database: " . $e->getMessage());
}
?>
