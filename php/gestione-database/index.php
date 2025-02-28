<?php
require_once 'functions.php';
$result = handleFormSubmission();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Form di Registrazione</title>
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
                        <?php if ($result['success']): ?>
                            <div class="alert alert-success mb-4">
                                I dati sono stati salvati con successo nel database!
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($result['error']): ?>
                            <div class="alert alert-danger mb-4">
                                <?php echo $result['error']; ?>
                            </div>
                        <?php endif; ?>

                        <h2 class="text-center mb-4">Inserisci i tuoi dati</h2>
                        
                        <form method="POST">
                            <div class="mb-3">
                                <input type="text" class="form-control" name="nome" placeholder="Nome" required>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" name="cognome" placeholder="Cognome" required>
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control" name="email" placeholder="Email" required>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary btn-lg">Invia</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card custom-shadow">
                    <div class="card-body p-4">
                        <h2 class="text-center mb-4">Tabella dei dati</h2>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Cognome</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                            <?php foreach(getTable() as $row): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($row['nome']); ?></td>
                                    <td><?php echo htmlspecialchars($row['cognome']); ?></td>
                                    <td><?php echo htmlspecialchars($row['email']); ?></td>
                                </tr>
                            <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS e Popper.js -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 