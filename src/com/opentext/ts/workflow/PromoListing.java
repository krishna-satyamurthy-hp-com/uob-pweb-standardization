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
import java.util.Hashtable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.dom4j.Document;
import org.dom4j.Node;

import com.interwoven.cssdk.common.CSClient;
import com.interwoven.cssdk.common.CSException;
import com.interwoven.cssdk.filesys.CSAreaRelativePath;
import com.interwoven.cssdk.workflow.CSExternalTask;
import com.interwoven.cssdk.workflow.CSURLExternalTask;
import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.db.utils.DBConnectionManager;


public class PromoListing implements CSURLExternalTask {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListing.class);
	private static final String seperator = "/";
	
	HashMap<String,String> promoDetailsMap;
	ArrayList<HashMap<String,String>> createPromoAL = new ArrayList<HashMap<String,String>>();
	ArrayList<String> deletePromoAL = new ArrayList<String>();
	String areaVpath;
	int jobID;
	
	@SuppressWarnings("rawtypes")	
	public void execute(CSClient paramCSClient, CSExternalTask task, Hashtable paramHashtable) throws CSException {
			LOGGER.debug("PromoListing starts");		
			this.areaVpath = task.getArea().getVPath().toString();
			this.jobID = task.getWorkflowId();
			LOGGER.debug("Workflow ID is "+this.jobID);
			LOGGER.info("Files WA path : "+areaVpath);
			ArrayList<String> promotionDCRList = new ArrayList<String>();
			CSAreaRelativePath[] waFiles = task.getFiles();
			String fileVPathStr;
			for(CSAreaRelativePath fileVPath : waFiles){
				fileVPathStr = fileVPath.toString();				
				if(fileVPathStr.contains(UOBBaseConstants.PROMOTION_TEMPLATEDATA_PATH)){
					promotionDCRList.add(fileVPathStr);
				}				
			}
			//Step 1 : Check if promo dcrs are attached in the workflow
			if(promotionDCRList != null && !promotionDCRList.isEmpty() && promotionDCRList.size()>0){
				LOGGER.info("Total Promotion DCRs are "+promotionDCRList.size());
				String promoDCRFullPath = "";
				//Step 2 : Add the promoDCR into create or delete AL
				for(String promoDCRVpath : promotionDCRList){					
					promoDCRFullPath = areaVpath.concat(seperator).concat(promoDCRVpath);
					promoDCRFullPath = promoDCRFullPath.substring(promoDCRFullPath.indexOf(seperator+seperator)+2,(promoDCRFullPath.length()));	
					promoDCRFullPath = promoDCRFullPath.replaceFirst(promoDCRFullPath.substring(0, promoDCRFullPath.indexOf(seperator)), UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE) ;
					LOGGER.debug("promoDCRFullPath is "+promoDCRFullPath);
					String promoRequest = "create";
					File promoDCRFile = new File(promoDCRFullPath);
					if(!promoDCRFile.exists()){
						LOGGER.debug("DCR file does not exist. Must be a delete request");
						LOGGER.debug("staging name "+task.getArea().getBranch().getStaging().getName());
						LOGGER.debug("branch vpath "+task.getArea().getBranch().getVPath().toString());
						promoDCRFullPath = task.getArea().getBranch().getVPath().toString().concat(seperator).concat("STAGING").concat(seperator).concat(promoDCRVpath);
						promoDCRFullPath = promoDCRFullPath.substring(promoDCRFullPath.indexOf(seperator+seperator)+2,(promoDCRFullPath.length()));
						promoDCRFullPath = promoDCRFullPath.replaceFirst(promoDCRFullPath.substring(0, promoDCRFullPath.indexOf(seperator)), UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE) ;
						promoRequest = "delete";
						promoDCRFile = new File(promoDCRFullPath);
						LOGGER.debug("promoDCRFullPath is "+promoDCRFullPath);
					}
						//This needs to be taken care
					if(promoDCRFile.exists()){
						readPromoDCR(promoDCRFullPath,promoRequest);
					}else{
						LOGGER.error("Promo DCR does not exist in either Workarea of Staging. Please check the permissions of the file");
					}
				}
				//Step 3 : Identify the task type and process accordingly
				final String promoTaskType = task.getVariable("promoTaskType"); //preview | promoJsonCreator | runtime
				LOGGER.info("promoTaskType is "+promoTaskType);
				if(promoTaskType != null && !promoTaskType.isEmpty()){					
					if(promoTaskType.equalsIgnoreCase("preview")){
						DBConnectionManager dbConMan = new DBConnectionManager();
						Connection con = dbConMan.getAuthDBConnection();
						if(this.createPromoAL != null && !this.createPromoAL.isEmpty() && this.createPromoAL.size()>0){
							updatePromoList(con);
						}if(this.deletePromoAL != null && !this.deletePromoAL.isEmpty() && this.deletePromoAL.size()>0){
							deletePromoList(con);
						}
					}else if(promoTaskType.equalsIgnoreCase("promoJsonCreator")){
						final String promoJsonRelativePath = UOBBaseConstants.PROMO_JSON_RELATIVE_PATH.concat(String.valueOf(jobID)).concat(".json");
						String promoJsonFilePath = this.areaVpath.concat("/").concat(promoJsonRelativePath);
						promoJsonFilePath = promoJsonFilePath.substring(promoJsonFilePath.indexOf(seperator+seperator)+2,(promoJsonFilePath.length()));	
						promoJsonFilePath = promoJsonFilePath.replaceFirst(promoJsonFilePath.substring(0, promoJsonFilePath.indexOf(seperator)), UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE) ;
						if(createPromoJson(promoJsonFilePath)){
							LOGGER.info("Started attaching json to workflow");
							CSAreaRelativePath promoJsonCSPath = new CSAreaRelativePath(promoJsonRelativePath);
							CSAreaRelativePath [] CSAreaRelativePathArray = {promoJsonCSPath};
							task.attachFiles(CSAreaRelativePathArray);
							LOGGER.info("Finished attaching json to workflow");
						}
					}
				}else{
					LOGGER.error("Workflow "+task.getWorkflowId()+" has task "+task.getName()+" without promoTaskType variable set");
				}
				
			}else{
				LOGGER.info("Workflow "+task.getWorkflowId()+" does not have any promotions selected");
			}
		LOGGER.info("PromoListingForPreview ends and transitions to next task "+task.getTransitions()[0]);
		task.chooseTransition(task.getTransitions()[0], "PromoListingForPreview completed successfully");
	}
	
	/**
	 * Reads promotion details DCR to fetch the values and add to either createPromoAL or deletePromoAL
	 * @param dcrPath
	 * @param promoRequest
	 */
	public void readPromoDCR(String dcrPath, String promoRequest){
		LOGGER.debug("Inside readPromoDCR");
		LOGGER.debug("DCR Path is "+dcrPath);	
		
		final Document promoDCR = Dom4jUtils.newDocument(new File(dcrPath));
		final Node promoDCRDetailsNode = promoDCR.selectSingleNode(UOBBaseConstants.PROMOTION_DCR_ROOT_NODE);
		LOGGER.debug("Promo DCR root node is "+promoDCRDetailsNode);	
		if(promoRequest.equalsIgnoreCase("create")){
			LOGGER.info("Request type is create or update promotion");
			promoDetailsMap = new HashMap<String,String>();
			promoDetailsMap.put("promo-id", promoDCRDetailsNode.selectSingleNode("promoId").getStringValue());
			promoDetailsMap.put("expiry-date", promoDCRDetailsNode.selectSingleNode("Expiry_Date").getStringValue());
			promoDetailsMap.put("activation-date", promoDCRDetailsNode.selectSingleNode("Activation_Date").getStringValue());
			//promoDetailsMap.put("promo-desc", promoDCRDetailsNode.selectSingleNode("promo_desc").getStringValue());
			promoDetailsMap.put("product-category", promoDCRDetailsNode.selectSingleNode("product_category").getStringValue());
			promoDetailsMap.put("promo-image", promoDCRDetailsNode.selectSingleNode("promo_image").getStringValue());
			promoDetailsMap.put("promo-title", promoDCRDetailsNode.selectSingleNode("promo_title").getStringValue());			
			promoDetailsMap.put("promo-alt-text", promoDCRDetailsNode.selectSingleNode("promo_alt_text").getStringValue());
			promoDetailsMap.put("promo-life", promoDCRDetailsNode.selectSingleNode("promo_life").getStringValue());
			promoDetailsMap.put("promo-page", promoDCRDetailsNode.selectSingleNode("promo_page").getStringValue());
			createPromoAL.add(promoDetailsMap);
		}else if(promoRequest.equalsIgnoreCase("delete")){
			LOGGER.debug("Request type is delete promotion");
			deletePromoAL.add(promoDCRDetailsNode.selectSingleNode("promoId").getStringValue());
		}
	}
	
	public void updatePromoList(Connection con){
		LOGGER.debug("Inside updatePromoList "+createPromoAL.size());		
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
					
					SimpleDateFormat df = new SimpleDateFormat("MM-dd-yyyy");
					
					Date expiryDate = df.parse(promoExpDate);
					java.sql.Date expiryDateDB = new java.sql.Date(expiryDate.getTime());
					
					Date activationDate = df.parse(promoActDate);
					java.sql.Date activationDateDB = new java.sql.Date(activationDate.getTime());
					
					String updatePromoQuery = "INSERT INTO PromotionList(PromoID,ExpiryDate,ActivationDate,ProductCategory,PromoImage,"
							+ "PromoTitle,PromoAltText,PromoLife,PromoPage) values(?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE "
							+ "ExpiryDate=?,ActivationDate=?,ProductCategory=?,PromoImage=?,PromoTitle=?,PromoAltText=?,PromoLife=?,PromoPage=?";
					LOGGER.info("insert statemnt "+updatePromoQuery);
					PreparedStatement updatePromoPS = con.prepareStatement(updatePromoQuery);
					updatePromoPS.setInt(1, promoID);
					updatePromoPS.setDate(2, expiryDateDB);
					updatePromoPS.setDate(10, expiryDateDB);
					updatePromoPS.setDate(3, activationDateDB);
					updatePromoPS.setDate(11, activationDateDB);
					updatePromoPS.setString(4, productCategory);
					updatePromoPS.setString(12, productCategory);
					updatePromoPS.setString(5, promoImage);
					updatePromoPS.setString(13, promoImage);
					updatePromoPS.setString(6, promoTitle);
					updatePromoPS.setString(14, promoTitle);
					updatePromoPS.setString(7, promoAltText);
					updatePromoPS.setString(15, promoAltText);
					updatePromoPS.setString(8, promoLife);
					updatePromoPS.setString(16, promoLife);
					updatePromoPS.setString(9, promoPage);
					updatePromoPS.setString(17, promoPage);	
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
					String deletePromoQuery = "DELETE FROM PromotionList WHERE PromoID="+promoID;
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
	
	public boolean createPromoJson(String promoJsonFilePath) {
		LOGGER.debug("createPromoJson starts");
		LOGGER.debug("createPromoAL size "+this.createPromoAL.size());
		boolean success = true;
		final ObjectMapper mapper = new ObjectMapper();
		LOGGER.info("promoJsonFilePath :: "+promoJsonFilePath);
	    File promoJsonFile = new File(promoJsonFilePath);
	    try {
	    	
			if(promoJsonFile.createNewFile()){
				@SuppressWarnings("rawtypes")
				HashMap<String, ArrayList> createPromoJsonMap = new HashMap<String, ArrayList>();
				if (this.createPromoAL != null && !this.createPromoAL.isEmpty()
						&& createPromoAL.size() > 0) {
					createPromoJsonMap.put("create", createPromoAL); 
				}if (deletePromoAL != null && !deletePromoAL.isEmpty()
						&& deletePromoAL.size() > 0) {
					createPromoJsonMap.put("delete", deletePromoAL);
				}
				LOGGER.debug(createPromoJsonMap.size());
				mapper.writeValue(promoJsonFile,createPromoJsonMap);
			}else{
				LOGGER.error("Unable to create promo json file in the workarea path "+promoJsonFilePath);
				LOGGER.error("Please check permissions ");
				success = false;
			}
		} catch (IOException e) {
			success = false;
			e.printStackTrace();
			LOGGER.error(e.getLocalizedMessage());
		}catch (Exception ex) {
			success = false;
			ex.printStackTrace();
			LOGGER.error(ex.getLocalizedMessage());
		}
	    LOGGER.debug("createPromoJson created successfully "+success);
	    LOGGER.debug("createPromoJson ends");
	    return success;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void updateRuntimePromoListing(String jobIDStr, String lsds_runtime_path){		
		LOGGER.debug("Enter updateRuntimePromoListing");
		System.out.println("Enter updateRuntimePromoListing");
		//Step 1 : Read the json file and update create and delete ArrayLists
		String promoJsonRTFilePath = UOBBaseConstants.PROMO_JSON_RELATIVE_PATH.concat(jobIDStr).concat(".json");
		//promoJsonRTFilePath = "/iwmnt/default/main/UOB/WORKAREA/shared/"+promoJsonRTFilePath; //Need to change this later to fetch RT path dynamically
		promoJsonRTFilePath = lsds_runtime_path.concat("/").concat(promoJsonRTFilePath); //Need to change this later to fetch RT path dynamically
		LOGGER.debug("promoJsonRTFilePath "+promoJsonRTFilePath);
		File promoJsonRTFile = new File(promoJsonRTFilePath);
		if(promoJsonRTFile.exists() && promoJsonRTFile.canRead()){
		final ObjectMapper mapper = new ObjectMapper();
			try {
				HashMap promoJsonMap = mapper.readValue(promoJsonRTFile, HashMap.class);
				ArrayList <HashMap<String, String>> createPromoRTAL = null;
				ArrayList <String> deletePromoRTAL = null;
				LOGGER.info(promoJsonMap);
				if(promoJsonMap != null && !promoJsonMap.isEmpty()){
					if(promoJsonMap.get("create") != null){
						createPromoRTAL = (ArrayList<HashMap<String, String>>) promoJsonMap.get("create");
						LOGGER.debug("createPromoALRT.size "+createPromoRTAL.size());						
						for(HashMap<String, String> createPromoDetailsMap : createPromoRTAL){
							createPromoAL.add(createPromoDetailsMap);
						}
						LOGGER.info("createPromoAL "+createPromoAL);
					}if(promoJsonMap.get("delete") != null){
						deletePromoRTAL = (ArrayList<String>) promoJsonMap.get("delete");
						LOGGER.debug(deletePromoRTAL.size());
						deletePromoAL = new ArrayList<String>();
						for(String deletePromoDetailsID : deletePromoRTAL){
							deletePromoAL.add(deletePromoDetailsID);
						}
					}
					DBConnectionManager dbConMan = new DBConnectionManager();
					//Connection con = dbConMan.getRTDBConnection();
					Connection con = dbConMan.getAuthDBConnection();
					//Step 2 : Process the runtime request accordingly
					if (createPromoAL != null && !createPromoAL.isEmpty()
							&& createPromoAL.size() > 0) {					
							updatePromoList(con);
					}
					if (deletePromoAL != null && !deletePromoAL.isEmpty()
							&& deletePromoAL.size() > 0) {
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
		}else{
			System.out.println("PromoJson  runtime file does not exist "+promoJsonRTFilePath);
			LOGGER.error("PromoJson runtime file does not exist "+promoJsonRTFilePath);
		}		
	}
}
