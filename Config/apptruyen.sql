-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 12, 2023 at 04:53 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apptruyen`
--

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `id` bigint(11) NOT NULL,
  `matruyen` int(11) NOT NULL,
  `tentruyen` varchar(255) NOT NULL,
  `hinhtruyen` varchar(255) NOT NULL,
  `gia` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `timeoder` varchar(255) NOT NULL,
  `soluong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `giohang`
--

INSERT INTO `giohang` (`id`, `matruyen`, `tentruyen`, `hinhtruyen`, `gia`, `email`, `name`, `timeoder`, `soluong`) VALUES
(1, 1, 'conan', '', '20000', 'phong@gmail.com', 'phong', '', 2),
(1667641460131, 1, 'conan', '', '10000', 'vanque1306@gmail.com', 'vanque', '1667641460131', 1),
(1667643158937, 2, 'Doremon', '', '12000', 'vanque1306@gmail.com', 'vanque', '1667643158937', 1),
(1671156366685, 4, 'Than Dong Dat Viet', '', '2500', 'phong@gmail.com', 'P', '1671156366685', 1),
(1671163508304, 1, 'conan', '', '20000', 'phong@gmail.com', 'P', '1671163508304', 2);

-- --------------------------------------------------------

--
-- Table structure for table `liketruyen`
--

CREATE TABLE `liketruyen` (
  `idlike` bigint(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `matruyen` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `liketruyen`
--

INSERT INTO `liketruyen` (`idlike`, `email`, `time`, `matruyen`) VALUES
(1, 'vinh@gmail.com', '', 1),
(1667643287768, 'vanque1306@gmail.com', '1667643287768', 2),
(1671104312068, 'phong@gmail.com', '1671104312068', 4);

-- --------------------------------------------------------

--
-- Table structure for table `loaitruyen`
--

CREATE TABLE `loaitruyen` (
  `maloai` int(11) NOT NULL,
  `tenloai` varchar(255) NOT NULL,
  `hinhloai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loaitruyen`
--

INSERT INTO `loaitruyen` (`maloai`, `tenloai`, `hinhloai`) VALUES
(1, 'truyen tranh vn', ''),
(2, 'vui', ''),
(3, 'tieu thuyet', ''),
(5, 'vien tuong ', 'https://i.imgur.com/DvpvklR.png'),
(10, 'Nguyen nhat anh ', ''),
(12, 'Dac nhan tam', ''),
(16, 'Tri khon cua ta day', ''),
(17, 'Nhat ban', ''),
(18, 'Nhat ban', ''),
(19, 'Nhat ban', ''),
(20, 'Dan mach', ''),
(21, 'Dan mạch2', ''),
(22, 'Dan mạch3', '');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `idreview` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hinh` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `ratenumber` varchar(255) NOT NULL,
  `matruyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`idreview`, `email`, `name`, `hinh`, `time`, `message`, `ratenumber`, `matruyen`) VALUES
(1, 'vinh@gmail.com', 'vinh', '', '', '', '5', 1),
(1667707238598, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1667707238598', 'ok', '4.5', 2),
(1671050062835, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671050062835', 'ok', '5.0', 1),
(1671070275272, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671070275272', 'hay', '3.0', 1),
(1671070456154, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671070456154', 'ok', '2.5', 1),
(1671120647932, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671120647932', 'Dien vien xuat sac', '5', 1),
(1671120932729, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671120932729', 'Hay', '5', 1),
(1671123655067, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671123655067', 'Danh gia ', '4', 1),
(1671123697671, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671123697673', 'Hay', '4', 4),
(1671123956075, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671123956075', 'Tuyet voi', '3', 4),
(1671163494824, 'phong@gmail.com', 'P', 'https://reactjs.org/logo-og.png', '1671163494824', 'Hay ', '4', 1);

-- --------------------------------------------------------

--
-- Table structure for table `truyen`
--

CREATE TABLE `truyen` (
  `matruyen` bigint(11) NOT NULL,
  `tentruyen` varchar(255) NOT NULL,
  `hinhtruyen` varchar(255) NOT NULL,
  `mota` text NOT NULL,
  `gia` varchar(20) NOT NULL,
  `maloai` int(11) NOT NULL,
  `luottruycap` int(11) NOT NULL DEFAULT 0,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `truyen`
--

INSERT INTO `truyen` (`matruyen`, `tentruyen`, `hinhtruyen`, `mota`, `gia`, `maloai`, `luottruycap`, `email`) VALUES
(1, 'conan', '', 'https://truyenhdx.com/tom-tat-do-hu-lang/', '10000', 1, 119, NULL),
(2, 'Doremon', '', 'https://truyenhdx.com/tom-tat-trong-sinh-tieu-di-duong-thanh-ky/', '12000', 2, 7, NULL),
(3, 'One Piece', '', 'chuyen nhat ban', '20000', 3, 0, NULL),
(4, 'Than Dong Dat Viet', '', 'chuyen ke ve nhung thien tai nhi', '2500', 1, 6, NULL),
(5, 'Phong 2001', '', 'Phong 2001', '', 1, 4, NULL),
(6, '', '', '', '', 21, 0, NULL),
(8, 'Thuy hu 2', '', 'https://truyenhdx.com/tom-tat-trong-sinh-tieu-di-duong-thanh-ky/', '20000', 1, 0, 'phong@gmail.com'),
(9, 'Thuy hu2', '', 'https://truyenhdx.com/tom-tat-thuy-hu/', '300000', 1, 0, 'phong@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(24) NOT NULL,
  `password` varchar(24) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hinh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `password`, `name`, `hinh`) VALUES
('', '', '', ''),
('phong10@gmail.com', '12345678', 'phong2001', ''),
('phong2@gmail.com', '123456', 'Phong2', '123456'),
('phong4@gmail.com', '123456', '', ''),
('phong@gmail.com', '12345678', 'P', 'https://reactjs.org/logo-og.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `liketruyen`
--
ALTER TABLE `liketruyen`
  ADD PRIMARY KEY (`idlike`),
  ADD KEY `foreign key` (`matruyen`);

--
-- Indexes for table `loaitruyen`
--
ALTER TABLE `loaitruyen`
  ADD PRIMARY KEY (`maloai`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`idreview`);

--
-- Indexes for table `truyen`
--
ALTER TABLE `truyen`
  ADD PRIMARY KEY (`matruyen`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1671163508305;

--
-- AUTO_INCREMENT for table `liketruyen`
--
ALTER TABLE `liketruyen`
  MODIFY `idlike` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1671147294437;

--
-- AUTO_INCREMENT for table `loaitruyen`
--
ALTER TABLE `loaitruyen`
  MODIFY `maloai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `idreview` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1671163494825;

--
-- AUTO_INCREMENT for table `truyen`
--
ALTER TABLE `truyen`
  MODIFY `matruyen` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `liketruyen`
--
ALTER TABLE `liketruyen`
  ADD CONSTRAINT `foreign key` FOREIGN KEY (`matruyen`) REFERENCES `truyen` (`matruyen`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
