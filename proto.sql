-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: prototype_db
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `COMPTE`
--

DROP TABLE IF EXISTS `COMPTE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPTE` (
  `compteID` int(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HASH` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NOM` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PRENOM` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SEXE` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DATE_NAISSANCE` date DEFAULT NULL,
  `TYPE` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`compteID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
alter table compte add column vcode int default 0;

--
-- Dumping data for table `COMPTE`
--

LOCK TABLES `COMPTE` WRITE;
/*!40000 ALTER TABLE `COMPTE` DISABLE KEYS */;
INSERT INTO `COMPTE` VALUES (1,'abc@email.com','$2a$10$3dDIIa2ISQ1d7lJ4Tz9scOe/Gq5Vkld70/qS7gRn349LJ7wRKty.a','doe','john','m','2000-01-01','e');
/*!40000 ALTER TABLE `COMPTE` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-27  3:45:54
