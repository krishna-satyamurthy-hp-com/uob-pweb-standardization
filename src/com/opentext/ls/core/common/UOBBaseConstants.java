package com.opentext.ls.core.common;

/**
 * Common class to hold constants used throughout the application.
 *
 */
public class UOBBaseConstants {

	public static final String DATE_FORMAT = "MM-dd-yyyy";

	/*******************************************************************************
	 * *CONSTANTS for DCR Utils
	 *****************************************************************/
	public static final String TEAMSITE_SERVER_MOUNT_DRIVE = "/iwmnt";
	public static final String FUNDS_JSON_FILE_PATH = "iwov-resources/json/funds-selector/pnr_unit_trusts.json";

	/*******************************************************************************
	 * *CONSTANTS for PromoListing
	 *****************************************************************/
	public static final String PROMOTION_JSON_FILE_PATH = "iwov-resources/json/promodata.json";
	public static final String PROMO_JSON_RELATIVE_PATH = "iwov-resources/json/promolisting/promoJson_";
	//public static final String IW_HOME = "/usr/Interwoven/TeamSite";
	public static final String IW_HOME = "/app/teamsite/iw-home/TeamSite";
	public static final String LIVESITE_CUSTOMER_AUTH = IW_HOME
			+ "/local/config/lib/content_center/livesite_customer_src/etc/conf/livesite_customer/";
	public static final String PROMOTION_TEMPLATEDATA_PATH = "templatedata/promotion/details/data/";
	public static final String PROMOTION_DCR_ROOT_NODE = "/root/promo_details";
	//public static final String PROMOTION_INSERT_UPDATE_QUERY = "INSERT INTO WSMSG_PROMOTIONLIST(PROMOID,EXPIRYDATE,ACTIVATIONDATE,PRODUCTCATEGORY,PROMOIMAGE,"
	//		+ "PROMOTITLE,PROMOALTTEXT,PROMOLIFE,PROMOPAGE) values(?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE "
	//		+ "EXPIRYDATE=?,ACTIVATIONDATE=?,PRODUCTCATEGORY=?,PROMOIMAGE=?,PROMOTITLE=?,PROMOALTTEXT=?,PROMOLIFE=?,PROMOPAGE=?";
	
	public static final String PROMOTION_INSERT_UPDATE_QUERY = "MERGE INTO WSMSG_PROMOTIONLIST USING dual ON (PROMOID = ?) WHEN MATCHED THEN UPDATE SET EXPIRYDATE=?,ACTIVATIONDATE=?,PRODUCTCATEGORY=?,PROMOIMAGE=?,PROMOTITLE=?,PROMOALTTEXT=?,PROMOLIFE=?,PROMOPAGE=? WHEN NOT MATCHED THEN INSERT (PROMOID,EXPIRYDATE,ACTIVATIONDATE,PRODUCTCATEGORY,PROMOIMAGE,PROMOTITLE,PROMOALTTEXT,PROMOLIFE,PROMOPAGE) VALUES ( ?,?,?,?,?,?,?,?,?)";
	public static final String PROMOTION_DELETE_QUERY = "DELETE FROM WSMSG_PROMOTIONLIST WHERE PROMOID=";
}
