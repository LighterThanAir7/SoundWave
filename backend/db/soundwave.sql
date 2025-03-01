-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2025 at 10:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `soundwave`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `release_date` date DEFAULT NULL,
  `total_tracks` int(11) DEFAULT NULL,
  `artwork_path` varchar(255) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `title`, `release_date`, `total_tracks`, `artwork_path`, `created_on`, `updated_on`) VALUES
(1, 'Good For Me', '2007-03-05', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(2, 'Somebody Loves You', '2020-09-25', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(3, 'We Control The Sunlight', '2011-07-04', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(4, 'A State Of Trance FOREVER', '2021-09-03', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(5, 'Intense (The More Intense Edition)', '2013-11-15', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(6, 'A State Of Trance Episode 800 (Part 2)', '2017-02-02', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(7, '10 Years', '2006-11-11', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(8, 'Take This', '2022-04-29', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(9, 'Fatum Presents: 20 Years Of Anjunabeats', '2020-09-17', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(10, 'Ferry Corsten presents Corsten’s Countdown Best of 2015', '2015-12-28', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(11, 'Tuvan', '2009-09-21', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(12, 'Concrete Angel', '2012-02-13', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(13, 'U', '2015-03-18', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(14, 'Lighter Than Air', '2019-04-26', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(15, 'As The Rush Comes', '2005-01-01', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(16, 'As The Rush Comes', '2005-01-01', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(17, 'Southern Sun / Ready Steady Go', '2002-03-19', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(18, 'The Air I Breathe', '2018-10-12', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(19, 'Sunny Tales', '2008-08-18', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(20, 'Unbreakable', '2016-09-12', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(21, 'Vocal Trance Hits - Best Of 2017', '2017-12-01', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(22, 'Trance Hits 2009 - 40 of the Biggest Trance Anthems', '2009-04-20', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(23, 'Right Back', '2010-04-27', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(24, 'Sunny Tales', '2008-08-18', NULL, NULL, '2025-03-01 14:52:11', '2025-03-01 14:52:11');

-- --------------------------------------------------------

--
-- Table structure for table `api_keys`
--

CREATE TABLE `api_keys` (
  `id` int(11) NOT NULL,
  `key_name` varchar(255) NOT NULL,
  `encrypted_key` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_used` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_keys`
--

INSERT INTO `api_keys` (`id`, `key_name`, `encrypted_key`, `created_at`, `last_used`, `is_active`) VALUES
(5, 'initial_super_admin_api', 'c17493821262aa4d66570710262e588a:04b43ed0d1949580473234b528e4d342518eb9832e7f24e9da021fbfc0e7a54ba68c5f2d54cd9350dd3eb7f472f20de8', '2025-02-22 10:58:10', NULL, 1),
(6, 'initial_super_admin_secret', 'c92daeefda3e7504f35057c39d879b4e:1f32e34461d3ff80320111b3af51e5416f6aa4215b9ac43d9b215093f4bbd73cf3071dec4b759a0bf76b7e6652076565', '2025-02-22 10:58:10', NULL, 1),
(7, 'initial_super_admin_jwt', '85304e2000e7d6323cf593ea9e74e0fe:be0d95ad90c0bdfccf8c1b0ef148526d0013f77e0e209d064f12dbae7885440d0850f1cdc144433431b762be8cb6e3d6', '2025-02-22 10:58:10', NULL, 1),
(8, 'initial_super_admin_jwt_refresh', '3bdc0c913ce981a97a3efa114c689337:cbdffa31f77dd39b44c9ef7b90331f90e5bfb87a5276dfc2075c877466858984758dd5e9201f01bfda5dfcc6e6c8edec', '2025-02-22 10:58:10', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `name`, `bio`, `image_url`, `created_on`, `updated_on`) VALUES
(1, 'Above & Beyond', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(2, 'Zoë Johnston', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(3, 'Aly & Fila', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(4, 'Plumb', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(5, 'Aly & Fila feat. Jwaydan', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(6, 'Armin van Buuren', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(8, 'Kazi Jay', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(10, 'Miri Ben-Ari', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(11, 'Gareth Emery', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(12, 'Gareth Emery & Standerwick', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(13, 'Standerwick', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(14, 'HALIENE', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(15, 'Rising Star', NULL, NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(16, 'Bryan Kearney', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(17, 'Out of the Dust', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(21, 'Ferry Corsten presents Gouryella', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(22, 'Gaia', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(24, 'Christina Novelli', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(26, 'Bo Bruce', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(27, 'Marlo', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(28, 'Feenixpawl', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(29, 'Motorcycle', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(31, 'Paul Oakenfold', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(32, 'Carla Werner', NULL, NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(33, 'Richard Durand', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(35, 'Sunlounger', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(36, 'Zara', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(37, 'Susana', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(39, 'Roger Shah', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(43, 'John O\'Callaghan feat. Audrey Gallagher', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(44, 'Yuri Kane', NULL, NULL, '2025-02-22 11:44:19', '2025-02-22 11:44:19');

-- --------------------------------------------------------

--
-- Table structure for table `collaborating_artists`
--

CREATE TABLE `collaborating_artists` (
  `id` int(10) NOT NULL,
  `song_id` int(10) NOT NULL,
  `artist_id` int(10) NOT NULL,
  `artist_role` varchar(50) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collaborating_artists`
--

INSERT INTO `collaborating_artists` (`id`, `song_id`, `artist_id`, `artist_role`, `created_on`) VALUES
(1, 1, 2, 'featuring', '2025-02-22 11:44:17'),
(2, 2, 4, 'featuring', '2025-02-22 11:44:17'),
(3, 4, 3, 'featuring', '2025-02-22 11:44:17'),
(4, 4, 8, 'featuring', '2025-02-22 11:44:17'),
(5, 5, 10, 'featuring', '2025-02-22 11:44:17'),
(6, 6, 12, 'featuring', '2025-02-22 11:44:17'),
(7, 6, 13, 'featuring', '2025-02-22 11:44:17'),
(8, 6, 14, 'featuring', '2025-02-22 11:44:17'),
(9, 8, 17, 'featuring', '2025-02-22 11:44:18'),
(10, 8, 4, 'featuring', '2025-02-22 11:44:18'),
(11, 9, 2, 'featuring', '2025-02-22 11:44:18'),
(12, 12, 24, 'featuring', '2025-02-22 11:44:18'),
(13, 13, 26, 'featuring', '2025-02-22 11:44:18'),
(14, 14, 28, 'featuring', '2025-02-22 11:44:18'),
(15, 17, 32, 'featuring', '2025-02-22 11:44:18'),
(16, 18, 24, 'featuring', '2025-02-22 11:44:19'),
(17, 19, 36, 'featuring', '2025-02-22 11:44:19'),
(18, 20, 3, 'featuring', '2025-02-22 11:44:19'),
(19, 20, 39, 'featuring', '2025-02-22 11:44:19'),
(20, 21, 13, 'featuring', '2025-02-22 11:44:19'),
(21, 21, 14, 'featuring', '2025-02-22 11:44:19'),
(22, 24, 36, 'featuring', '2025-03-01 14:52:11');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `image_path`, `created_on`, `updated_on`) VALUES
(1, 'Dance', NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(2, 'Trance', NULL, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(23, 'Pop', NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(24, 'Rock', NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(25, 'Electro', NULL, '2025-02-22 11:44:18', '2025-02-22 11:44:18');

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by_id` int(10) NOT NULL,
  `description` text DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `created_by_id`, `description`, `type`, `image_path`, `created_on`, `updated_on`) VALUES
(4, 'A', 2, 'B', 1, NULL, '2025-02-22 11:59:15', '2025-02-22 11:59:15'),
(5, 'B', 2, 'C', 1, NULL, '2025-02-22 12:02:47', '2025-02-22 12:02:47'),
(6, 'C', 2, '', 1, NULL, '2025-02-22 12:05:07', '2025-02-22 12:05:07'),
(7, 'D', 2, '', 1, NULL, '2025-02-22 12:07:18', '2025-02-22 12:07:18'),
(8, 'E', 2, '', 1, NULL, '2025-02-22 12:07:56', '2025-02-22 12:07:56'),
(9, 'f', 2, '', 1, NULL, '2025-02-22 12:10:38', '2025-02-22 12:10:38');

-- --------------------------------------------------------

--
-- Table structure for table `playlist_songs`
--

CREATE TABLE `playlist_songs` (
  `id` int(10) NOT NULL,
  `playlist_id` int(10) NOT NULL,
  `song_id` int(10) NOT NULL,
  `order_number` int(11) NOT NULL,
  `added_by_user_id` int(10) NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expiry_date` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `primary_artist_id` int(10) NOT NULL,
  `album_id` int(10) DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `track_number` int(11) DEFAULT NULL,
  `released_on` date DEFAULT NULL,
  `artwork_path` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_format` varchar(10) NOT NULL,
  `file_size` bigint(20) NOT NULL,
  `bitrate` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id`, `title`, `primary_artist_id`, `album_id`, `duration`, `track_number`, `released_on`, `artwork_path`, `file_path`, `file_format`, `file_size`, `bitrate`, `created_on`, `updated_on`) VALUES
(1, 'Good For Me (Above & Beyond Extended Club Mix)', 1, 1, 532, 2, '2007-03-05', 'a/0/above-beyond-good-for-me-above-beyond-extended-club-mix-8c086c4d-ded1-47b4-a599-8a55eb21c8ed-artwork.jpg', 'a/0/above-beyond-good-for-me-above-beyond-extended-club-mix-8c086c4d-ded1-47b4-a599-8a55eb21c8ed.mp3', 'mp3', 21331911, 0, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(2, 'Somebody Loves You', 3, 2, 344, 1, '2020-09-25', 'a/0/aly-fila-somebody-loves-you-ec3487d3-243c-4948-84a7-92babbb705eb-artwork.jpg', 'a/0/aly-fila-somebody-loves-you-ec3487d3-243c-4948-84a7-92babbb705eb.mp3', 'mp3', 13855182, 0, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(3, 'We Control The Sunlight', 5, 3, 509, 1, '2011-07-04', 'a/0/aly-fila-feat-jwaydan-we-control-the-sunlight-5f9fdc08-b502-4705-8e26-650cc5a1b954-artwork.jpg', 'a/0/aly-fila-feat-jwaydan-we-control-the-sunlight-5f9fdc08-b502-4705-8e26-650cc5a1b954.mp3', 'mp3', 20497924, 0, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(4, 'For All Time (Extended Mix)', 6, 4, 546, 7, '2021-09-03', 'a/0/armin-van-buuren-for-all-time-extended-mix-42559e1a-d123-48c6-a273-2e09d60aa9ed-artwork.jpg', 'a/0/armin-van-buuren-for-all-time-extended-mix-42559e1a-d123-48c6-a273-2e09d60aa9ed.mp3', 'mp3', 21885760, 0, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(5, 'Intense', 6, 5, 527, 1, '2013-11-15', 'a/0/armin-van-buuren-intense-d6b3c478-37a7-461b-9900-0488f9a882eb-artwork.jpg', 'a/0/armin-van-buuren-intense-d6b3c478-37a7-461b-9900-0488f9a882eb.mp3', 'mp3', 21157624, 0, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(6, 'Saving Light', 11, 6, 294, 13, '2017-02-02', 'g/0/gareth-emery-saving-light-7e61e6fe-ff21-459b-986a-4e0095bc7d02-artwork.jpg', 'g/0/gareth-emery-saving-light-7e61e6fe-ff21-459b-986a-4e0095bc7d02.mp3', 'mp3', 11931165, 0, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(7, 'Clear Blue Moon (Original Mix)', 15, 7, 447, 9, '2006-11-11', 'r/0/rising-star-clear-blue-moon-original-mix-6b55586d-6c8f-4a3e-ba34-b0627964b7f6-artwork.jpg', 'r/0/rising-star-clear-blue-moon-original-mix-6b55586d-6c8f-4a3e-ba34-b0627964b7f6.mp3', 'mp3', 17961077, 0, '2025-02-22 11:44:17', '2025-02-22 11:44:17'),
(8, 'Take This (Extended Mix)', 16, 8, 521, 2, '2022-04-29', 'b/0/bryan-kearney-take-this-extended-mix-dd4884ab-ad90-47df-ac22-782fbc85171a-artwork.jpg', 'b/0/bryan-kearney-take-this-extended-mix-dd4884ab-ad90-47df-ac22-782fbc85171a.mp3', 'mp3', 20954432, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(9, 'No One On Earth (Gabriel & Dresden Extended Mix)', 1, 9, 559, 5, '2020-09-17', 'a/0/above-beyond-no-one-on-earth-gabriel-dresden-extended-mix-9039801c-4d2d-4b24-a039-acfc51afcb20-artwork.jpg', 'a/0/above-beyond-no-one-on-earth-gabriel-dresden-extended-mix-9039801c-4d2d-4b24-a039-acfc51afcb20.mp3', 'mp3', 22441684, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(10, 'Anahera (Extended Mix)', 21, 10, 459, 20, '2015-12-28', 'f/0/ferry-corsten-presents-gouryella-anahera-extended-mix-f472e8e8-ea90-46a6-9308-abf8ecc75a27-artwork.jpg', 'f/0/ferry-corsten-presents-gouryella-anahera-extended-mix-f472e8e8-ea90-46a6-9308-abf8ecc75a27.mp3', 'mp3', 18478340, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(11, 'Tuvan', 22, 11, 489, 1, '2009-09-21', 'g/0/gaia-tuvan-d6446f3b-cbb0-4112-9953-6e3381fa8e7e-artwork.jpg', 'g/0/gaia-tuvan-d6446f3b-cbb0-4112-9953-6e3381fa8e7e.mp3', 'mp3', 19688168, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(12, 'Concrete Angel (Original Mix)', 11, 12, 429, 2, '2012-02-13', 'g/0/gareth-emery-concrete-angel-original-mix-ef123892-da12-4015-bca7-57a877922c10-artwork.jpg', 'g/0/gareth-emery-concrete-angel-original-mix-ef123892-da12-4015-bca7-57a877922c10.mp3', 'mp3', 17263738, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(13, 'U (Bryan Kearney Remix)', 11, 13, 466, 4, '2015-03-18', 'g/0/gareth-emery-u-bryan-kearney-remix-fcac5fc4-b8e8-47b2-b09c-79598273dd7c-artwork.jpg', 'g/0/gareth-emery-u-bryan-kearney-remix-fcac5fc4-b8e8-47b2-b09c-79598273dd7c.mp3', 'mp3', 18793609, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(14, 'Lighter Than Air (Extended Mix)', 27, 14, 304, 2, '2019-04-26', 'm/0/marlo-lighter-than-air-extended-mix-47a93505-55f7-416a-a391-533685052b12-artwork.jpg', 'm/0/marlo-lighter-than-air-extended-mix-47a93505-55f7-416a-a391-533685052b12.mp3', 'mp3', 12228783, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(15, 'As The Rush Comes (Gabriel & Dresden Sweeping Strings Remix)', 29, 15, 642, 4, '2005-01-01', 'm/0/motorcycle-as-the-rush-comes-gabriel-dresden-sweeping-strings-remix-f5cb5d39-fbc8-4581-a38f-82fd8ee8bf21-artwork.jpg', 'm/0/motorcycle-as-the-rush-comes-gabriel-dresden-sweeping-strings-remix-f5cb5d39-fbc8-4581-a38f-82fd8ee8bf21.mp3', 'mp3', 25723383, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(16, 'As The Rush Comes', 29, 15, 212, 6, '2005-01-01', 'm/0/motorcycle-as-the-rush-comes-bb7e88fd-292d-4083-94aa-cc77d9626df5-artwork.jpg', 'm/0/motorcycle-as-the-rush-comes-bb7e88fd-292d-4083-94aa-cc77d9626df5.mp3', 'mp3', 8523231, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(17, 'Southern Sun (DJ Tiësto Remix)', 31, 17, 584, 5, '2002-03-19', 'p/0/paul-oakenfold-southern-sun-dj-tisto-remix-aba0a4d7-2705-4eec-b69e-57392cdf4ca9-artwork.jpg', 'p/0/paul-oakenfold-southern-sun-dj-tisto-remix-aba0a4d7-2705-4eec-b69e-57392cdf4ca9.mp3', 'mp3', 23496579, 0, '2025-02-22 11:44:18', '2025-02-22 11:44:18'),
(18, 'The Air I Breathe (Club Mix)', 33, 18, 440, 2, '2018-10-12', 'r/0/richard-durand-the-air-i-breathe-club-mix-15b2cdd6-61d9-45f8-b1ee-fbe9633a04c3-artwork.jpg', 'r/0/richard-durand-the-air-i-breathe-club-mix-15b2cdd6-61d9-45f8-b1ee-fbe9633a04c3.mp3', 'mp3', 17721069, 0, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(19, 'Lost (Dance Version)', 35, 19, 563, 17, '2008-08-18', 's/0/sunlounger-lost-dance-version-5acf02c9-aa43-481d-b1b9-0ea5e8594548-artwork.jpg', 's/0/sunlounger-lost-dance-version-5acf02c9-aa43-481d-b1b9-0ea5e8594548.mp3', 'mp3', 22642992, 0, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(20, 'Unbreakable (Extended Mix)', 37, 20, 466, 2, '2016-09-12', 's/0/susana-unbreakable-extended-mix-e688ec97-ec6a-48a0-bf5e-62102bdfd103-artwork.jpg', 's/0/susana-unbreakable-extended-mix-e688ec97-ec6a-48a0-bf5e-62102bdfd103.mp3', 'mp3', 18750043, 0, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(21, 'Saving Light', 11, 21, 275, 1, '2017-12-01', 'g/0/gareth-emery-saving-light-8dd6d227-fe9b-4cf5-8275-5ff7216b76b0-artwork.jpg', 'g/0/gareth-emery-saving-light-8dd6d227-fe9b-4cf5-8275-5ff7216b76b0.mp3', 'mp3', 11084503, 0, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(22, 'Big Sky (Agnelli & Nelson Remix)', 43, 22, 542, 23, '2009-04-20', 'j/0/john-ocallaghan-feat-audrey-gallagher-big-sky-agnelli-nelson-remix-9444ced0-0ace-4e18-bfcc-dd8a8dade8b8-artwork.jpg', 'j/0/john-ocallaghan-feat-audrey-gallagher-big-sky-agnelli-nelson-remix-9444ced0-0ace-4e18-bfcc-dd8a8dade8b8.mp3', 'mp3', 21791207, 0, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(23, 'Right Back (Extended Mix)', 44, 23, 356, 2, '2010-04-27', 'y/0/yuri-kane-right-back-extended-mix-81f886b5-7da7-425f-84ee-a4a196186c29-artwork.jpg', 'y/0/yuri-kane-right-back-extended-mix-81f886b5-7da7-425f-84ee-a4a196186c29.mp3', 'mp3', 14301766, 0, '2025-02-22 11:44:19', '2025-02-22 11:44:19'),
(24, 'Lost (Dance Version)', 35, 19, 563, 17, '2008-08-18', 's/0/sunlounger-lost-dance-version-8f228ba1-b546-464a-8a9b-2d12baf5b894-artwork.jpg', 's/0/sunlounger-lost-dance-version-8f228ba1-b546-464a-8a9b-2d12baf5b894.mp3', 'mp3', 22642992, 0, '2025-03-01 14:52:11', '2025-03-01 14:52:11');

-- --------------------------------------------------------

--
-- Table structure for table `song_genre`
--

CREATE TABLE `song_genre` (
  `id` int(10) NOT NULL,
  `song_id` int(10) NOT NULL,
  `genre_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song_genre`
--

INSERT INTO `song_genre` (`id`, `song_id`, `genre_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 2),
(5, 3, 1),
(6, 3, 2),
(7, 4, 1),
(8, 4, 2),
(9, 5, 1),
(10, 5, 2),
(11, 6, 1),
(12, 6, 2),
(13, 7, 1),
(14, 7, 2),
(15, 8, 1),
(16, 8, 2),
(17, 9, 1),
(18, 9, 2),
(19, 10, 1),
(20, 10, 2),
(21, 11, 1),
(22, 11, 2),
(23, 11, 23),
(24, 11, 24),
(25, 12, 25),
(26, 12, 1),
(27, 12, 2),
(28, 13, 1),
(29, 14, 1),
(30, 14, 2),
(31, 15, 1),
(32, 16, 1),
(33, 17, 25),
(34, 17, 1),
(35, 17, 23),
(36, 18, 1),
(37, 18, 2),
(38, 19, 1),
(39, 20, 1),
(40, 20, 2),
(41, 21, 1),
(42, 21, 2),
(43, 22, 1),
(44, 22, 2),
(45, 23, 1),
(46, 23, 2),
(47, 24, 1);

-- --------------------------------------------------------

--
-- Table structure for table `spt_playlist_type`
--

CREATE TABLE `spt_playlist_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spt_playlist_type`
--

INSERT INTO `spt_playlist_type` (`id`, `name`, `description`) VALUES
(1, 'public', NULL),
(2, 'private', NULL),
(3, 'collaborate', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `spt_user_type`
--

CREATE TABLE `spt_user_type` (
  `id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL COMMENT 'Optional description of the user type'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spt_user_type`
--

INSERT INTO `spt_user_type` (`id`, `status`, `name`, `description`) VALUES
(1, 1, 'Super Administrator', 'Has complete control over the system with all privileges'),
(2, 1, 'Administrator', 'Has administrative access with limited system configuration abilities'),
(3, 1, 'User', 'Regular user with basic access privileges');

-- --------------------------------------------------------

--
-- Table structure for table `username_capacity_reached`
--

CREATE TABLE `username_capacity_reached` (
  `id` int(11) NOT NULL,
  `base_username` varchar(50) NOT NULL,
  `reached_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `attempts_after_capacity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_type` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `base_username` varchar(50) NOT NULL,
  `discriminator` char(4) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `date_birth` date DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `marketing_consent` tinyint(1) DEFAULT 0,
  `data_sharing_consent` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `id_type`, `status`, `email`, `firstname`, `lastname`, `base_username`, `discriminator`, `password`, `img`, `date_birth`, `sex`, `last_login`, `created_on`, `created_by`, `refresh_token`, `marketing_consent`, `data_sharing_consent`) VALUES
(2, 3, 1, 'benibabic@gmail.com', 'LighterThanAir', '', 'LighterThanAir', '8799', '$2b$10$8yenRmfEb/fyN18o4KTQuuNloz2qqiL7/A/Hj.Exw6nCFRBn9Chu2', NULL, '2000-08-20', 'M', '2025-02-22 11:49:27', '2025-02-22 10:28:46', NULL, '$2b$10$cyRRpClSOCHQY22CUiX9luDenQs7QUnWKHFyjDqpL0nKUGqDJkBeG', 1, 1),
(9, 1, 1, 'superadmin@soundwave.com', 'Super', 'Administrator', 'Super Administrator', '2875', '$2b$10$fHXaCcv0I/MVXFFXKXUVbueOdqp6tDQH5hWDG/50NQdiw67MBPPmO', NULL, NULL, NULL, '2025-03-01 20:56:27', '2025-02-22 11:23:26', NULL, '$2b$10$Q554fLm4uMvLZ0fKgaBsoe4jBJXs/wEy7kRK34DPxyqY.UKwVaJW.', 0, 0),
(10, 1, 1, 'testadmin@example.com', 'leigt', 'apple', 'admindva', '0584', '$2b$10$m4bNcvmF4w8L.8qUl5U0hee7JRhjMB2QSM9/9O/srgvWjooDN4sKS', NULL, NULL, NULL, NULL, '2025-03-01 16:45:21', NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_favorites`
--

CREATE TABLE `user_favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key_name` (`key_name`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `collaborating_artists`
--
ALTER TABLE `collaborating_artists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist_id` (`artist_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_playlist_type` (`type`),
  ADD KEY `playlists_ibfk_1` (`created_by_id`);

--
-- Indexes for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_playlist_song` (`playlist_id`,`song_id`),
  ADD KEY `added_by_user_id` (`added_by_user_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `album_id` (`album_id`),
  ADD KEY `primary_artist_id` (`primary_artist_id`);

--
-- Indexes for table `song_genre`
--
ALTER TABLE `song_genre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `spt_playlist_type`
--
ALTER TABLE `spt_playlist_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spt_user_type`
--
ALTER TABLE `spt_user_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `username_capacity_reached`
--
ALTER TABLE `username_capacity_reached`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `base_username` (`base_username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `base_username` (`base_username`,`discriminator`),
  ADD KEY `id_type` (`id_type`);

--
-- Indexes for table `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_song` (`user_id`,`song_id`),
  ADD KEY `idx_user_favorites_song` (`song_id`),
  ADD KEY `idx_user_favorites_user` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `collaborating_artists`
--
ALTER TABLE `collaborating_artists`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `song_genre`
--
ALTER TABLE `song_genre`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `spt_user_type`
--
ALTER TABLE `spt_user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `username_capacity_reached`
--
ALTER TABLE `username_capacity_reached`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_favorites`
--
ALTER TABLE `user_favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `collaborating_artists`
--
ALTER TABLE `collaborating_artists`
  ADD CONSTRAINT `collaborating_artists_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  ADD CONSTRAINT `collaborating_artists_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`);

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `fk_playlist_type` FOREIGN KEY (`type`) REFERENCES `spt_playlist_type` (`id`),
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `playlist_songs_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`),
  ADD CONSTRAINT `playlist_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  ADD CONSTRAINT `playlist_songs_ibfk_3` FOREIGN KEY (`added_by_user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`primary_artist_id`) REFERENCES `artists` (`id`),
  ADD CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`);

--
-- Constraints for table `song_genre`
--
ALTER TABLE `song_genre`
  ADD CONSTRAINT `song_genre_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  ADD CONSTRAINT `song_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `spt_user_type` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_favorites_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
