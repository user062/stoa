-- MariaDB dump 10.19  Distrib 10.5.10-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: stoaDB
-- ------------------------------------------------------
-- Server version	10.5.10-MariaDB

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
  `DATE_AJOUTE` timestamp NOT NULL DEFAULT current_timestamp(),
  `COMM_CORE` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DATE_EDIT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_COMMENTAIRE`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`user062`@`localhost`*/ /*!50003 TRIGGER notify_comment AFTER INSERT ON COMMENTAIRE 
       FOR EACH ROW 
       BEGIN
        insert into comment_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE, ID_COMMENTAIRE)
        select
             I.COMPTEID, I.ID_MODULE, R.POST_ID, NEW.ID_REPONSE, NEW.ID_COMMENTAIRE
        from
             REPONSE R
             join
             CONCERNE C on C.POST_ID=R.POST_ID
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             NEW.COMPTEID <> I.COMPTEID
             and
             R.ID_REPONSE=NEW.ID_REPONSE
        group by I.COMPTEID;
       END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `vcode` int(11) DEFAULT 0,
  `date_inscrit` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `TYPE` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL CHECK (`TYPE` = 'E' or `TYPE` = 'P'),
  PRIMARY KEY (`COMPTEID`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `DOCUMENT`
--

DROP TABLE IF EXISTS `DOCUMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DOCUMENT` (
  `ID_DOCUMENT` int(11) NOT NULL AUTO_INCREMENT,
  `ID_MODULE` int(11) DEFAULT NULL,
  `NOM` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL CHECK (`type` = 'c' or `type` = 't' or `type` = 'h'),
  `date_ajoute` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ID_DOCUMENT`),
  KEY `ID_MODULE` (`ID_MODULE`),
  CONSTRAINT `DOCUMENT_ibfk_1` FOREIGN KEY (`ID_MODULE`) REFERENCES `MODULE` (`ID_MODULE`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`user062`@`localhost`*/ /*!50003 TRIGGER notify_resources AFTER INSERT ON DOCUMENT
       FOR EACH ROW
       BEGIN
        insert into resources_notifications (COMPTEID, ID_MODULE, ID_DOCUMENT, type)
        select
             I.COMPTEID, I.ID_MODULE as ID_MODULE, NEW.ID_DOCUMENT as ID_DOCUMENT, NEW.type as type
        from
             INSCRIT I
        where
               I.ID_MODULE=NEW.ID_MODULE
               and
               I.COMPTEID not in (select e.COMPTEID from enseigner e where e.ID_MODULE=NEW.ID_MODULE);
       END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `INSCRIT`
--

DROP TABLE IF EXISTS `INSCRIT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `INSCRIT` (
  `ID_MODULE` int(11) NOT NULL,
  `COMPTEID` int(11) NOT NULL,
  `DATE_INSCRIT` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ID_MODULE`,`COMPTEID`),
  CONSTRAINT `INSCRIT_ibfk_1` FOREIGN KEY (`ID_MODULE`) REFERENCES `MODULE` (`ID_MODULE`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MODULE`
--

DROP TABLE IF EXISTS `MODULE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MODULE` (
  `ID_MODULE` int(11) NOT NULL AUTO_INCREMENT,
  `NOM_MODULE` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_MODULE`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `VOTES` int(11) DEFAULT 0,
  PRIMARY KEY (`POLL_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=416 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `POST`
--

DROP TABLE IF EXISTS `POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `POST` (
  `POST_ID` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DATE_AJOUTE` timestamp NOT NULL DEFAULT current_timestamp(),
  `TYPE` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `POST_CORE` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DATE_EDIT` datetime DEFAULT NULL,
  PRIMARY KEY (`POST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=484 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`user062`@`localhost`*/ /*!50003 TRIGGER notify_posts AFTER INSERT ON POST 
       FOR EACH ROW
       BEGIN
        insert into posts_notifications (COMPTEID, ID_MODULE, POST_ID, type)
        select
             I.COMPTEID, I.ID_MODULE, NEW.POST_ID, NEW.type
        from
             CONCERNE C
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             C.POST_ID = NEW.POST_ID
             and
             NEW.COMPTEID <> I.COMPTEID
        group by I.COMPTEID;
       END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `DATE_AJOUTE` timestamp NOT NULL DEFAULT current_timestamp(),
  `REPONSE_CORE` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VOTES` int(11) DEFAULT 0,
  `DATE_EDIT` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_REPONSE`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`user062`@`localhost`*/ /*!50003 TRIGGER notify_reply AFTER INSERT ON REPONSE 
       FOR EACH ROW
       BEGIN
        insert into reply_notifications (COMPTEID, ID_MODULE, POST_ID, ID_REPONSE)
        select
             I.COMPTEID, I.ID_MODULE, NEW.POST_ID, NEW.ID_REPONSE
        from
             CONCERNE C
             join
             DOSSIER D on D.ID_DOSSIER = C.ID_DOSSIER
             join
             INSCRIT I on D.ID_MODULE = I.ID_MODULE
        where
             C.POST_ID = NEW.POST_ID
             and
             NEW.COMPTEID <> I.COMPTEID
        group by I.COMPTEID;
       END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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

--
-- Table structure for table `comment_notifications`
--

DROP TABLE IF EXISTS `comment_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `ID_MODULE` int(11) DEFAULT NULL,
  `POST_ID` int(11) DEFAULT NULL,
  `ID_REPONSE` int(11) DEFAULT NULL,
  `ID_COMMENTAIRE` int(11) DEFAULT NULL,
  `date_ajoute` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`notification_id`),
  KEY `ID_COMMENTAIRE` (`ID_COMMENTAIRE`),
  KEY `ID_REPONSE` (`ID_REPONSE`),
  KEY `POST_ID` (`POST_ID`),
  KEY `ID_MODULE` (`ID_MODULE`),
  KEY `COMPTEID` (`COMPTEID`),
  CONSTRAINT `comment_notifications_ibfk_1` FOREIGN KEY (`ID_COMMENTAIRE`) REFERENCES `COMMENTAIRE` (`ID_COMMENTAIRE`) ON DELETE CASCADE,
  CONSTRAINT `comment_notifications_ibfk_2` FOREIGN KEY (`ID_REPONSE`) REFERENCES `REPONSE` (`ID_REPONSE`) ON DELETE CASCADE,
  CONSTRAINT `comment_notifications_ibfk_3` FOREIGN KEY (`POST_ID`) REFERENCES `POST` (`POST_ID`) ON DELETE CASCADE,
  CONSTRAINT `comment_notifications_ibfk_4` FOREIGN KEY (`ID_MODULE`) REFERENCES `MODULE` (`ID_MODULE`) ON DELETE CASCADE,
  CONSTRAINT `comment_notifications_ibfk_5` FOREIGN KEY (`COMPTEID`) REFERENCES `COMPTE` (`COMPTEID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_notifications`
--

--
-- Table structure for table `enseigner`
--

DROP TABLE IF EXISTS `enseigner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enseigner` (
  `COMPTEID` int(11) NOT NULL,
  `ID_MODULE` int(11) NOT NULL,
  PRIMARY KEY (`ID_MODULE`,`COMPTEID`),
  KEY `FK_enseigner1` (`COMPTEID`),
  CONSTRAINT `FK_enseigner1` FOREIGN KEY (`COMPTEID`) REFERENCES `COMPTE` (`COMPTEID`) ON DELETE CASCADE,
  CONSTRAINT `FK_enseigner2` FOREIGN KEY (`ID_MODULE`) REFERENCES `MODULE` (`ID_MODULE`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `ID_file` int(11) NOT NULL AUTO_INCREMENT,
  `POST_ID` int(11) DEFAULT NULL,
  `ID_REPONSE` int(11) DEFAULT NULL,
  `file_path` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_name` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID_file`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

--
-- Table structure for table `posts_notifications`
--

DROP TABLE IF EXISTS `posts_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `ID_MODULE` int(11) DEFAULT NULL,
  `POST_ID` int(11) DEFAULT NULL,
  `type` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL CHECK (`type` = 'q' or `type` = 'p' or `type` = 'n'),
  `date_ajoute` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`notification_id`),
  KEY `POST_ID` (`POST_ID`),
  KEY `ID_MODULE` (`ID_MODULE`),
  KEY `COMPTEID` (`COMPTEID`),
  CONSTRAINT `posts_notifications_ibfk_1` FOREIGN KEY (`POST_ID`) REFERENCES `POST` (`POST_ID`) ON DELETE CASCADE,
  CONSTRAINT `posts_notifications_ibfk_2` FOREIGN KEY (`ID_MODULE`) REFERENCES `MODULE` (`ID_MODULE`) ON DELETE CASCADE,
  CONSTRAINT `posts_notifications_ibfk_3` FOREIGN KEY (`COMPTEID`) REFERENCES `COMPTE` (`COMPTEID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `reply_notifications`
--

DROP TABLE IF EXISTS `reply_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reply_notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `ID_MODULE` int(11) DEFAULT NULL,
  `POST_ID` int(11) DEFAULT NULL,
  `ID_REPONSE` int(11) DEFAULT NULL,
  `date_ajoute` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`notification_id`),
  KEY `ID_REPONSE` (`ID_REPONSE`),
  KEY `POST_ID` (`POST_ID`),
  KEY `ID_MODULE` (`ID_MODULE`),
  KEY `COMPTEID` (`COMPTEID`),
  CONSTRAINT `reply_notifications_ibfk_1` FOREIGN KEY (`ID_REPONSE`) REFERENCES `REPONSE` (`ID_REPONSE`) ON DELETE CASCADE,
  CONSTRAINT `reply_notifications_ibfk_2` FOREIGN KEY (`POST_ID`) REFERENCES `POST` (`POST_ID`) ON DELETE CASCADE,
  CONSTRAINT `reply_notifications_ibfk_3` FOREIGN KEY (`ID_MODULE`) REFERENCES `MODULE` (`ID_MODULE`) ON DELETE CASCADE,
  CONSTRAINT `reply_notifications_ibfk_4` FOREIGN KEY (`COMPTEID`) REFERENCES `COMPTE` (`COMPTEID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `resources_notifications`
--

DROP TABLE IF EXISTS `resources_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resources_notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `COMPTEID` int(11) DEFAULT NULL,
  `ID_MODULE` int(11) DEFAULT NULL,
  `ID_DOCUMENT` int(11) DEFAULT NULL,
  `type` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL CHECK (`type` = 'c' or `type` = 't' or `type` = 'h'),
  `date_ajoute` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`notification_id`),
  KEY `ID_DOCUMENT` (`ID_DOCUMENT`),
  KEY `ID_MODULE` (`ID_MODULE`),
  KEY `COMPTEID` (`COMPTEID`),
  CONSTRAINT `resources_notifications_ibfk_1` FOREIGN KEY (`ID_DOCUMENT`) REFERENCES `DOCUMENT` (`ID_DOCUMENT`) ON DELETE CASCADE,
  CONSTRAINT `resources_notifications_ibfk_2` FOREIGN KEY (`ID_MODULE`) REFERENCES `MODULE` (`ID_MODULE`) ON DELETE CASCADE,
  CONSTRAINT `resources_notifications_ibfk_3` FOREIGN KEY (`COMPTEID`) REFERENCES `COMPTE` (`COMPTEID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

