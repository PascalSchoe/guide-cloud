-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 02. Nov 2015 um 16:48
-- Server Version: 5.6.16
-- PHP-Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `guide_cloud`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `dateOfReg` datetime NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zipCode` varchar(11) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(60) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `userID` (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`userID`, `firstname`, `lastname`, `username`, `dateOfBirth`, `dateOfReg`, `gender`, `country`, `state`, `city`, `zipCode`, `email`, `password`) VALUES
(42, 'pascal', 'schÃ¶nfeld', 'pschoe', '1989-04-03', '2015-10-31 15:55:29', NULL, NULL, NULL, NULL, NULL, 'pschoe@guide-cloud.de', '$2a$10$Yd4re7MohHjK13.2cJ6tAesq7H6aOIHCWNCGgSS21zFFSPc3bKT6K'),
(44, 'testFn', 'testLn', 'test', '0003-02-01', '2015-11-02 16:44:50', NULL, NULL, NULL, NULL, NULL, 'test@guide-cloud.de', '$2a$10$ILeHKF4d7AT1op3VPuUvEOT7nSB6k082xdzYzq0POq.uQwM2FsIFW');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
