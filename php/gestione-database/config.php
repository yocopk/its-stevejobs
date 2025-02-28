<?php

// Parametri di connessione al database
define('DB_HOST', 'localhost');
define('DB_USER', 'andrea');     // Modifica con il tuo username
define('DB_PASS', 'ciao1234');         // Modifica con la tua password
define('DB_NAME', 'gestione-db');  // Modifica con il nome del tuo database

// Creazione della connessione
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch(PDOException $e) {
    die("Errore di connessione: " . $e->getMessage());
}

?>