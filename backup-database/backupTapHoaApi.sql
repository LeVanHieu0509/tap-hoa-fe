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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (10,'SP966196','8934572296290','Xúc xích boom boom ăn liền, Mai Vàng-Vissan (100g/5*20g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/1213.jpg?v=1670321957057',8000,10000,'xuc-xich-boom-boom-an-lien-mai-vang-vissan-(100g5*20g)',99999999,0,0,1,NULL,NULL,'2023-12-06 08:50:24.635344','2023-12-06 10:06:04.000000',25),(11,'SP495711','8938544888032','Chân gà','','',8000,10000,'chan-ga',999999999,0,0,1,NULL,NULL,'2023-12-06 08:55:14.024451','2023-12-06 10:05:33.000000',25),(12,'SP536138','8934572296498','Xúc xích to bom bom','','',15500,20000,'xuc-xich-to-bom-bom',999999999,0,0,1,NULL,'2024-01-20','2023-12-06 09:00:06.274621','2023-12-06 10:21:08.000000',25),(13,'SP733629','8935057101351','Scl sữa dừa','','',33000,45000,'scl-sua-dua',900000,0,0,1,NULL,NULL,'2023-12-06 10:35:34.351781','2023-12-06 10:35:34.351781',34),(14,'SP429623','8935057102372','Scl vuông romance','','',38000,45000,'scl-vuong-romance',900000,0,0,1,NULL,NULL,'2023-12-06 10:37:37.681213','2023-12-06 10:37:37.681213',34),(15,'SP598488','4897099702016','Mixed kẹo dẻo','','',31000,40000,'mixed-keo-deo',900000,0,0,1,NULL,NULL,'2023-12-06 10:39:00.529208','2023-12-06 10:39:00.529208',34),(16,'SP289558','8936034611030','Scl nấm','','',33000,40000,'scl-nam',900000,0,0,1,NULL,NULL,'2023-12-06 10:40:37.388004','2023-12-06 10:40:37.388004',34),(17,'SP437773','8934597050181','Lương khô 5*-Hải Châu (70g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/sa-53afa029-be82-4103-8c26-117af6acd5e5.jpg?v=1670320475323',5000,6000,'luong-kho-5*-hai-chau-(70g)',99999999,0,0,1,NULL,NULL,'2023-12-06 10:41:32.427959','2023-12-06 10:41:32.427959',25),(18,'SP125675','8935057102426','Scl kem hạnh nhân','','',63000,75000,'scl-kem-hanh-nhan',900000,0,0,1,NULL,NULL,'2023-12-06 10:41:37.531649','2023-12-06 10:41:37.531649',34),(19,'SP479351','8936086720209','Scl hoa hồng','','',34000,45000,'scl-hoa-hong',90000,0,0,1,NULL,NULL,'2023-12-06 10:43:18.812859','2023-12-06 10:43:18.812859',34),(20,'SP394946','6914074635447','Lương khô 900','','',18000,20000,'luong-kho-900',99999999,0,0,1,NULL,NULL,'2023-12-06 10:43:55.506663','2023-12-06 10:43:55.506663',25),(21,'SP794685','8936086720131','Scl plasa','','',34000,45000,'scl-plasa',90000,0,0,1,NULL,NULL,'2023-12-06 10:44:29.675474','2023-12-06 10:44:29.675474',34),(22,'SP854115','8992760223015','Bánh Quy Oreo Kem Socola Gói 119.6G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8992760223015.jpg.webp',13000,15000,'banh-quy-oreo-kem-socola-goi-119.6g',99999999,0,0,1,NULL,NULL,'2023-12-06 10:46:03.102839','2023-12-06 10:46:03.102839',34),(23,'SP962891','8936086720155','Scl matcha trà xanh','','',34000,45000,'scl-matcha-tra-xanh',90000,0,0,1,NULL,NULL,'2023-12-06 10:46:09.318584','2023-12-06 10:46:09.318584',34),(24,'SP659912','8936086750008','Scl quế','','',38000,50000,'scl-que',900000,0,0,1,NULL,NULL,'2023-12-06 10:46:56.275104','2023-12-06 10:46:56.275104',34),(25,'SP651749','6901668005946','Hộp nhỏ oreon','','',23000,25000,'hop-nho-oreon',99999999,0,0,1,NULL,NULL,'2023-12-06 10:47:20.998354','2023-12-06 10:47:20.998354',34),(26,'SP231824','8936086720179','Scl gấu','','',34000,45000,'scl-gau',90000,0,0,1,NULL,NULL,'2023-12-06 10:47:35.400793','2023-12-06 10:47:35.400793',34),(27,'SP992997','6972612270604','Bánh mì dứa','','',8000,10000,'banh-mi-dua',99999999,0,0,1,NULL,NULL,'2023-12-06 10:48:33.129692','2023-12-06 10:48:33.129692',25),(28,'SP591289','954704100033','Dynamite bạc hà xanh to','','',22000,25000,'dynamite-bac-ha-xanh-to',90000,0,0,1,NULL,NULL,'2023-12-06 10:48:33.694396','2023-12-06 10:48:33.694396',34),(29,'SP194792','8935002321063','Kẹo béo alpenliebe','','',22000,30000,'keo-beo-alpenliebe',90000,0,0,1,NULL,NULL,'2023-12-06 10:49:41.079165','2023-12-06 10:49:41.079165',34),(30,'SP516959','8934609105311','Quê hương','','',23000,30000,'que-huong',90000,0,0,1,NULL,NULL,'2023-12-06 10:50:29.532679','2023-12-06 10:50:29.532679',34),(31,'SP242697','8934595062179','Kẹo Chew sữa Goodmilk-Hải Hà, gói (350g)-','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/10219002232862-stt-103.jpg?v=1670311279707',22000,27000,'keo-chew-sua-goodmilk-hai-ha-goi-(350g)',9000,0,0,1,NULL,NULL,'2023-12-06 10:51:16.830904','2023-12-06 10:51:16.830904',35),(32,'SP277438','8934595060311','Kẹo Chewy xốp chuối-Hải Hà (350g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/xopchuoi85g.jpg?v=1670321660000',19000,25000,'keo-chewy-xop-chuoi-hai-ha-(350g)',90000,0,0,1,NULL,NULL,'2023-12-06 10:51:54.321393','2023-12-06 10:51:54.321393',34),(33,'SP662758','852382007159','Bánh mì vuông vàng','','',13000,15000,'banh-mi-vuong-vang',99999999,0,0,1,NULL,NULL,'2023-12-06 10:51:58.093452','2023-12-06 10:51:58.093452',25),(34,'SP189787','8934609105618','Sữa sumika','','',21000,27000,'sua-sumika',60000,0,0,1,NULL,NULL,'2023-12-06 10:53:37.512598','2023-12-06 10:53:37.512598',34),(35,'SP262478','8936036020137','Bánh Custas Kem Trứng Orion Hộp 276G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036020137.jpg.webp',47000,55000,'banh-custas-kem-trung-orion-hop-276g',90000,0,0,1,NULL,NULL,'2023-12-06 10:54:19.544184','2023-12-06 10:54:19.544184',34),(36,'SP583137','8936036020380','Bánh Orion Chocopie Hộp 396G (12 Cái)','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036020380.jpg.webp',43000,50000,'banh-orion-chocopie-hop-396g-(12-cai)',90000,0,0,1,NULL,NULL,'2023-12-06 10:54:49.130846','2023-12-06 10:54:49.130846',34),(37,'SP321813','8936036026375','Bánh Custas Orion Vị Tiramisu Hộp 276G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036026375-1.jpg.webp',47000,55000,'banh-custas-orion-vi-tiramisu-hop-276g',90000,0,0,1,NULL,NULL,'2023-12-06 10:55:35.360990','2023-12-06 10:55:35.360990',34),(38,'SP322943','8936017562786','Bánh bông nhài vị cam (200g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/5541-bong-nhai-cam-stt-487-9e36a025-f886-417f-bb69-89e422560ce4.jpg?v=1670318639970',22000,25000,'banh-bong-nhai-vi-cam-(200g)',99999999,0,0,1,NULL,NULL,'2023-12-06 10:56:10.416799','2023-12-06 10:56:10.416799',25),(39,'SP235232','8936036024135','Bánh Quy Mè Goute 288G (36G x 8 Gói)','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036024135.jpg.webp',40000,45000,'banh-quy-me-goute-288g-(36g-x-8-goi)',90000,0,0,1,NULL,NULL,'2023-12-06 10:56:33.073976','2023-12-06 10:56:33.073976',34),(40,'SP921586','8936017562519','Bánh mì mịn phô mai','','',22000,25000,'banh-mi-min-pho-mai',99999999,0,0,1,NULL,NULL,'2023-12-06 10:58:28.637691','2023-12-06 10:58:28.637691',25),(41,'SP579573','8934609105762','Chewgum','','',23000,30000,'chewgum',90000,0,0,1,NULL,NULL,'2023-12-06 11:00:35.650545','2023-12-06 11:00:35.650545',34),(42,'SP845889','6972902108709','Bánh mì dài vị ruốc','','',11000,13000,'banh-mi-dai-vi-ruoc',90000,0,0,1,NULL,NULL,'2023-12-06 11:01:53.227743','2023-12-06 11:01:53.227743',34),(43,'SP956553','6952147802211','Bánh mì gấu','','',3500,5000,'banh-mi-gau',99999999,0,0,1,NULL,NULL,'2023-12-06 11:02:41.770510','2023-12-06 11:02:41.770510',25),(44,'SP213717','8934760212842','Bánh mì sandwich','','',13000,15000,'banh-mi-sandwich',99999999,0,0,1,NULL,NULL,'2023-12-06 11:12:27.936768','2023-12-06 11:12:27.936768',25),(45,'SP612741','8938532962720','Bánh Mì Hoa Cúc Ngàn Lớp Fe\'sta Túi 120g (3 Gói x 40g)','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8938532962720-1.jpg.webp',19000,23000,'banh-mi-hoa-cuc-ngan-lop-fe\'sta-tui-120g-(3-goi-x-40g)',99999999,0,0,1,NULL,NULL,'2023-12-06 11:13:25.441384','2023-12-06 11:13:25.441384',25),(46,'SP396142','1212','Cơm cháy mắm','','',4600,8000,'com-chay-mam',999999999,0,0,1,NULL,NULL,'2023-12-06 11:14:48.744395','2023-12-06 12:15:11.000000',25),(47,'SP181973','8936036027464','Bánh Ăn Sáng C\'est Bon Sợi Thịt Gà Sốt Kem Phô Mai Orion Gói 5 Bánh 20.3G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036027464.jpg.webp',17000,20000,'banh-an-sang-c\'est-bon-soi-thit-ga-sot-kem-pho-mai-orion-goi-5-banh-20.3g',999999999,0,0,1,NULL,NULL,'2023-12-06 11:15:44.616249','2023-12-06 12:13:20.000000',25);
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

-- Dump completed on 2023-12-06 12:34:48
