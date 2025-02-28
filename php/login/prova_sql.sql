
-- Database: `gestionedb`
--
DROP DATABASE IF EXISTS `gestionedb`;
CREATE DATABASE IF NOT EXISTS `gestionedb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gestionedb`;

-- --------------------------------------------------------

--
-- Struttura della tabella `cose_da_fare`
--

CREATE TABLE IF NOT EXISTS `cose_da_fare` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descrizione` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `libri`
--

CREATE TABLE IF NOT EXISTS `libri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autore` varchar(100) NOT NULL,
  `nome_libro` varchar(200) NOT NULL,
  `data_uscita` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `lista_spesa`
--

CREATE TABLE IF NOT EXISTS `lista_spesa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_prodotto` varchar(100) NOT NULL,
  `prezzo` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE IF NOT EXISTS `utenti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cognome` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
