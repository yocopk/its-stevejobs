<?php
// File: functions.php

require 'config.php';

/**
 * Funzione per ottenere tutte le tabelle nel database
 */
function getTables() {
    global $conn;
    return ['utenti', 'libri', 'lista_spesa', 'cose_da_fare'];
}

/**
 * Funzione per ottenere tutti i dati di una tabella scelta
 */
function getTableData($table) {
    global $conn;
    $stmt = $conn->query("SELECT * FROM $table where deleted = 0");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Funzione per ottenere le colonne di una tabella scelta
 */
function getTableColumns($table) {
    global $conn;
    $stmt = $conn->query("SHOW COLUMNS FROM $table");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Funzione per eliminare un record generico
 */
function deleteRecord($table, $id) {
    global $conn;
    $stmt = $conn->prepare("UPDATE $table SET deleted = 1 WHERE id = :id");
    $stmt->execute(['id' => $id]);
}

/**
 * Funzione per aggiornare un record generico
 */
function updateRecord($table, $data) {
    global $conn;
    $columns = array_keys($data);
    $set = implode(', ', array_map(fn($col) => "$col = :$col", $columns));
    
    $sql = "UPDATE $table SET $set WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute($data);
}

/**
 * Funzione per aggiungere un nuovo record a una tabella
 */
function addRecord($table, $data) {
    global $conn;
    $columns = implode(', ', array_keys($data));
    $placeholders = ':' . implode(', :', array_keys($data));
    
    $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
    $stmt = $conn->prepare($sql);
    $stmt->execute($data);
}

function registerUser($username, $password) {
    global $conn;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO auth (username, password) VALUES (:username, :password)");
    if (!$stmt) {
        throw new Exception("Errore nella preparazione della query: " . $conn->errorInfo()[2]);
    }
    $stmt->execute(['username' => $username, 'password' => $hashed_password]);
}

function checkUser($username, $password) {
    global $conn;
    $stmt = $conn->prepare("SELECT id, password FROM auth WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($password, $user['password'])) {
        return $user['id'];
    }
    return false;
}
?>
