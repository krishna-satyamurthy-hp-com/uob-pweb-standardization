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

import com.opentext.ls.core.common.UOBBaseConstants;

public class PromoListingCommon {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListingCommon.class);
	public void updatePromoList(Connection con, ArrayList<HashMap<String,String>> createPromoAL){
		LOGGER.debug("Inside updatePromoList "+createPromoAL.size());
		System.out.println("Inside updatePromoList "+createPromoAL.size());
		try{			
			if(con!=null && !con.isClosed()){				
				for(HashMap<String,String> promoMap : createPromoAL){
					int promoID = Integer.parseInt(promoMap.get("promo-id"));
					String promoExpDate = promoMap.get("expiry-date");
					String promoActDate = promoMap.get("activation-date");
					String productCategory = promoMap.get("product-category");
					String promoImage = promoMap.get("promo-image");
					String promoTitle = promoMap.get("promo-title");
					String promoAltText = promoMap.get("promo-alt-text");
					String promoLife = promoMap.get("promo-life");	
					String promoPage = promoMap.get("promo-page");
					String promoCountry = promoMap.get("promo-country");
					
					SimpleDateFormat df = new SimpleDateFormat(UOBBaseConstants.DATE_FORMAT);
					
					Date expiryDate = df.parse(promoExpDate);
					java.sql.Date expiryDateDB = new java.sql.Date(expiryDate.getTime());
					
					Date activationDate = df.parse(promoActDate);
					java.sql.Date activationDateDB = new java.sql.Date(activationDate.getTime());
					
					String updatePromoQuery = UOBBaseConstants.PROMOTION_INSERT_UPDATE_QUERY;
					LOGGER.info("insert statemnt "+updatePromoQuery);
					System.out.println("insert statemnt "+updatePromoQuery);
					PreparedStatement updatePromoPS = con.prepareStatement(updatePromoQuery);
					updatePromoPS.setInt(1, promoID);
					updatePromoPS.setInt(11, promoID);
					updatePromoPS.setDate(2, expiryDateDB);					
					updatePromoPS.setDate(12, expiryDateDB);
					updatePromoPS.setDate(3, activationDateDB);
					updatePromoPS.setDate(13, activationDateDB);
					updatePromoPS.setString(4, productCategory);
					updatePromoPS.setString(14, productCategory);
					updatePromoPS.setString(5, promoImage);
					updatePromoPS.setString(15, promoImage);
					updatePromoPS.setString(6, promoTitle);
					updatePromoPS.setString(16, promoTitle);
					updatePromoPS.setString(7, promoAltText);
					updatePromoPS.setString(17, promoAltText);
					updatePromoPS.setString(8, promoLife);
					updatePromoPS.setString(18, promoLife);
					updatePromoPS.setString(9, promoPage);
					updatePromoPS.setString(19, promoPage);
					updatePromoPS.setString(10, promoCountry);
					updatePromoPS.setString(20, promoCountry);
					
					int rowCount = updatePromoPS.executeUpdate();					
					LOGGER.debug("Inserted " + rowCount + " rows successfully");
					System.out.println("Inserted " + rowCount + " rows successfully");
				}
			}else{
				LOGGER.debug("Connection is closed");
				System.out.println("Connection is closed");
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
		LOGGER.debug("Inside deletePromoList "+deletePromoAL.size());		
		try{			
			if(con!=null && !con.isClosed()){
				for(String promoIDStr : deletePromoAL){
					int promoID = Integer.parseInt(promoIDStr);
					String deletePromoQuery = UOBBaseConstants.PROMOTION_DELETE_QUERY+promoID;
					Statement deleteStatement = con.createStatement();
					int rowCount = deleteStatement.executeUpdate(deletePromoQuery);
					LOGGER.debug("Deleted " + rowCount + " rows successfully");
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
