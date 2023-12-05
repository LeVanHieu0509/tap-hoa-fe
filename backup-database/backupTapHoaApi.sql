-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: taphoaApi
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_key`
--

DROP TABLE IF EXISTS `api_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_key` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `permissions` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_key`
--

LOCK TABLES `api_key` WRITE;
/*!40000 ALTER TABLE `api_key` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bills_code` varchar(255) DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `total_customer_price` float DEFAULT NULL,
  `total_refund_price` float DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `cart_products` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `cart_id` int NOT NULL,
  `usr_id` int NOT NULL,
  PRIMARY KEY (`id`,`cart_id`,`usr_id`),
  UNIQUE KEY `IDX_4bf8eaf3388c1fa7a151752b25` (`bills_code`),
  KEY `FK_d6706a28234e8ece0454f3e57f3` (`cart_id`),
  KEY `FK_fab1581f64ac5ce44d90f0c40c3` (`usr_id`),
  CONSTRAINT `FK_d6706a28234e8ece0454f3e57f3` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `FK_fab1581f64ac5ce44d90f0c40c3` FOREIGN KEY (`usr_id`) REFERENCES `users` (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usr_id` int NOT NULL,
  `cart_code` varchar(255) DEFAULT NULL,
  `cart_state` varchar(255) DEFAULT NULL,
  `cart_products` text,
  `cart_count_product` int NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`,`usr_id`),
  UNIQUE KEY `IDX_b2d51cdefb081206475fb8ec5e` (`cart_code`),
  KEY `FK_dbe6cf934568848a9574073d790` (`usr_id`),
  CONSTRAINT `FK_dbe6cf934568848a9574073d790` FOREIGN KEY (`usr_id`) REFERENCES `users` (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (18,2,'HD276677','active','[]',0,'2023-12-04 12:40:44.430126','2023-12-04 14:00:12.000000'),(19,1,'HD977471','active','[]',0,'2023-12-04 14:35:56.311938','2023-12-04 14:35:56.311938');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'2023-12-02 00:42:40.546286','2023-12-02 00:42:40.546286','Đồ uống giải khát','\"\"'),(25,'2023-12-02 00:49:08.386510','2023-12-02 00:49:08.386510','Đồ ăn nhanh','\"\"'),(26,'2023-12-02 00:49:08.397525','2023-12-02 00:49:08.397525','Các loại sữa, kem','\"\"'),(27,'2023-12-02 00:49:08.405436','2023-12-02 00:49:08.405436','Thực phẩm khô','\"\"'),(28,'2023-12-02 00:49:08.418315','2023-12-02 00:49:08.418315','Mặt hàng gia vị','\"\"'),(29,'2023-12-02 00:49:08.433557','2023-12-02 00:49:08.433557','Dầu ăn','\"\"'),(30,'2023-12-02 00:49:08.444410','2023-12-02 00:49:08.444410','Khăn giấy, tã bỉm','\"\"'),(31,'2023-12-02 00:49:08.456474','2023-12-02 00:49:08.456474','Mỹ phẩm','\"\"'),(32,'2023-12-02 00:49:08.467529','2023-12-02 00:49:08.467529','Văn phòng phẩm','\"\"'),(33,'2023-12-02 00:49:08.487792','2023-12-02 00:49:08.487792','Đồ sinh hoạt cá nhân','\"\"'),(34,'2023-12-02 00:49:08.505707','2023-12-02 00:49:08.505707','Bánh kẹo, thực phẩm','\"\"'),(35,'2023-12-02 00:49:08.516533','2023-12-02 00:49:08.516533','Một số mặt hàng khác','\"\"'),(36,'2023-12-02 00:49:08.534637','2023-12-02 00:49:08.534637','Các loại thẻ cào điện thoại','\"\"');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventories`
--

DROP TABLE IF EXISTS `inventories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `inven_location` varchar(255) NOT NULL,
  `inven_stock` int DEFAULT NULL,
  `inven_reservations` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_92fc0c77bab4a656b9619322c62` (`product_id`),
  CONSTRAINT `FK_92fc0c77bab4a656b9619322c62` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventories`
--

LOCK TABLES `inventories` WRITE;
/*!40000 ALTER TABLE `inventories` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keys`
--

DROP TABLE IF EXISTS `keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `publicKey` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `privateKey` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `refreshToken` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `usr_id` int NOT NULL,
  `refreshTokensUsed` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`,`usr_id`),
  KEY `FK_104fff4491cbedced7682d8fc83` (`usr_id`),
  CONSTRAINT `FK_104fff4491cbedced7682d8fc83` FOREIGN KEY (`usr_id`) REFERENCES `users` (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keys`
--

LOCK TABLES `keys` WRITE;
/*!40000 ALTER TABLE `keys` DISABLE KEYS */;
INSERT INTO `keys` VALUES (1,'c342c7d9392ac39df7e9ee47fa72139e46eda2a086879a20b048a964df234a704a10b1bf7795492b6e0ce9006bd8ba767e7765a89d9b33bda66111b85e02188f','403d7218ed9d3d48e964997b1cdd6c42ec10f8ce44a593916d9b3a730afc3add8a1afc65f1f44e5989fd35dc670baadae463b9b6ad3f7813c02da36dac759bec',NULL,'2023-12-01 00:59:41.220923','2023-12-01 00:59:41.220923',1,''),(2,'8b431ae8a5e41eda788cd4db57850094771deaac8dc4f7266584d2a442066fe0446bc796d1e3332d301fe84f0dae71c1cc8be411164118aea9f2c2346a1a1698','fc23f680eff5961cb00151b67897fcad9ed2f65a0943a563f602389bf54980e205d7907689abb716f20e2dc2d7f869dc960f331171e5c2374fe197889f220e0c',NULL,'2023-12-01 01:01:25.801094','2023-12-01 01:01:25.801094',2,''),(3,'95f49be7c743933bd2f6207e2d9098c5e9e6bda8186d47cb677a3ed6990e59b5be4d9cebde18fd31fc6ec7e493fb7c20d2974f09d2673d7fb6c8db48383ecae8','361f41f4702a36b53f4618e688daaa4cf725da1ed274118aba0d77291473efd278a7d20b598d21b8dd28c0ab0535a63467ef2c797e21dca8617c2870ab84c80f',NULL,'2023-12-02 01:15:14.938783','2023-12-02 01:15:14.938783',3,''),(4,'42f94e3fc23a1216d202e3d7595609148f881e0b216892a90961cf47e771d1f2ad9981735f90b36ccf48316437d3b00b0fb14ec1d2a6b503eff06c23d3731de6','3ccb2a5c91d250097ed45e241677b51c462f4cd2e75cd9a09421eaf04f42129e493203298d97b46ce6ec35130f1730f81373652579e7db9c740052a9f51faa7b',NULL,'2023-12-04 07:35:47.566321','2023-12-04 07:35:47.566321',4,'');
/*!40000 ALTER TABLE `keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_histories`
--

DROP TABLE IF EXISTS `login_histories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_histories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usr_name` varchar(255) DEFAULT NULL,
  `loginTime` datetime DEFAULT NULL,
  `logoutTime` datetime DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `usr_id` int NOT NULL,
  PRIMARY KEY (`id`,`usr_id`),
  KEY `FK_527228f1f9ce7dcd1144e6950b9` (`usr_id`),
  CONSTRAINT `FK_527228f1f9ce7dcd1144e6950b9` FOREIGN KEY (`usr_id`) REFERENCES `users` (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_histories`
--

LOCK TABLES `login_histories` WRITE;
/*!40000 ALTER TABLE `login_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_histories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_code` varchar(255) DEFAULT NULL,
  `product_bar_code` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_description` text,
  `product_image_url` varchar(255) DEFAULT NULL,
  `product_price_origin` float DEFAULT NULL,
  `product_price_sell` float DEFAULT NULL,
  `product_slug` varchar(255) DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  `is_draft` smallint NOT NULL DEFAULT '0',
  `is_gen_product_bar_code` smallint NOT NULL DEFAULT '0',
  `is_published` smallint NOT NULL DEFAULT '1',
  `product_manufacture_date` date DEFAULT NULL,
  `product_expired_date` date DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_70b3f77ca8de13149b7f08d725` (`product_code`),
  UNIQUE KEY `IDX_f0d745d753ccf1f19ad7ee360f` (`product_code`,`product_bar_code`),
  KEY `FK_9a5f6868c96e0069e699f33e124` (`category_id`),
  CONSTRAINT `FK_9a5f6868c96e0069e699f33e124` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `usr_id` int NOT NULL AUTO_INCREMENT,
  `usr_age` int DEFAULT NULL,
  `usr_status` int DEFAULT '1',
  `usr_roles` varchar(255) DEFAULT NULL,
  `usr_pass` varchar(255) DEFAULT NULL,
  `usr_phone` varchar(255) DEFAULT NULL,
  `usr_blocked` bit(1) DEFAULT NULL,
  `usr_lock_count` int DEFAULT NULL,
  `usr_lock_time` datetime DEFAULT NULL,
  `usr_reset_password` int DEFAULT NULL,
  `usr_migration` smallint DEFAULT NULL,
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `usr_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `usr_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `usr_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`usr_id`),
  UNIQUE KEY `IDX_de17588d52ca8c68a901619db0` (`usr_id`),
  KEY `idx_status` (`usr_status`),
  KEY `idx_email_age_name` (`usr_email`,`usr_age`,`usr_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,1,'ADMINIE','$2b$10$pY0w.TpU/qiFvWNhR.pucem5WQlEzFrQIzPGGbDYT0SCCSC.8HhWW',NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-02 02:39:20.955753','2023-12-01 00:59:41.177864',NULL,'admin',NULL),(2,NULL,1,'EMPLOYEE','$2b$10$7oWslN1klr/YKoZrK/hScOFqCH9sefVxwH10ypuog24VAfu4hapua',NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-02 00:39:17.000000','2023-12-01 01:01:25.758428',NULL,'nhanvien1',NULL),(3,NULL,1,'EMPLOYEE','$2b$10$6c62dEh424O8I0zkon4WR.36TQmDicXhJk3zyBq.PRuOfBtu6HR7W',NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-02 01:15:14.894619','2023-12-02 01:15:14.894619',NULL,'nhanvien2',NULL),(4,NULL,1,'EMPLOYEE','$2b$10$5FG8PZoErFaaNyG2eFgIPOGMANfzWkdzRvDcEgszlwyrUI.YUbsAG',NULL,NULL,NULL,NULL,NULL,NULL,'2023-12-04 07:35:47.526431','2023-12-04 07:35:47.526431',NULL,'chi Nga',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-05 10:07:05
