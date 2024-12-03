-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.5.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para products
CREATE DATABASE IF NOT EXISTS `products` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `products`;

-- Volcando estructura para tabla products.creditcards
CREATE TABLE IF NOT EXISTS `creditcards` (
  `userId` bigint(20) DEFAULT NULL,
  `number` varchar(50) DEFAULT NULL,
  `expirationDate` bigint(20) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK_creditcarts_users` (`userId`),
  CONSTRAINT `FK_creditcarts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla products.creditcards: ~3 rows (aproximadamente)
INSERT INTO `creditcards` (`userId`, `number`, `expirationDate`, `code`, `alias`, `id`) VALUES
	(24, '123123', 234324, 2323, 'miTarjeta', 1),
	(24, '123123', 234324, 2323, 'miTarjeta', 2),
	(24, '123123', 234324, 2323, 'miTarjeta', 3);

-- Volcando estructura para tabla products.products
CREATE TABLE IF NOT EXISTS `products` (
  `title` varchar(50) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` bigint(20) NOT NULL DEFAULT 0,
  `description` longtext DEFAULT NULL,
  `buyerId` bigint(20) DEFAULT NULL,
  `sellerId` bigint(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `buyer` (`buyerId`),
  KEY `seller` (`sellerId`),
  CONSTRAINT `buyer` FOREIGN KEY (`buyerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `seller` FOREIGN KEY (`sellerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla products.products: ~20 rows (aproximadamente)
INSERT INTO `products` (`title`, `id`, `date`, `description`, `buyerId`, `sellerId`, `price`, `category`) VALUES
	('prueba APP', 78, 1730631683936, 'descargo', 40, 28, 2, 'book'),
	('producto 2', 79, 1730632093392, 'sdsad', 40, 28, 5, 'electronic'),
	('producto 2', 80, 1730632126529, 'sdsad', 40, 28, 5, 'electronic'),
	('jlkdsjaldjal', 81, 1730831307430, 'jdlsajdlajldaj', 40, 28, 123, 'clothing'),
	('dsadsad', 82, 1730831385434, 'dsadasdsa', 40, 28, 12, 'electronic'),
	('dsadsada', 83, 1730831405865, 'dsadasdsa', NULL, 28, 2312, 'camera'),
	('ujvlk', 84, 1730831675078, 'dadsada', NULL, 28, 1322, 'home'),
	('mhkhkh', 85, 1730831703247, 'dsadasda', NULL, 28, 3213, 'mobile'),
	('kjljl', 86, 1730831718656, 'jkcjljljl', NULL, 28, 234, 'car'),
	('dsahdksahdksh', 87, 1730877260931, 'skadsajlkdjsadsajdljsalkdsañfjlkñdjfñlkslksandlknsadlksanlkdnsdlksanlkdnsañlkdnlksandlksanlkdnsalkdnsalkdnlksandlksandlksandñlksandlksandlksanñcKNCDÑHOIWQUEOIWQUEOIJELKSANLSANLKDsjdlksajdlksajdlksajdlkjdñlksajdlksajñlkdjsalkdjsalkdsñjadkjashfkjbckmnxkmÑNXMmnlksnoiewquoiwqueoiwldkñjlzmlkm<lkzmlsokñdosajdoisajdoisajdosajdowqjoiewuoiewqùeiowqueoiwqueòwqueowque`wquewqeuoiwquewqueòiwqueowqoe', NULL, 28, 5, 'car'),
	('dslkjudlñjuadaju', 88, 1730904124158, 'jdalsdjalsdjaslkdjaljl', NULL, 28, 2321, 'mobile'),
	('producto en venta', 90, 1731000232282, 'sdasdsa', NULL, 28, 2, 'mobile'),
	('producto para vender', 91, 1731000442568, '132321', NULL, 28, 3, 'mobile'),
	('dsadsada', 92, 1731000565179, 'desde paracompras@email.com', NULL, 40, 3, 'clothing'),
	('producto 18', 93, 1731066046230, 'asdasdasdasd', NULL, 28, 12, 'clothing'),
	('prodcuto 19', 94, 1731066059671, 'bdkashdkashjdkashdkad', NULL, 28, 2, 'car'),
	('sddsdasdas', 95, 1731066070699, 'dsadasdasda', NULL, 28, 1223, 'home'),
	('ewqeqwew', 96, 1731066096661, 'qewqeqw', NULL, 28, 2, 'camera'),
	('r321er32', 97, 1731066108876, 'sadas', NULL, 28, 43, 'mobile'),
	('432432', 98, 1731066119737, '43243243', NULL, 28, 56, 'book');

-- Volcando estructura para tabla products.transactions
CREATE TABLE IF NOT EXISTS `transactions` (
  `buyerId` bigint(20) DEFAULT NULL,
  `sellerId` bigint(20) DEFAULT NULL,
  `buyerCountry` varchar(50) DEFAULT NULL,
  `buyerAddress` varchar(50) DEFAULT NULL,
  `buyerPostCode` int(11) DEFAULT NULL,
  `productId` bigint(20) DEFAULT NULL,
  `productPrice` int(11) DEFAULT NULL,
  `buyerPaymentId` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `startDate` bigint(20) DEFAULT NULL,
  `endDate` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_transactions_users_2` (`sellerId`),
  KEY `FK_transactions_products` (`productId`),
  KEY `FK_transactions_users` (`buyerId`),
  KEY `FK_transactions_creditcards` (`buyerPaymentId`),
  CONSTRAINT `FK_transactions_products` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_transactions_users` FOREIGN KEY (`buyerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_transactions_users_2` FOREIGN KEY (`sellerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla products.transactions: ~5 rows (aproximadamente)
INSERT INTO `transactions` (`buyerId`, `sellerId`, `buyerCountry`, `buyerAddress`, `buyerPostCode`, `productId`, `productPrice`, `buyerPaymentId`, `id`, `startDate`, `endDate`) VALUES
	(40, 28, 'Spain', 'paracompras@email.com', 4324, 78, 2, NULL, 1, NULL, NULL),
	(40, 28, 'Spain', 'paracompras@email.com', 4324, 79, 5, NULL, 2, NULL, NULL),
	(40, 28, 'Spain', 'paracompras@email.com', 4324, 80, 5, NULL, 3, NULL, NULL),
	(40, 28, 'Spain', 'paracompras@email.com', 4324, 81, 123, NULL, 4, NULL, NULL),
	(40, 28, 'Spain', 'paracompras@email.com', 4324, 82, 12, NULL, 5, NULL, NULL);

-- Volcando estructura para tabla products.users
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `documentIdentity` varchar(50) DEFAULT NULL,
  `documentNumber` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `postalCode` varchar(50) DEFAULT NULL,
  `birthday` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla products.users: ~17 rows (aproximadamente)
INSERT INTO `users` (`email`, `password`, `id`, `name`, `surname`, `documentIdentity`, `documentNumber`, `country`, `address`, `postalCode`, `birthday`) VALUES
	('prueba00@gmail.com', 'c893bad68927b457dbed39460e6afd62', 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('prueba01@gmail.com', 'c893bad68927b457dbed39460e6afd62', 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('prueba02@gmail.com', 'c893bad68927b457dbed39460e6afd62', 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('uo275780@uniovi.es', 'fcea920f7412b5da7be0cf42b8c93759', 27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('prueba1@email.com', '3f1b7ccad63d40a7b4c27dda225bf941', 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('prueba@email.com', '34a05f2f628945938265dcc9412a1c61', 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('ana@email.com', '255343c71f05fdb22a71c92d8f7a1977', 30, 'ana@email.com', 'ana@email.com', NULL, '123456789', NULL, 'ana@email.com', NULL, 1731366000000),
	('ana2@email.com', '255343c71f05fdb22a71c92d8f7a1977', 31, 'ana@email.com', 'ana@email.com', NULL, '12121', NULL, 'ana@email.com', '123', 1730847600000),
	('a@email.com', 'bc92e210df73766860f2553f6bff444a', 32, 'sadsa', 'dsadadsada', NULL, '1231', NULL, '32321', '321321321', 1730674800000),
	('you@email.com', 'b490a5811190aa9895f60265a3f7b0eb', 33, 'sda', 'sdasda', NULL, 'dsdsa', NULL, 'dsadsad', 'sadsada', 1731193200000),
	('t@gmail.com', '63130a7f2a9b8dc5ac71b4c062e80e20', 34, 't@gmail.com', 't@gmail.com', NULL, '21323231', 'Spain', 't@gmail.com', '1223', 1730588400000),
	('h@email.com', 'ce20a0eb3cd3183b934882ed75a135a7', 35, 'h@email.com', 'h@email.com', NULL, '1º2', NULL, 'h@email.com', 'h@email.com', 1731193200000),
	('y@gmail.com', '18990dcdf9096082baa6acfe2750a85f', 36, 'h@email.com', 'h@email.com', 'NIF', 'h@email.com', 'Spain', 'h@email.com', 'v', 1731279600000),
	('p@gmail.com', '18990dcdf9096082baa6acfe2750a85f', 37, 'h@email.com', 'h@email.com', 'nie', 'h@email.com', 'France', 'h@email.com', 'v', 1731279600000),
	('m@email.com', 'cfc98892bc2cbb9d5fa6ff276f014f79', 38, 'm@email.com', 'm@email.com', 'nif', 'm@email.com', 'Spain', 'm@email.com', 'm@email.com', 1730674800000),
	('sindatos@email.com', '7cf70e1392634857c46ef81af85e19ad', 39, 'sindatos@email.com', 'sindatos@email.com', 'nif', '2', 'Spain', 'sindatos@email.com', '1232321', 1730588400000),
	('paracompras@email.com', 'f465d9a40536f395f8402a89ab612b2a', 40, 'paracompras@email.com', 'paracompras@email.com', 'nif', '223432', 'Spain', 'paracompras@email.com', '4324', 1730588400000);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
