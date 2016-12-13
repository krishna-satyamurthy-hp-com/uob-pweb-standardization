package com.opentext.ts.workflow;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.interwoven.cssdk.common.CSClient;
import com.interwoven.cssdk.common.CSException;
import com.interwoven.cssdk.filesys.CSAreaRelativePath;
import com.interwoven.cssdk.workflow.CSExternalTask;
import com.interwoven.cssdk.workflow.CSURLExternalTask;
import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.opentext.ls.core.common.UOBBaseConstants;

public class XMLToJSONConverter implements CSURLExternalTask {
	
	private static final Log LOGGER = LogFactory.getLog(XMLToJSONConverter.class);
	private static final String seperator = "/";
	//private static final String TEAMSITE_SERVER_MOUNT_DRIVE = "/iwmnt";
	//private static final String jsonFilePath = "/tmp/promodata.json";
	//private static final String jsonFilePath = "iwov-resources/json/promodata.json";
	//static File jsonOutputFile = new File(jsonFilePath);
	
	List filesToIndex;
	
	public void execute(CSClient csClient, CSExternalTask task, Hashtable params) throws CSException {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("execute begins.");
		}
		String areavpath = task.getArea().getVPath().toString();
		//System.out.println("Files WA path : "+areavpath);
		LOGGER.error("Files WA path : "+areavpath);
		
		String jsonOutputFilePath = areavpath.concat(seperator).concat(UOBBaseConstants.PROMOTION_JSON_FILE_PATH);
		jsonOutputFilePath = jsonOutputFilePath.substring(jsonOutputFilePath.indexOf(seperator+seperator)+2,(jsonOutputFilePath.length()));	
		jsonOutputFilePath = jsonOutputFilePath.replaceFirst(jsonOutputFilePath.substring(0, jsonOutputFilePath.indexOf(seperator)), UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE) ;
		//System.out.println("Output JSON File path : "+jsonOutputFilePath);
		LOGGER.error("Output JSON File path : "+jsonOutputFilePath);
		File jsonOutputFile = new File(jsonOutputFilePath);
		
			CSAreaRelativePath[] files = task.getFiles();
			if (null != files) {
				filesToIndex = new ArrayList(files.length);
				
				 DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
				 for (CSAreaRelativePath file : files) {
					String fileFullPath = areavpath.concat(seperator).concat(file.toString());
					fileFullPath = fileFullPath.substring(fileFullPath.indexOf(seperator+seperator)+2,(fileFullPath.length()));	
					fileFullPath = fileFullPath.replaceFirst(fileFullPath.substring(0, fileFullPath.indexOf(seperator)), UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE) ;
					//System.out.println("fileFullPath: "+fileFullPath);
					LOGGER.error("fileFullPath: "+fileFullPath);
				       
				        try {
							Document doc = dbf.newDocumentBuilder().parse(fileFullPath);
							XPath xPath = XPathFactory.newInstance().newXPath();
						    Node n = (Node)xPath.evaluate("/root/promo_details", doc, XPathConstants.NODE);
						    NodeList nl = n.getChildNodes();
						    
						    JSONObject promoDeatilsJSON = new JSONObject();
						    Element element;
						    
						    for(int x = 0;x < nl.getLength();x++)
					        {
					        	if(nl.item(x).getNodeType() == Node.ELEMENT_NODE){
					        	 element =  (Element) nl.item(x);
					             //System.out.println("Node: " + element.getNodeName());
					            // System.out.println("Node Val: " + element.getTextContent());
					             LOGGER.error("Node: " + element.getNodeName());
					             LOGGER.error("Node Val: " + element.getTextContent());
					             promoDeatilsJSON.put(element.getNodeName(), element.getTextContent());
					        	}
					        }
						    
						    if (promoDeatilsJSON.length()>0){
					        	//System.out.println("promoDeatilsJSON: "+promoDeatilsJSON.toString());
					        	 LOGGER.error("promoDeatilsJSON: "+promoDeatilsJSON.toString());
							}else{
								promoDeatilsJSON = null;
								//System.out.println("promoDeatilsJSON is empty");
								 LOGGER.error("promoDeatilsJSON is empty");
							}
						    
						    writeToFile(jsonOutputFile,promoDeatilsJSON);
						    
						} catch (SAXException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						} catch (IOException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						} catch (ParserConfigurationException e1) {
							// TODO Auto-generated catch block
							e1.printStackTrace();
						} catch (XPathExpressionException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (DOMException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (JSONException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
				    
				}
			} 
		
		if (LOGGER.isDebugEnabled())
			LOGGER.debug("execute ends.");
		task.chooseTransition(task.getTransitions()[0], "");
	}
	
public static void writeToFile(File jsonOutputFile, JSONObject promoDeatilsJSON) throws IOException, JSONException{
		
		JSONObject userDataJSON = new JSONObject();
		JSONArray firstUserDataArray = new JSONArray();
		JSONArray newUserDataArray = new JSONArray();
		JSONArray existingUserDataArray = new JSONArray();
		
		JSONObject object = new JSONObject();
		JSONObject updatedObject = new JSONObject();
		
		String emailFromUserInputForm = (String) promoDeatilsJSON.get("promoId");
		//System.out.println("email From User InputForm : " + emailFromUserInputForm);
		LOGGER.error("email From User InputForm : " + emailFromUserInputForm);
		boolean userExistsInJSON = false;
		
		if (!jsonOutputFile.exists() || jsonOutputFile.length()==0) {
			jsonOutputFile.createNewFile();
				firstUserDataArray.put(promoDeatilsJSON);
				userDataJSON.put("promo_details",firstUserDataArray );
				//System.out.println("\nFirst user's JSON Object: " + userDataJSON);
				 LOGGER.error("\nFirst user's JSON Object: " + userDataJSON);
		} else{
			//System.out.println("File already exists; creating JSON object from JSON file.");
			 LOGGER.error("File already exists; creating JSON object from JSON file.");
			StringBuilder userDatajsonBuilder = new StringBuilder();
			try {
				BufferedReader in = new BufferedReader(new FileReader(jsonOutputFile.getAbsoluteFile()));
				String line = null;
				while ((line = in.readLine()) != null) {
					userDatajsonBuilder.append(line);
				}
			} catch (Exception e) {
				//System.out.println("Error Parsing: - ");
				 LOGGER.error("Error Parsing: - ");
			}
			
			String userDataJSONString = userDatajsonBuilder.toString();
			//System.out.println("User details JSONString from JSON file : " + userDataJSONString);
			
			JSONObject userDataJSONObj = new JSONObject (userDataJSONString);
			JSONArray userdataArray = userDataJSONObj.optJSONArray("promo_details");
			 if(userdataArray != null) {
				
				    //System.out.println("userdata JSON array length : " +userdataArray.length());
				    LOGGER.error("userdata JSON array length : " +userdataArray.length());
					for(int n = 0; n < userdataArray.length(); n++)
					{
					    object = userdataArray.getJSONObject(n);
					    String emailFromJSON = (String) object.get("promoId");
					    if (emailFromJSON.equals(emailFromUserInputForm)){
					    	System.out.println("User already exists in JSON file; so first remove its entries from JSON file"); 
					    	 LOGGER.error("User already exists in JSON file; so first remove its entries from JSON file");
					    	userExistsInJSON = true;
					    	JSONArray updatedUserDataArray = removeUserData(n, userdataArray);
					    	//System.out.println("Entry for user with email " +emailFromUserInputForm+ "has been removed from JSON file");
					    	 LOGGER.error("Entry for user with email " +emailFromUserInputForm+ "has been removed from JSON file");
					    	for(int m = 0; m < updatedUserDataArray.length(); m++){
					    		updatedObject = updatedUserDataArray.getJSONObject(m);
					    		//System.out.println("User details from JSON file for index : "+ m + " for existing user scenario " +object);
					    		 LOGGER.error("User details from JSON file for index : "+ m + " for existing user scenario " +object);
					    		existingUserDataArray.put(updatedObject);
					    	}
					    	break;
					    }
					  //  System.out.println("User details from JSON file for index : "+ n + " for new user scenario " +object);
					    LOGGER.error("User details from JSON file for index : "+ n + " for new user scenario " +object);
					    newUserDataArray.put(object);
					}
					if (userExistsInJSON){
						existingUserDataArray.put(promoDeatilsJSON);
						//System.out.println("\nAll user's Array JSON Object - existingUserDataArray : " + existingUserDataArray);
						 LOGGER.error("\nAll user's Array JSON Object - existingUserDataArray : " + existingUserDataArray);
						userDataJSON.put("promo_details",existingUserDataArray );
					}else{
						 newUserDataArray.put(promoDeatilsJSON);
						// System.out.println("\nAll user's Array JSON Object - newUserDataArray : " + newUserDataArray);
						 LOGGER.error("\nAll user's Array JSON Object - newUserDataArray : " + newUserDataArray);
						 userDataJSON.put("promo_details",newUserDataArray );
					}					
					System.out.println("\nFinal JSON Object - userDataJSON : " + userDataJSON);
					 LOGGER.error("\nFinal JSON Object - userDataJSON : " + userDataJSON);
				}
		}
		FileWriter fw = new FileWriter(jsonOutputFile.getAbsoluteFile());
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(userDataJSON.toString());
		bw.close();

		//System.out.println("Successfully Copied JSON Object to File...");
		//System.out.println("\nJSON Object: " + userDataJSON);
		 LOGGER.error("Successfully Copied JSON Object to File...");
		 LOGGER.error("\nJSON Object: " + userDataJSON);
	}

	public static JSONArray removeUserData(final int idx, final JSONArray userdataArray) {
	    final List<JSONObject> objs = asList(userdataArray);
	    //System.out.println("idx : "+ idx);
	    //System.out.println("idx value to be removed : "+ objs.get(idx));
	    LOGGER.error("idx value to be removed : "+ objs.get(idx));
	    objs.remove(idx);
	   // System.out.println("Removed Exsiting User JSON Object : "+ objs.get(idx));
	    final JSONArray ja = new JSONArray();
	    for (final JSONObject obj : objs) {
	        ja.put(obj);
	    }
	
	    return ja;
	}
	public static List<JSONObject> asList(final JSONArray userdataArray) {
	    final int len = userdataArray.length();
	   // System.out.println("JSONArray userdata array length : "+ len);
	    LOGGER.error("JSONArray userdata array length : "+ len);
	    final ArrayList<JSONObject> result = new ArrayList<JSONObject>();
	    for (int i = 0; i < len; i++) {
	        final JSONObject obj = userdataArray.optJSONObject(i);
	        if (obj != null) {
	            result.add(obj);
	        }
	    }
	   // System.out.println("ArrayList size: "+ result.size());
	    //System.out.println("userdata JSONArray converted to ArrayList : "+ result.toString());
	    LOGGER.error("ArrayList size: "+ result.size());
	    LOGGER.error("userdata JSONArray converted to ArrayList : "+ result.toString());
	    return result;
	}
}