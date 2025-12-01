
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emp_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emp_email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateis` date DEFAULT NULL,
  `timeis` time DEFAULT NULL,
  `application` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
