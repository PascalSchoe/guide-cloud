-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 24. Okt 2015 um 17:11
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
  `dateOfReg` date NOT NULL,
  `gender` char(1) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zipCode` varchar(11) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(60) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`userID`, `firstname`, `lastname`, `username`, `dateOfBirth`, `dateOfReg`, `gender`, `country`, `state`, `city`, `zipCode`, `email`, `password`) VALUES
(4, 'Pascal', 'Schönfeld', 'pschoe', '0000-00-00', '2015-10-19', '', '', '', '', '', 'pschoe@guide-cloud.de', '1234'),
(7, 'Micky', 'Schönfeld', 'mToTheIcky', NULL, '2015-10-20', NULL, NULL, NULL, NULL, NULL, 'micky@guide-cloud.de', 'ohio2020'),
(8, 'Micky', 'Schönfeld', 'mToTheIcky', NULL, '2015-10-20', NULL, NULL, NULL, NULL, NULL, 'micky@guide-cloud.de', 'ohio2020'),
(9, 'Manuel', 'Schönfeld', 'mschoe', '0000-00-00', '2015-10-20', 'm', 'Deutschland', 'Schleswig-Holstein', 'Flensburg', '24944', 'mschoe@guide-cloud.de', 'mschoe1234'),
(10, 'Micky', 'Schönfeld', 'mToTheIcky', NULL, '2015-10-20', NULL, NULL, NULL, NULL, NULL, 'micky@guide-cloud.de', 'ohio2020'),
(11, 'Horst die W0rst', 'testi', 'testtesttest', '1989-04-03', '2015-10-20', 'm', 'eineAnderesLand', 'sh', 'fl', '24937', 'kamus.foryou@gmx.net', 'p'),
(15, 'Horst die W0rst', 'Clausen', 'aclau', '1989-10-15', '0000-00-00', 'm', 'Deutschland', 'Schleswig-Holstein', 'Flensburg', '24944', 'aclau@guide-cloud.de', '$2a$10$LbNqxBhEdO2aw/HPRijek.1FgXb.wbgbdMbM7G2CnhUfUThVGfzbe'),
(16, 'Bernd', 'dasBrot', 'bdB', '0000-00-00', '0000-00-00', 'm', 'dt', 'sh', 'fl', '24937', 'bdB@guide-cloud.de', '$2a$10$K/sWJxhXDAgvUO6nkw.EFeVqJsbzLoaiWK/gvh7x.D5CeuzYTGL8e'),
(17, 'Bernd2', 'dasBrot', 'bdB', '0000-00-00', '0000-00-00', 'm', 'dt', 'sh', 'fl', '24937', 'bdB@guide-cloud.de', '$2a$10$.k4PS2T1BEXMNLYZyVH3g.pKb4FGlABJkYyvxvQ5HdozKD8Tcvgwm'),
(18, 'Bernd2', 'dasBrot', 'bdB', '0000-00-00', '0000-00-00', 'm', 'dt', 'sh', 'fl', '24937', 'bdB@guide-cloud.de', '$2a$10$H.3UtLI7ASosVF8hGKMC1OZ2Y6WcCiEJsk5qKoRWJBEleO0RSVgde'),
(20, 'Michael', 'Schönfeld', 'tron', '0000-00-00', '0000-00-00', 'm', 'Deutschland', 'Schleswig-Holstein', 'Flensburg', '24944', 'michael@guide-cloud.de', '$2a$10$ZnLjrIavtPhxw2OUgJdEBuGKW6K35feP9ijTQ8dSyoAfgoRIQ1cNq'),
(21, 'Vico', 'Clausen or Wolff Dunno', 'vici', '2013-03-22', '0000-00-00', 'm', 'Dänemark', 'kein Plan', 'Odense', '11111', 'vico@guide-cloud.de', '$2a$10$dCEJ9SnGAlK5BQZY/wqTIuAIOVmv3067cxWUgkJRIqO68zgg7AxHq');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
