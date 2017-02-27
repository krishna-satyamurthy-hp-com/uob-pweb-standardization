package com.opentext.ts.workflow;

import java.io.File;
import java.io.IOException;
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
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

//import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.db.utils.PropertyReader;
import com.opentext.ls.db.utils.DBConnectionManager;


public class PromoListingRT {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListingRT.class);	
	
	ArrayList<HashMap<String,String>> createPromoAL;
	ArrayList<String> deletePromoAL;
	
	public static void main(String[] args) {
		
		//final String promoJsonFilePath = "jobid.json";
		final String promoJsonFilePath = args[0];
		
		System.out.println(promoJsonFilePath);
		LOGGER.debug("promoJsonFilePath: "+ promoJsonFilePath);
		final File promoJsonFile = new File(promoJsonFilePath);
		if(promoJsonFile.exists() && promoJsonFile.canRead()){
			LOGGER.debug("PromoJson file exists and readable");
			PromoListingRT pl = new PromoListingRT();
			pl.updateRuntimePromoListing(promoJsonFile);
		}else{
			LOGGER.error("json file does not exist or cannot be read");
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void updateRuntimePromoListing(File promoJsonFile){		
		LOGGER.debug("Enter updateRuntimePromoListing");
		System.out.println("Enter updateRuntimePromoListing");
		//Step 1 : Read the json file and update create and delete ArrayLists		
		final ObjectMapper mapper = new ObjectMapper();
		try {
			HashMap promoJsonMap = mapper.readValue(promoJsonFile, HashMap.class);
			ArrayList <HashMap<String, String>> createPromoRTAL = null;
			ArrayList <String> deletePromoRTAL = null;
			LOGGER.info(promoJsonMap);
			System.out.println("promoJsonMap "+promoJsonMap);
			if(promoJsonMap != null && !promoJsonMap.isEmpty()){
				if(promoJsonMap.get("create") != null){
					createPromoRTAL = (ArrayList<HashMap<String, String>>) promoJsonMap.get("create");
					LOGGER.debug("createPromoALRT.size "+createPromoRTAL.size());
					System.out.println("createPromoALRT.size "+createPromoRTAL.size());
					this.createPromoAL = new ArrayList<HashMap<String,String>>();
					for(HashMap<String, String> createPromoDetailsMap : createPromoRTAL){
						this.createPromoAL.add(createPromoDetailsMap);
					}
					LOGGER.info("createPromoAL "+this.createPromoAL);
					System.out.println("createPromoAL "+this.createPromoAL);
				}if(promoJsonMap.get("delete") != null){
					deletePromoRTAL = (ArrayList<String>) promoJsonMap.get("delete");
					LOGGER.debug(deletePromoRTAL.size());
					System.out.println("deletePromoRTAL.size() "+deletePromoRTAL.size());
					this.deletePromoAL = new ArrayList<String>();
					for(String deletePromoDetailsID : deletePromoRTAL){
						this.deletePromoAL.add(deletePromoDetailsID);
					}
					LOGGER.info("deletePromoAL "+this.deletePromoAL);
					System.out.println("deletePromoAL "+this.deletePromoAL);
				}
				DBConnectionManager dbConMan = new DBConnectionManager();
				//Connection con = dbConMan.getAuthDBConnection();
				Connection con = dbConMan.getConnectionUsingOracleWallet();
				//Step 2 : Process the runtime request accordingly
				if (this.createPromoAL != null && !this.createPromoAL.isEmpty()
						&& this.createPromoAL.size() > 0) {					
						updatePromoList(con);
				}
				if (this.deletePromoAL != null && !this.deletePromoAL.isEmpty()
						&& this.deletePromoAL.size() > 0) {
					deletePromoList(con);
				}
			}else{
				LOGGER.error("PromoJson runtime exists but is empty or invalid "+promoJsonMap);
			}
			
		} catch (JsonParseException e) {				
			LOGGER.error(e.getCause().getMessage());
			e.printStackTrace();
		} catch (JsonMappingException e) {
			LOGGER.error(e.getCause().getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			LOGGER.error(e.getCause().getMessage());
			e.printStackTrace();
		}	
	}
	
	public void updatePromoList(Connection con){
		LOGGER.debug("Inside updatePromoList "+createPromoAL.size());		
		try{			
			if(con!=null && !con.isClosed()){				
				for(HashMap<String,String> promoMap : createPromoAL){
					
					int promoID = Integer.parseInt(promoMap.get("promoid"));
					String promoExpDate = promoMap.get("expirydate");
					String promoActDate = promoMap.get("activationdate");
					String productCategory = promoMap.get("productcategory");
					String promoImage = promoMap.get("promoimage");
					String promoTitle = promoMap.get("promotitle");
					String promoAltText = promoMap.get("promoalttext");
					String promoLife = promoMap.get("promolife");	
					String promoPage = promoMap.get("promopage");
					String promoCountry = promoMap.get("promocountry");
					
					//SimpleDateFormat df = new SimpleDateFormat(UOBBaseConstants.DATE_FORMAT);
					SimpleDateFormat df = new SimpleDateFormat(PropertyReader.getSystemPropertyValue("DATE_FORMAT"));
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
					SimpleDateFormat df1 = new SimpleDateFormat(PropertyReader.getSystemPropertyValue("TIMESTAMP_FORMAT"));
					
					Date promoCreationDate = df1.parse(promoCreationDateStr);
					promoCreationDateDB = new java.sql.Date(promoCreationDate.getTime());
					
					Date promoModifiedDate = df1.parse(promoModifiedDateStr);
					promoModifiedDateDB = new java.sql.Date(promoModifiedDate.getTime());
					
					//String updatePromoQuery = UOBBaseConstants.PROMOTION_INSERT_UPDATE_QUERY;
					String updatePromoQuery = PropertyReader.getSystemPropertyValue("PROMOTION_INSERT_UPDATE_QUERY");
					LOGGER.info("insert statemnt "+updatePromoQuery);
					PreparedStatement updatePromoPS = con.prepareStatement(updatePromoQuery);
					updatePromoPS.setInt(1, promoID);
					updatePromoPS.setInt(15, promoID);
					updatePromoPS.setDate(2, expiryDateDB);					
					updatePromoPS.setDate(16, expiryDateDB);
					updatePromoPS.setDate(3, activationDateDB);
					updatePromoPS.setDate(17, activationDateDB);
					updatePromoPS.setString(4, productCategory);
					updatePromoPS.setString(18, productCategory);
					updatePromoPS.setString(5, promoImage);
					updatePromoPS.setString(19, promoImage);
					updatePromoPS.setString(6, promoTitle);
					updatePromoPS.setString(20, promoTitle);
					updatePromoPS.setString(7, promoAltText);
					updatePromoPS.setString(21, promoAltText);
					updatePromoPS.setString(8, promoLife);
					updatePromoPS.setString(22, promoLife);
					updatePromoPS.setString(9, promoPage);
					updatePromoPS.setString(23, promoPage);
					updatePromoPS.setString(10, promoCountry);
					updatePromoPS.setString(24, promoCountry);
					updatePromoPS.setString(11, promoCreator);
					updatePromoPS.setString(25, promoCreator);
					updatePromoPS.setDate(12, promoCreationDateDB);
					updatePromoPS.setDate(26, promoCreationDateDB);
					updatePromoPS.setString(13, promoModifier);
					updatePromoPS.setString(27, promoModifier);
					updatePromoPS.setDate(14, promoModifiedDateDB);
					updatePromoPS.setDate(28, promoModifiedDateDB);
					
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
	public void deletePromoList(Connection con){
		LOGGER.debug("Inside deletePromoList "+deletePromoAL.size());
		
		try{			
			if(con!=null && !con.isClosed()){
				for(String promoIDStr : deletePromoAL){
					int promoID = Integer.parseInt(promoIDStr);
					//String deletePromoQuery = UOBBaseConstants.PROMOTION_DELETE_QUERY+promoID;
					String deletePromoQuery = PropertyReader.getSystemPropertyValue("PROMOTION_DELETE_QUERY")+promoID;
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
