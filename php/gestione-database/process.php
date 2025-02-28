<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = trim($_POST['nome']);
    $cognome = trim($_POST['cognome']);
    $email = trim($_POST['email']);
    
    // Preparazione della descrizione da inserire nella tabella todo
    $desc = "Nome: $nome, Cognome: $cognome, Email: $email";
    
    try {
        // Preparazione della query con backticks intorno a desc
        $stmt = $pdo->prepare("INSERT INTO todo (`desc`) VALUES (:desc)");
        
        // Esecuzione della query con i parametri
        $stmt->execute(['desc' => $desc]);
        
        $inserimentoSuccesso = true;
    } catch(PDOException $e) {
        $errore = "Errore durante l'inserimento: " . $e->getMessage();
    }
    
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Dati Ricevuti</title>
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            .custom-shadow {
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
        </style>
    </head>
    <body class="bg-dark">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <div class="card custom-shadow">
                        <div class="card-body p-4">
                            <?php if (isset($inserimentoSuccesso)): ?>
                                <div class="alert alert-success mb-4">
                                    I dati sono stati salvati con successo nel database!
                                </div>
                            <?php endif; ?>
                            
                            <?php if (isset($errore)): ?>
                                <div class="alert alert-danger mb-4">
                                    <?php echo $errore; ?>
                                </div>
                            <?php endif; ?>

                            <h2 class="text-center mb-4">Dati ricevuti con successo!</h2>
                            <div class="list-group">
                                <div class="list-group-item">
                                    <strong>Nome:</strong> <?php echo htmlspecialchars($nome); ?>
                                </div>
                                <div class="list-group-item">
                                    <strong>Cognome:</strong> <?php echo htmlspecialchars($cognome); ?>
                                </div>
                                <div class="list-group-item">
                                    <strong>Email:</strong> <?php echo htmlspecialchars($email); ?>
                                </div>
                            </div>
                            <div class="text-center mt-4">
                                <a href="index.php" class="btn btn-primary">Torna al form</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bootstrap JS e Popper.js -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    <?php
} else {
    header("Location: form.php");
    exit();
}
?> 