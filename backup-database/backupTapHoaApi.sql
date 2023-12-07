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
INSERT INTO `carts` VALUES (18,2,'HD276677','active','[]',0,'2023-12-04 12:40:44.430126','2023-12-04 14:00:12.000000'),(19,1,'HD977471','active','[{\"product_code\":\"SP429623\",\"product_name\":\"Scl vuông romance\",\"product_price_sell\":45000,\"product_quantity\":1}]',0,'2023-12-04 14:35:56.311938','2023-12-06 18:57:42.000000');
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
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (10,'SP966196','8934572296290','Xúc xích boom boom ăn liền, Mai Vàng-Vissan (100g/5*20g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/1213.jpg?v=1670321957057',8000,10000,'xuc-xich-boom-boom-an-lien-mai-vang-vissan-(100g5*20g)',99999999,0,0,1,NULL,NULL,'2023-12-06 08:50:24.635344','2023-12-06 10:06:04.000000',25),(11,'SP495711','8938544888032','Chân gà','','',8000,10000,'chan-ga',999999999,0,0,1,NULL,NULL,'2023-12-06 08:55:14.024451','2023-12-06 10:05:33.000000',25),(12,'SP536138','8934572296498','Xúc xích to bom bom','','',15500,20000,'xuc-xich-to-bom-bom',999999999,0,0,1,NULL,'2024-01-20','2023-12-06 09:00:06.274621','2023-12-06 10:21:08.000000',25),(13,'SP733629','8935057101351','Scl sữa dừa','','',33000,45000,'scl-sua-dua',900000,0,0,1,NULL,NULL,'2023-12-06 10:35:34.351781','2023-12-06 10:35:34.351781',34),(14,'SP429623','8935057102372','Scl vuông romance','','',38000,45000,'scl-vuong-romance',900000,0,0,1,NULL,NULL,'2023-12-06 10:37:37.681213','2023-12-06 10:37:37.681213',34),(15,'SP598488','4897099702016','Mixed kẹo dẻo','','',31000,40000,'mixed-keo-deo',900000,0,0,1,NULL,NULL,'2023-12-06 10:39:00.529208','2023-12-06 10:39:00.529208',34),(16,'SP289558','8936034611030','Scl nấm','','',33000,40000,'scl-nam',900000,0,0,1,NULL,NULL,'2023-12-06 10:40:37.388004','2023-12-06 10:40:37.388004',34),(17,'SP437773','8934597050181','Lương khô 5*-Hải Châu (70g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/sa-53afa029-be82-4103-8c26-117af6acd5e5.jpg?v=1670320475323',5000,6000,'luong-kho-5*-hai-chau-(70g)',99999999,0,0,1,NULL,NULL,'2023-12-06 10:41:32.427959','2023-12-06 10:41:32.427959',25),(18,'SP125675','8935057102426','Scl kem hạnh nhân','','',63000,75000,'scl-kem-hanh-nhan',900000,0,0,1,NULL,NULL,'2023-12-06 10:41:37.531649','2023-12-06 10:41:37.531649',34),(19,'SP479351','8936086720209','Scl hoa hồng','','',34000,45000,'scl-hoa-hong',90000,0,0,1,NULL,NULL,'2023-12-06 10:43:18.812859','2023-12-06 10:43:18.812859',34),(20,'SP394946','6914074635447','Lương khô 900','','',18000,20000,'luong-kho-900',99999999,0,0,1,NULL,NULL,'2023-12-06 10:43:55.506663','2023-12-06 10:43:55.506663',25),(21,'SP794685','8936086720131','Scl plasa','','',34000,45000,'scl-plasa',90000,0,0,1,NULL,NULL,'2023-12-06 10:44:29.675474','2023-12-06 10:44:29.675474',34),(22,'SP854115','8992760223015','Bánh Quy Oreo Kem Socola Gói 119.6G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8992760223015.jpg.webp',13000,15000,'banh-quy-oreo-kem-socola-goi-119.6g',99999999,0,0,1,NULL,NULL,'2023-12-06 10:46:03.102839','2023-12-06 10:46:03.102839',34),(23,'SP962891','8936086720155','Scl matcha trà xanh','','',34000,45000,'scl-matcha-tra-xanh',90000,0,0,1,NULL,NULL,'2023-12-06 10:46:09.318584','2023-12-06 10:46:09.318584',34),(24,'SP659912','8936086750008','Scl quế','','',38000,50000,'scl-que',900000,0,0,1,NULL,NULL,'2023-12-06 10:46:56.275104','2023-12-06 10:46:56.275104',34),(25,'SP651749','6901668005946','Hộp nhỏ oreon','','',23000,25000,'hop-nho-oreon',99999999,0,0,1,NULL,NULL,'2023-12-06 10:47:20.998354','2023-12-06 10:47:20.998354',34),(26,'SP231824','8936086720179','Scl gấu','','',34000,45000,'scl-gau',90000,0,0,1,NULL,NULL,'2023-12-06 10:47:35.400793','2023-12-06 10:47:35.400793',34),(27,'SP992997','6972612270604','Bánh mì dứa','','',8000,10000,'banh-mi-dua',99999999,0,0,1,NULL,NULL,'2023-12-06 10:48:33.129692','2023-12-06 10:48:33.129692',25),(28,'SP591289','954704100033','Dynamite bạc hà xanh to','','',22000,25000,'dynamite-bac-ha-xanh-to',90000,0,0,1,NULL,NULL,'2023-12-06 10:48:33.694396','2023-12-06 10:48:33.694396',34),(29,'SP194792','8935002321063','Kẹo béo alpenliebe','','',22000,30000,'keo-beo-alpenliebe',90000,0,0,1,NULL,NULL,'2023-12-06 10:49:41.079165','2023-12-06 10:49:41.079165',34),(30,'SP516959','8934609105311','Quê hương','','',23000,30000,'que-huong',90000,0,0,1,NULL,NULL,'2023-12-06 10:50:29.532679','2023-12-06 10:50:29.532679',34),(31,'SP242697','8934595062179','Kẹo Chew sữa Goodmilk-Hải Hà, gói (350g)-','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/10219002232862-stt-103.jpg?v=1670311279707',22000,27000,'keo-chew-sua-goodmilk-hai-ha-goi-(350g)',9000,0,0,1,NULL,NULL,'2023-12-06 10:51:16.830904','2023-12-06 10:51:16.830904',35),(32,'SP277438','8934595060311','Kẹo Chewy xốp chuối-Hải Hà (350g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/xopchuoi85g.jpg?v=1670321660000',19000,25000,'keo-chewy-xop-chuoi-hai-ha-(350g)',90000,0,0,1,NULL,NULL,'2023-12-06 10:51:54.321393','2023-12-06 10:51:54.321393',34),(33,'SP662758','852382007159','Bánh mì vuông vàng','','',13000,15000,'banh-mi-vuong-vang',99999999,0,0,1,NULL,NULL,'2023-12-06 10:51:58.093452','2023-12-06 10:51:58.093452',25),(34,'SP189787','8934609105618','Sữa sumika','','',21000,27000,'sua-sumika',60000,0,0,1,NULL,NULL,'2023-12-06 10:53:37.512598','2023-12-06 10:53:37.512598',34),(35,'SP262478','8936036020137','Bánh Custas Kem Trứng Orion Hộp 276G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036020137.jpg.webp',47000,55000,'banh-custas-kem-trung-orion-hop-276g',90000,0,0,1,NULL,NULL,'2023-12-06 10:54:19.544184','2023-12-06 10:54:19.544184',34),(36,'SP583137','8936036020380','Bánh Orion Chocopie Hộp 396G (12 Cái)','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036020380.jpg.webp',43000,50000,'banh-orion-chocopie-hop-396g-(12-cai)',90000,0,0,1,NULL,NULL,'2023-12-06 10:54:49.130846','2023-12-06 10:54:49.130846',34),(37,'SP321813','8936036026375','Bánh Custas Orion Vị Tiramisu Hộp 276G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036026375-1.jpg.webp',47000,55000,'banh-custas-orion-vi-tiramisu-hop-276g',90000,0,0,1,NULL,NULL,'2023-12-06 10:55:35.360990','2023-12-06 10:55:35.360990',34),(38,'SP322943','8936017562786','Bánh bông nhài vị cam (200g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/5541-bong-nhai-cam-stt-487-9e36a025-f886-417f-bb69-89e422560ce4.jpg?v=1670318639970',22000,25000,'banh-bong-nhai-vi-cam-(200g)',99999999,0,0,1,NULL,NULL,'2023-12-06 10:56:10.416799','2023-12-06 10:56:10.416799',25),(39,'SP235232','8936036024135','Bánh Quy Mè Goute 288G (36G x 8 Gói)','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036024135.jpg.webp',40000,45000,'banh-quy-me-goute-288g-(36g-x-8-goi)',90000,0,0,1,NULL,NULL,'2023-12-06 10:56:33.073976','2023-12-06 10:56:33.073976',34),(40,'SP921586','8936017562519','Bánh mì mịn phô mai','','',22000,25000,'banh-mi-min-pho-mai',99999999,0,0,1,NULL,NULL,'2023-12-06 10:58:28.637691','2023-12-06 10:58:28.637691',25),(41,'SP579573','8934609105762','Chewgum','','',23000,30000,'chewgum',90000,0,0,1,NULL,NULL,'2023-12-06 11:00:35.650545','2023-12-06 11:00:35.650545',34),(42,'SP845889','6972902108709','Bánh mì dài vị ruốc','','',11000,13000,'banh-mi-dai-vi-ruoc',90000,0,0,1,NULL,NULL,'2023-12-06 11:01:53.227743','2023-12-06 11:01:53.227743',34),(43,'SP956553','6952147802211','Bánh mì gấu','','',3500,5000,'banh-mi-gau',99999999,0,0,1,NULL,NULL,'2023-12-06 11:02:41.770510','2023-12-06 11:02:41.770510',25),(44,'SP213717','8934760212842','Bánh mì sandwich','','',13000,15000,'banh-mi-sandwich',99999999,0,0,1,NULL,NULL,'2023-12-06 11:12:27.936768','2023-12-06 11:12:27.936768',25),(45,'SP612741','8938532962720','Bánh Mì Hoa Cúc Ngàn Lớp Fe\'sta Túi 120g (3 Gói x 40g)','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8938532962720-1.jpg.webp',19000,23000,'banh-mi-hoa-cuc-ngan-lop-fe\'sta-tui-120g-(3-goi-x-40g)',99999999,0,0,1,NULL,NULL,'2023-12-06 11:13:25.441384','2023-12-06 11:13:25.441384',25),(46,'SP396142','1212','Cơm cháy mắm','','',4600,8000,'com-chay-mam',999999999,0,0,1,NULL,NULL,'2023-12-06 11:14:48.744395','2023-12-06 12:15:11.000000',25),(47,'SP181973','8936036027464','Bánh Ăn Sáng C\'est Bon Sợi Thịt Gà Sốt Kem Phô Mai Orion Gói 5 Bánh 20.3G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936036027464.jpg.webp',17000,20000,'banh-an-sang-c\'est-bon-soi-thit-ga-sot-kem-pho-mai-orion-goi-5-banh-20.3g',999999999,0,0,1,NULL,NULL,'2023-12-06 11:15:44.616249','2023-12-06 12:13:20.000000',25),(48,'SP219636','8993175537285','Bánh kem xốp vị pho mai Nabati-Richesse, gói (110g).','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/nabati-wafer-3-variant-654.png?v=1698572640000',8000,10000,'banh-kem-xop-vi-pho-mai-nabati-richesse-goi-(110g).',999999999,0,0,1,NULL,NULL,'2023-12-06 15:50:19.518666','2023-12-06 15:50:19.518666',25),(49,'SP619152','8993175537346','Bánh kem xốp nhân socola-Nabati Richeese, gói (110g).','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/screenshot-1686984405-489.png?v=1698573346000',8000,10000,'banh-kem-xop-nhan-socola-nabati-richeese-goi-(110g).',999999999,0,0,1,NULL,NULL,'2023-12-06 15:51:08.119903','2023-12-06 15:51:08.119903',25),(50,'SP527425','8993175542098','Bịch Bánh xốp nabati 10 cái nhân phô mai','','',18000,20000,'bich-banh-xop-nabati-10-cai-nhan-pho-mai',999999999,0,0,1,NULL,NULL,'2023-12-06 15:53:01.434884','2023-12-06 15:53:01.434884',25),(51,'SP238981','8993175542128','Bịch Bánh xốp nabeti 10 cái nhân socola','','',18000,20000,'bich-banh-xop-nabeti-10-cai-nhan-socola',999999999,0,0,1,NULL,NULL,'2023-12-06 15:54:22.574982','2023-12-06 15:54:22.574982',25),(52,'SP385813','8936202230438','Snack đùi gà','','',7000,10000,'snack-djui-ga',999999999,0,0,1,NULL,NULL,'2023-12-06 15:55:11.132277','2023-12-06 15:55:11.132277',25),(53,'SP712284','8936202230322','Snack Tăm phô mai','','',7000,10000,'snack-tam-pho-mai',999999999,0,0,1,NULL,NULL,'2023-12-06 15:55:59.511303','2023-12-06 15:55:59.511303',25),(54,'SP877439','8936202230360','Snack quẩy hưu gia','','',7000,10000,'snack-quay-huu-gia',999999999,0,0,1,NULL,NULL,'2023-12-06 15:56:59.485645','2023-12-06 15:56:59.485645',25),(55,'SP276312','8936202230285','Snack Tai Heo','','',7000,10000,'snack-tai-heo',999999999,0,0,1,NULL,NULL,'2023-12-06 15:58:10.386563','2023-12-06 15:58:10.386563',25),(56,'SP734569','8936202230292','Quẩy xoắn','','',7000,10000,'quay-xoan',999999999,0,0,1,NULL,NULL,'2023-12-06 15:59:10.256922','2023-12-06 15:59:10.256922',25),(57,'SP229235','8936202230926 ','Snack Mì Cay','','',7000,10000,'snack-mi-cay',999999999,0,0,1,NULL,NULL,'2023-12-06 16:00:10.397026','2023-12-06 16:00:10.397026',25),(58,'SP281626','6970577960684','Bánh mì tròn ','','',13000,15000,'banh-mi-tron',999999999,0,0,1,NULL,NULL,'2023-12-06 16:01:11.318000','2023-12-06 17:48:44.000000',25),(59,'SP244268','8934597050174','1 hộp lương khô 5 vàng','','',50000,55000,'1-hop-luong-kho-5-vang',999999999,0,0,1,NULL,NULL,'2023-12-06 16:04:12.608154','2023-12-06 16:04:12.608154',25),(60,'SP421448','8934673300483','Sữa Chua Uống Tiệt Trùng Vinamilk Susu Hương Cam Lốc 6 Chai 80ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934673300483-1.jpg.webp',20000,23000,'sua-chua-uong-tiet-trung-vinamilk-susu-huong-cam-loc-6-chai-80ml',999999999,0,0,1,NULL,NULL,'2023-12-06 16:05:43.852577','2023-12-06 16:05:43.852577',26),(61,'SP179334','8934673644013','Sữa chua su su ống','','',20000,23000,'sua-chua-su-su-ong',999999999,0,0,1,NULL,NULL,'2023-12-06 16:07:35.242576','2023-12-06 16:07:35.242576',26),(62,'SP922915','8934841863116','Lốc 6 Sữa Chua Uống Fristi Cam 80ML','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934841863116.jpg.webp',20000,23000,'loc-6-sua-chua-uong-fristi-cam-80ml',999999999,0,0,1,NULL,NULL,'2023-12-06 16:08:24.450780','2023-12-06 16:08:24.450780',26),(63,'SP577338','8850952011638','Sữa chua deedo ống ','','',23000,25000,'sua-chua-deedo-ong',999999999,0,0,1,NULL,NULL,'2023-12-06 16:09:14.975232','2023-12-06 16:09:14.975232',26),(64,'SP328361','8936142670080','Sữa non metacare','','',25000,27000,'sua-non-metacare',999999999,0,0,1,NULL,NULL,'2023-12-06 16:12:41.369688','2023-12-06 16:12:41.369688',26),(65,'SP277635','8936142672909','Sữa chua ống nhỏ metacare cam','','',18000,20000,'sua-chua-ong-nho-metacare-cam',999999999,0,0,1,NULL,NULL,'2023-12-06 16:13:58.548723','2023-12-06 16:13:58.548723',26),(66,'SP122245','8936142672923','Sữa chua ống nhỏ metacare nho','','',18000,20000,'sua-chua-ong-nho-metacare-nho',999999999,0,0,1,NULL,NULL,'2023-12-06 16:15:09.185704','2023-12-06 16:15:09.185704',26),(67,'SP427651','8809296886471','Nước Uống Hồng Sâm Pororo Trẻ Em Vị Cam 100ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/8/8809296886471.jpg.webp',15000,20000,'nuoc-uong-hong-sam-pororo-tre-em-vi-cam-100ml',99999,0,0,1,NULL,NULL,'2023-12-06 16:44:59.993543','2023-12-06 16:44:59.993543',1),(68,'SP953286','8809296880547','Nước Pororo Hương Chuối Chai 235ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/8/8809296880547.jpg.webp',15000,20000,'nuoc-pororo-huong-chuoi-chai-235ml',999999,0,0,1,NULL,NULL,'2023-12-06 16:45:32.821639','2023-12-06 16:45:32.821639',1),(69,'SP812356','8936076550731','Sữa Chua Hoff Kids Yougurt Vị Chuối Lốc 4 Hộp 55G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936076550731.jpg.webp',35000,40000,'sua-chua-hoff-kids-yougurt-vi-chuoi-loc-4-hop-55g',9999,0,0,1,NULL,NULL,'2023-12-06 16:46:22.601025','2023-12-06 16:46:22.601025',26),(70,'SP524849','8936076550717','Sữa chua hoff','','',35000,40000,'sua-chua-hoff',99999,0,0,1,NULL,NULL,'2023-12-06 16:58:49.246989','2023-12-06 17:50:35.000000',26),(71,'SP957468','8936142672084','Sữa metafresh 100% sữa tươi + non','','',22000,24000,'sua-metafresh-100percent-sua-tuoi-+-non',999999999,0,0,1,NULL,NULL,'2023-12-06 18:02:17.142665','2023-12-06 18:02:17.142665',26),(72,'SP752619','4934073966320','Sữa vinamilk 100% nhỏ ','','',18000,20000,'sua-vinamilk-100percent-nho',999999999,0,0,1,NULL,NULL,'2023-12-06 18:04:13.998336','2023-12-06 18:04:13.998336',26),(73,'SP964765','8936025771750','Sữa kun trái cây nhỏ','','',14000,16000,'sua-kun-trai-cay-nho',999999999,0,0,1,NULL,NULL,'2023-12-06 18:05:33.371792','2023-12-06 18:05:33.371792',26),(74,'SP621521','8809315500968','rong biển','','',35000,40000,'rong-bien',999999999,0,0,1,NULL,NULL,'2023-12-06 18:11:43.329837','2023-12-06 18:11:43.329837',25),(75,'SP347764','8935217466016','Thức uống sữa lúa mạch Mistori, TH true milk (110ml)','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/vn-11134201-7qukw-lg3fof1itnnbb6.jpg?v=1690785982000',18000,20000,'thuc-uong-sua-lua-mach-mistori-th-true-milk-(110ml)',999999999,0,0,1,NULL,NULL,'2023-12-06 18:12:39.206286','2023-12-06 18:12:39.206286',26),(76,'SP193731','8934804025742','Sữa Lúa Mạch Nestlé Milo Lốc 4 Hộp nhỏ 110ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934804025742.jpg.webp',18000,20000,'sua-lua-mach-nestle-milo-loc-4-hop-nho-110ml',999999999,0,0,1,NULL,NULL,'2023-12-06 18:14:19.192620','2023-12-06 18:14:19.192620',26),(77,'SP162113','8850393800860','Sữa chua men sống Betagen Thái Lan (85ml*4chai)','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/sc-men-song-betagen-vi-85ml.jpg?v=1670311525090',17000,20000,'sua-chua-men-song-betagen-thai-lan-(85ml*4chai)',99999,0,0,1,NULL,NULL,'2023-12-06 18:16:09.056741','2023-12-06 18:16:09.056741',26),(78,'SP583836','8934609102235','Kẹo sữa cafe bibica','','',23000,30000,'keo-sua-cafe-bibica',99999,0,0,1,NULL,NULL,'2023-12-06 18:19:05.789826','2023-12-06 18:19:05.789826',34),(79,'SP362312','8935217414420','Sữa Chua Uống Tiệt Trùng TH nhỏTopkid Hương Cam Lốc 4 Hộp x 110 ML','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217414420.jpg.webp',18000,20000,'sua-chua-uong-tiet-trung-th-nhotopkid-huong-cam-loc-4-hop-x-110-ml',999999999,0,0,1,NULL,NULL,'2023-12-06 18:19:25.170998','2023-12-06 18:19:25.170998',26),(80,'SP488463','8934609102143','Kẹo bốn mùa','','',37000,45000,'keo-bon-mua',99999,0,0,1,NULL,NULL,'2023-12-06 18:20:02.876628','2023-12-06 18:20:02.876628',34),(81,'SP152516','8934680033107','Bánh Quế Cosy Vị Kem Lá Dứa Kinh Đô Gói 117.6G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934680033107-1.jpg.webp',11000,13000,'banh-que-cosy-vi-kem-la-dua-kinh-djo-goi-117.6g',999999,0,0,1,NULL,NULL,'2023-12-06 18:20:53.695159','2023-12-06 18:20:53.695159',34),(82,'SP537581','8935001718246','Kẹo Alpenliebe-kẹo trà bưởi mật ong & vị hồng trà sữa, gói (115.5g).','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/z4466610198112-3088473fa0dc4f632fc87f946ea57c93.jpg?v=1687834178000',10000,13000,'keo-alpenliebe-keo-tra-buoi-mat-ong-and-vi-hong-tra-sua-goi-(115.5g).',999999,0,0,1,NULL,NULL,'2023-12-06 18:21:43.174882','2023-12-06 18:21:43.174882',34),(83,'SP446325','8935217414123','Sữa Chua Uống Tiệt Trùng TH nhỏ True Yogurt Top Kid Hương Dâu Lốc 4 Hộp 110ML','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217414123.jpg.webp',18000,20000,'sua-chua-uong-tiet-trung-th-nho-true-yogurt-top-kid-huong-dau-loc-4-hop-110ml',999999999,0,0,1,NULL,NULL,'2023-12-06 18:21:50.359812','2023-12-06 18:21:50.359812',26),(84,'SP255818','8935001717522','Kẹo nhai Mentos cầu vồng trái cây 120G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935001717522-1.jpg.webp',12000,15000,'keo-nhai-mentos-cau-vong-trai-cay-120g',99999,0,0,1,NULL,NULL,'2023-12-06 18:22:22.968518','2023-12-06 18:22:22.968518',34),(85,'SP733679','8935217400164','Sữa Tươi Tiệt Trùng TH nhỏ trắng True Milk Có Đường','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217400164.jpg.webp',22000,24000,'sua-tuoi-tiet-trung-th-nho-trang-true-milk-co-djuong',999999999,0,0,1,NULL,NULL,'2023-12-06 18:22:42.494479','2023-12-06 18:22:42.494479',26),(86,'SP532919','8851826543132','Kẹo trái cây thái','','',25000,30000,'keo-trai-cay-thai',999999,0,0,1,NULL,NULL,'2023-12-06 18:23:21.095485','2023-12-06 18:23:21.095485',34),(87,'SP422653','8996001320136','Kẹo Coffeeshot Cappuccino Kopiko Gói 140G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8996001320136.jpg.webp',12000,15000,'keo-coffeeshot-cappuccino-kopiko-goi-140g',999999,0,0,1,NULL,NULL,'2023-12-06 18:23:56.505339','2023-12-06 18:23:56.505339',34),(88,'SP156962','8850309203075','Dynamite 3 viên','','',12000,15000,'dynamite-3-vien',99999,0,0,1,NULL,NULL,'2023-12-06 18:24:58.623350','2023-12-06 18:24:58.623350',34),(89,'SP483865','8935217400355','Sữa Tươi Tiệt Trùng TH To True Milk Ít Đường','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217400355.jpg.webp',32000,36000,'sua-tuoi-tiet-trung-th-to-true-milk-it-djuong',999999999,0,0,1,NULL,NULL,'2023-12-06 18:25:17.842522','2023-12-06 18:25:17.842522',26),(90,'SP728995','8938510550161','Kẹo dừa nướng','','',13.5,17000,'keo-dua-nuong',99999,0,0,1,NULL,NULL,'2023-12-06 18:27:34.503124','2023-12-06 18:27:34.503124',34),(91,'SP521446','8935217400157','Sữa Tươi Tiệt Trùng TH To True Milk Có Đường ','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217400157.jpg.webp',34000,36000,'sua-tuoi-tiet-trung-th-to-true-milk-co-djuong',999999999,0,0,1,NULL,NULL,'2023-12-06 18:27:40.526721','2023-12-06 18:27:40.526721',26),(92,'SP282678','8935217412112','Sữa Chua Uống Tiệt Trùng TH To True Yogurt Hương Dâu Lốc 4 Hộp 180ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217412112.jpg.webp',28000,30000,'sua-chua-uong-tiet-trung-th-to-true-yogurt-huong-dau-loc-4-hop-180ml',999999999,0,0,1,NULL,NULL,'2023-12-06 18:28:27.070852','2023-12-06 18:28:27.070852',26),(93,'SP261446','8934595051173','Bánh xốp ống MiniWaf, nhân kem cốm-Hải Hà, gói (330g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/tai-xuong-6.jpg?v=1670318655843',21000,25000,'banh-xop-ong-miniwaf-nhan-kem-com-hai-ha-goi-(330g)',999999,0,0,1,NULL,NULL,'2023-12-06 18:28:32.851212','2023-12-06 18:28:32.851212',34),(94,'SP427963','8934803028409','Bánh Snack Que Oishi Akiko Nhân Sữa 140G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934803028409.jpg.webp',14.5,17000,'banh-snack-que-oishi-akiko-nhan-sua-140g',999999,0,0,1,NULL,NULL,'2023-12-06 18:29:09.250677','2023-12-06 18:29:09.250677',34),(95,'SP342467','8935217412013','Sữa Chua Uống Tiệt Trùng TH To True Yogurt Hương Cam Lốc 4 Hộp 180ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217412013.jpg.webp',28000,30000,'sua-chua-uong-tiet-trung-th-to-true-yogurt-huong-cam-loc-4-hop-180ml',999999999,0,0,1,NULL,NULL,'2023-12-06 18:29:18.655492','2023-12-06 18:29:18.655492',26),(96,'SP266355','8934803024685','Oishi','','',6000,7000,'oishi',9999,0,0,1,NULL,NULL,'2023-12-06 18:30:19.049065','2023-12-06 18:30:19.049065',34),(97,'SP165956','8934609418336','Kẹo gừng nhỏ','','',5000,7000,'keo-gung-nho',9999,0,0,1,NULL,NULL,'2023-12-06 18:30:53.331276','2023-12-06 18:30:53.331276',34),(98,'SP153265','8936142672077','Sữa Meta Fresh To 100% sữa tươi + non','','',32000,33000,'sua-meta-fresh-to-100percent-sua-tuoi-+-non',999999999,0,0,1,NULL,NULL,'2023-12-06 18:31:22.801355','2023-12-06 18:31:22.801355',26),(99,'SP151456','8934597020580','Quy hải châu','','',6000,7000,'quy-hai-chau',99999,0,0,1,NULL,NULL,'2023-12-06 18:31:35.535667','2023-12-06 18:31:35.535667',34),(100,'SP712364','8934609103188','Kẹo dẻo Zoo Jelly-Bibica, gói (100g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/8be6a7c7f8c5d5805111c05f97a33936.jpg?v=1670318996817',8000,10000,'keo-deo-zoo-jelly-bibica-goi-(100g)',9999,0,0,1,NULL,NULL,'2023-12-06 18:32:08.820093','2023-12-06 18:32:08.820093',34),(101,'SP686476','8936142670073','Sữa meta Care To sữa Non','','',35000,37000,'sua-meta-care-to-sua-non',999999999,0,0,1,NULL,NULL,'2023-12-06 18:32:25.997277','2023-12-06 18:32:25.997277',26),(102,'SP665158','8996001338063','Kẹo Fres Mint Barley-Indonesia, gói (150g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/keo-fres-150g.jpg?v=1678769814830',13000,15000,'keo-fres-mint-barley-indonesia-goi-(150g)',999999,0,0,1,NULL,NULL,'2023-12-06 18:32:39.750216','2023-12-06 18:32:39.750216',34),(103,'SP927494','8996001338056','Kẹo Tamarin vị me, gói (135g).','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/787fc5c1b2ff6b8d6be444abddd0231d-1.jpg?v=1700700496000',12000,15000,'keo-tamarin-vi-me-goi-(135g).',999999,0,0,1,NULL,NULL,'2023-12-06 18:33:21.359024','2023-12-06 18:33:21.359024',34),(104,'SP447851','8936142672879','Sữa meta Care yoyo To vị dâu','','',30000,32000,'sua-meta-care-yoyo-to-vi-dau',999999999,0,0,1,NULL,NULL,'2023-12-06 18:33:32.428395','2023-12-06 18:33:32.428395',26),(105,'SP933989','8935001716969','Kẹo mút Chupa Chups Hỗn Hợp Gói 558G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935001716969.jpg.webp',50000,55000,'keo-mut-chupa-chups-hon-hop-goi-558g',9999,0,0,1,NULL,NULL,'2023-12-06 18:34:36.318503','2023-12-06 18:34:36.318503',34),(106,'SP143181','6971272801562','Ômai quả','','',23.5,35000,'omai-qua',999999,0,0,1,NULL,NULL,'2023-12-06 18:35:24.545411','2023-12-06 18:35:24.545411',34),(107,'SP549715','8936142672893','Sữa meta Care yoyo To vị cam','','',30000,32000,'sua-meta-care-yoyo-to-vi-cam',999999999,0,0,1,NULL,NULL,'2023-12-06 18:35:50.795815','2023-12-06 18:35:50.795815',26),(108,'SP459278','8934673302814','Vỉ Sữa Đặc Ông Thọ Đỏ (40G x 6 Hộp)','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934673302814.jpg.webp',5000,6000,'vi-sua-djac-ong-tho-djo-(40g-x-6-hop)',999999999,0,0,1,NULL,NULL,'2023-12-06 18:36:27.498683','2023-12-06 18:36:27.498683',26),(109,'SP332456','8858152028005','Dẻo gummy','','',40000,45000,'deo-gummy',99999,0,0,1,NULL,NULL,'2023-12-06 18:36:32.057152','2023-12-06 18:36:32.057152',34),(110,'SP184957','8938515881017','Chôclate','','',30000,35000,'choclate',99999,0,0,1,NULL,NULL,'2023-12-06 18:37:10.708052','2023-12-06 18:37:10.708052',34),(111,'SP367836','8935049013266','Sữa lúa mạch vị cacao có thạch-Nuvi To','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/h600-w600-1.png?v=1688823168000',28000,30000,'sua-lua-mach-vi-cacao-co-thach-nuvi-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:37:47.351307','2023-12-06 18:37:47.351307',26),(112,'SP581943','8936210890440','Bee milk dẻo trân châu','','',25000,30000,'bee-milk-deo-tran-chau',99999,0,0,1,NULL,NULL,'2023-12-06 18:38:09.192767','2023-12-06 18:38:09.192767',34),(113,'SP895763','8935049013280','Sữa  lắc trái cây hương cam có thạch-Nuvi To','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/h600-w600-2.png?v=1688823763000',28000,30000,'sua-lac-trai-cay-huong-cam-co-thach-nuvi-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:38:29.153604','2023-12-06 18:38:29.153604',26),(114,'SP237485','19385028','Dẻo panda','','',28000,35000,'deo-panda',999999,0,0,1,NULL,NULL,'2023-12-06 18:39:03.203955','2023-12-06 18:39:03.203955',34),(115,'SP176687','8934841902099','Sữa Tươi Tiệt Trùng Cô Gái Hà Lan Dutch Lady Cao Khỏe Dâu To','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934841902099.jpg.webp',26000,28000,'sua-tuoi-tiet-trung-co-gai-ha-lan-dutch-lady-cao-khoe-dau-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:39:15.930533','2023-12-06 18:39:15.930533',26),(116,'SP831471','8938541060004','Dẻo xiên','','',34000,50000,'deo-xien',9999,0,0,1,NULL,NULL,'2023-12-06 18:39:59.477798','2023-12-06 18:39:59.477798',34),(117,'SP919834','8934841901665','Sữa Tươi Tiệt Trùng Cô Gái Hà Lan Dutch Lady Cao khoẻ Có Đường To','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934841901665.jpg.webp',26000,28000,'sua-tuoi-tiet-trung-co-gai-ha-lan-dutch-lady-cao-khoe-co-djuong-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:40:01.714884','2023-12-06 18:40:01.714884',26),(118,'SP545196','8936142672046','Sữa hạt Lục bảo To ','','',28000,30000,'sua-hat-luc-bao-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:41:27.955239','2023-12-06 18:41:27.955239',26),(119,'SP151589','8935011852312','Thức Uống Ngũ Cốc Dinh Dưỡng Việt Ngũ Cốc Lốc 4 Hộp 180ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935011852312-1.jpg.webp',26000,28000,'thuc-uong-ngu-coc-dinh-duong-viet-ngu-coc-loc-4-hop-180ml',999999999,0,0,1,NULL,NULL,'2023-12-06 18:42:03.041364','2023-12-06 18:42:03.041364',26),(120,'SP986558','8935057100590','Dẻo filldy','','',23000,30000,'deo-filldy',99999,0,0,1,NULL,NULL,'2023-12-06 18:43:42.950422','2023-12-06 18:43:42.950422',34),(121,'SP551585','8936025771200','Thức Uống Dinh Dưỡng Lif Kun Socola Lúa Mạch To','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936025771200.jpg.webp',26000,28000,'thuc-uong-dinh-duong-lif-kun-socola-lua-mach-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:44:07.624177','2023-12-06 18:44:07.624177',26),(122,'SP171754','8935057101771','Dẻo xoài','','',23000,30000,'deo-xoai',99999,0,0,1,NULL,NULL,'2023-12-06 18:44:18.143247','2023-12-06 18:44:18.143247',34),(123,'SP578274','8934804025766','Sữa Lúa Mạch Nestlé Milo To','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934804025766.jpg.webp',30000,32000,'sua-lua-mach-nestle-milo-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:44:44.179093','2023-12-06 18:44:44.179093',26),(124,'SP419592','8936086720346','Scl trắng bắp','','',28000,35000,'scl-trang-bap',999999,0,0,1,NULL,NULL,'2023-12-06 18:45:33.021843','2023-12-06 18:45:33.021843',34),(125,'SP831157','831012103058','Sữa Milo Thái To','','',26000,28000,'sua-milo-thai-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:45:36.641301','2023-12-06 18:45:36.641301',26),(126,'SP278265','8936025773006','Sữa Trái Cây Lif Kun Hương Cam To','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8936025773006.jpg.webp',23000,25000,'sua-trai-cay-lif-kun-huong-cam-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:46:14.299704','2023-12-06 18:46:14.299704',26),(127,'SP371153','8936025771118','Thức uống dinh dưỡng từ sữa, hương socola lúa mạch Nhỏ','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/b333-51248c45-c3c1-4e48-8a40-879b5debe704.jpg?v=1670321867837',16000,18000,'thuc-uong-dinh-duong-tu-sua-huong-socola-lua-mach-nho',999999999,0,0,1,NULL,NULL,'2023-12-06 18:47:13.388701','2023-12-06 18:47:13.388701',26),(128,'SP713413','8936034612167','Bánh gấu bơ','','',18000,23000,'banh-gau-bo',999999,0,0,1,NULL,NULL,'2023-12-06 18:47:20.472560','2023-12-06 18:47:20.472560',34),(129,'SP853631','8935049013358','Sữa lúa mạch cacao có thạch-Nuvi nhỏ','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/3j-5ad26bc4-940a-4add-ba66-d3756a92d2a4.jpg?v=1688890712000',18000,20000,'sua-lua-mach-cacao-co-thach-nuvi-nho',999999999,0,0,1,NULL,NULL,'2023-12-06 18:48:10.496332','2023-12-06 18:48:10.496332',26),(130,'SP162652','8935057100026','Dẻo gấu nhỏ','','',23000,28000,'deo-gau-nho',999999,0,0,1,NULL,NULL,'2023-12-06 18:48:20.116018','2023-12-06 18:48:20.116018',34),(131,'SP364861','8935049018162','Sữa Nuvi Thạch nhỏ Cam','','',18000,20000,'sua-nuvi-thach-nho-cam',999999999,0,0,1,NULL,NULL,'2023-12-06 18:49:09.796263','2023-12-06 18:49:09.796263',26),(132,'SP823557','8935057100019','Dẻo bắp nhỏ','','',23000,28000,'deo-bap-nho',99999,0,0,1,NULL,NULL,'2023-12-06 18:49:35.424601','2023-12-06 18:49:35.424601',34),(133,'SP638797','8934673700986','Sữa Đậu Nành Vinamilk Super Nut Đậu Đỏ To','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934673700986.jpg.webp',24000,26000,'sua-djau-nanh-vinamilk-super-nut-djau-djo-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:49:56.917196','2023-12-06 18:49:56.917196',26),(134,'SP747556','8936034613997','Dẻo trân châu','','',18000,25000,'deo-tran-chau',99999,0,0,1,NULL,NULL,'2023-12-06 18:50:28.034756','2023-12-06 18:50:28.034756',34),(135,'SP534119','8806124209822','Sữa hạt hàn quốc óc chó','','',43000,45000,'sua-hat-han-quoc-oc-cho',999999999,0,0,1,NULL,NULL,'2023-12-06 18:50:46.249648','2023-12-06 18:50:46.249648',26),(136,'SP684482','8936034612419','Scl đồng tiền gói','','',47000,55000,'scl-djong-tien-goi',99999,0,0,1,NULL,NULL,'2023-12-06 18:51:18.713435','2023-12-06 18:51:18.713435',34),(137,'SP449163','8934673573344','Sữa Tươi Tiệt Trùng Vinamilk Có Đường To','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934673573344.jpg.webp',28000,30000,'sua-tuoi-tiet-trung-vinamilk-co-djuong-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:51:28.906262','2023-12-06 18:51:28.906262',26),(138,'SP517716','8934841900293','Lốc 4 Hộp Sữa Chua Uống Yomost Dâu To','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934841900293.jpg.webp',28000,30000,'loc-4-hop-sua-chua-uong-yomost-dau-to',999999999,0,0,1,NULL,NULL,'2023-12-06 18:52:05.387038','2023-12-06 18:52:05.387038',26),(139,'SP597778','8936034610545','Scl ong cá','','',45000,50000,'scl-ong-ca',99999,0,0,1,NULL,NULL,'2023-12-06 18:52:42.838700','2023-12-06 18:52:42.838700',34),(140,'SP277357','4994315877418','Dẻo xoài nhân','','',35000,40000,'deo-xoai-nhan',999999999,0,0,1,NULL,NULL,'2023-12-06 18:53:56.775335','2023-12-06 18:53:56.775335',34),(141,'SP615429','8936034613775','Dẻo cốt dừa','','',34000,38000,'deo-cot-dua',999999999,0,0,1,NULL,NULL,'2023-12-06 18:54:52.731663','2023-12-06 18:54:52.731663',34),(142,'SP824687','8936034611238','Scl con giống','','',35000,40000,'scl-con-giong',999999999,0,0,1,NULL,NULL,'2023-12-06 18:56:38.296188','2023-12-06 18:56:38.296188',34),(143,'SP286322','8935058844523','Scl soly','','',34000,45000,'scl-soly',999999999,0,0,1,NULL,NULL,'2023-12-06 18:59:03.171024','2023-12-06 18:59:03.171024',34),(144,'SP134655','8934677020929','Kẹo Gum Xylitol Hương Lime Mint Túi 55 Gói x 2.9g','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934677020929.jpg.webp',52,55000,'keo-gum-xylitol-huong-lime-mint-tui-55-goi-x-2.9g',999999999,0,0,1,NULL,NULL,'2023-12-07 08:34:02.855718','2023-12-07 08:34:02.855718',34),(145,'SP683137','8934677020820','Kẹo Gum Xylitol Cool Túi 55 Gói x 2.9g','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934677020820.jpg.webp',52000,55000,'keo-gum-xylitol-cool-tui-55-goi-x-2.9g',999999999,0,0,1,NULL,NULL,'2023-12-07 08:34:41.708586','2023-12-07 08:34:41.708586',34),(146,'SP594551','8934677000440','Vỷ xylitol ','','',4000,5000,'vy-xylitol',999999999,0,0,1,NULL,NULL,'2023-12-07 08:37:37.796475','2023-12-07 08:37:37.796475',34),(147,'SP112542','8934677020110','Vỷ xilytol cool','','',4000,5000,'vy-xilytol-cool',999999999,0,0,1,NULL,NULL,'2023-12-07 08:41:35.578081','2023-12-07 08:41:35.578081',34),(148,'SP511991','8934677000341','Kẹo Gum Xylitol Không Đường Hương Lime Mint Hũ 58g (Giao Mẫu Ngẫu Nhiên)','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934677000341.jpg.webp',28000,30000,'keo-gum-xylitol-khong-djuong-huong-lime-mint-hu-58g-(giao-mau-ngau-nhien)',999999999,0,0,1,NULL,NULL,'2023-12-07 08:42:14.320929','2023-12-07 08:42:32.000000',34),(149,'SP378221','2722','Trà đen số 9','','',58000,60000,'tra-djen-so-9',999999999,0,0,1,NULL,NULL,'2023-12-07 08:49:05.471663','2023-12-07 08:49:05.471663',35),(150,'SP929612','8938526299023','Trà nhài đặc biệt','','',80000,90000,'tra-nhai-djac-biet',999999999,0,0,1,NULL,NULL,'2023-12-07 08:50:24.245789','2023-12-07 08:50:24.245789',35),(151,'SP981398','8858372000089','Bột béo sư tử','','',75000,80000,'bot-beo-su-tu',999999999,0,0,1,NULL,NULL,'2023-12-07 08:51:26.177853','2023-12-07 08:51:26.177853',35),(152,'SP121164','8938526299009','Hồng trà đặc biệt','','',75000,80000,'hong-tra-djac-biet',999999999,0,0,1,NULL,NULL,'2023-12-07 08:52:01.225127','2023-12-07 08:52:01.225127',35),(153,'SP654427','8934804025780','Thức Uống Lúa Mạch Milo Hũ 400G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934804025780.jpg.webp',72000,75000,'thuc-uong-lua-mach-milo-hu-400g',999999999,0,0,1,NULL,NULL,'2023-12-07 08:53:14.911118','2023-12-07 08:53:14.911118',26),(154,'SP526894','8938537738030','Hạt trân châu đen','','',23000,25000,'hat-tran-chau-djen',999999999,0,0,1,NULL,NULL,'2023-12-07 08:54:59.980830','2023-12-07 08:54:59.980830',35),(155,'SP317397','8938537738016','Bịch Trân châu giòn','','',67000,70000,'bich-tran-chau-gion',999999999,0,0,1,NULL,NULL,'2023-12-07 08:56:00.763245','2023-12-07 08:56:00.763245',35),(156,'SP191371','070074117591','Sữa Ensure Gold Vigor-Abbott, hương vani 1 dây 6 ống','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/dcaa7aaf-ed6f-4637-a2f0-0b7ca2964e15.jpg?v=1679470310170',350000,360000,'sua-ensure-gold-vigor-abbott-huong-vani-1-day-6-ong',999999999,0,0,1,NULL,NULL,'2023-12-07 08:59:17.309932','2023-12-07 08:59:17.309932',26),(157,'SP574154','070074118659','Sữa Ensure Original-Abbott, hương vani loại rẻ 6 ống','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/av.png?v=1670311587000',250000,260000,'sua-ensure-original-abbott-huong-vani-loai-re-6-ong',999999999,0,0,1,NULL,NULL,'2023-12-07 09:00:31.032683','2023-12-07 09:00:31.032683',26),(158,'SP272525','8934614030349','Sữa Đậu Nành Vinasoy Fami Nguyên Chất Ít Đường Lốc 6 Hộp 200ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934614030349.jpg.webp',24000,26000,'sua-djau-nanh-vinasoy-fami-nguyen-chat-it-djuong-loc-6-hop-200ml',999999999,0,0,1,NULL,NULL,'2023-12-07 09:03:20.695752','2023-12-07 09:03:20.695752',26),(159,'SP863135','8934614030424','Sữa Đậu Nành Fami Canxi Lốc 6 Hộp 200ML','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934614030424-1.jpg.webp',24000,26000,'sua-djau-nanh-fami-canxi-loc-6-hop-200ml',999999999,0,0,1,NULL,NULL,'2023-12-07 09:03:54.443518','2023-12-07 09:03:54.443518',26),(160,'SP569776','8934614031018','Sữa Đậu Nành Vinasoy Fami Canxi Vị Phô Mai Lốc 6 Hộp 200ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934614031018.jpg.webp',24000,26000,'sua-djau-nanh-vinasoy-fami-canxi-vi-pho-mai-loc-6-hop-200ml',999999999,0,0,1,NULL,NULL,'2023-12-07 09:04:14.572339','2023-12-07 09:04:14.572339',26),(161,'SP655325','8934673500357','Sữa Dinh Dưỡng Vinamilk Có Đường Bịch 220ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934673500357-1.jpg.webp',7000,8000,'sua-dinh-duong-vinamilk-co-djuong-bich-220ml',999999999,0,0,1,NULL,NULL,'2023-12-07 09:06:19.691359','2023-12-07 09:06:19.691359',26),(162,'SP436535','8934673501354','Sữa Dinh Dưỡng Vinamilk Không Đường Bịch 220ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934673501354-2.jpg.webp',7000,8000,'sua-dinh-duong-vinamilk-khong-djuong-bich-220ml',999999999,0,0,1,NULL,NULL,'2023-12-07 09:07:00.008273','2023-12-07 09:07:00.008273',26),(163,'SP322711','8935217400027','Sữa Tươi Tiệt Trùng TH True Milk Nguyên Chất Hộp 1L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217400027.jpg.webp',34000,36000,'sua-tuoi-tiet-trung-th-true-milk-nguyen-chat-hop-1l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:07:42.942570','2023-12-07 09:07:42.942570',26),(164,'SP198119','8934673576390','Sữa Tươi Tiệt Trùng Vinamilk Không Đường Hộp 1L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934673576390-1.jpg.webp',33000,35000,'sua-tuoi-tiet-trung-vinamilk-khong-djuong-hop-1l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:08:13.553163','2023-12-07 09:08:13.553163',26),(165,'SP626213','8934673573399','Sữa Tươi Tiệt Trùng Vinamilk Có Đường Hộp 1L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934673573399.jpg.webp',33000,35000,'sua-tuoi-tiet-trung-vinamilk-co-djuong-hop-1l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:08:41.250109','2023-12-07 09:08:41.250109',26),(166,'SP515668','8935217400126','Sữa Tươi Tiệt Trùng TH True Milk Có Đường Hộp 1L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935217400126.jpg.webp',34000,36000,'sua-tuoi-tiet-trung-th-true-milk-co-djuong-hop-1l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:09:19.077212','2023-12-07 09:09:19.077212',26),(167,'SP983615','8934988020021','Dầu Đậu Nành Simply Nguyên chất 100% Chai 1L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934988020021.jpg.webp',58000,60000,'dau-djau-nanh-simply-nguyen-chat-100percent-chai-1l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:10:20.661366','2023-12-07 09:10:20.661366',28),(168,'SP627474','8934988021028','Dầu Gạo Lứt Simply Nguyên chất 100% Chai 1L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934988021028.jpg.webp',63000,65000,'dau-gao-lut-simply-nguyen-chat-100percent-chai-1l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:10:43.639216','2023-12-07 09:10:43.639216',28),(169,'SP597819','8850180010045','Dầu đậu nành thái','','',48000,50000,'dau-djau-nanh-thai',999999999,0,0,1,NULL,NULL,'2023-12-07 09:14:06.394849','2023-12-07 09:14:06.394849',28),(170,'SP973464','8938512483177','Dầu đậu nành Tiara 1 lít','','',52000,55000,'dau-djau-nanh-tiara-1-lit',999999999,0,0,1,NULL,NULL,'2023-12-07 09:15:39.433191','2023-12-07 09:15:39.433191',28),(171,'SP516558','8934988063028','Dầu Ăn Cao Cấp Meizan Gold Chai 1L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934988063028.jpg.webp',43000,45000,'dau-an-cao-cap-meizan-gold-chai-1l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:17:13.202834','2023-12-07 09:17:13.202834',28),(172,'SP627616','8938512483221','Dầu Freda 1lit','','',38000,40000,'dau-freda-1lit',999999999,0,0,1,NULL,NULL,'2023-12-07 09:18:40.309781','2023-12-07 09:18:40.309781',28),(173,'SP869234','8934988020038','Dầu Đậu Nành Simply Nguyên chất 100% Chai 2L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934988020038.jpg.webp',117000,120000,'dau-djau-nanh-simply-nguyen-chat-100percent-chai-2l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:23:40.920330','2023-12-07 09:23:40.920330',28),(174,'SP682575','8934988021035','Dầu Gạo Lứt Simply Nguyên chất 100% Chai 2L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934988021035.jpg.webp',123000,125000,'dau-gao-lut-simply-nguyen-chat-100percent-chai-2l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:24:24.239670','2023-12-07 09:27:40.000000',28),(175,'SP447493','8938512483184','Dầu Đậu nành Tiara 2 lít','','',108000,110000,'dau-djau-nanh-tiara-2-lit',999999999,0,0,1,NULL,NULL,'2023-12-07 09:25:20.070144','2023-12-07 09:25:20.070144',28),(176,'SP211329','8938512483238','Dầu thực vật Freda 2 lít','','',78000,80000,'dau-thuc-vat-freda-2-lit',999999999,0,0,1,NULL,NULL,'2023-12-07 09:27:07.189352','2023-12-07 09:27:07.189352',28),(177,'SP216156','8934988063035','Dầu Ăn Cao Cấp Meizan Gold Chai 2L','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8934988063035.jpg.webp',88000,90000,'dau-an-cao-cap-meizan-gold-chai-2l',999999999,0,0,1,NULL,NULL,'2023-12-07 09:28:41.785385','2023-12-07 09:28:41.785385',28),(178,'SP836187','8935311120869','Tương Ớt VIFON Chai 500ml','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8935311120869.jpg.webp',16000,18000,'tuong-ot-vifon-chai-500ml',99999999,0,0,1,NULL,NULL,'2023-12-07 09:30:04.849334','2023-12-07 09:30:04.849334',28),(179,'SP843798','8936034611177','Scl sữa trắng vuông','','',37000,45000,'scl-sua-trang-vuong',999999999,0,0,1,NULL,NULL,'2023-12-07 09:32:02.898679','2023-12-07 09:32:02.898679',34),(180,'SP922792','8934609602407','Bánh bông lan kem hương sữa dâu, Hura deli-Bibica, hộp (336g),','','https://bizweb.dktcdn.net/thumb/compact/100/469/765/products/2b-21d48fcb-ca0f-48d0-aa9a-57b3c11ae877.jpg?v=1670311789927',39000,45000,'banh-bong-lan-kem-huong-sua-dau-hura-deli-bibica-hop-(336g)',999999999,0,0,1,NULL,NULL,'2023-12-07 09:33:02.043064','2023-12-07 09:33:02.043064',34),(181,'SP996828','8936152693352','Bánh quy Omeli Premium Cookies, hộp giấy (400g).','','https://bizweb.dktcdn.net/thumb/compact/assets/themes_support/noimage.gif',55000,60000,'banh-quy-omeli-premium-cookies-hop-giay-(400g).',999999999,0,0,1,NULL,NULL,'2023-12-07 09:34:11.733584','2023-12-07 09:34:11.733584',34),(182,'SP446624','8936034612884','Scl quy chấm','L','',34000,40000,'scl-quy-cham',999999999,0,0,1,NULL,NULL,'2023-12-07 09:34:15.513480','2023-12-07 09:34:15.513480',34),(183,'SP689916','8936065593992','Bánh mềm Sapie chuối','','',44000,50000,'banh-mem-sapie-chuoi',999999999,0,0,1,NULL,NULL,'2023-12-07 09:36:10.938539','2023-12-07 09:36:10.938539',34),(184,'SP797597','8996001303078','Bánh Quy Bơ Danisa Hộp 681G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8996001303078.jpg.webp',190000,200000,'banh-quy-bo-danisa-hop-681g',999999999,0,0,1,NULL,NULL,'2023-12-07 09:36:56.145844','2023-12-07 09:36:56.145844',34),(185,'SP584722','8996001303627','Bánh Quy Bơ Danisa Hộp 454G','','https://www.lottemart.vn/media/catalog/product/cache/400x400/8/9/8996001303627.jpg.webp',145000,150000,'banh-quy-bo-danisa-hop-454g',999999999,0,0,1,NULL,NULL,'2023-12-07 09:37:42.618744','2023-12-07 09:37:42.618744',34),(186,'SP657588','8934609209538','Bánh Quy Emily','','',78000,80000,'banh-quy-emily',999999999,0,0,1,NULL,NULL,'2023-12-07 09:40:21.484647','2023-12-07 09:40:21.484647',34),(187,'SP249822','8809288863312','Kẹo sâm hàn','','',25000,35000,'keo-sam-han',999999999,0,0,1,NULL,NULL,'2023-12-07 09:41:14.498830','2023-12-07 09:41:14.498830',34),(188,'SP886726','8934609801121','Bánh hỗn hợp Warmly','','',90000,120000,'banh-hon-hop-warmly',999999999,0,0,1,NULL,NULL,'2023-12-07 09:42:02.759511','2023-12-07 09:42:02.759511',34);
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

-- Dump completed on 2023-12-07  9:42:16
