package com.opentext.ts.workflow;

import com.opentext.ls.db.utils.PropertyReader;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

//import com.opentext.ls.core.common.UOBBaseConstants;

public class PromoListingCommon {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListingCommon.class);
	PropertyReader is= new PropertyReader();
	
	public void updatePromoList(Connection con, ArrayList<HashMap<String,String>> createPromoAL){
		LOGGER.debug("Inside updatePromoList "+createPromoAL.size());
		System.out.println("Inside updatePromoList "+createPromoAL.size());
		try{			
			if(con!=null && !con.isClosed()){				
				for(HashMap<String,String> promoMap : createPromoAL){
					int promoID = Integer.parseInt(promoMap.get("promoid"));
					String promoExpDate = promoMap.get("expirydate");
					String promoActDate = promoMap.get("activationdate");
					String countryCode = promoMap.get("countrycode");
					String siteName = promoMap.get("sitename");
					String promoCategoryLabel = promoMap.get("promocategorylabel");
					String promoCategoryName = promoMap.get("promocategoryname");
					String promoImage = promoMap.get("promoimage");
					String promoTitle = promoMap.get("promotitle");
					String promoAltText = promoMap.get("promoalttext");
					String promoLife = promoMap.get("promolife");	
					String promoPage = promoMap.get("promopage");
					String promoCountry = promoMap.get("promocountry");
					
					//SimpleDateFormat df = new SimpleDateFormat(UOBBaseConstants.DATE_FORMAT);
					SimpleDateFormat df = new SimpleDateFormat(is.getSystemPropertyValue("DATE_FORMAT"));
					java.sql.Date expiryDateDB = null;
					java.sql.Date activationDateDB = null;
					java.sql.Date promoCreationDateDB = null;
					java.sql.Date promoModifiedDateDB = null;
					
					if(promoExpDate != null && !promoExpDate.isEmpty()){
						Date expiryDate = df.parse(promoExpDate);
						expiryDateDB = new java.sql.Date(expiryDate.getTime());
					}
					if(promoActDate != null && !promoActDate.isEmpty()){
						Date activationDate = df.parse(promoActDate);
						activationDateDB = new java.sql.Date(activationDate.getTime());
					}
					String promoCreator = promoMap.get("createdby");
					String promoCreationDateStr = promoMap.get("createddt");
					String promoModifier = promoMap.get("maintainedby");
					String promoModifiedDateStr = promoMap.get("maintaineddt");
					
					//SimpleDateFormat df1 = new SimpleDateFormat(UOBBaseConstants.TIMESTAMP_FORMAT);
					SimpleDateFormat df1 = new SimpleDateFormat(is.getSystemPropertyValue("TIMESTAMP_FORMAT"));
					
					Date promoCreationDate = df1.parse(promoCreationDateStr);
					promoCreationDateDB = new java.sql.Date(promoCreationDate.getTime());
					
					Date promoModifiedDate = df1.parse(promoModifiedDateStr);
					promoModifiedDateDB = new java.sql.Date(promoModifiedDate.getTime());
					
					//String updatePromoQuery = UOBBaseConstants.PROMOTION_INSERT_UPDATE_QUERY;
					String updatePromoQuery = is.getSystemPropertyValue("PROMOTION_INSERT_UPDATE_QUERY");
					LOGGER.info("insert statemnt "+updatePromoQuery);
					PreparedStatement updatePromoPS = con.prepareStatement(updatePromoQuery);
					updatePromoPS.setInt(1, promoID);
					//updatePromoPS.setInt(17, promoID);
					updatePromoPS.setDate(2, expiryDateDB);					
					updatePromoPS.setDate(18, expiryDateDB);
					updatePromoPS.setDate(3, activationDateDB);
					updatePromoPS.setDate(19, activationDateDB);
					updatePromoPS.setString(4, countryCode);
					updatePromoPS.setString(20, countryCode);
					updatePromoPS.setString(5, siteName);
					updatePromoPS.setString(21, siteName);
					updatePromoPS.setString(6, promoCategoryLabel);
					updatePromoPS.setString(22, promoCategoryLabel);
					updatePromoPS.setString(7, promoCategoryName);
					updatePromoPS.setString(23, promoCategoryName);
					updatePromoPS.setString(8, promoImage);
					updatePromoPS.setString(24, promoImage);
					updatePromoPS.setString(9, promoTitle);
					updatePromoPS.setString(25, promoTitle);
					updatePromoPS.setString(10, promoAltText);
					updatePromoPS.setString(26, promoAltText);
					updatePromoPS.setString(11, promoLife);
					updatePromoPS.setString(27, promoLife);
					updatePromoPS.setString(12, promoPage);
					updatePromoPS.setString(28, promoPage);
					updatePromoPS.setString(13, promoCountry);
					updatePromoPS.setString(29, promoCountry);
					updatePromoPS.setString(14, promoCreator);
					updatePromoPS.setString(30, promoCreator);
					updatePromoPS.setDate(15, promoCreationDateDB);
					updatePromoPS.setDate(31, promoCreationDateDB);
					updatePromoPS.setString(16, promoModifier);
					updatePromoPS.setString(32, promoModifier);
					updatePromoPS.setDate(17, promoModifiedDateDB);
					updatePromoPS.setDate(33, promoModifiedDateDB);
					
					int rowCount = updatePromoPS.executeUpdate();					
					LOGGER.debug("Inserted " + rowCount + " rows successfully");
				}
			}else{
				LOGGER.debug("Connection is closed");
			}
		}catch(SQLException sqlex){
			sqlex.printStackTrace();
			LOGGER.error(sqlex.getMessage());
			LOGGER.error(sqlex.getLocalizedMessage());
		}catch(Exception ex){
			ex.printStackTrace();
			LOGGER.error(ex.getMessage());
			LOGGER.error(ex.getLocalizedMessage());
		}finally{
			try {
				if(con != null && !con.isClosed())
					con.close();
			} catch (SQLException sqlex) {				
				sqlex.printStackTrace();
				LOGGER.error(sqlex.getMessage());
			} catch (Exception ex) {				
				ex.printStackTrace();
				LOGGER.error(ex.getMessage());
			}
		}
	}
	
	public void deletePromoList(Connection con, ArrayList<String> deletePromoAL){
		System.out.println("Inside deletePromoList "+deletePromoAL.size());		
		try{			
			if(con!=null && !con.isClosed()){
				for(String promoIDStr : deletePromoAL){
					int promoID = Integer.parseInt(promoIDStr);
					//String deletePromoQuery = UOBBaseConstants.PROMOTION_DELETE_QUERY+promoID;
					String deletePromoQuery = is.getSystemPropertyValue("PROMOTION_DELETE_QUERY")+promoID;
					System.out.println("deletePromoQuery "+ deletePromoQuery);
					Statement deleteStatement = con.createStatement();
					int rowCount = deleteStatement.executeUpdate(deletePromoQuery);
					System.out.println("Deleted " + rowCount + " rows successfully");
				}
			}
		}catch(SQLException sqlex){
			sqlex.printStackTrace();
		}catch(Exception ex){
			ex.printStackTrace();
		}finally{
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
