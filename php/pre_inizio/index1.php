<?php

// Abilita la visualizzazione degli errori
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Stampa il contenuto della variabile POST per debug
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";
}

// Impostazioni database
$host = "localhost";
$user = "andrea";
$password = "ciao1234";

$dbname = "test_db_inizio";

// Connessione al database con gestione degli errori
try {
    $conn = new mysqli($host, $user, $password, $dbname);
    if ($conn->connect_error) {
        throw new Exception("Connessione fallita: " . $conn->connect_error);
    }
} catch (Exception $e) {
    die("Errore: " . $e->getMessage());
}

// Funzione per inserire i dati nel database
function insertData($conn, $nome, $email) {
    try {
        $query = "INSERT INTO utenti (nome, email) VALUES ('$nome', '$email')";
        if (!$conn->query($query)) {
            throw new Exception("Errore nell'inserimento: " . $conn->error);
        }
        echo "Dati inseriti con successo!";
    } catch (Exception $e) {
        echo "Errore: " . $e->getMessage();
    }
}

// Gestione del form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['nome'])) {
        $nome = $_POST['nome'];
    } else {
        $nome = '';
    }
    
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
    } else {
        $email = '';
    }
    
    if (!empty($nome) && !empty($email)) {
        insertData($conn, $nome, $email);
    } else {
        echo "Tutti i campi sono obbligatori.";
    }
}

// Chiudi connessione
$conn->close();
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form di Inserimento</title>
    <script>
        function validateForm(event) {
            event.preventDefault();
            
            let nome = document.getElementById("nome").value;
            let email = document.getElementById("email").value;
            
            let nomeRegex = /^[A-Za-zÀ-ÿ' -]+$/;
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!nomeRegex.test(nome)) {
                alert("Il nome non è valido. Inserisci solo lettere e spazi.");
                return;
            }
            
            if (!emailRegex.test(email)) {
                alert("L'email non è valida.");
                return;
            }
            
            document.getElementById("userForm").submit();
        }
    </script>
</head>
<body>
    <h2>Inserisci i tuoi dati</h2>
    <form id="userForm" method="post" onsubmit="validateForm(event)">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <button type="submit">Invia</button>
    </form>
</body>
</html>