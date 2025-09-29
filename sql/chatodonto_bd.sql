-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.33-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para chatodonto_db
CREATE DATABASE IF NOT EXISTS `chatodonto_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `chatodonto_db`;

-- Copiando estrutura para tabela chatodonto_db.mensagens
CREATE TABLE IF NOT EXISTS `mensagens` (
  `paciente` varchar(25) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mensagem` text NOT NULL,
  `data_hora` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('enviado','lido','entregue') DEFAULT 'enviado',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela chatodonto_db.mensagens: ~15 rows (aproximadamente)
/*!40000 ALTER TABLE `mensagens` DISABLE KEYS */;
INSERT INTO `mensagens` (`paciente`, `id`, `mensagem`, `data_hora`, `status`) VALUES
	('Larissa', 14, 'Boa tarde, gostaria de agendar um canal com o Dr. ClÃ¡udio.', '2025-09-05 15:08:58', 'lido'),
	('Doctor ClÃ¡udio Barreto', 15, 'OlÃ¡! Para canal dentÃ¡rio, tenho vaga dia 15/09 Ã s 8:30.', '2025-09-05 15:10:32', 'lido'),
	('Larissa', 16, 'Perfeito! Pode confirmar para mim, por favor?', '2025-09-05 15:10:34', 'lido'),
	('Doctor ClÃ¡udio Barreto', 17, 'Confirmado! AvaliaÃ§Ã£o para canal agendada.', '2025-09-05 15:10:54', 'lido'),
	('Larissa', 18, 'Preciso fazer radiografia antes?', '2025-09-05 15:10:55', 'lido'),
	('Doctor ClÃ¡udio Barreto', 19, 'Faremos a radiografia na consulta.', '2025-09-05 15:11:14', 'lido'),
	('Larissa', 20, 'Ã“timo! E o valor?', '2025-09-05 15:11:17', 'lido'),
	('Doctor ClÃ¡udio Barreto', 21, 'A avaliaÃ§Ã£o Ã© R$ 150,00.', '2025-09-05 15:11:28', 'lido'),
	('Larissa', 22, 'Aceita plano odontolÃ³gico?', '2025-09-05 15:11:30', 'lido'),
	('Doctor ClÃ¡udio Barreto', 23, 'Sim! Qual seu plano?', '2025-09-05 15:11:40', 'lido'),
	('Larissa', 24, 'SulAmÃ©rica.', '2025-09-05 15:11:54', 'lido'),
	('Doctor ClÃ¡udio Barreto', 25, 'Perfeito! Cobrimos SulAmÃ©rica.', '2025-09-05 15:12:22', 'lido'),
	('Larissa', 26, 'Que bom! HÃ¡ necessidade de jejum?', '2025-09-05 15:12:26', 'lido'),
	('Doctor ClÃ¡udio Barreto', 27, 'NÃ£o Ã© necessÃ¡rio.', '2025-09-05 15:12:44', 'lido'),
	('Larissa', 28, 'Obrigada! AtÃ© dia 15.', '2025-09-05 15:12:47', 'lido'),
	('Doctor ClÃ¡udio Barreto', 29, 'AtÃ© lÃ¡! Enviaremos lembrete por SMS.', '2025-09-05 15:12:55', 'lido');
/*!40000 ALTER TABLE `mensagens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
