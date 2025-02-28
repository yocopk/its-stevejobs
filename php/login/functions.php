<?php
// functions.php
require_once 'config.php';

function connectDB() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        die("Connessione fallita: " . $conn->connect_error);
    }
    return $conn;
}

function registerUser($username, $password, $page_number) {
    $conn = connectDB();
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, password, page_number) VALUES (?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Errore nella preparazione della query: " . $conn->error);
    }
    $stmt->bind_param("ssi", $username, $hashed_password, $page_number);
    if (!$stmt->execute()) {
        throw new Exception("Errore durante l'inserimento dell'utente: " . $stmt->error);
    }
    $stmt->close();
    $conn->close();
}

function checkUser($username, $password) {
    $conn = connectDB();
    $stmt = $conn->prepare("SELECT id, password, page_number FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password, $page_number);
    if ($stmt->fetch() && password_verify($password, $hashed_password)) {
        $stmt->close();
        $conn->close();
        return ['id' => $id, 'page_number' => $page_number];
    }
    $stmt->close();
    $conn->close();
    return false;
}
?>