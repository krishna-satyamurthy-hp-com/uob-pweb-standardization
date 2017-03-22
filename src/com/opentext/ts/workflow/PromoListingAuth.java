package com.opentext.ts.workflow;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;


import com.interwoven.cssdk.access.CSAuthorizationException;
import com.interwoven.cssdk.access.CSExpiredSessionException;
import com.interwoven.cssdk.common.CSClient;
import com.interwoven.cssdk.common.CSException;
import com.interwoven.cssdk.common.CSObjectNotFoundException;
import com.interwoven.cssdk.common.CSRemoteException;
import com.interwoven.cssdk.filesys.CSAreaRelativePath;
import com.interwoven.cssdk.filesys.CSFile;
import com.interwoven.cssdk.filesys.CSHole;
import com.interwoven.cssdk.filesys.CSVPath;
import com.interwoven.cssdk.workflow.CSExternalTask;
import com.interwoven.cssdk.workflow.CSInactiveTaskException;
import com.interwoven.cssdk.workflow.CSURLExternalTask;
//import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.db.utils.PropertyReader;


public class PromoListingAuth implements CSURLExternalTask {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListingAuth.class);
	private static final String seperator = "/";
	
	HashMap<String,String> promoDetailsMap;
	ArrayList<HashMap<String,String>> createPromoAL = new ArrayList<HashMap<String,String>>();
	ArrayList<String> deletePromoAL = new ArrayList<String>();
	
	ArrayList<String> promotionDCRList = new ArrayList<String>();
	ArrayList<PromoListingBean> createPromoBeanAL = new ArrayList<PromoListingBean>();
	ArrayList<PromoListingBean> deletePromoBeanAL = new ArrayList<PromoListingBean>();
	
	String areaVpath;
	int jobID;
	String promoTaskType;
	String countryCode;
	CSClient paramCSClient;
	CSExternalTask task;
	
	PropertyReader is= new PropertyReader();
	
	@SuppressWarnings("rawtypes")	
	public void execute(CSClient paramCSClient, CSExternalTask task, Hashtable paramHashtable) throws CSException {
			LOGGER.debug("PromoListing starts");
			this.paramCSClient = paramCSClient;
			this.task = task;
			this.areaVpath = task.getArea().getVPath().toString();
			this.jobID = task.getWorkflowId();
			this.promoTaskType = task.getVariable("promoTaskType"); //preview | promoJsonCreator | runtime
			
			LOGGER.debug("Branch name : " + task.getArea().getBranch().getName());
			LOGGER.debug("Parent Branch Name : " +task.getArea().getBranch().getParentBranch().getName());
			//this.countryCode = task.getArea().getBranch().getParentBranch().getParentBranch().getName();
			this.countryCode = "SG";
			LOGGER.debug("countryCode : " +this.countryCode);
			LOGGER.debug("Workflow ID is "+this.jobID);
			LOGGER.info("Files WA path : "+areaVpath);
			CSAreaRelativePath[] waFiles = task.getFiles();
			String fileVPathStr;
			for(CSAreaRelativePath fileVPath : waFiles){
				fileVPathStr = fileVPath.toString();				
				//if(fileVPathStr.contains(UOBBaseConstants.PROMOTION_TEMPLATEDATA_PATH)){
				if(fileVPathStr.contains(is.getSystemPropertyValue("PROMOTION_TEMPLATEDATA_PATH"))){
					this.promotionDCRList.add(fileVPathStr);
				}				
			}
			//Step 1 : Check if promo dcrs are attached in the workflow
			if(this.promotionDCRList != null && !this.promotionDCRList.isEmpty() && this.promotionDCRList.size()>0){
				//Step 2 : convert promoDCR to promoBean and add to create or delete AL
				processPromoDCRs();
				//Step 3 : Identify the task type and process accordingly
				processPromoTask();
			}else{
				LOGGER.info("Workflow "+task.getWorkflowId()+" does not have any promotions selected");
			}
		LOGGER.info("PromoListingForPreview ends and transitions to next task "+task.getTransitions()[0]);
		task.chooseTransition(task.getTransitions()[0], "PromoListingForPreview completed successfully");
	}
	
	public void processPromoDCRs() throws CSException{

		LOGGER.info("Total Promotion DCRs are "+promotionDCRList.size());
		String promoDCRWAPath = "";
		CSVPath dcrCSVPath;
		CSFile dcrCSFile;
		
		
		for(String promoDCRVpath : promotionDCRList){
			promoDCRWAPath = this.areaVpath.concat(seperator).concat(promoDCRVpath);
			LOGGER.debug("promoDCRWAPath:"+promoDCRWAPath);
			dcrCSVPath = new CSVPath(promoDCRWAPath);
	        //LOGGER.debug("dcrCSVPath "+dcrCSVPath);
	        dcrCSFile = paramCSClient.getFile(dcrCSVPath);
	        //LOGGER.debug("dcrCSFile "+dcrCSFile);
			//LOGGER.debug("dcrCSFile.getVPath() "+dcrCSFile.getVPath());
			String promoRequest = "create";
			
			boolean isHole = dcrCSFile.getKind() == CSHole.KIND?true:false;
			LOGGER.debug("dcrCSFile is deleted in workarea? "+isHole);
	        promoRequest = isHole?"delete":"create";
	        LOGGER.debug("promoRequest "+promoRequest);
	        
	        if(isHole){
	        	StringBuilder promoDCRStagingPathSB = new StringBuilder(task.getArea().getBranch().getVPath().getPathNoServer().toString());
	        	promoDCRStagingPathSB.append(seperator);
	        	promoDCRStagingPathSB.append(CSVPath.STAGING_PLACEHOLDER);
	        	promoDCRStagingPathSB.append(seperator);
	        	promoDCRStagingPathSB.append(promoDCRVpath);			        	
				dcrCSVPath = new CSVPath(promoDCRStagingPathSB.toString());
		        LOGGER.debug("dcrCSVPath staging "+dcrCSVPath);
		        dcrCSFile = paramCSClient.getFile(dcrCSVPath);
	        }
	        
	       try{
				readPromoDCR(promoRequest,dcrCSFile,this.countryCode);
			}catch(CSException cse){
				LOGGER.error("CSException while reading promo dcr "+cse.getMessage());
			}
			
		}		
	}
		
	public void processPromoTask() throws CSAuthorizationException, CSRemoteException, CSObjectNotFoundException, CSInactiveTaskException, CSExpiredSessionException, CSException{
		LOGGER.info("Enter processPromoTask");
		LOGGER.info("promoTaskType is "+promoTaskType);
		if(promoTaskType != null && !promoTaskType.isEmpty()){					
			if(promoTaskType.equalsIgnoreCase("preview")){
				if(this.createPromoBeanAL != null && !this.createPromoBeanAL.isEmpty() && this.createPromoBeanAL.size()>0){
					LOGGER.debug("Total create promo dcrs in this workflow are "+this.createPromoBeanAL.size());
					for(PromoListingBean plb : this.createPromoBeanAL){
						LOGGER.debug("Printing promo bean - ");
						
						LOGGER.debug("PromoID "+plb.getPromoID());
						LOGGER.debug("plb.getExpiryDate( "+plb.getExpiryDate());
						LOGGER.debug("plb.getActivationDate()) "+plb.getActivationDate());
						LOGGER.debug("plb.getCountryCode()) "+plb.getCountryCode());
						LOGGER.debug("plb.getSiteName()) "+plb.getSiteName());
						LOGGER.debug("plb.getPromoCategoryLabel() "+plb.getPromoCategoryLabel());
						LOGGER.debug("plb.getPromoCategoryName()) "+plb.getPromoCategoryName());
						LOGGER.debug("plb.getPromoAltText() "+plb.getPromoAltText());
						LOGGER.debug("plb.getPromoCountry() "+plb.getPromoCountry());
						LOGGER.debug("plb.getPromoCreator() "+plb.getPromoCreator());
						LOGGER.debug("plb.getPromoCreationDate() "+plb.getPromoCreationDate().toString());
						LOGGER.debug("plb.getPromoModifier() "+plb.getPromoModifier());
						LOGGER.debug("plb.getPromoModifiedDate() "+plb.getPromoModifiedDate().toString());
						LOGGER.debug("plb.getPromoImage() "+plb.getPromoImage());
						LOGGER.debug("plb.getPromoLife() "+plb.getPromoLife());
						LOGGER.debug("plb.getPromoPage() "+plb.getPromoPage());
						LOGGER.debug("plb.getPromoTitle() "+plb.getPromoTitle());
					}							
				}						
				//Authoring logic here						
			}else if(promoTaskType.equalsIgnoreCase("promoJsonCreator")){
				//final String promoJsonRelativePath = UOBBaseConstants.PROMO_JSON_RELATIVE_PATH.concat(String.valueOf(jobID)).concat(".json");
				final String promoJsonRelativePath = is.getSystemPropertyValue("PROMO_JSON_RELATIVE_PATH").concat(String.valueOf(jobID)).concat(".json");
				String promoJsonFilePath = this.areaVpath.concat("/").concat(promoJsonRelativePath);
				promoJsonFilePath = promoJsonFilePath.substring(promoJsonFilePath.indexOf(seperator+seperator)+2,(promoJsonFilePath.length()));	
				//promoJsonFilePath = promoJsonFilePath.replaceFirst(promoJsonFilePath.substring(0, promoJsonFilePath.indexOf(seperator)), UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE) ;
				promoJsonFilePath = promoJsonFilePath.replaceFirst(promoJsonFilePath.substring(0, promoJsonFilePath.indexOf(seperator)), is.getSystemPropertyValue("TEAMSITE_SERVER_MOUNT_DRIVE")) ;
				if(createPromoJson(promoJsonFilePath)){
					LOGGER.info("Started attaching json to workflow");
					CSAreaRelativePath promoJsonCSPath = new CSAreaRelativePath(promoJsonRelativePath);
					CSAreaRelativePath [] CSAreaRelativePathArray = {promoJsonCSPath};
					task.attachFiles(CSAreaRelativePathArray);
					LOGGER.info("Finished attaching json to workflow");
				}else{
					LOGGER.error("Problem creating json file. Promo DCR being published has some bean values missing");
				}
			}
		}else{
			LOGGER.error("Workflow "+task.getWorkflowId()+" has task "+task.getName()+" without promoTaskType variable set");
		}
		LOGGER.info("Exit processPromoTask");
	}
	
	/**
	 * Reads promotion details DCR to fetch the values and add to either createPromoAL or deletePromoAL
	 * @param dcrPath
	 * @param promoRequest
	 */
	public void readPromoDCR(String promoRequest, CSFile dcrCSFile, String countryCode) throws CSException{
		LOGGER.debug("Inside readPromoDCR");
		PromoListingBean plb = new PromoListingBean(dcrCSFile,countryCode);
		if(promoRequest.equalsIgnoreCase("create")){
			LOGGER.info("Request type is create or update promotion");			
			this.createPromoBeanAL.add(plb);
		}else if(promoRequest.equalsIgnoreCase("delete")){			
			this.deletePromoBeanAL.add(plb);
		}
	}	
	
	public boolean createPromoJson(String promoJsonFilePath) {
		LOGGER.debug("createPromoJson starts");		
		boolean success = true;
		final ObjectMapper mapper = new ObjectMapper();
		LOGGER.info("promoJsonFilePath :: "+promoJsonFilePath);
	    File promoJsonFile = new File(promoJsonFilePath);
	    try {
	    	
			if(promoJsonFile.createNewFile()){
				@SuppressWarnings("rawtypes")
				HashMap<String, ArrayList> createPromoJsonMap = new HashMap<String, ArrayList>();
				
				if (this.createPromoBeanAL != null && !this.createPromoBeanAL.isEmpty()
						&& this.createPromoBeanAL.size() > 0) {
					LOGGER.debug("createPromoAL size "+this.createPromoBeanAL.size());
					
					ArrayList<HashMap<String,Object>> addPromoBeanMapAL = new ArrayList<HashMap<String,Object>>();
					for(PromoListingBean plb : createPromoBeanAL){
						HashMap<String,Object> addPromoBeanMap = new HashMap<String,Object>();
						addPromoBeanMap.put("promoid", plb.getPromoID());
						addPromoBeanMap.put("expirydate", plb.getExpiryDate());
						addPromoBeanMap.put("activationdate", plb.getActivationDate());
						addPromoBeanMap.put("countrycode", plb.getCountryCode());
						addPromoBeanMap.put("sitename", plb.getSiteName());
						addPromoBeanMap.put("promocategorylabel", plb.getPromoCategoryLabel());
						addPromoBeanMap.put("promocategoryname", plb.getPromoCategoryName());
						addPromoBeanMap.put("promoimage", plb.getPromoImage());
						addPromoBeanMap.put("promoalttext", plb.getPromoAltText());
						addPromoBeanMap.put("promolife", plb.getPromoLife());
						addPromoBeanMap.put("promopage", plb.getPromoPage());
						addPromoBeanMap.put("promocountry", plb.getPromoCountry());
						addPromoBeanMap.put("promotitle", plb.getPromoTitle());
						addPromoBeanMap.put("createdby", plb.getPromoCreator());
						addPromoBeanMap.put("createddt", plb.getPromoCreationDate().toString());
						addPromoBeanMap.put("maintainedby", plb.getPromoModifier());
						addPromoBeanMap.put("maintaineddt", plb.getPromoModifiedDate().toString());
						addPromoBeanMapAL.add(addPromoBeanMap);
					}
					createPromoJsonMap.put("create", addPromoBeanMapAL);
				}if (this.deletePromoBeanAL != null && !this.deletePromoBeanAL.isEmpty()
						&& this.deletePromoBeanAL.size() > 0) {
					LOGGER.debug("deletePromoBeanAL size "+this.deletePromoBeanAL.size());
					ArrayList<String> deletePromoIDAL = new ArrayList<String>();
					for(PromoListingBean plb : deletePromoBeanAL){
						deletePromoIDAL.add(plb.getPromoID());						
					}
					createPromoJsonMap.put("delete", deletePromoIDAL);
				}
				LOGGER.debug("createPromoJsonMap final size after adding create and delete records: "+createPromoJsonMap.size());
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
}
