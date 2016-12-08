package com.opentext.ts.common;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
 	
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class XMLToJSONWriter {
	
    public static int PRETTY_PRINT_INDENT_FACTOR = 4;
    public static String TEST_XML_STRING = "<?xml version=\"1.0\" ?><test attrib=\"moretest\">Turn this to JSON</test>";
   
    private static final String jsonFilePath = "C:\\tmp\\promodata.json";
   
	static File jsonOutputFile = new File(jsonFilePath);
	
    public static void main(String[] args) {
    	
    	 DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
	       
	        try {
				Document doc = dbf.newDocumentBuilder().parse("C:\\tmp\\deposits1.xml");
				XPath xPath = XPathFactory.newInstance().newXPath();
			    Node n = (Node)xPath.evaluate("/root/promo_details", doc, XPathConstants.NODE);
			    NodeList nl = n.getChildNodes();
			    JSONObject promoDeatilsJSON = new JSONObject();
			    Element element;
			    for(int x = 0;x < nl.getLength();x++)
		        {
		        	if(nl.item(x).getNodeType() == Node.ELEMENT_NODE){
		        	 element =  (Element) nl.item(x);
		             System.out.println("Node: " + element.getNodeName());
		             System.out.println("Node Val: " + element.getTextContent());
		             promoDeatilsJSON.put(element.getNodeName(), element.getTextContent());
		        	}
		        }
			    
			    if (promoDeatilsJSON.length()>0){
		        	System.out.println("promoDeatilsJSON: "+promoDeatilsJSON.toString());
				}else{
					promoDeatilsJSON = null;
					System.out.println("promoDeatilsJSON is empty");
				}
			    
			    writeToFile(promoDeatilsJSON);
			    
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
    
public static void writeToFile(JSONObject promoDeatilsJSON) throws IOException, JSONException{
		
		JSONObject userDataJSON = new JSONObject();
		JSONArray firstUserDataArray = new JSONArray();
		JSONArray newUserDataArray = new JSONArray();
		JSONArray existingUserDataArray = new JSONArray();
		
		JSONObject object = new JSONObject();
		JSONObject updatedObject = new JSONObject();
		
		String emailFromUserInputForm = (String) promoDeatilsJSON.get("promo_title");
		System.out.println("email From User InputForm : " + emailFromUserInputForm);
		
		boolean userExistsInJSON = false;
		
		if (!jsonOutputFile.exists() || jsonOutputFile.length()==0) {
			jsonOutputFile.createNewFile();
				firstUserDataArray.put(promoDeatilsJSON);
				userDataJSON.put("promo_details",firstUserDataArray );
				System.out.println("\nFirst user's JSON Object: " + userDataJSON);
		} else{
			System.out.println("File already exists; creating JSON object from JSON file.");
			StringBuilder userDatajsonBuilder = new StringBuilder();
			try {
				BufferedReader in = new BufferedReader(new FileReader(jsonOutputFile.getAbsoluteFile()));
				String line = null;
				while ((line = in.readLine()) != null) {
					userDatajsonBuilder.append(line);
				}
			} catch (Exception e) {
				System.out.println("Error Parsing: - ");
			}
			
			String userDataJSONString = userDatajsonBuilder.toString();
			//System.out.println("User details JSONString from JSON file : " + userDataJSONString);
			
			JSONObject userDataJSONObj = new JSONObject (userDataJSONString);
			JSONArray userdataArray = userDataJSONObj.optJSONArray("promo_details");
			 if(userdataArray != null) {
				
				    System.out.println("userdata JSON array length : " +userdataArray.length());
					for(int n = 0; n < userdataArray.length(); n++)
					{
					    object = userdataArray.getJSONObject(n);
					    String emailFromJSON = (String) object.get("promo_title");
					    if (emailFromJSON.equals(emailFromUserInputForm)){
					    	System.out.println("User already exists in JSON file; so first remove its entries from JSON file"); 
					    	userExistsInJSON = true;
					    	JSONArray updatedUserDataArray = removeUserData(n, userdataArray);
					    	System.out.println("Entry for user with email " +emailFromUserInputForm+ "has been removed from JSON file");
					    	//System.out.println("Updated user data JSON array retured is : " + updatedUserDataArray.toString());
					    	for(int m = 0; m < updatedUserDataArray.length(); m++){
					    		updatedObject = updatedUserDataArray.getJSONObject(m);
					    		System.out.println("User details from JSON file for index : "+ m + " for existing user scenario " +object);
					    		existingUserDataArray.put(updatedObject);
					    	}
					    	break;
					    }
					    System.out.println("User details from JSON file for index : "+ n + " for new user scenario " +object);
					    newUserDataArray.put(object);
					}
					if (userExistsInJSON){
						existingUserDataArray.put(promoDeatilsJSON);
						System.out.println("\nAll user's Array JSON Object - existingUserDataArray : " + existingUserDataArray);
						userDataJSON.put("promo_details",existingUserDataArray );
					}else{
						 newUserDataArray.put(promoDeatilsJSON);
						 System.out.println("\nAll user's Array JSON Object - newUserDataArray : " + newUserDataArray);
						 userDataJSON.put("promo_details",newUserDataArray );
					}					
					System.out.println("\nFinal JSON Object - userDataJSON : " + userDataJSON);
				}
		}
		FileWriter fw = new FileWriter(jsonOutputFile.getAbsoluteFile());
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(userDataJSON.toString());
		bw.close();

		System.out.println("Successfully Copied JSON Object to File...");
		System.out.println("\nJSON Object: " + userDataJSON);
	}

	public static JSONArray removeUserData(final int idx, final JSONArray userdataArray) {
	    final List<JSONObject> objs = asList(userdataArray);
	    System.out.println("idx : "+ idx);
	    System.out.println("idx value to be removed : "+ objs.get(idx));
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
	    System.out.println("JSONArray userdata array length : "+ len);
	    final ArrayList<JSONObject> result = new ArrayList<JSONObject>();
	    for (int i = 0; i < len; i++) {
	        final JSONObject obj = userdataArray.optJSONObject(i);
	        if (obj != null) {
	            result.add(obj);
	        }
	    }
	    System.out.println("ArrayList size: "+ result.size());
	    System.out.println("userdata JSONArray converted to ArrayList : "+ result.toString());
	    return result;
	}
}