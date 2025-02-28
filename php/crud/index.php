<?php
// Includi il file delle funzioni
require 'functions.php';

// Gestione delle azioni di eliminazione
if (isset($_GET['delete']) && isset($_GET['table'])) {
    deleteRecord($_GET['table'], $_GET['delete']);
    header("Location: index.php?table=" . $_GET['table']);
    exit;
}

// Gestione delle azioni di aggiornamento
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_row'])) {
    $table = $_POST['table'];
    $id = $_POST['id'];
    unset($_POST['update_row'], $_POST['table'], $_POST['id']);
    updateRecord($table, array_merge(['id' => $id], $_POST));
    header("Location: index.php?table=$table");
    exit;
}

// Gestione delle azioni di aggiunta
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_row'])) {
    $table = $_POST['table'];
    unset($_POST['add_row'], $_POST['table']);
    addRecord($table, $_POST);
    header("Location: index.php?table=$table");
    exit;
}

// Ottieni le tabelle e i dati della tabella selezionata
$tables = getTables();
$table = $_GET['table'] ?? null;
$data = $table ? getTableData($table) : [];
$columns = $table ? getTableColumns($table) : [];
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestione Database</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script>
        // Funzione per caricare la tabella selezionata
        function loadTable() {
            let table = document.getElementById('tableSelect').value;
            window.location.href = '?table=' + table;
        }
    </script>
</head>
<body>
    <div class="container mt-5">
        <form action="login.php">
        <button type="submit" class="btn btn-primary">Accedi</button>
        </form>

        <!-- Titolo della pagina -->
        <h1 class="text-center">Gestione Database</h1>

        <!-- Selezione della tabella -->
        <label for="tableSelect">Scegli una tabella:</label>
        <select id="tableSelect" class="form-control mb-3" onchange="loadTable()">
            <option value="">-- Seleziona --</option>
            <?php foreach ($tables as $tbl): ?> 
                <option value="<?= $tbl ?>" <?= $table === $tbl ? 'selected' : '' ?>><?= $tbl ?></option>
            <?php endforeach; ?>
        </select>

        <?php if ($table): ?>
        <!-- Form per aggiungere una riga -->
        <form method="POST" class="mb-4">
            <input type="hidden" name="table" value="<?= $table ?>">
            <?php foreach ($columns as $col): ?>
                <?php if ($col['Field'] !== 'id' && $col["Field"] !== "deleted"): ?>
                <div class="mb-3">
                    <label for="<?= $col['Field'] ?>" class="form-label"><?= $col['Field'] ?></label>
                    <input type="text" class="form-control" name="<?= $col['Field'] ?>" required>
                </div>
                <?php endif; ?>
            <?php endforeach; ?>
            <button type="submit" name="add_row" class="btn btn-primary">Aggiungi Riga</button>
        </form>

        <!-- Tabella per visualizzare e modificare i dati -->
        <table class="table table-bordered">
            <thead>
                <tr>
                    <?php foreach ($columns as $col): ?>
                        <?php if ($col['Field'] !== 'id' && $col["Field"] !== "deleted"): ?>
                            <th><?= $col['Field'] ?></th>
                        <?php endif; ?>
                    <?php endforeach; ?>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($data as $row): ?>
                    <tr>
                        <form method="POST">
                            <input type="hidden" name="table" value="<?= $table ?>">
                            <input type="hidden" name="id" value="<?= $row['id'] ?>">
                            <?php foreach ($columns as $col): ?>
                                <?php if ($col['Field'] !== 'id' && $col["Field"] !== "deleted"): ?>
                                    <td>
                                        <input type="text" class="form-control" name="<?= $col['Field'] ?>" value="<?= $row[$col['Field']] ?>">
                                    </td>
                                <?php endif; ?>
                            <?php endforeach; ?>
                            <td>
                                <button type="submit" name="update_row" class="btn btn-success btn-sm">Modifica</button>
                                <a href="?table=<?= $table ?>&delete=<?= $row['id'] ?>" class="btn btn-danger btn-sm">Elimina</a>
                            </td>
                        </form>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>
    </div>
</body>
</html>