package com.opentext.ts.workflow;

import com.opentext.ls.db.utils.PropertyReader;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;


//Update the Preview JSON file
public class UpdatePreviewJSON {

    private static final transient Log LOGGER = LogFactory.getLog(PromoListingRuntime.class);
    private static PropertyReader is = new PropertyReader();

    // Read the WorkFlow Json file
public static void readWorkFlowJSON(String filePath){
	
	JSONParser parser = new JSONParser();
	try {
				
		Object object = parser
		        .parse(new FileReader(filePath));
		
		//Convert to JSON object for querying
		JSONObject jsonObject = (JSONObject)object;
		
		//System.out.println("Reading WorkFlow JSON ");
		LOGGER.info("Reading WorkFlow JSON ");
		
		if((JSONArray) jsonObject.get("create")!=null){
			
			LOGGER.info("Create action found.");
			
			JSONArray promosPresent = (JSONArray) jsonObject.get("create");
			LOGGER.debug("Reading WorkFlow JSON "+ promosPresent.toString());
			//JSONObject promoObject = (JSONObject)promosPresent.get(0);
			updatePreviewJSON(promosPresent, "create");
		
		}else if((JSONArray) jsonObject.get("delete")!=null){
			LOGGER.info("Delete action found.");
			JSONArray promosPresent = (JSONArray) jsonObject.get("delete");
			LOGGER.debug("Reading WorkFlow JSON "+ promosPresent.toString());
			updatePreviewJSON(promosPresent, "delete");
			//JSONObject promoObject = (JSONObject)promosPresent.get(0);
		}
			
	} catch (FileNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} 
		
}


@SuppressWarnings("unchecked")
public static void updatePreviewJSON(JSONArray promoPresentWF, String action){
	
	//String previewJSONfile= "C:/temp/previewPromotions.json";
	String previewJSONfile= is.getSystemPropertyValue("PROMOTION_JSON_FILE_PATH");
	JSONParser parser = new JSONParser();
	JSONArray promosPresent= new JSONArray();
	JSONArray tempJSON= new JSONArray();
	boolean change= false;
	//boolean change= false;
		
	LOGGER.info("Reading Preview JSON now.");
	LOGGER.debug("WorkFlow Json::"+promoPresentWF.toString());
	
	try{
	Object object = parser.parse(new FileReader(previewJSONfile));
	JSONObject jsonObject = (JSONObject)object;
	promosPresent = (JSONArray) jsonObject.get("promo_details");
	
	tempJSON= promosPresent;
	LOGGER.debug("At Start Json::"+tempJSON.toString());
	
	
	//Find the number of elements
	int len= promosPresent.size();
	int count = promoPresentWF.size();
	
	//Loop through the number of promos in workflow json file
	for(int k=0; k<count; k++){
		JSONObject previewObjectWF = (JSONObject)promoPresentWF.get(k);
		LOGGER.debug("New WF Item::"+previewObjectWF.get("promoid").toString());
		//Loop through the number of promos in preview json file
		for(int i=0; i< len; i++){
			
			JSONObject previewObject = (JSONObject)promosPresent.get(i);
			JSONObject tempObject = (JSONObject)tempJSON.get(i);
			
			//LOGGER.debug("Promos present on JSON::"+previewObject);
			String promoid= (String) previewObject.get("promoid");
			//LOGGER.debug("New Preview Item::"+promoid);
			
			if(promoid!= null){
			//Compare Promo IDs	
				if(promoid.equals(previewObjectWF.get("promoid").toString())){
					
					LOGGER.info("Found::"+previewObjectWF.get("promoid"));
					if(action.equals("create")){
						tempObject.clear();
						tempObject.putAll(previewObjectWF);
					}
					else if(action.equals("delete")){
						tempObject.clear();
					}

				}else{
					LOGGER.info("Not Found::"+previewObjectWF.get("promoid"));
				}
			
			}
	
		}
	}
	
	LOGGER.info("At End Json::"+tempJSON.toString());
	
	JSONObject promoObj= new JSONObject();
	promoObj.put("promo_details", tempJSON);
	
	LOGGER.debug("Final Json::"+promoObj.toString());
	
	if(change){
		File file=new File(previewJSONfile);  
	    file.createNewFile();  
	    FileWriter fileWriter = new FileWriter(file);  
	    LOGGER.debug("Updating JSON object to file");
	    System.out.println("-----------------------");  
	    System.out.print(promoObj);  

	    fileWriter.write(promoObj.toJSONString());  
	    fileWriter.flush();  
	    fileWriter.close();  
		}
	
	}catch (FileNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} 

}
	

/*
public static void main(String[] args){
	
	
	String deleteJSONfile= "C:/temp/promoJson_8105.json";
	String createJSONfile= "C:/temp/promoJson_8144.json";
	
	readWorkFlowJSON(deleteJSONfile);
}
*/

}


