CREATE DATABASE  IF NOT EXISTS `kingshard` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `kingshard`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kingshard
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `test_shard_hash_0000`
--

DROP TABLE IF EXISTS `test_shard_hash_0000`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_hash_0000` (
  `id` bigint(64) unsigned NOT NULL,
  `str` varchar(256) DEFAULT NULL,
  `f` double DEFAULT NULL,
  `e` enum('test1','test2') DEFAULT NULL,
  `u` tinyint(3) unsigned DEFAULT NULL,
  `i` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_hash_0000`
--

LOCK TABLES `test_shard_hash_0000` WRITE;
/*!40000 ALTER TABLE `test_shard_hash_0000` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_hash_0000` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_hash_0001`
--

DROP TABLE IF EXISTS `test_shard_hash_0001`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_hash_0001` (
  `id` bigint(64) unsigned NOT NULL,
  `str` varchar(256) DEFAULT NULL,
  `f` double DEFAULT NULL,
  `e` enum('test1','test2') DEFAULT NULL,
  `u` tinyint(3) unsigned DEFAULT NULL,
  `i` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_hash_0001`
--

LOCK TABLES `test_shard_hash_0001` WRITE;
/*!40000 ALTER TABLE `test_shard_hash_0001` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_hash_0001` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_hash_0002`
--

DROP TABLE IF EXISTS `test_shard_hash_0002`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_hash_0002` (
  `id` bigint(64) unsigned NOT NULL,
  `str` varchar(256) DEFAULT NULL,
  `f` double DEFAULT NULL,
  `e` enum('test1','test2') DEFAULT NULL,
  `u` tinyint(3) unsigned DEFAULT NULL,
  `i` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_hash_0002`
--

LOCK TABLES `test_shard_hash_0002` WRITE;
/*!40000 ALTER TABLE `test_shard_hash_0002` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_hash_0002` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_hash_0003`
--

DROP TABLE IF EXISTS `test_shard_hash_0003`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_hash_0003` (
  `id` bigint(64) unsigned NOT NULL,
  `str` varchar(256) DEFAULT NULL,
  `f` double DEFAULT NULL,
  `e` enum('test1','test2') DEFAULT NULL,
  `u` tinyint(3) unsigned DEFAULT NULL,
  `i` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_hash_0003`
--

LOCK TABLES `test_shard_hash_0003` WRITE;
/*!40000 ALTER TABLE `test_shard_hash_0003` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_hash_0003` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_join`
--

DROP TABLE IF EXISTS `test_shard_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_join` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_join`
--

LOCK TABLES `test_shard_join` WRITE;
/*!40000 ALTER TABLE `test_shard_join` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_range_0000`
--

DROP TABLE IF EXISTS `test_shard_range_0000`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_range_0000` (
  `id` bigint(64) unsigned NOT NULL,
  `str` varchar(256) DEFAULT NULL,
  `f` double DEFAULT NULL,
  `e` enum('test1','test2') DEFAULT NULL,
  `u` tinyint(3) unsigned DEFAULT NULL,
  `i` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_range_0000`
--

LOCK TABLES `test_shard_range_0000` WRITE;
/*!40000 ALTER TABLE `test_shard_range_0000` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_range_0000` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_range_0001`
--

DROP TABLE IF EXISTS `test_shard_range_0001`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_range_0001` (
  `id` bigint(64) unsigned NOT NULL,
  `str` varchar(256) DEFAULT NULL,
  `f` double DEFAULT NULL,
  `e` enum('test1','test2') DEFAULT NULL,
  `u` tinyint(3) unsigned DEFAULT NULL,
  `i` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_range_0001`
--

LOCK TABLES `test_shard_range_0001` WRITE;
/*!40000 ALTER TABLE `test_shard_range_0001` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_range_0001` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_range_0002`
--

DROP TABLE IF EXISTS `test_shard_range_0002`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_range_0002` (
  `id` bigint(64) unsigned NOT NULL,
  `str` varchar(256) DEFAULT NULL,
  `f` double DEFAULT NULL,
  `e` enum('test1','test2') DEFAULT NULL,
  `u` tinyint(3) unsigned DEFAULT NULL,
  `i` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_range_0002`
--

LOCK TABLES `test_shard_range_0002` WRITE;
/*!40000 ALTER TABLE `test_shard_range_0002` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_range_0002` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_range_0003`
--

DROP TABLE IF EXISTS `test_shard_range_0003`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_range_0003` (
  `id` bigint(64) unsigned NOT NULL,
  `str` varchar(256) DEFAULT NULL,
  `f` double DEFAULT NULL,
  `e` enum('test1','test2') DEFAULT NULL,
  `u` tinyint(3) unsigned DEFAULT NULL,
  `i` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_range_0003`
--

LOCK TABLES `test_shard_range_0003` WRITE;
/*!40000 ALTER TABLE `test_shard_range_0003` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_range_0003` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_year_2015`
--

DROP TABLE IF EXISTS `test_shard_year_2015`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_year_2015` (
  `id` int(10) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `ctime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_year_2015`
--

LOCK TABLES `test_shard_year_2015` WRITE;
/*!40000 ALTER TABLE `test_shard_year_2015` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_year_2015` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_year_2016`
--

DROP TABLE IF EXISTS `test_shard_year_2016`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_year_2016` (
  `id` int(10) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `ctime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_year_2016`
--

LOCK TABLES `test_shard_year_2016` WRITE;
/*!40000 ALTER TABLE `test_shard_year_2016` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_year_2016` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_year_2017`
--

DROP TABLE IF EXISTS `test_shard_year_2017`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_year_2017` (
  `id` int(10) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `ctime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_year_2017`
--

LOCK TABLES `test_shard_year_2017` WRITE;
/*!40000 ALTER TABLE `test_shard_year_2017` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_year_2017` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_year_2018`
--

DROP TABLE IF EXISTS `test_shard_year_2018`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_year_2018` (
  `id` int(10) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `ctime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_year_2018`
--

LOCK TABLES `test_shard_year_2018` WRITE;
/*!40000 ALTER TABLE `test_shard_year_2018` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_year_2018` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_shard_year_2019`
--

DROP TABLE IF EXISTS `test_shard_year_2019`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_shard_year_2019` (
  `id` int(10) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `ctime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_shard_year_2019`
--

LOCK TABLES `test_shard_year_2019` WRITE;
/*!40000 ALTER TABLE `test_shard_year_2019` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_shard_year_2019` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-17 10:19:54
