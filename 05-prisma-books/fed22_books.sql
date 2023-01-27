-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 27, 2023 at 01:21 PM
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
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Author`
--

INSERT INTO `Author` (`id`, `name`) VALUES
(1, 'Sir Arthur C. Clarke'),
(2, 'Isaac Asimov'),
(3, 'Nick Cole'),
(4, 'Jason Anspach'),
(5, 'Sean Banan'),
(6, 'Dr. Alban'),
(7, 'J.R.R. Tolkien');

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
  `publisherId` int(10) UNSIGNED NOT NULL,
  `cover` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cover`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Book`
--

INSERT INTO `Book` (`id`, `title`, `pages`, `isbn`, `publisherId`, `cover`) VALUES
(1, '2001: A Space Odessey', 291, NULL, 1, '{}'),
(2, '2010: Odessey Two', 224, NULL, 1, '{}'),
(3, 'Foundation', 542, NULL, 2, '{}'),
(4, 'Galaxy\'s Edge: Book 1-2', 0, NULL, 4, '{}'),
(5, 'Lord of the TypeScript', 213, NULL, 4, '{}'),
(6, 'Fellowship of the TypeScript', 1337, NULL, 4, '{\"thumbnail\":\"https://cdn8.openculture.com/wp-content/uploads/2013/02/The-Fellowship-Of-The-Ring-Book-Cover-by-JRR-Tolkien_1-480.jpg\",\"large\":\"https://cdn8.openculture.com/wp-content/uploads/2013/02/The-Fellowship-Of-The-Ring-Book-Cover-by-JRR-Tolkien_1-480.jpg\"}');

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
(3, 'Penguin Audio'),
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
(4, 4);

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
('866a301e-0350-45d3-a521-cb7d69a96189', '2fbbb8549caf30bead53c9e9c35e4266505827a69a98ab346e47e7be70a346e4', '2023-01-27 13:11:11.755', '20230127125304_book_cover_json', NULL, NULL, '2023-01-27 13:11:11.693', 1),
('89657690-a421-4bf2-8a81-f8cffb4ec103', '77bfcdde78d24432013ed7b928ecbcbec51713f4b1dd05304f1fc3c3bcde45e0', '2023-01-27 13:11:11.525', '20230126094428_birthdate_without_time', NULL, NULL, '2023-01-27 13:11:11.447', 1),
('b4aa9f78-9b23-47cc-9d26-eb56c5ce20cc', '1f8721d94035bda86959a6c77703e4f27167a7edd20616fe5c7dd20588ba6181', '2023-01-27 13:11:11.692', '20230126095909_book_publisher', NULL, NULL, '2023-01-27 13:11:11.526', 1),
('bdd13f8a-7eeb-439a-83d0-2fae74b16326', 'ea7ce671808c3667b4756f5a8ca4d9ead3dc0922b2105efabbe3fa722774494e', '2023-01-27 13:11:13.449', '20230127131113_drop_author_birthdate', NULL, NULL, '2023-01-27 13:11:13.368', 1),
('bdf95860-684c-4eaf-9018-96fa4c007f21', 'ffa65b4045a745fb7c0b38d74bd1dc814ff464b8b29e123120e327dd50a48f7b', '2023-01-27 13:11:11.446', '20230126091400_isbn_birthdate', NULL, NULL, '2023-01-27 13:11:11.324', 1),
('d0b88722-d697-48c7-9b00-fd753c8230c3', 'e7b76637c2f1cc76746d9a4c9948641b65ebe379968ac6b58533780c94088c51', '2023-01-27 13:11:11.324', '20230126084259_init', NULL, NULL, '2023-01-27 13:11:11.120', 1);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Book`
--
ALTER TABLE `Book`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
