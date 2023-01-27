-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 27, 2023 at 11:04 AM
-- Server version: 10.8.3-MariaDB
-- PHP Version: 7.4.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fed22_books`
--

-- --------------------------------------------------------

--
-- Table structure for table `Author`
--

DROP TABLE IF EXISTS `Author`;
CREATE TABLE `Author` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Author`
--

INSERT INTO `Author` (`id`, `name`, `birthdate`) VALUES
(1, 'Sir Arthur C. Clarke', '1917-12-16'),
(2, 'Isaac Asimov', NULL),
(3, 'Jason Anspach', NULL),
(4, 'Nick Cole', NULL),
(5, 'Sean Banan', '1985-04-07'),
(6, 'Dr Alban', '1957-08-26');

-- --------------------------------------------------------

--
-- Table structure for table `Book`
--

DROP TABLE IF EXISTS `Book`;
CREATE TABLE `Book` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pages` int(10) UNSIGNED NOT NULL,
  `isbn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publisherId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Book`
--

INSERT INTO `Book` (`id`, `title`, `pages`, `isbn`, `publisherId`) VALUES
(1, '2001: A Space Odessey', 224, NULL, 1),
(2, '2010: Odessey Two', 291, NULL, 1),
(3, 'Foundation', 542, NULL, 2),
(4, 'Galaxy\'s Edge: Book 1-2', 0, NULL, 4),
(5, 'Det är stabilt', 1, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Publisher`
--

DROP TABLE IF EXISTS `Publisher`;
CREATE TABLE `Publisher` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Publisher`
--

INSERT INTO `Publisher` (`id`, `name`) VALUES
(1, 'Hutchinson'),
(2, 'Gnome Press'),
(4, 'Podium Audio');

-- --------------------------------------------------------

--
-- Table structure for table `_AuthorToBook`
--

DROP TABLE IF EXISTS `_AuthorToBook`;
CREATE TABLE `_AuthorToBook` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_AuthorToBook`
--

INSERT INTO `_AuthorToBook` (`A`, `B`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 4),
(6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('86c3fbe2-3e1d-485e-91b5-aa5d6f3326ca', 'e7b76637c2f1cc76746d9a4c9948641b65ebe379968ac6b58533780c94088c51', '2023-01-26 09:59:07.798', '20230126084259_init', NULL, NULL, '2023-01-26 09:59:07.551', 1),
('91b697ea-f3b0-4714-a3eb-0e14bf2bef7f', '1f8721d94035bda86959a6c77703e4f27167a7edd20616fe5c7dd20588ba6181', '2023-01-26 09:59:09.732', '20230126095909_book_publisher', NULL, NULL, '2023-01-26 09:59:09.511', 1),
('ac5294e9-9865-4479-9cf7-b45be220f6c6', 'ffa65b4045a745fb7c0b38d74bd1dc814ff464b8b29e123120e327dd50a48f7b', '2023-01-26 09:59:07.989', '20230126091400_isbn_birthdate', NULL, NULL, '2023-01-26 09:59:07.801', 1),
('fe4a64b1-c34b-4c62-a0ee-1da396a69dca', '77bfcdde78d24432013ed7b928ecbcbec51713f4b1dd05304f1fc3c3bcde45e0', '2023-01-26 09:59:08.080', '20230126094428_birthdate_without_time', NULL, NULL, '2023-01-26 09:59:07.990', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Author`
--
ALTER TABLE `Author`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Book`
--
ALTER TABLE `Book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Book_publisherId_fkey` (`publisherId`);

--
-- Indexes for table `Publisher`
--
ALTER TABLE `Publisher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_AuthorToBook`
--
ALTER TABLE `_AuthorToBook`
  ADD UNIQUE KEY `_AuthorToBook_AB_unique` (`A`,`B`),
  ADD KEY `_AuthorToBook_B_index` (`B`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Author`
--
ALTER TABLE `Author`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Book`
--
ALTER TABLE `Book`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Publisher`
--
ALTER TABLE `Publisher`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Book`
--
ALTER TABLE `Book`
  ADD CONSTRAINT `Book_publisherId_fkey` FOREIGN KEY (`publisherId`) REFERENCES `Publisher` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `_AuthorToBook`
--
ALTER TABLE `_AuthorToBook`
  ADD CONSTRAINT `_AuthorToBook_A_fkey` FOREIGN KEY (`A`) REFERENCES `Author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_AuthorToBook_B_fkey` FOREIGN KEY (`B`) REFERENCES `Book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
