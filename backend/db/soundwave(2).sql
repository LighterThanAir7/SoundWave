-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2025 at 04:59 PM
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
(1, 'Good For Me', '2007-03-05', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(2, 'Fatum Presents: 20 Years Of Anjunabeats', '2020-09-17', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(3, 'Somebody Loves You', '2020-09-25', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(4, 'We Control The Sunlight', '2011-07-04', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(5, 'A State Of Trance FOREVER', '2021-09-03', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(6, 'Intense (The More Intense Edition)', '2013-11-15', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(7, 'Take This', '2022-04-29', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(8, 'Ferry Corsten presents Corsten’s Countdown Best of 2015', '2015-12-28', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(9, 'Tuvan', '2009-09-21', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(10, 'Concrete Angel', '2012-02-13', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(11, 'A State Of Trance Episode 800 (Part 2)', '2017-02-02', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(12, 'U', '2015-03-18', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(13, 'Lighter Than Air', '2019-04-26', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(14, 'As The Rush Comes', '2005-01-01', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(15, 'As The Rush Comes', '2005-01-01', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(16, 'Southern Sun / Ready Steady Go', '2002-03-19', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(17, 'The Air I Breathe', '2018-10-12', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(18, '10 Years', '2006-11-11', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(19, 'Sunny Tales', '2008-08-18', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(20, 'Unbreakable', '2016-09-12', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56');

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
(1, 'Above & Beyond', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(2, 'Zoë Johnston', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(5, 'Aly & Fila', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(6, 'Plumb', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(7, 'Aly & Fila feat. Jwaydan', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(8, 'Armin van Buuren', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(10, 'Kazi Jay', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(12, 'Miri Ben-Ari', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(13, 'Bryan Kearney', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(14, 'Out of the Dust', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(16, 'Ferry Corsten presents Gouryella', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(17, 'Gaia', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(18, 'Gareth Emery', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(19, 'Christina Novelli', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(21, 'Gareth Emery & Standerwick', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(22, 'Standerwick', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(23, 'HALIENE', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(25, 'Bo Bruce', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(26, 'Marlo', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(27, 'Feenixpawl', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(28, 'Motorcycle', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(30, 'Paul Oakenfold', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(31, 'Carla Werner', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(32, 'Richard Durand', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(34, 'Rising Star', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(35, 'Sunlounger', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(36, 'Zara', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(37, 'Susana', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(39, 'Roger Shah', NULL, NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56');

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
(1, 1, 2, NULL, '2025-03-02 14:11:56'),
(2, 2, 2, NULL, '2025-03-02 14:11:56'),
(3, 3, 6, NULL, '2025-03-02 14:11:56'),
(4, 5, 5, NULL, '2025-03-02 14:11:56'),
(5, 5, 10, NULL, '2025-03-02 14:11:56'),
(6, 6, 12, NULL, '2025-03-02 14:11:56'),
(7, 7, 14, NULL, '2025-03-02 14:11:56'),
(8, 7, 6, NULL, '2025-03-02 14:11:56'),
(9, 10, 19, NULL, '2025-03-02 14:11:56'),
(10, 11, 21, NULL, '2025-03-02 14:11:56'),
(11, 11, 22, NULL, '2025-03-02 14:11:56'),
(12, 11, 23, NULL, '2025-03-02 14:11:56'),
(13, 12, 25, NULL, '2025-03-02 14:11:56'),
(14, 13, 27, NULL, '2025-03-02 14:11:56'),
(15, 16, 31, NULL, '2025-03-02 14:11:56'),
(16, 17, 19, NULL, '2025-03-02 14:11:56'),
(17, 19, 36, NULL, '2025-03-02 14:11:56'),
(18, 20, 5, NULL, '2025-03-02 14:11:56'),
(19, 20, 39, NULL, '2025-03-02 14:11:56');

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
(1, 'Dance', NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(2, 'Trance', NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(19, 'Pop', NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(20, 'Rock', NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(21, 'Electro', NULL, '2025-03-02 14:11:56', '2025-03-02 14:11:56');

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
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`id`, `title`, `primary_artist_id`, `album_id`, `duration`, `track_number`, `released_on`, `artwork_path`, `file_path`, `file_format`, `file_size`, `created_on`, `updated_on`) VALUES
(1, 'Good For Me (Above & Beyond Extended Club Mix)', 1, 1, 532, 2, '2007-03-05', 'a/0/above-beyond-good-for-me-above-beyond-extended-club-mix-e88d3abb-b038-41c4-9afd-347c454c2c5e-1.jpg', 'a/0/above-beyond-good-for-me-above-beyond-extended-club-mix-e88d3abb-b038-41c4-9afd-347c454c2c5e.mp3', 'mp3', 21331911, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(2, 'No One On Earth (Gabriel & Dresden Extended Mix)', 1, 2, 559, 5, '2020-09-17', 'a/0/above-beyond-no-one-on-earth-gabriel-dresden-extended-mix-53751859-528b-4df5-a81f-5b662ecefa68-2.jpg', 'a/0/above-beyond-no-one-on-earth-gabriel-dresden-extended-mix-53751859-528b-4df5-a81f-5b662ecefa68.mp3', 'mp3', 22441684, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(3, 'Somebody Loves You', 5, 3, 344, 1, '2020-09-25', 'a/0/aly-fila-somebody-loves-you-44c25810-071c-4c39-a651-193b47cb38d4-3.jpg', 'a/0/aly-fila-somebody-loves-you-44c25810-071c-4c39-a651-193b47cb38d4.mp3', 'mp3', 13855182, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(4, 'We Control The Sunlight', 7, 4, 509, 1, '2011-07-04', 'a/0/aly-fila-feat-jwaydan-we-control-the-sunlight-f9161767-1de7-4e19-9a9b-39b864b08090-4.jpg', 'a/0/aly-fila-feat-jwaydan-we-control-the-sunlight-f9161767-1de7-4e19-9a9b-39b864b08090.mp3', 'mp3', 20497924, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(5, 'For All Time (Extended Mix)', 8, 5, 546, 7, '2021-09-03', 'a/0/armin-van-buuren-for-all-time-extended-mix-858ccfa2-939f-4d50-b923-3302f057fc18-5.jpg', 'a/0/armin-van-buuren-for-all-time-extended-mix-858ccfa2-939f-4d50-b923-3302f057fc18.mp3', 'mp3', 21885760, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(6, 'Intense', 8, 6, 527, 1, '2013-11-15', 'a/0/armin-van-buuren-intense-1e6eb2ea-0354-4093-acff-51338fee2077-6.jpg', 'a/0/armin-van-buuren-intense-1e6eb2ea-0354-4093-acff-51338fee2077.mp3', 'mp3', 21157624, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(7, 'Take This (Extended Mix)', 13, 7, 521, 2, '2022-04-29', 'b/0/bryan-kearney-take-this-extended-mix-77b85b83-b03d-4bdf-ad1f-2cb794689d81-7.jpg', 'b/0/bryan-kearney-take-this-extended-mix-77b85b83-b03d-4bdf-ad1f-2cb794689d81.mp3', 'mp3', 20954432, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(8, 'Anahera (Extended Mix)', 16, 8, 459, 20, '2015-12-28', 'f/0/ferry-corsten-presents-gouryella-anahera-extended-mix-529c2be5-18b4-4b9c-a02a-47a261e519a1-8.jpg', 'f/0/ferry-corsten-presents-gouryella-anahera-extended-mix-529c2be5-18b4-4b9c-a02a-47a261e519a1.mp3', 'mp3', 18478340, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(9, 'Tuvan', 17, 9, 489, 1, '2009-09-21', 'g/0/gaia-tuvan-e1cff431-0cb2-4c5f-9959-6d8cdcdb98cb-9.jpg', 'g/0/gaia-tuvan-e1cff431-0cb2-4c5f-9959-6d8cdcdb98cb.mp3', 'mp3', 19688168, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(10, 'Concrete Angel (Original Mix)', 18, 10, 429, 2, '2012-02-13', 'g/0/gareth-emery-concrete-angel-original-mix-5f6d6565-26bb-4e86-b3a5-06a453703f00-10.jpg', 'g/0/gareth-emery-concrete-angel-original-mix-5f6d6565-26bb-4e86-b3a5-06a453703f00.mp3', 'mp3', 17263738, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(11, 'Saving Light', 18, 11, 294, 13, '2017-02-02', 'g/0/gareth-emery-saving-light-e5f13107-00fc-4349-a418-1a4432f7346d-11.jpg', 'g/0/gareth-emery-saving-light-e5f13107-00fc-4349-a418-1a4432f7346d.mp3', 'mp3', 11931165, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(12, 'U (Bryan Kearney Remix)', 18, 12, 466, 4, '2015-03-18', 'g/0/gareth-emery-u-bryan-kearney-remix-a308e7ce-65e9-44d3-874f-e8d7d00bc375-12.jpg', 'g/0/gareth-emery-u-bryan-kearney-remix-a308e7ce-65e9-44d3-874f-e8d7d00bc375.mp3', 'mp3', 18793609, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(13, 'Lighter Than Air (Extended Mix)', 26, 13, 304, 2, '2019-04-26', 'm/0/marlo-lighter-than-air-extended-mix-e691ada0-35dc-4615-9e35-6b1c1ca404d1-13.jpg', 'm/0/marlo-lighter-than-air-extended-mix-e691ada0-35dc-4615-9e35-6b1c1ca404d1.mp3', 'mp3', 12228783, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(14, 'As The Rush Comes (Gabriel & Dresden Sweeping Strings Remix)', 28, 14, 642, 4, '2005-01-01', 'm/0/motorcycle-as-the-rush-comes-gabriel-dresden-sweeping-strings-remix-0c210338-6256-4a7e-8434-31dc6467363b-14.jpg', 'm/0/motorcycle-as-the-rush-comes-gabriel-dresden-sweeping-strings-remix-0c210338-6256-4a7e-8434-31dc6467363b.mp3', 'mp3', 25723383, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(15, 'As The Rush Comes', 28, 14, 212, 6, '2005-01-01', 'm/0/motorcycle-as-the-rush-comes-d58cdf6f-b620-479a-8ed3-aea65f2f877d-15.jpg', 'm/0/motorcycle-as-the-rush-comes-d58cdf6f-b620-479a-8ed3-aea65f2f877d.mp3', 'mp3', 8523231, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(16, 'Southern Sun (DJ Tiësto Remix)', 30, 16, 584, 5, '2002-03-19', 'p/0/paul-oakenfold-southern-sun-dj-tisto-remix-79e1ec21-d4c7-4d93-bab2-7728af985e85-16.jpg', 'p/0/paul-oakenfold-southern-sun-dj-tisto-remix-79e1ec21-d4c7-4d93-bab2-7728af985e85.mp3', 'mp3', 23496579, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(17, 'The Air I Breathe (Club Mix)', 32, 17, 440, 2, '2018-10-12', 'r/0/richard-durand-the-air-i-breathe-club-mix-68d46a36-952b-4046-bbf9-9a184ee2b1ce-17.jpg', 'r/0/richard-durand-the-air-i-breathe-club-mix-68d46a36-952b-4046-bbf9-9a184ee2b1ce.mp3', 'mp3', 17721069, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(18, 'Clear Blue Moon (Original Mix)', 34, 18, 447, 9, '2006-11-11', 'r/0/rising-star-clear-blue-moon-original-mix-b4989d86-32a6-4a60-98af-5794c588668d-18.jpg', 'r/0/rising-star-clear-blue-moon-original-mix-b4989d86-32a6-4a60-98af-5794c588668d.mp3', 'mp3', 17961077, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(19, 'Lost (Dance Version)', 35, 19, 563, 17, '2008-08-18', 's/0/sunlounger-lost-dance-version-3134ea46-a8be-4bdd-813d-2b22f9171bb9-19.jpg', 's/0/sunlounger-lost-dance-version-3134ea46-a8be-4bdd-813d-2b22f9171bb9.mp3', 'mp3', 22642992, '2025-03-02 14:11:56', '2025-03-02 14:11:56'),
(20, 'Unbreakable (Extended Mix)', 37, 20, 466, 2, '2016-09-12', 's/0/susana-unbreakable-extended-mix-a89a8169-0a74-488e-870e-10bd47743c12-20.jpg', 's/0/susana-unbreakable-extended-mix-a89a8169-0a74-488e-870e-10bd47743c12.mp3', 'mp3', 18750043, '2025-03-02 14:11:56', '2025-03-02 14:11:56');

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
(19, 9, 19),
(20, 9, 20),
(21, 10, 21),
(22, 10, 1),
(23, 10, 2),
(24, 11, 1),
(25, 11, 2),
(26, 12, 1),
(27, 13, 1),
(28, 13, 2),
(29, 14, 1),
(30, 15, 1),
(31, 16, 21),
(32, 16, 1),
(33, 16, 19),
(34, 17, 1),
(35, 17, 2),
(36, 18, 1),
(37, 18, 2),
(38, 19, 1),
(39, 20, 1),
(40, 20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `song_lyrics`
--

CREATE TABLE `song_lyrics` (
  `id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `lyrics` text DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `song_metadata`
--

CREATE TABLE `song_metadata` (
  `id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `disc_number` int(11) DEFAULT NULL,
  `bpm` int(11) DEFAULT NULL,
  `performer_info` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `isrc` varchar(50) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL,
  `itunes_advisory` int(11) DEFAULT NULL,
  `composer` varchar(255) DEFAULT NULL,
  `conductor` varchar(255) DEFAULT NULL,
  `text_writer` varchar(255) DEFAULT NULL,
  `original_artist` varchar(255) DEFAULT NULL,
  `original_title` varchar(255) DEFAULT NULL,
  `original_textwriter` varchar(255) DEFAULT NULL,
  `encoder` varchar(255) DEFAULT NULL,
  `copyright` text DEFAULT NULL,
  `content_group` varchar(255) DEFAULT NULL,
  `artwork_type_id` int(11) DEFAULT NULL,
  `artwork_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song_metadata`
--

INSERT INTO `song_metadata` (`id`, `song_id`, `disc_number`, `bpm`, `performer_info`, `publisher`, `isrc`, `barcode`, `itunes_advisory`, `composer`, `conductor`, `text_writer`, `original_artist`, `original_title`, `original_textwriter`, `encoder`, `copyright`, `content_group`, `artwork_type_id`, `artwork_description`) VALUES
(1, 1, 1, 137, 'Above & BeyondZoë Johnston', 'Anjunabeats', 'GBEWA0600772', '5039060019115', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(2, 2, 3, 137, 'Fatum', 'Anjunabeats', 'GBEWA0400021', '5039060558799', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(3, 3, 1, 0, 'Aly & FilaPlumb', 'FSOE', 'UKRMQ2000822', '5054285297049', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(4, 4, 1, 140, 'Aly & FilaJwaydan', 'Future Sound of Egypt (Armada Music)', 'NLF711100643', '8717306978729', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(5, 5, 2, 0, 'Armin van Buuren', 'Armada Music Albums', 'NLF712106695', '8718522350825', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(6, 6, 1, 135, 'Armin van Buuren', 'Armada Music Albums', 'NLF711303311', '8718522034046', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(7, 7, 1, 0, 'Bryan KearneyOut of the DustPlumb', 'Subculture', 'NLD682201106', '8718525257800', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(8, 8, 1, 132, 'Ferry Corsten', 'Black Hole Recordings', 'NLQ881500054', '8718525079563', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(9, 9, 1, 132, 'Gaia', 'Armind', 'NLF710902900', '8717306958783', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(10, 10, 1, 0, 'Gareth EmeryChristina Novelli', 'Gareth Emery', 'GB2CT0900151', '735119491219', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(11, 11, 1, 0, 'Armin van Buuren', 'A State Of Trance Radio', 'NLF711701584', '8718522131196', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(12, 12, 1, 137, 'Gareth Emery', 'Garuda', 'GB2CT0900333', '8718522063787', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(13, 13, 1, 130, 'MarloFeenixpawl', 'Armind', 'NLF711903183', '8718522246562', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(14, 14, 1, 135, 'Motorcycle', 'Positiva/Virgin', 'GBAYE0302516', '724355388353', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(15, 15, 1, 135, 'Motorcycle', 'Positiva/Virgin', 'GBAYE0302515', '724355388353', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(16, 16, 1, 136, 'Paul Oakenfold', 'New State Music', 'GBBUF0190177', '885012034010', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(17, 17, 1, 137, 'Richard DurandChristina Novelli', 'Magik Muzik', 'NLE711800412', '8718525138864', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(18, 18, 1, 136, 'Armin van Buuren', 'Armada Music Bundles', 'NLF710600625', '8718522206412', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(19, 19, 1, 130, 'Sunlounger', 'Armada Music Albums', 'NLF710801048', '8717306948746', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover'),
(20, 20, 1, 137, 'SusanaAly & FilaRoger Shah', 'FSOE', 'NLM1S1600120', '5054282495806', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'cover');

-- --------------------------------------------------------

--
-- Table structure for table `song_plays`
--

CREATE TABLE `song_plays` (
  `id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `source_id` int(11) DEFAULT NULL,
  `played_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `song_synchronised_lyrics`
--

CREATE TABLE `song_synchronised_lyrics` (
  `id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `time_stamp` int(11) NOT NULL,
  `text` text NOT NULL,
  `language_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `song_technical_metadata`
--

CREATE TABLE `song_technical_metadata` (
  `id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `bitrate` int(11) DEFAULT NULL,
  `sample_rate` int(11) DEFAULT NULL,
  `channels` int(11) DEFAULT NULL,
  `vbr` tinyint(1) DEFAULT NULL,
  `codec_id` int(11) DEFAULT NULL,
  `lossless` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `song_technical_metadata`
--

INSERT INTO `song_technical_metadata` (`id`, `song_id`, `bitrate`, `sample_rate`, `channels`, `vbr`, `codec_id`, `lossless`) VALUES
(1, 1, 320, 44100, 2, 0, 1, 0),
(2, 2, 320, 44100, 2, 0, 1, 0),
(3, 3, 320, 44100, 2, 0, 1, 0),
(4, 4, 320, 44100, 2, 0, 1, 0),
(5, 5, 320, 44100, 2, 0, 1, 0),
(6, 6, 320, 44100, 2, 0, 1, 0),
(7, 7, 320, 44100, 2, 0, 1, 0),
(8, 8, 320, 44100, 2, 0, 1, 0),
(9, 9, 320, 44100, 2, 0, 1, 0),
(10, 10, 320, 44100, 2, 0, 1, 0),
(11, 11, 320, 44100, 2, 0, 1, 0),
(12, 12, 320, 44100, 2, 0, 1, 0),
(13, 13, 320, 44100, 2, 0, 1, 0),
(14, 14, 320, 44100, 2, 0, 1, 0),
(15, 15, 320, 44100, 2, 0, 1, 0),
(16, 16, 320, 44100, 2, 0, 1, 0),
(17, 17, 320, 44100, 2, 0, 1, 0),
(18, 18, 320, 44100, 2, 0, 1, 0),
(19, 19, 320, 44100, 2, 0, 1, 0),
(20, 20, 320, 44100, 2, 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `spt_artwork_types`
--

CREATE TABLE `spt_artwork_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spt_artwork_types`
--

INSERT INTO `spt_artwork_types` (`id`, `name`) VALUES
(0, 'Other'),
(1, 'File Icon'),
(2, 'Other File Icon'),
(3, 'Cover (front)'),
(4, 'Cover (back)'),
(5, 'Leaflet Page'),
(6, 'Media Label'),
(7, 'Lead Artist'),
(8, 'Artist'),
(9, 'Conductor'),
(10, 'Band'),
(11, 'Composer'),
(12, 'Lyricist'),
(13, 'Recording Location'),
(14, 'During Recording'),
(15, 'During Performance'),
(16, 'Video Screen Capture'),
(17, 'Illustration'),
(18, 'Band Logotype'),
(19, 'Publisher Logotype');

-- --------------------------------------------------------

--
-- Table structure for table `spt_audio_codecs`
--

CREATE TABLE `spt_audio_codecs` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `container` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_lossy` tinyint(1) NOT NULL DEFAULT 1,
  `max_bitrate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spt_audio_codecs`
--

INSERT INTO `spt_audio_codecs` (`id`, `name`, `container`, `description`, `is_lossy`, `max_bitrate`) VALUES
(1, 'MP3', 'MPEG', 'MPEG 1 Layer 3, standardni lossy format', 1, 320),
(2, 'AAC', 'MP4', 'Advanced Audio Coding', 1, 256),
(3, 'OGG Vorbis', 'OGG', '', 1, 320),
(4, 'FLAC', 'FLAC', 'Free Lossless Audio Codec', 0, NULL),
(5, 'ALAC', 'MP4', 'Apple Lossless Audio Codec', 0, NULL),
(6, 'MQA', 'FLAC', 'Master Quality Authenticated', 0, NULL),
(7, 'WAV', 'WAV', 'Waveform Audio File Format', 0, NULL),
(8, 'AIFF', 'AIFF', 'Audio Interchange File Format', 0, NULL),
(9, 'Opus', 'OGG', 'Noviji lossy format s dobrom kvalitetom pri niskim bitratima', 1, 256),
(10, 'DSD', 'DSF/DFF', 'Direct Stream Digital, format vrlo visoke rezolucije', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `spt_languages`
--

CREATE TABLE `spt_languages` (
  `id` int(11) NOT NULL,
  `code` char(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `native_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spt_languages`
--

INSERT INTO `spt_languages` (`id`, `code`, `name`, `native_name`) VALUES
(1, 'aa', 'Afar', 'Afaraf'),
(2, 'ab', 'Abkhaz', 'аҧсуа'),
(3, 'ae', 'Avestan', 'avesta'),
(4, 'af', 'Afrikaans', 'Afrikaans'),
(5, 'ak', 'Akan', 'Akan'),
(6, 'am', 'Amharic', 'አማርኛ'),
(7, 'an', 'Aragonese', 'Aragonés'),
(8, 'ar', 'Arabic', 'العربية'),
(9, 'as', 'Assamese', 'অসমীয়া'),
(10, 'av', 'Avaric', 'авар мацӀ, магӀарул мацӀ'),
(11, 'ay', 'Aymara', 'aymar aru'),
(12, 'az', 'Azerbaijani', 'azərbaycan dili'),
(13, 'ba', 'Bashkir', 'башҡорт теле'),
(14, 'be', 'Belarusian', 'Беларуская'),
(15, 'bg', 'Bulgarian', 'български език'),
(16, 'bh', 'Bihari', 'भोजपुरी'),
(17, 'bi', 'Bislama', 'Bislama'),
(18, 'bm', 'Bambara', 'bamanankan'),
(19, 'bn', 'Bengali', 'বাংলা'),
(20, 'bo', 'Tibetan', 'བོད་ཡིག'),
(21, 'br', 'Breton', 'brezhoneg'),
(22, 'bs', 'Bosnian', 'bosanski jezik'),
(23, 'ca', 'Catalan', 'Català'),
(24, 'ce', 'Chechen', 'нохчийн мотт'),
(25, 'ch', 'Chamorro', 'Chamoru'),
(26, 'co', 'Corsican', 'corsu, lingua corsa'),
(27, 'cr', 'Cree', 'ᓀᐦᐃᔭᐍᐏᐣ'),
(28, 'cs', 'Czech', 'česky, čeština'),
(29, 'cu', 'Church Slavic', 'ѩзыкъ словѣньскъ'),
(30, 'cv', 'Chuvash', 'чӑваш чӗлхи'),
(31, 'cy', 'Welsh', 'Cymraeg'),
(32, 'da', 'Danish', 'dansk'),
(33, 'de', 'German', 'Deutsch'),
(34, 'dv', 'Divehi', 'ދިވެހި'),
(35, 'dz', 'Dzongkha', 'རྫོང་ཁ'),
(36, 'ee', 'Ewe', 'Eʋegbe'),
(37, 'el', 'Greek', 'Ελληνικά'),
(38, 'en', 'English', 'English'),
(39, 'eo', 'Esperanto', 'Esperanto'),
(40, 'es', 'Spanish', 'español, castellano'),
(41, 'et', 'Estonian', 'eesti, eesti keel'),
(42, 'eu', 'Basque', 'euskara, euskera'),
(43, 'fa', 'Persian', 'فارسی'),
(44, 'ff', 'Fulah', 'Fulfulde, Pulaar, Pular'),
(45, 'fi', 'Finnish', 'suomi, suomen kieli'),
(46, 'fj', 'Fijian', 'vosa Vakaviti'),
(47, 'fo', 'Faroese', 'føroyskt'),
(48, 'fr', 'French', 'français, langue française'),
(49, 'fy', 'Western Frisian', 'Frysk'),
(50, 'ga', 'Irish', 'Gaeilge'),
(51, 'gd', 'Scottish Gaelic', 'Gàidhlig'),
(52, 'gl', 'Galician', 'Galego'),
(53, 'gn', 'Guarani', 'Avañeẽ'),
(54, 'gu', 'Gujarati', 'ગુજરાતી'),
(55, 'gv', 'Manx', 'Gaelg, Gailck'),
(56, 'ha', 'Hausa', 'Hausa, هَوُسَ'),
(57, 'he', 'Hebrew', 'עברית'),
(58, 'hi', 'Hindi', 'हिन्दी, हिंदी'),
(59, 'ho', 'Hiri Motu', 'Hiri Motu'),
(60, 'hr', 'Croatian', 'hrvatski'),
(61, 'ht', 'Haitian', 'Kreyòl ayisyen'),
(62, 'hu', 'Hungarian', 'Magyar'),
(63, 'hy', 'Armenian', 'Հայերեն'),
(64, 'hz', 'Herero', 'Otjiherero'),
(65, 'ia', 'Interlingua', 'Interlingua'),
(66, 'id', 'Indonesian', 'Bahasa Indonesia'),
(67, 'ie', 'Interlingue', 'Interlingue'),
(68, 'ig', 'Igbo', 'Asụsụ Igbo'),
(69, 'ii', 'Nuosu', 'ꆈꌠ꒿ Nuosuhxop'),
(70, 'ik', 'Inupiaq', 'Iñupiaq, Iñupiatun'),
(71, 'io', 'Ido', 'Ido'),
(72, 'is', 'Icelandic', 'Íslenska'),
(73, 'it', 'Italian', 'Italiano'),
(74, 'iu', 'Inuktitut', 'ᐃᓄᒃᑎᑐᑦ'),
(75, 'ja', 'Japanese', '日本語'),
(76, 'jv', 'Javanese', 'basa Jawa'),
(77, 'ka', 'Georgian', 'ქართული'),
(78, 'kg', 'Kongo', 'KiKongo'),
(79, 'ki', 'Kikuyu', 'Gĩkũyũ'),
(80, 'kj', 'Kwanyama', 'Kuanyama'),
(81, 'kk', 'Kazakh', 'Қазақ тілі'),
(82, 'kl', 'Kalaallisut', 'kalaallisut, kalaallit oqaasii'),
(83, 'km', 'Khmer', 'ភាសាខ្មែរ'),
(84, 'kn', 'Kannada', 'ಕನ್ನಡ'),
(85, 'ko', 'Korean', '한국어'),
(86, 'kr', 'Kanuri', 'Kanuri'),
(87, 'ks', 'Kashmiri', 'कश्मीरी, كشميري'),
(88, 'ku', 'Kurdish', 'Kurdî, كوردی'),
(89, 'kv', 'Komi', 'коми кыв'),
(90, 'kw', 'Cornish', 'Kernewek'),
(91, 'ky', 'Kyrgyz', 'кыргыз тили'),
(92, 'la', 'Latin', 'latine, lingua latina'),
(93, 'lb', 'Luxembourgish', 'Lëtzebuergesch'),
(94, 'lg', 'Luganda', 'Luganda'),
(95, 'li', 'Limburgish', 'Limburgs'),
(96, 'ln', 'Lingala', 'Lingála'),
(97, 'lo', 'Lao', 'ພາສາລາວ'),
(98, 'lt', 'Lithuanian', 'lietuvių kalba'),
(99, 'lu', 'Luba-Katanga', 'Tshiluba'),
(100, 'lv', 'Latvian', 'latviešu valoda'),
(101, 'mg', 'Malagasy', 'Malagasy fiteny'),
(102, 'mh', 'Marshallese', 'Kajin M̧ajeļ'),
(103, 'mi', 'Maori', 'te reo Māori'),
(104, 'mk', 'Macedonian', 'македонски јазик'),
(105, 'ml', 'Malayalam', 'മലയാളം'),
(106, 'mn', 'Mongolian', 'монгол'),
(107, 'mr', 'Marathi', 'मराठी'),
(108, 'ms', 'Malay', 'bahasa Melayu, بهاس ملايو'),
(109, 'mt', 'Maltese', 'Malti'),
(110, 'my', 'Burmese', 'ဗမာစာ'),
(111, 'na', 'Nauru', 'Ekakairũ Naoero'),
(112, 'nb', 'Norwegian Bokmål', 'Norsk bokmål'),
(113, 'nd', 'North Ndebele', 'isiNdebele'),
(114, 'ne', 'Nepali', 'नेपाली'),
(115, 'ng', 'Ndonga', 'Owambo'),
(116, 'nl', 'Dutch', 'Nederlands, Vlaams'),
(117, 'nn', 'Norwegian Nynorsk', 'Norsk nynorsk'),
(118, 'no', 'Norwegian', 'Norsk'),
(119, 'nr', 'South Ndebele', 'isiNdebele'),
(120, 'nv', 'Navajo', 'Diné bizaad, Dinékʼehǰí'),
(121, 'ny', 'Chichewa', 'chiCheŵa, chinyanja'),
(122, 'oc', 'Occitan', 'Occitan'),
(123, 'oj', 'Ojibwe', 'ᐊᓂᔑᓈᐯᒧᐎᓐ'),
(124, 'om', 'Oromo', 'Afaan Oromoo'),
(125, 'or', 'Oriya', 'ଓଡ଼ିଆ'),
(126, 'os', 'Ossetian', 'ирон æвзаг'),
(127, 'pa', 'Punjabi', 'ਪੰਜਾਬੀ, پنجابی'),
(128, 'pi', 'Pali', 'पाऴि'),
(129, 'pl', 'Polish', 'polski'),
(130, 'ps', 'Pashto', 'پښتو'),
(131, 'pt', 'Portuguese', 'Português'),
(132, 'qu', 'Quechua', 'Runa Simi, Kichwa'),
(133, 'rm', 'Romansh', 'rumantsch grischun'),
(134, 'rn', 'Kirundi', 'kiRundi'),
(135, 'ro', 'Romanian', 'română'),
(136, 'ru', 'Russian', 'русский язык'),
(137, 'rw', 'Kinyarwanda', 'Ikinyarwanda'),
(138, 'sa', 'Sanskrit', 'संस्कृतम्'),
(139, 'sc', 'Sardinian', 'sardu'),
(140, 'sd', 'Sindhi', 'सिन्धी, سنڌي، سندھی'),
(141, 'se', 'Northern Sami', 'Davvisámegiella'),
(142, 'sg', 'Sango', 'yângâ tî sängö'),
(143, 'si', 'Sinhala', 'සිංහල'),
(144, 'sk', 'Slovak', 'slovenčina'),
(145, 'sl', 'Slovene', 'slovenščina'),
(146, 'sm', 'Samoan', 'gagana faa Samoa'),
(147, 'sn', 'Shona', 'chiShona'),
(148, 'so', 'Somali', 'Soomaaliga, af Soomaali'),
(149, 'sq', 'Albanian', 'Shqip'),
(150, 'sr', 'Serbian', 'српски језик'),
(151, 'ss', 'Swati', 'SiSwati'),
(152, 'st', 'Southern Sotho', 'Sesotho'),
(153, 'su', 'Sundanese', 'Basa Sunda'),
(154, 'sv', 'Swedish', 'svenska'),
(155, 'sw', 'Swahili', 'Kiswahili'),
(156, 'ta', 'Tamil', 'தமிழ்'),
(157, 'te', 'Telugu', 'తెలుగు'),
(158, 'tg', 'Tajik', 'тоҷикӣ, toğikī, تاجیکی'),
(159, 'th', 'Thai', 'ไทย'),
(160, 'ti', 'Tigrinya', 'ትግርኛ'),
(161, 'tk', 'Turkmen', 'Türkmen, Түркмен'),
(162, 'tl', 'Tagalog', 'Wikang Tagalog'),
(163, 'tn', 'Tswana', 'Setswana'),
(164, 'to', 'Tonga', 'faka Tonga'),
(165, 'tr', 'Turkish', 'Türkçe'),
(166, 'ts', 'Tsonga', 'Xitsonga'),
(167, 'tt', 'Tatar', 'татарча, tatarça, تاتارچا'),
(168, 'tw', 'Twi', 'Twi'),
(169, 'ty', 'Tahitian', 'Reo Tahiti'),
(170, 'ug', 'Uighur', 'Uyƣurqə, ئۇيغۇرچە'),
(171, 'uk', 'Ukrainian', 'українська'),
(172, 'ur', 'Urdu', 'اردو'),
(173, 'uz', 'Uzbek', 'zbek, Ўзбек, أۇزبېك'),
(174, 've', 'Venda', 'Tshivenḓa'),
(175, 'vi', 'Vietnamese', 'Tiếng Việt'),
(176, 'vo', 'Volapük', 'Volapük'),
(177, 'wa', 'Walloon', 'Walon'),
(178, 'wo', 'Wolof', 'Wollof'),
(179, 'xh', 'Xhosa', 'isiXhosa'),
(180, 'yi', 'Yiddish', 'ייִדיש'),
(181, 'yo', 'Yoruba', 'Yorùbá'),
(182, 'za', 'Zhuang', 'Saɯ cueŋƅ, Saw cuengh'),
(183, 'zh', 'Chinese', '中文 (Zhōngwén), 汉语, 漢語'),
(184, 'zu', 'Zulu', 'isiZulu');

-- --------------------------------------------------------

--
-- Table structure for table `spt_playback_sources`
--

CREATE TABLE `spt_playback_sources` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spt_playback_sources`
--

INSERT INTO `spt_playback_sources` (`id`, `name`, `description`) VALUES
(1, 'search', 'Pjesma puštena iz rezultata pretrage'),
(2, 'artist_page', 'Pjesma puštena s profila izvođača'),
(3, 'album', 'Pjesma puštena s albuma'),
(4, 'playlist', 'Pjesma puštena s playliste'),
(5, 'radio', 'Pjesma puštena s radio stanice'),
(6, 'recommendation', 'Pjesma puštena iz preporuka'),
(7, 'homepage', 'Pjesma puštena s početne stranice'),
(8, 'queue', 'Pjesma puštena iz reda čekanja'),
(9, 'history', 'Pjesma puštena iz povijesti slušanja'),
(10, 'shared_link', 'Pjesma puštena preko dijeljenog linka'),
(11, 'embed', 'Pjesma puštena s ugrađenog playera na drugoj web stranici');

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
(2, 3, 1, 'benibabic@gmail.com', 'LighterThanAir', '', 'LighterThanAir', '8799', '$2b$10$8yenRmfEb/fyN18o4KTQuuNloz2qqiL7/A/Hj.Exw6nCFRBn9Chu2', NULL, '2000-08-20', 'M', '2025-03-16 15:54:51', '2025-02-22 10:28:46', NULL, '$2b$10$NcdHC2XGAZSG8RuTWB35veRVvUZEpUOYxfuKy5fiKhAtabQnoNP0i', 1, 1),
(9, 1, 1, 'superadmin@soundwave.com', 'Super', 'Administrator', 'Super Administrator', '2875', '$2b$10$fHXaCcv0I/MVXFFXKXUVbueOdqp6tDQH5hWDG/50NQdiw67MBPPmO', NULL, NULL, NULL, '2025-03-16 14:50:25', '2025-02-22 11:23:26', NULL, '$2b$10$D5/lxYUPkqxcqHjyzImxlOi5lKFNjepzgw4vc.tEuVfH88EJSInbC', 0, 0),
(10, 1, 1, 'testadmin@example.com', 'leigt', 'apple', 'admindva', '0584', '$2b$10$m4bNcvmF4w8L.8qUl5U0hee7JRhjMB2QSM9/9O/srgvWjooDN4sKS', NULL, NULL, NULL, NULL, '2025-03-01 16:45:21', NULL, NULL, 0, 0),
(11, 3, 1, 'benibabic19@gmail.com', 'LighterThanAir3', 'Beni235fk', 'LighterThanAir2', '8703', '$2b$10$1DXOmDoFFhms.TwD2BrmUuUNyu.VkJ41jDUY52g/IdXiL0n7figpG', NULL, '2000-08-27', 'M', NULL, '2025-03-03 15:49:22', NULL, NULL, 1, 1);

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
-- Dumping data for table `user_favorites`
--

INSERT INTO `user_favorites` (`id`, `user_id`, `song_id`, `created_on`) VALUES
(1, 2, 11, '2025-03-04 06:53:43'),
(3, 2, 1, '2025-03-16 12:41:51');

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
-- Indexes for table `song_lyrics`
--
ALTER TABLE `song_lyrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `language_id` (`language_id`),
  ADD KEY `idx_song_lyrics_song_id` (`song_id`);

--
-- Indexes for table `song_metadata`
--
ALTER TABLE `song_metadata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `song_plays`
--
ALTER TABLE `song_plays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `song_id` (`song_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `source_id` (`source_id`);

--
-- Indexes for table `song_synchronised_lyrics`
--
ALTER TABLE `song_synchronised_lyrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `language_id` (`language_id`),
  ADD KEY `idx_song_synchronised_lyrics_song_id` (`song_id`);

--
-- Indexes for table `song_technical_metadata`
--
ALTER TABLE `song_technical_metadata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `song_id` (`song_id`),
  ADD KEY `codec_id` (`codec_id`);

--
-- Indexes for table `spt_artwork_types`
--
ALTER TABLE `spt_artwork_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spt_audio_codecs`
--
ALTER TABLE `spt_audio_codecs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `spt_languages`
--
ALTER TABLE `spt_languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `spt_playback_sources`
--
ALTER TABLE `spt_playback_sources`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `collaborating_artists`
--
ALTER TABLE `collaborating_artists`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `song_genre`
--
ALTER TABLE `song_genre`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `song_lyrics`
--
ALTER TABLE `song_lyrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `song_metadata`
--
ALTER TABLE `song_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `song_plays`
--
ALTER TABLE `song_plays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `song_synchronised_lyrics`
--
ALTER TABLE `song_synchronised_lyrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `song_technical_metadata`
--
ALTER TABLE `song_technical_metadata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `spt_audio_codecs`
--
ALTER TABLE `spt_audio_codecs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `spt_languages`
--
ALTER TABLE `spt_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT for table `spt_playback_sources`
--
ALTER TABLE `spt_playback_sources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_favorites`
--
ALTER TABLE `user_favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Constraints for table `song_lyrics`
--
ALTER TABLE `song_lyrics`
  ADD CONSTRAINT `song_lyrics_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  ADD CONSTRAINT `song_lyrics_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `spt_languages` (`id`);

--
-- Constraints for table `song_metadata`
--
ALTER TABLE `song_metadata`
  ADD CONSTRAINT `song_metadata_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);

--
-- Constraints for table `song_plays`
--
ALTER TABLE `song_plays`
  ADD CONSTRAINT `song_plays_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  ADD CONSTRAINT `song_plays_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `song_plays_ibfk_3` FOREIGN KEY (`source_id`) REFERENCES `spt_playback_sources` (`id`);

--
-- Constraints for table `song_synchronised_lyrics`
--
ALTER TABLE `song_synchronised_lyrics`
  ADD CONSTRAINT `song_synchronised_lyrics_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  ADD CONSTRAINT `song_synchronised_lyrics_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `spt_languages` (`id`);

--
-- Constraints for table `song_technical_metadata`
--
ALTER TABLE `song_technical_metadata`
  ADD CONSTRAINT `song_technical_metadata_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  ADD CONSTRAINT `song_technical_metadata_ibfk_2` FOREIGN KEY (`codec_id`) REFERENCES `spt_audio_codecs` (`id`);

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
