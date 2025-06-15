-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: nhahang
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ban_an`
--

DROP TABLE IF EXISTS `ban_an`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ban_an` (
  `Ma_ban` char(5) NOT NULL,
  `Ma_khu_vuc` int DEFAULT NULL,
  `Trang_thai` varchar(20) DEFAULT 'AVAILABLE',
  `Suc_chua` int NOT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_ban`),
  KEY `Ma_khu_vuc` (`Ma_khu_vuc`),
  CONSTRAINT `ban_an_ibfk_1` FOREIGN KEY (`Ma_khu_vuc`) REFERENCES `khu_vuc` (`Ma_khu_vuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ban_an`
--

LOCK TABLES `ban_an` WRITE;
/*!40000 ALTER TABLE `ban_an` DISABLE KEYS */;
INSERT INTO `ban_an` VALUES ('B001',1,'RESERVED',2,'2025-06-14 20:39:58','2025-06-14 20:39:58'),('B002',1,'IN USE',2,'2025-06-14 20:39:58','2025-06-14 20:39:58'),('B003',2,'RESERVED',4,'2025-06-14 20:39:58','2025-06-14 20:39:58'),('B004',2,'RESERVED',6,'2025-06-14 20:39:58','2025-06-14 20:39:58'),('B005',4,'RESERVED',8,'2025-06-14 20:39:58','2025-06-14 20:39:58');
/*!40000 ALTER TABLE `ban_an` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_hoa_don`
--

DROP TABLE IF EXISTS `chi_tiet_hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi_tiet_hoa_don` (
  `Ma_hoa_don` char(10) NOT NULL,
  `Ma_mon_an` char(10) NOT NULL,
  `So_luong` int DEFAULT NULL,
  `Trang_thai` bit(1) DEFAULT b'0',
  `Ghi_chu` text,
  PRIMARY KEY (`Ma_hoa_don`,`Ma_mon_an`),
  KEY `Ma_mon_an` (`Ma_mon_an`),
  CONSTRAINT `chi_tiet_hoa_don_ibfk_1` FOREIGN KEY (`Ma_hoa_don`) REFERENCES `hoa_don` (`Ma_hoa_don`),
  CONSTRAINT `chi_tiet_hoa_don_ibfk_2` FOREIGN KEY (`Ma_mon_an`) REFERENCES `mon_an` (`Ma_mon_an`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_hoa_don`
--

LOCK TABLES `chi_tiet_hoa_don` WRITE;
/*!40000 ALTER TABLE `chi_tiet_hoa_don` DISABLE KEYS */;
INSERT INTO `chi_tiet_hoa_don` VALUES ('HD001','CB005',1,_binary '',NULL),('HD001','MA001',2,_binary '',NULL),('HD002','MA005',3,_binary '',NULL),('HD003','MA002',1,_binary '',NULL),('HD004','CB006',2,_binary '',NULL),('HD006','MA001',2,_binary '\0','Ít cay');
/*!40000 ALTER TABLE `chi_tiet_hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_tiet_khuyen_mai`
--

DROP TABLE IF EXISTS `chi_tiet_khuyen_mai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi_tiet_khuyen_mai` (
  `Ma_khuyen_mai` char(10) NOT NULL,
  `Ngay_bat_dau` datetime NOT NULL,
  `Ngay_ket_thuc` datetime DEFAULT NULL,
  `So_luot_dung` int NOT NULL,
  `So_luot_da_dung` int DEFAULT '0',
  `Trang_thai` bit(1) DEFAULT NULL,
  PRIMARY KEY (`Ma_khuyen_mai`,`Ngay_bat_dau`),
  CONSTRAINT `chi_tiet_khuyen_mai_ibfk_1` FOREIGN KEY (`Ma_khuyen_mai`) REFERENCES `khuyen_mai` (`Ma_khuyen_mai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_tiet_khuyen_mai`
--

LOCK TABLES `chi_tiet_khuyen_mai` WRITE;
/*!40000 ALTER TABLE `chi_tiet_khuyen_mai` DISABLE KEYS */;
INSERT INTO `chi_tiet_khuyen_mai` VALUES ('KM001','2025-06-01 00:00:00','2025-06-30 00:00:00',100,10,_binary ''),('KM002','2025-06-07 00:00:00','2025-06-09 00:00:00',200,50,_binary ''),('KM003','2025-06-10 00:00:00','2025-06-16 00:00:00',50,5,_binary ''),('KM004','2025-06-01 00:00:00','2025-06-15 00:00:00',150,80,_binary ''),('KM005','2025-06-01 00:00:00','2025-12-31 00:00:00',9999,120,_binary '');
/*!40000 ALTER TABLE `chi_tiet_khuyen_mai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuc_vu`
--

DROP TABLE IF EXISTS `chuc_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuc_vu` (
  `Ma_chuc_vu` char(10) NOT NULL,
  `Ten_chuc_vu` varchar(50) NOT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_chuc_vu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuc_vu`
--

LOCK TABLES `chuc_vu` WRITE;
/*!40000 ALTER TABLE `chuc_vu` DISABLE KEYS */;
INSERT INTO `chuc_vu` VALUES ('CV001','Quản lý nhà hàng','2025-06-14 20:38:58','2025-06-14 20:38:58'),('CV002','Nhân viên phục vụ','2025-06-14 20:38:58','2025-06-14 20:38:58'),('CV003','Nhân viên thu ngân','2025-06-14 20:38:58','2025-06-14 20:38:58'),('CV004','Nhân viên bếp','2025-06-14 20:38:58','2025-06-14 20:38:58'),('CV005','Quản lý bếp','2025-06-14 20:38:58','2025-06-14 20:38:58');
/*!40000 ALTER TABLE `chuc_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combo_chi_tiet`
--

DROP TABLE IF EXISTS `combo_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo_chi_tiet` (
  `Ma_combo` char(10) NOT NULL,
  `Ma_mon_don` char(10) NOT NULL,
  `So_luong` int DEFAULT '1',
  PRIMARY KEY (`Ma_combo`,`Ma_mon_don`),
  KEY `Ma_mon_don` (`Ma_mon_don`),
  CONSTRAINT `combo_chi_tiet_ibfk_1` FOREIGN KEY (`Ma_combo`) REFERENCES `mon_an` (`Ma_mon_an`),
  CONSTRAINT `combo_chi_tiet_ibfk_2` FOREIGN KEY (`Ma_mon_don`) REFERENCES `mon_an` (`Ma_mon_an`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo_chi_tiet`
--

LOCK TABLES `combo_chi_tiet` WRITE;
/*!40000 ALTER TABLE `combo_chi_tiet` DISABLE KEYS */;
INSERT INTO `combo_chi_tiet` VALUES ('CB001','MA001',1),('CB001','MA014',2),('CB001','MA019',2),('CB002','MA001',2),('CB002','MA009',2),('CB002','MA016',2),('CB003','MA002',2),('CB003','MA013',1),('CB003','MA016',2),('CB004','MA001',1),('CB004','MA016',2),('CB004','MA017',2),('CB005','MA011',1),('CB005','MA014',1),('CB005','MA019',1),('CB006','MA010',1),('CB006','MA014',1),('CB006','MA020',1);
/*!40000 ALTER TABLE `combo_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danh_muc_mon_an`
--

DROP TABLE IF EXISTS `danh_muc_mon_an`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danh_muc_mon_an` (
  `Ma_danh_muc` char(10) NOT NULL,
  `Ten_danh_muc` varchar(50) NOT NULL,
  `Trang_thai` bit(1) DEFAULT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_danh_muc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danh_muc_mon_an`
--

LOCK TABLES `danh_muc_mon_an` WRITE;
/*!40000 ALTER TABLE `danh_muc_mon_an` DISABLE KEYS */;
INSERT INTO `danh_muc_mon_an` VALUES ('DM001','Wagyu Beef',_binary '','2025-06-14 20:41:03','2025-06-14 20:41:03'),('DM002','Premium Aging Beef Steak',_binary '','2025-06-14 20:41:03','2025-06-14 20:41:03'),('DM003','Japanese Hamburger Steak',_binary '','2025-06-14 20:41:03','2025-06-14 20:41:03'),('DM004','Chicken & Seafood',_binary '','2025-06-14 20:41:03','2025-06-14 20:41:03'),('DM005','Doria & Pasta',_binary '','2025-06-14 20:41:03','2025-06-14 20:41:03'),('DM006','Others',_binary '','2025-06-14 20:41:03','2025-06-14 20:41:03'),('DM007','Buffet Tabehoudai',_binary '','2025-06-14 20:41:03','2025-06-14 20:41:03');
/*!40000 ALTER TABLE `danh_muc_mon_an` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia_chi`
--

DROP TABLE IF EXISTS `dia_chi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dia_chi` (
  `Ma_dia_chi` char(10) NOT NULL,
  `Ten_dia_chi` varchar(50) NOT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_dia_chi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_chi`
--

LOCK TABLES `dia_chi` WRITE;
/*!40000 ALTER TABLE `dia_chi` DISABLE KEYS */;
INSERT INTO `dia_chi` VALUES ('DC001','Thanh Xuân, Hà Nội','2025-06-14 20:39:03','2025-06-14 20:39:03'),('DC002','Đống Đa, Hà Nội','2025-06-14 20:39:03','2025-06-14 20:39:03'),('DC003','Long Biên, Hà Nội','2025-06-14 20:39:03','2025-06-14 20:39:03'),('DC004','Nam Từ Liêm, Hà Nội','2025-06-14 20:39:03','2025-06-14 20:39:03'),('DC005','Cầu Giấy, Hà Nội','2025-06-14 20:39:03','2025-06-14 20:39:03');
/*!40000 ALTER TABLE `dia_chi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hang_thanh_vien`
--

DROP TABLE IF EXISTS `hang_thanh_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hang_thanh_vien` (
  `Ma_hang_thanh_vien` char(10) NOT NULL,
  `Ten_hang_thanh_vien` varchar(50) NOT NULL,
  `Mo_ta_uu_dai` text,
  `Muc_nang_hang` decimal(10,2) DEFAULT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_hang_thanh_vien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hang_thanh_vien`
--

LOCK TABLES `hang_thanh_vien` WRITE;
/*!40000 ALTER TABLE `hang_thanh_vien` DISABLE KEYS */;
INSERT INTO `hang_thanh_vien` VALUES ('HV001','Thành viên Đồng','Tích lũy điểm khi mua hàng',0.00,'2025-06-14 20:39:08','2025-06-14 20:39:08'),('HV002','Thành viên Bạc','Giảm 5% cho mỗi hóa đơn từ 500k',500000.00,'2025-06-14 20:39:08','2025-06-14 20:39:08'),('HV003','Thành viên Vàng','Giảm 10%, ưu tiên đặt bàn',2000000.00,'2025-06-14 20:39:08','2025-06-14 20:39:08'),('HV004','Thành viên Bạch Kim','Giảm 15%, tặng món khai vị miễn phí',5000000.00,'2025-06-14 20:39:08','2025-06-14 20:39:08'),('HV005','Thành viên Kim Cương','Giảm 20%, miễn phí nước suốt bữa ăn',10000000.00,'2025-06-14 20:39:08','2025-06-14 20:39:08');
/*!40000 ALTER TABLE `hang_thanh_vien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoa_don` (
  `Ma_hoa_don` char(10) NOT NULL,
  `Ma_khach_hang` int NOT NULL,
  `Ma_nhan_vien` int DEFAULT NULL,
  `Ma_phuong_thuc_thanh_toan` int DEFAULT NULL,
  `Ma_ban` char(5) DEFAULT NULL,
  `Ma_khuyen_mai` char(10) DEFAULT NULL,
  `Tinh_trang` bit(1) DEFAULT b'0',
  `Tong_tien` decimal(10,2) DEFAULT '0.00',
  `VAT` decimal(10,2) DEFAULT '0.00',
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_hoa_don`),
  KEY `Ma_khach_hang` (`Ma_khach_hang`),
  KEY `Ma_nhan_vien` (`Ma_nhan_vien`),
  KEY `Ma_phuong_thuc_thanh_toan` (`Ma_phuong_thuc_thanh_toan`),
  KEY `Ma_ban` (`Ma_ban`),
  KEY `Ma_khuyen_mai` (`Ma_khuyen_mai`),
  CONSTRAINT `hoa_don_ibfk_1` FOREIGN KEY (`Ma_khach_hang`) REFERENCES `khach_hang` (`Ma_khach_hang`),
  CONSTRAINT `hoa_don_ibfk_2` FOREIGN KEY (`Ma_nhan_vien`) REFERENCES `nhan_vien` (`Ma_nhan_vien`),
  CONSTRAINT `hoa_don_ibfk_3` FOREIGN KEY (`Ma_phuong_thuc_thanh_toan`) REFERENCES `phuong_thuc_thanh_toan` (`Ma_phuong_thuc_thanh_toan`),
  CONSTRAINT `hoa_don_ibfk_4` FOREIGN KEY (`Ma_ban`) REFERENCES `ban_an` (`Ma_ban`),
  CONSTRAINT `hoa_don_ibfk_5` FOREIGN KEY (`Ma_khuyen_mai`) REFERENCES `khuyen_mai` (`Ma_khuyen_mai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES ('HD001',1,203,1,'B001','KM001',_binary '',890000.00,89000.00,'2025-06-14 20:41:21','2025-06-14 20:41:21'),('HD002',2,203,2,'B002','KM002',_binary '',1590000.00,159000.00,'2025-06-14 20:41:21','2025-06-14 20:41:21'),('HD003',3,203,3,'B003','KM003',_binary '',490000.00,49000.00,'2025-06-14 20:41:21','2025-06-14 20:41:21'),('HD004',4,203,4,'B004','KM004',_binary '',1250000.00,125000.00,'2025-06-14 20:41:21','2025-06-14 20:41:21'),('HD005',5,203,5,'B005','KM005',_binary '\0',730000.00,73000.00,'2025-06-14 20:41:21','2025-06-14 20:41:21'),('HD006',1,NULL,NULL,'B001',NULL,_binary '\0',0.00,0.00,'2025-06-15 01:12:24','2025-06-15 01:12:24'),('HD007',1,NULL,NULL,'B005',NULL,_binary '\0',0.00,0.00,'2025-06-15 01:17:23','2025-06-15 01:17:23'),('HD008',1,NULL,NULL,'B003',NULL,_binary '\0',0.00,0.00,'2025-06-15 01:59:08','2025-06-15 01:59:08');
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khach_hang`
--

DROP TABLE IF EXISTS `khach_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khach_hang` (
  `Ma_khach_hang` int NOT NULL,
  `Ten_khach_hang` varchar(50) NOT NULL,
  `So_dien_thoai` char(20) DEFAULT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_khach_hang`),
  UNIQUE KEY `So_dien_thoai` (`So_dien_thoai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khach_hang`
--

LOCK TABLES `khach_hang` WRITE;
/*!40000 ALTER TABLE `khach_hang` DISABLE KEYS */;
INSERT INTO `khach_hang` VALUES (1,'Nguyễn Văn A','0900000001','2025-06-14 20:39:13','2025-06-14 20:39:13'),(2,'Trần Thị B','0900000002','2025-06-14 20:39:13','2025-06-14 20:39:13'),(3,'Lê Văn C','0900000003','2025-06-14 20:39:13','2025-06-14 20:39:13'),(4,'Phạm Thị D','0900000004','2025-06-14 20:39:13','2025-06-14 20:39:13'),(5,'Hoàng Văn E','0900000005','2025-06-14 20:39:13','2025-06-14 20:39:13');
/*!40000 ALTER TABLE `khach_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khu_vuc`
--

DROP TABLE IF EXISTS `khu_vuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khu_vuc` (
  `Ma_khu_vuc` int NOT NULL,
  `Ten_khu_vuc` varchar(50) NOT NULL,
  `Mo_ta` text,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_khu_vuc`),
  UNIQUE KEY `Ten_khu_vuc` (`Ten_khu_vuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khu_vuc`
--

LOCK TABLES `khu_vuc` WRITE;
/*!40000 ALTER TABLE `khu_vuc` DISABLE KEYS */;
INSERT INTO `khu_vuc` VALUES (1,'Khu A','Khu vực ghế đơn & bàn 2 người (Dành cho cặp đôi / khách lẻ)','2025-06-14 20:39:57','2025-06-14 20:39:57'),(2,'Khu B','Khu vực bàn nhóm 4–6 người, phù hợp gia đình hoặc nhóm bạn','2025-06-14 20:39:57','2025-06-14 20:39:57'),(3,'Khu C','Khu vực bàn dài hoặc Teppanyaki, dành cho trải nghiệm món nướng tại bàn','2025-06-14 20:39:57','2025-06-14 20:39:57'),(4,'Khu D','Phòng VIP riêng, phù hợp cho họp mặt, tiếp khách hoặc không gian riêng tư','2025-06-14 20:39:57','2025-06-14 20:39:57');
/*!40000 ALTER TABLE `khu_vuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khuyen_mai`
--

DROP TABLE IF EXISTS `khuyen_mai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khuyen_mai` (
  `Ma_khuyen_mai` char(10) NOT NULL,
  `Ten_khuyen_mai` varchar(50) NOT NULL,
  `Mo_ta` text,
  `Hinh_anh` varchar(255) DEFAULT NULL,
  `Ty_le_khuyen_mai` decimal(10,2) NOT NULL,
  `Gia_tri_don_hang_toi_thieu` decimal(10,2) DEFAULT '0.00',
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_khuyen_mai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khuyen_mai`
--

LOCK TABLES `khuyen_mai` WRITE;
/*!40000 ALTER TABLE `khuyen_mai` DISABLE KEYS */;
INSERT INTO `khuyen_mai` VALUES ('KM001','Giảm 10% cho đơn từ 200k','Khuyến mãi cho khách hàng mới','km1.jpg',10.00,200000.00,'2025-06-14 20:40:54','2025-06-14 20:40:54'),('KM002','Giảm 20% cuối tuần','Áp dụng từ thứ 6 đến CN hàng tuần','km2.jpg',20.00,0.00,'2025-06-14 20:40:54','2025-06-14 20:40:54'),('KM003','Ưu đãi sinh nhật','Giảm 30% trong tuần sinh nhật khách hàng','km3.jpg',30.00,100000.00,'2025-06-14 20:40:54','2025-06-14 20:40:54'),('KM004','Combo tiết kiệm','Mua 2 tặng 1 cho set ăn trưa','km4.jpg',33.33,150000.00,'2025-06-14 20:40:54','2025-06-14 20:40:54'),('KM005','Ưu đãi VIP','Khách hàng VIP giảm 25% mỗi lần ăn','km5.jpg',25.00,0.00,'2025-06-14 20:40:54','2025-06-14 20:40:54');
/*!40000 ALTER TABLE `khuyen_mai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mon_an`
--

DROP TABLE IF EXISTS `mon_an`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mon_an` (
  `Ma_mon_an` char(10) NOT NULL,
  `Ten_mon_an` varchar(50) NOT NULL,
  `Mo_ta` text,
  `Don_gia` decimal(10,2) DEFAULT '0.00',
  `Hinh_anh` varchar(50) DEFAULT NULL,
  `Trang_thai` bit(1) DEFAULT b'1',
  `Kieu_mon` bit(1) DEFAULT b'0',
  `Ma_danh_muc` char(10) DEFAULT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_mon_an`),
  KEY `Ma_danh_muc` (`Ma_danh_muc`),
  CONSTRAINT `mon_an_ibfk_1` FOREIGN KEY (`Ma_danh_muc`) REFERENCES `danh_muc_mon_an` (`Ma_danh_muc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mon_an`
--

LOCK TABLES `mon_an` WRITE;
/*!40000 ALTER TABLE `mon_an` DISABLE KEYS */;
INSERT INTO `mon_an` VALUES ('CB001','Combo Couple','Set dành cho 2 người gồm bò Nhật, salad, súp miso',980000.00,'combo_couple.jpg',_binary '',_binary '','DM003','2025-06-14 20:41:12','2025-06-14 20:41:12'),('CB002','Combo Family 4 Pax','Set cho 4 người gồm thịt nướng Wagyu và lẩu',1580000.00,'combo_family.jpg',_binary '',_binary '','DM002','2025-06-14 20:41:12','2025-06-14 20:41:12'),('CB003','Irodori Combo','Combo bò & hải sản tươi sống, kèm Pepsi',1150000.00,'irodori_combo.jpg',_binary '',_binary '','DM005','2025-06-14 20:41:12','2025-06-14 20:41:12'),('CB004','Combo Ushi Premium','Combo cao cấp gồm bò Wagyu A5, sashimi, tempura',1850000.00,'combo_ushi.jpg',_binary '',_binary '','DM002','2025-06-14 20:41:12','2025-06-14 20:41:12'),('CB005','Combo Lunch Set','Combo bữa trưa tiết kiệm gồm cơm, salad, soup',390000.00,'combo_lunch.jpg',_binary '',_binary '','DM003','2025-06-14 20:41:12','2025-06-14 20:41:12'),('CB006','Combo Kids Meal','Set cho trẻ em gồm cơm trứng, gà chiên, nước trái cây',250000.00,'combo_kid.jpg',_binary '',_binary '','DM003','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA001','Wagyu Steak A5','Thịt bò Wagyu A5 nhập khẩu, nướng vừa chín tới',890000.00,'wagyu_a5.jpg',_binary '',_binary '\0','DM001','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA002','Wagyu Sushi Set','Sushi bò Wagyu ủ tuổi, dùng kèm nước sốt đặc biệt',350000.00,'wagyu_sushi.jpg',_binary '',_binary '\0','DM001','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA005','Buffet Shin Tabehoudai','Buffet không giới hạn gồm bò Wagyu và lẩu Nhật',799000.00,'buffet_shin.jpg',_binary '',_binary '\0','DM006','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA006','Buffet AI Tabehoudai','Buffet cao cấp với bò Wagyu A5 và sushi thượng hạng',1199000.00,'buffet_ai.jpg',_binary '',_binary '\0','DM007','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA007','Japanese Hamburger Steak','Thịt bò xay Nhật Bản với sốt demi-glace',290000.00,'hamburger_steak.jpg',_binary '',_binary '\0','DM004','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA008','Cheese Doria','Cơm đút lò phô mai kiểu Nhật',180000.00,'cheese_doria.jpg',_binary '',_binary '\0','DM005','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA009','Seafood Pasta','Mì Ý hải sản sốt kem tươi',220000.00,'seafood_pasta.jpg',_binary '',_binary '\0','DM005','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA010','Grilled Chicken Teriyaki','Gà nướng sốt Teriyaki truyền thống',200000.00,'chicken_teriyaki.jpg',_binary '',_binary '\0','DM004','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA011','Wagyu Donburi','Cơm tô thịt bò Wagyu xào hành tây',340000.00,'wagyu_don.jpg',_binary '',_binary '\0','DM001','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA013','Wagyu Karubi','Ba chỉ bò Wagyu nướng BBQ',470000.00,'wagyu_karubi.jpg',_binary '',_binary '\0','DM001','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA014','Japanese Curry Rice','Cơm cà ri Nhật với thịt bò hầm',210000.00,'curry_rice.jpg',_binary '',_binary '\0','DM004','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA015','Spaghetti Bolognese','Mì Ý bò bằm sốt cà chua',190000.00,'spaghetti_bolognese.jpg',_binary '',_binary '\0','DM005','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA016','Shrimp Tempura','Tôm chiên giòn Tempura kiểu Nhật',230000.00,'shrimp_tempura.jpg',_binary '',_binary '\0','DM006','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA017','Wagyu Nigiri','Cơm cuộn bò Wagyu cháy cạnh',330000.00,'wagyu_nigiri.jpg',_binary '',_binary '\0','DM001','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA018','Teriyaki Pork Bowl','Cơm thịt heo sốt Teriyaki',180000.00,'pork_bowl.jpg',_binary '',_binary '\0','DM004','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA019','Green Salad','Salad rau tươi trộn giấm Nhật',120000.00,'green_salad.jpg',_binary '',_binary '\0','DM006','2025-06-14 20:41:12','2025-06-14 20:41:12'),('MA020','Matcha Ice Cream','Kem trà xanh Nhật Bản',100000.00,'matcha_icecream.jpg',_binary '',_binary '\0','DM006','2025-06-14 20:41:12','2025-06-14 20:41:12');
/*!40000 ALTER TABLE `mon_an` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhan_vien`
--

DROP TABLE IF EXISTS `nhan_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhan_vien` (
  `Ma_nhan_vien` int NOT NULL,
  `Ten_nhan_vien` varchar(50) NOT NULL,
  `So_dien_thoai` char(20) DEFAULT NULL,
  `CCCD` char(10) DEFAULT NULL,
  `Email` char(100) DEFAULT NULL,
  `Mat_khau` varchar(50) NOT NULL,
  `Ma_chuc_vu` char(10) DEFAULT NULL,
  `Ma_dia_chi` char(10) DEFAULT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_nhan_vien`),
  UNIQUE KEY `So_dien_thoai` (`So_dien_thoai`),
  UNIQUE KEY `CCCD` (`CCCD`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Ma_chuc_vu` (`Ma_chuc_vu`),
  KEY `Ma_dia_chi` (`Ma_dia_chi`),
  CONSTRAINT `nhan_vien_ibfk_1` FOREIGN KEY (`Ma_chuc_vu`) REFERENCES `chuc_vu` (`Ma_chuc_vu`),
  CONSTRAINT `nhan_vien_ibfk_2` FOREIGN KEY (`Ma_dia_chi`) REFERENCES `dia_chi` (`Ma_dia_chi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhan_vien`
--

LOCK TABLES `nhan_vien` WRITE;
/*!40000 ALTER TABLE `nhan_vien` DISABLE KEYS */;
INSERT INTO `nhan_vien` VALUES (201,'Nguyễn Quang Anh','0911111101','0123456789','nv1@ushi.vn','123456','CV001','DC001','2025-06-14 20:39:21','2025-06-14 20:39:21'),(202,'Lê Hồng Minh','0911111102','0123456790','nv2@ushi.vn','123456','CV002','DC002','2025-06-14 20:39:21','2025-06-14 20:39:21'),(203,'Trần Văn Tuấn','0911111103','0123456791','nv3@ushi.vn','123456','CV003','DC003','2025-06-14 20:39:21','2025-06-14 20:39:21'),(204,'Phạm Mỹ Diệu','0911111104','0123456792','nv4@ushi.vn','123456','CV004','DC004','2025-06-14 20:39:21','2025-06-14 20:39:21'),(205,'Đỗ Thảo Ly','0911111105','0123456793','nv5@ushi.vn','123456','CV005','DC005','2025-06-14 20:39:21','2025-06-14 20:39:21');
/*!40000 ALTER TABLE `nhan_vien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phuong_thuc_thanh_toan`
--

DROP TABLE IF EXISTS `phuong_thuc_thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phuong_thuc_thanh_toan` (
  `Ma_phuong_thuc_thanh_toan` int NOT NULL,
  `Ten_phuong_thuc_thanh_toan` varchar(50) NOT NULL,
  `Trang_thai` bit(1) DEFAULT b'1',
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_phuong_thuc_thanh_toan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phuong_thuc_thanh_toan`
--

LOCK TABLES `phuong_thuc_thanh_toan` WRITE;
/*!40000 ALTER TABLE `phuong_thuc_thanh_toan` DISABLE KEYS */;
INSERT INTO `phuong_thuc_thanh_toan` VALUES (1,'Tiền mặt',_binary '','2025-06-14 20:41:18','2025-06-14 20:41:18'),(2,'Thẻ ngân hàng',_binary '','2025-06-14 20:41:18','2025-06-14 20:41:18'),(3,'Ví điện tử Momo',_binary '','2025-06-14 20:41:18','2025-06-14 20:41:18'),(4,'ZaloPay',_binary '','2025-06-14 20:41:18','2025-06-14 20:41:18'),(5,'Chuyển khoản',_binary '','2025-06-14 20:41:18','2025-06-14 20:41:18');
/*!40000 ALTER TABLE `phuong_thuc_thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thanh_vien`
--

DROP TABLE IF EXISTS `thanh_vien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thanh_vien` (
  `Ma_thanh_vien` int NOT NULL,
  `Ma_khach_hang` int DEFAULT NULL,
  `Ma_hang_thanh_vien` char(10) DEFAULT NULL,
  `Diem_tich_luy` decimal(10,2) DEFAULT '0.00',
  `Email` char(100) DEFAULT NULL,
  `Trang_thai` bit(1) DEFAULT NULL,
  `Thoi_gian_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Thoi_gian_cap_nhat` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Ma_thanh_vien`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Ma_khach_hang` (`Ma_khach_hang`),
  KEY `Ma_hang_thanh_vien` (`Ma_hang_thanh_vien`),
  CONSTRAINT `thanh_vien_ibfk_1` FOREIGN KEY (`Ma_khach_hang`) REFERENCES `khach_hang` (`Ma_khach_hang`),
  CONSTRAINT `thanh_vien_ibfk_2` FOREIGN KEY (`Ma_hang_thanh_vien`) REFERENCES `hang_thanh_vien` (`Ma_hang_thanh_vien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thanh_vien`
--

LOCK TABLES `thanh_vien` WRITE;
/*!40000 ALTER TABLE `thanh_vien` DISABLE KEYS */;
INSERT INTO `thanh_vien` VALUES (101,1,'HV001',100.00,'a@gmail.com',_binary '','2025-06-14 20:39:17','2025-06-14 20:39:17'),(102,2,'HV002',550.00,'b@gmail.com',_binary '','2025-06-14 20:39:17','2025-06-14 20:39:17'),(103,3,'HV002',600.00,'c@gmail.com',_binary '','2025-06-14 20:39:17','2025-06-14 20:39:17'),(104,4,'HV003',2100.00,'d@gmail.com',_binary '','2025-06-14 20:39:17','2025-06-14 20:39:17'),(105,5,'HV001',50.00,'e@gmail.com',_binary '','2025-06-14 20:39:17','2025-06-14 20:39:17');
/*!40000 ALTER TABLE `thanh_vien` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-15 18:08:25
