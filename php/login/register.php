<?php
// register.php
require_once 'functions.php';

session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit();
}

$message = ''; // Variabile per memorizzare il messaggio di successo o errore

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $page_number = $_POST['page_number']; // Numero di pagina inserito dall'utente

    try {
        registerUser($username, $password, $page_number);
        $message = "Registrazione avvenuta con successo! <a href='login.php' class='alert-link'>Accedi qui</a>.";
    } catch (Exception $e) {
        $message = "Errore durante la registrazione: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrazione</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style="width: 400px;">
            <h2 class="text-center mb-4">Registrazione</h2>
            <?php if (!empty($message)): ?>
                <div class="alert <?php echo strpos($message, 'successo') !== false ? 'alert-success' : 'alert-danger'; ?>">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>
            <form method="post">
                <div class="mb-3">
                    <label for="username" class="form-label">Username:</label>
                    <input type="text" id="username" name="username" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password:</label>
                    <input type="password" id="password" name="password" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="page_number" class="form-label">Numero di pagina preferito:</label>
                    <input type="number" id="page_number" name="page_number" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Registrati</button>
            </form>
        </div>
    </div>
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>