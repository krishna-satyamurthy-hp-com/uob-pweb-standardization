package com.opentext.ts.workflow;

import com.opentext.ls.db.utils.DBConnectionManager;
import com.opentext.ls.db.utils.PropertyReader;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;

//import com.opentext.ls.core.common.UOBBaseConstants;


public class PromoListingRuntime {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListingRuntime.class);	
	PropertyReader is= new PropertyReader();

	public static void main(String[] args) {
		String jobID = args[0];
		String lsds_runtime_path = args[1];
		
		System.out.println(lsds_runtime_path);
		System.out.println("jobID: "+ jobID);
		LOGGER.debug("jobID: "+ jobID);
		LOGGER.debug("lsds_runtime_path: "+ lsds_runtime_path);
		if(jobID != null && !jobID.isEmpty()){
			LOGGER.debug("Inside If jobID: "+ jobID);
		PromoListingRuntime plr = new PromoListingRuntime();
		plr.updateRuntimePromoListing(jobID, lsds_runtime_path);
		}else{
			LOGGER.error("jobID is not defined");
		}
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void updateRuntimePromoListing(String jobIDStr, String lsds_runtime_path){
		ArrayList<HashMap<String,String>> createPromoAL = new ArrayList<HashMap<String,String>>();
		ArrayList<String> deletePromoAL = new ArrayList<String>();
		LOGGER.debug("Enter updateRuntimePromoListing");
		System.out.println("Enter updateRuntimePromoListing");
		//Step 1 : Read the json file and update create and delete ArrayLists
		//String promoJsonRTFilePath = UOBBaseConstants.PROMO_JSON_RELATIVE_PATH.concat(jobIDStr).concat(".json");
		String promoJsonRTFilePath = is.getSystemPropertyValue("PROMO_JSON_RELATIVE_PATH").concat(jobIDStr).concat(".json");
		//promoJsonRTFilePath = "/iwmnt/default/main/UOB/WORKAREA/shared/"+promoJsonRTFilePath; //Need to change this later to fetch RT path dynamically
		System.out.println("promoJsonRTFilePath: "+ promoJsonRTFilePath);
		promoJsonRTFilePath = lsds_runtime_path.concat("/").concat(promoJsonRTFilePath); //Need to change this later to fetch RT path dynamically
		System.out.println("complete promoJsonRTFilePath: "+ promoJsonRTFilePath);
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
						System.out.println("createPromoALRT.size "+createPromoRTAL.size());						
						for(HashMap<String, String> createPromoDetailsMap : createPromoRTAL){
							createPromoAL.add(createPromoDetailsMap);
						}
						LOGGER.info("createPromoAL "+createPromoAL);
					}if(promoJsonMap.get("delete") != null){
						deletePromoRTAL = (ArrayList<String>) promoJsonMap.get("delete");
						System.out.println("deletePromoRTAL.size " +deletePromoRTAL.size());
						deletePromoAL = new ArrayList<String>();
						for(String deletePromoDetailsID : deletePromoRTAL){
							deletePromoAL.add(deletePromoDetailsID);
						}
					}
					/*DBConnectionManager dbConMan = new DBConnectionManager();
					//Connection con = dbConMan.getRTDBConnection();
					
					//Enable this for UOB deployment
					//Connection con = dbConMan.getConnectionUsingOracleWallet();
					Connection con = dbConMan.getLocalRTDBConnection();*/
					
					//Step 2 : Process the runtime request accordingly
					PromoListingCommon plc = new PromoListingCommon();
					if (createPromoAL != null && !createPromoAL.isEmpty()
							&& createPromoAL.size() > 0) {	
						System.out.println("Inside updatePromoList...");
						DBConnectionManager dbConMan = new DBConnectionManager();
						Connection con = dbConMan.getLocalRTDBConnection();
						plc.updatePromoList(con, createPromoAL);
					}
					if (deletePromoAL != null && !deletePromoAL.isEmpty()
							&& deletePromoAL.size() > 0) {
						System.out.println("Inside deletePromoAL...");
						DBConnectionManager dbConMan = new DBConnectionManager();
						Connection con = dbConMan.getLocalRTDBConnection();
						plc.deletePromoList(con, deletePromoAL);
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
