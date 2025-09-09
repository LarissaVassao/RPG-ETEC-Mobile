-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para rpg_etec
CREATE DATABASE IF NOT EXISTS `rpg_etec` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `rpg_etec`;

-- Copiando estrutura para tabela rpg_etec.campanha
CREATE TABLE IF NOT EXISTS `campanha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `senha` varchar(150) NOT NULL,
  `descricao` varchar(500) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rpg_etec.campanha_usuario
CREATE TABLE IF NOT EXISTS `campanha_usuario` (
  `user_id` int(8) NOT NULL,
  `campanha_id` int(11) NOT NULL,
  `mestre` binary(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`campanha_id`),
  KEY `campanha_id` (`campanha_id`),
  CONSTRAINT `campanha_usuario_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `campanha_usuario_ibfk_2` FOREIGN KEY (`campanha_id`) REFERENCES `campanha` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rpg_etec.npc
CREATE TABLE IF NOT EXISTS `npc` (
  `id` int(11) NOT NULL,
  `nome` varchar(250) DEFAULT NULL,
  `vida` int(11) DEFAULT NULL,
  `mental` int(11) DEFAULT NULL,
  `energia` int(11) DEFAULT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `tokenImage` varchar(250) DEFAULT NULL,
  `forca` int(11) DEFAULT NULL,
  `agilidade` int(11) DEFAULT NULL,
  `constituicao` int(11) DEFAULT NULL,
  `vontade` int(11) DEFAULT NULL,
  `inteligencia` int(11) DEFAULT NULL,
  `percepcao` int(11) DEFAULT NULL,
  `sorte` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rpg_etec.personagem
CREATE TABLE IF NOT EXISTS `personagem` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL DEFAULT '0',
  `vida` int(4) NOT NULL DEFAULT 0,
  `tokenImage` varchar(250) NOT NULL,
  `profileImage` varchar(250) NOT NULL,
  `mental` int(4) NOT NULL DEFAULT 0,
  `energia` int(4) NOT NULL DEFAULT 0,
  `forca` int(4) NOT NULL DEFAULT 0,
  `agilidade` int(4) NOT NULL DEFAULT 0,
  `constituicao` int(4) NOT NULL DEFAULT 0,
  `vontade` int(4) NOT NULL DEFAULT 0,
  `inteligencia` int(4) NOT NULL DEFAULT 0,
  `percepcao` int(4) NOT NULL DEFAULT 0,
  `sorte` int(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rpg_etec.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL DEFAULT '0',
  `email` varchar(250) NOT NULL DEFAULT '0',
  `senha` varchar(250) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
