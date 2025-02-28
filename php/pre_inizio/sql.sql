-- SQL Script per creare il database e la tabella --

CREATE DATABASE IF NOT EXISTS test_db_inizio;
USE test_db_inizio;

CREATE TABLE IF NOT EXISTS utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);