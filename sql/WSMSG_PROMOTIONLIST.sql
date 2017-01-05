DROP TABLE IF EXISTS `WSMSG_PROMOTIONLIST`;
CREATE TABLE `WSMSG_PROMOTIONLIST` (
  `PromoID` int(11) NOT NULL,
  `ExpiryDate` date DEFAULT NULL,
  `ActivationDate` date DEFAULT NULL,
  `ProductCategory` varchar(255) DEFAULT NULL,
  `PromoImage` varchar(255) DEFAULT NULL,
  `PromoTitle` varchar(255) DEFAULT NULL,
  `PromoAltText` varchar(255) DEFAULT NULL,
  `PromoLife` varchar(255) DEFAULT NULL,
  `PromoPage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PromoID`)
);
