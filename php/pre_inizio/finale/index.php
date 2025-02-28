<?php require_once "process.php"; ?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form di Inserimento</title>
    <script src="script.js"></script>
</head>
<body>
    <h2>Inserisci i tuoi dati</h2>
    <form id="userForm" method="post" action="process.php" onsubmit="validateForm(event)">
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
