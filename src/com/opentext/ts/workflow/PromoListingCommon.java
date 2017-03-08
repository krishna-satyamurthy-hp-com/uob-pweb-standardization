package com.opentext.ts.workflow;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

//import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.db.utils.PropertyReader;

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
					String siteName = promoMap.get("sitename");
					String promoCategoryLabel = promoMap.get("productcategorylabel");
					String promoCategoryName = promoMap.get("productcategoryname");
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
					updatePromoPS.setDate(17, expiryDateDB);
					updatePromoPS.setDate(3, activationDateDB);
					updatePromoPS.setDate(18, activationDateDB);
					updatePromoPS.setString(4, siteName);
					updatePromoPS.setString(19, siteName);
					updatePromoPS.setString(5, promoCategoryLabel);
					updatePromoPS.setString(20, promoCategoryLabel);
					updatePromoPS.setString(6, promoCategoryName);
					updatePromoPS.setString(21, promoCategoryName);
					updatePromoPS.setString(7, promoImage);
					updatePromoPS.setString(22, promoImage);
					updatePromoPS.setString(8, promoTitle);
					updatePromoPS.setString(23, promoTitle);
					updatePromoPS.setString(9, promoAltText);
					updatePromoPS.setString(24, promoAltText);
					updatePromoPS.setString(10, promoLife);
					updatePromoPS.setString(25, promoLife);
					updatePromoPS.setString(11, promoPage);
					updatePromoPS.setString(26, promoPage);
					updatePromoPS.setString(12, promoCountry);
					updatePromoPS.setString(27, promoCountry);
					updatePromoPS.setString(13, promoCreator);
					updatePromoPS.setString(28, promoCreator);
					updatePromoPS.setDate(14, promoCreationDateDB);
					updatePromoPS.setDate(29, promoCreationDateDB);
					updatePromoPS.setString(15, promoModifier);
					updatePromoPS.setString(30, promoModifier);
					updatePromoPS.setDate(16, promoModifiedDateDB);
					updatePromoPS.setDate(31, promoModifiedDateDB);
					
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
