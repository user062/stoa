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
-- Table structure for table `COMMENTAIRE`
--

DROP TABLE IF EXISTS `COMMENTAIRE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMMENTAIRE` (
  `ID_COMMENTAIRE` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `ID_REPONSE` int(11) DEFAULT NULL,
  `DATE_AJOUTE` date DEFAULT NULL,
  `COMM_CORE` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_COMMENTAIRE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMMENTAIRE`
--

LOCK TABLES `COMMENTAIRE` WRITE;
/*!40000 ALTER TABLE `COMMENTAIRE` DISABLE KEYS */;
/*!40000 ALTER TABLE `COMMENTAIRE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMPTE`
--

DROP TABLE IF EXISTS `COMPTE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COMPTE` (
  `COMPTEID` int(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PASSWORD` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NOM` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PRENOM` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SEXE` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL CHECK (`SEXE` = 'F' or `SEXE` = 'H'),
  `DATE_NAISSANCE` date DEFAULT NULL,
  `TYPE` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL CHECK (`TYPE` = 'E' or `TYPE` = 'P'),
  `vcode` int(11) DEFAULT NULL,
  PRIMARY KEY (`COMPTEID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPTE`
--

LOCK TABLES `COMPTE` WRITE;
/*!40000 ALTER TABLE `COMPTE` DISABLE KEYS */;
INSERT INTO `COMPTE` VALUES (1,'abc@email.com','$2a$10$GKItxUdDz4Caz9dpB8hmv.puChJ/La.x8Xt5WTVKdy38YF6NuTWAa','abc','abc','H','2021-05-25','E',NULL),(2,'mcsm224@gmail.com','$2a$10$fsnF322o2ZMprN5FT.YNKOm67Cvlb2a2ejpXvzM1B0m8.D1qitIBi','abc','abc','H','2021-05-31','E',107287275);
/*!40000 ALTER TABLE `COMPTE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CONCERNE`
--

DROP TABLE IF EXISTS `CONCERNE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CONCERNE` (
  `POST_ID` int(11) NOT NULL,
  `ID_DOSSIER` int(11) NOT NULL,
  PRIMARY KEY (`POST_ID`,`ID_DOSSIER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONCERNE`
--

LOCK TABLES `CONCERNE` WRITE;
/*!40000 ALTER TABLE `CONCERNE` DISABLE KEYS */;
/*!40000 ALTER TABLE `CONCERNE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DOCUMENT`
--

DROP TABLE IF EXISTS `DOCUMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DOCUMENT` (
  `ID_DOCUMENT` int(11) NOT NULL AUTO_INCREMENT,
  `ID_DOSSIER` int(11) DEFAULT NULL,
  `NOM` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOC_CORE` longblob DEFAULT NULL,
  PRIMARY KEY (`ID_DOCUMENT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DOCUMENT`
--

LOCK TABLES `DOCUMENT` WRITE;
/*!40000 ALTER TABLE `DOCUMENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `DOCUMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DOSSIER`
--

DROP TABLE IF EXISTS `DOSSIER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DOSSIER` (
  `ID_DOSSIER` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `ID_MODULE` int(11) DEFAULT NULL,
  `nom_dossier` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_DOSSIER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DOSSIER`
--

LOCK TABLES `DOSSIER` WRITE;
/*!40000 ALTER TABLE `DOSSIER` DISABLE KEYS */;
/*!40000 ALTER TABLE `DOSSIER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `INSCRET`
--

DROP TABLE IF EXISTS `INSCRET`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `INSCRET` (
  `ID_DOSSIER` int(11) NOT NULL,
  `COMPTEID` int(11) NOT NULL,
  `DATE_INSCIT` date DEFAULT NULL,
  PRIMARY KEY (`ID_DOSSIER`,`COMPTEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `INSCRET`
--

LOCK TABLES `INSCRET` WRITE;
/*!40000 ALTER TABLE `INSCRET` DISABLE KEYS */;
/*!40000 ALTER TABLE `INSCRET` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MODULE`
--

DROP TABLE IF EXISTS `MODULE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MODULE` (
  `ID_MODULE` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_MODULE` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_MODULE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MODULE`
--

LOCK TABLES `MODULE` WRITE;
/*!40000 ALTER TABLE `MODULE` DISABLE KEYS */;
/*!40000 ALTER TABLE `MODULE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POLL_ELEMENT`
--

DROP TABLE IF EXISTS `POLL_ELEMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `POLL_ELEMENT` (
  `POLL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `POST_ID` int(11) DEFAULT NULL,
  `ELEMENT` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VOTES` int(11) DEFAULT NULL,
  PRIMARY KEY (`POLL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POLL_ELEMENT`
--

LOCK TABLES `POLL_ELEMENT` WRITE;
/*!40000 ALTER TABLE `POLL_ELEMENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `POLL_ELEMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POLL_VOTE`
--

DROP TABLE IF EXISTS `POLL_VOTE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `POLL_VOTE` (
  `POLL_ID` int(11) NOT NULL,
  `COMPTEID` int(11) NOT NULL,
  PRIMARY KEY (`POLL_ID`,`COMPTEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POLL_VOTE`
--

LOCK TABLES `POLL_VOTE` WRITE;
/*!40000 ALTER TABLE `POLL_VOTE` DISABLE KEYS */;
/*!40000 ALTER TABLE `POLL_VOTE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POST`
--

DROP TABLE IF EXISTS `POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `POST` (
  `POST_ID` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `DATE_AJOUTE` date DEFAULT NULL,
  `TYPE` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `POST_CORE` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `titre` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`POST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POST`
--

LOCK TABLES `POST` WRITE;
/*!40000 ALTER TABLE `POST` DISABLE KEYS */;
/*!40000 ALTER TABLE `POST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REPONSE`
--

DROP TABLE IF EXISTS `REPONSE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `REPONSE` (
  `ID_REPONSE` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `POST_ID` int(11) DEFAULT NULL,
  `DATE_AJOUTE` date DEFAULT NULL,
  `REPONSE_CORE` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VOTES` int(11) DEFAULT 0,
  PRIMARY KEY (`ID_REPONSE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REPONSE`
--

LOCK TABLES `REPONSE` WRITE;
/*!40000 ALTER TABLE `REPONSE` DISABLE KEYS */;
/*!40000 ALTER TABLE `REPONSE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UP_DOWN_VOTE`
--

DROP TABLE IF EXISTS `UP_DOWN_VOTE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UP_DOWN_VOTE` (
  `ID_REPONSE` int(11) NOT NULL,
  `COMPTEID` int(11) NOT NULL,
  `vote` int(11) DEFAULT NULL CHECK (`vote` = 1 or `vote` = -1),
  PRIMARY KEY (`ID_REPONSE`,`COMPTEID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UP_DOWN_VOTE`
--

LOCK TABLES `UP_DOWN_VOTE` WRITE;
/*!40000 ALTER TABLE `UP_DOWN_VOTE` DISABLE KEYS */;
/*!40000 ALTER TABLE `UP_DOWN_VOTE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_1`
--

DROP TABLE IF EXISTS `file_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_1` (
  `ID_file` int(11) NOT NULL AUTO_INCREMENT,
  `POST_ID` int(11) DEFAULT NULL,
  `file_CORE` longblob DEFAULT NULL,
  PRIMARY KEY (`ID_file`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_1`
--

LOCK TABLES `file_1` WRITE;
/*!40000 ALTER TABLE `file_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_2`
--

DROP TABLE IF EXISTS `file_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_2` (
  `ID_FILE` int(11) NOT NULL AUTO_INCREMENT,
  `ID_REPONSE` int(11) DEFAULT NULL,
  `FILE_CORE` longblob DEFAULT NULL,
  PRIMARY KEY (`ID_FILE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_2`
--

LOCK TABLES `file_2` WRITE;
/*!40000 ALTER TABLE `file_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-02  4:16:47
