package com.opentext.ls.core.display.external;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.io.DOMReader;
import org.w3c.dom.DOMException;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;


import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.util.DCRUtils;

public class CardCompareDetails {
private static final Log LOGGER = LogFactory.getLog(CardCompareDetails.class);
	
	public org.dom4j.Document execute(RequestContext context) throws Exception{
		LOGGER.error("entering");

		 ArrayList<String> featureCreditCard = new ArrayList<String>();
		 ArrayList<String> featureDebitCard = new ArrayList<String>();
		 ArrayList<String> travelCreditCard = new ArrayList<String>();
		 ArrayList<String> travelDebitCard = new ArrayList<String>();
		 ArrayList<String> rewardsCreditCard = new ArrayList<String>();
		 ArrayList<String> rewardsDebitCard = new ArrayList<String>();
		 ArrayList<String> rebateCreditCard = new ArrayList<String>();
		 ArrayList<String> rebateDebitCard = new ArrayList<String>();
		 Element xmlNodes=null;
		
				 
		 DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
         DocumentBuilder domBuilder = domFactory.newDocumentBuilder();
         Document newDoc = domBuilder.newDocument();			   
         newDoc.setXmlStandalone(true);
         
        Element rootElement = newDoc.createElement("contentRoot");
 	    Element featureCard = newDoc.createElement("feature_cards");
 	    Element featurecc = newDoc.createElement("feature_credit_card");
 	    Element featuredc = newDoc.createElement("feature_debit_card");
 	    Element travelCard = newDoc.createElement("travel_cards");
 	    Element travelcc = newDoc.createElement("travel_credit_card");
 	    Element traveldc = newDoc.createElement("travel_debit_card");
 	    Element rewardsCard = newDoc.createElement("rewards_cards");
 	    Element rewardscc = newDoc.createElement("rewards_credit_card");
 	    Element rewardsdc = newDoc.createElement("rewards_debit_card");
 	    Element rebateCard = newDoc.createElement("rebate_cards");
 	    Element rebatecc = newDoc.createElement("rebate_credit_card");
 	    Element rebatedc = newDoc.createElement("rebate_debit_card");
 	    newDoc.appendChild(rootElement);
 	    rootElement.appendChild(featureCard);
 	    rootElement.appendChild(travelCard);
 	    rootElement.appendChild(rewardsCard);
 	    rootElement.appendChild(rebateCard);
 	    
         String cardComapreFilePath = context.getParameterString("cardscompare");
         LOGGER.error("Cards compare DCR path: "+cardComapreFilePath);
         
         try {
        	 
        	 
 		    NodeList nl = getNodeList(generatepath(context, cardComapreFilePath), "/compare_cards" );
 		    		
 		   Element element;
		    for(int x = 0;x < nl.getLength();x++)
	        {
		    	
	        	if(nl.item(x).getNodeType() == Node.ELEMENT_NODE){
	        	 element =  (Element) nl.item(x);		         
	             
	             NodeList fcds = element.getElementsByTagName("feature_credit_card");
	             for(int y = 0;y < fcds.getLength();y++){
	            	 LOGGER.error(fcds.item(y).getTextContent());
	            	 featureCreditCard.add(fcds.item(y).getTextContent()) ;
	             }
	             
	             NodeList fdds = element.getElementsByTagName("feature_debit_card");
	             	for(int y = 0;y < fdds.getLength();y++){
	             		 LOGGER.error(fdds.item(y).getTextContent());
	            	 featureDebitCard.add(fdds.item(y).getTextContent()) ;
	             }
	             	
            	NodeList tcds = element.getElementsByTagName("travel_credit_card");
	             for(int y = 0;y < tcds.getLength();y++){
	            	 LOGGER.error(tcds.item(y).getTextContent());
	            	 travelCreditCard.add(tcds.item(y).getTextContent()) ;
	             }
	             
	             NodeList tdds = element.getElementsByTagName("travel_debit_card");
	             for(int y = 0;y < tdds.getLength();y++){
	            	 LOGGER.error(tdds.item(y).getTextContent());
	            	 travelDebitCard.add(tdds.item(y).getTextContent()) ;
	             }
	             
	             NodeList rwcds = element.getElementsByTagName("rewards_credit_card");
	             for(int y = 0;y < rwcds.getLength();y++){
	            	 LOGGER.error(rwcds.item(y).getTextContent());
	            	 rewardsCreditCard.add(rwcds.item(y).getTextContent()) ;
	             }
	             
	             NodeList rwdds = element.getElementsByTagName("rewards_debit_card");
	             for(int y = 0;y < rwdds.getLength();y++){
	            	 LOGGER.error(rwdds.item(y).getTextContent());
	            	 rewardsDebitCard.add(rwdds.item(y).getTextContent()) ;
	             }
	             
	             NodeList rcds = element.getElementsByTagName("rebate_credit_card");
	             for(int y = 0;y < rcds.getLength();y++){
	            	 LOGGER.error(rcds.item(y).getTextContent());
	            	 rebateCreditCard.add(rcds.item(y).getTextContent()) ;
	             }
	             
	             NodeList rdds = element.getElementsByTagName("rebate_debit_card");
	             for(int y = 0;y < rdds.getLength();y++){
	            	 LOGGER.error(rdds.item(y).getTextContent());
	            	 rebateDebitCard.add(rdds.item(y).getTextContent()) ;
	             }
	        	}
	        }
		    
		    
		    
		    for(int y = 0;y < featureCreditCard.size();y++){	            	 
           	 xmlNodes =  (Element)  getNodeList(generatepath(context, featureCreditCard.get(y)), "/root/card_highlights" );
           	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
           	 featureCard.appendChild(featurecc);
           	 featurecc.appendChild(newNode);
            }
		    for(int y = 0;y < featureDebitCard.size();y++){	            	 
		    	 xmlNodes =  (Element)  getNodeList(generatepath(context, featureDebitCard.get(y)), "/root/card_highlights" );
           	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  	            	 
           	 featureCard.appendChild(featuredc);
           	 featuredc.appendChild(newNode);
            }
		    for(int y = 0;y < travelCreditCard.size();y++){	            	 
          	 xmlNodes =  (Element)  getNodeList(generatepath(context, travelCreditCard.get(y)), "/root/card_highlights" );
          	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
          	travelCard.appendChild(travelcc);
          	 travelcc.appendChild(newNode);
           }
		    for(int y = 0;y < travelDebitCard.size();y++){	            	 
		    	 xmlNodes =  (Element)  getNodeList(generatepath(context, travelDebitCard.get(y)), "/root/card_highlights" );
          	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  	            	 
          	travelCard.appendChild(traveldc);
          	 traveldc.appendChild(newNode);
           }
		    for(int y = 0;y < rewardsCreditCard.size();y++){	            	 
          	 xmlNodes =  (Element)  getNodeList(generatepath(context, rewardsCreditCard.get(y)), "/root/card_highlights" );
          	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
          	rewardsCard.appendChild(rewardscc);
          	 rewardscc.appendChild(newNode);
           }
		    for(int y = 0;y < rewardsDebitCard.size();y++){	            	 
		    	 xmlNodes =  (Element)  getNodeList(generatepath(context, rewardsDebitCard.get(y)), "/root/card_highlights" );
          	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  	            	 
          	rewardsCard.appendChild(rewardsdc);
          	 rewardsdc.appendChild(newNode);
           }
		    for(int y = 0;y < rebateCreditCard.size();y++){	            	 
          	 xmlNodes =  (Element)  getNodeList(generatepath(context, rebateCreditCard.get(y)), "/root/card_highlights" );
          	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
          	rebateCard.appendChild(rebatecc);
          	 rebatecc.appendChild(newNode);
           }
		    for(int y = 0;y < rebateDebitCard.size();y++){	            	 
		    	 xmlNodes =  (Element)  getNodeList(generatepath(context, rebateDebitCard.get(y)), "/root/card_highlights" );
          	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  	            	 
          	rebateCard.appendChild(rebatedc);
          	 rebatedc.appendChild(newNode);
           }
 		   // LOGGER.error("doc: " + newDoc.toString());
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
 		} 
         
 		

 		DOMReader reader = new DOMReader();
 		org.dom4j.Document dom4jDoc = reader.read(newDoc);
 		LOGGER.error(dom4jDoc.asXML());
 			
 		return dom4jDoc;
 	}	
	


public static NodeList getNodeList(String path, String xpath) throws Exception{
	
	DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
	NodeList nl= null;
	try {
		Document doc = dbf.newDocumentBuilder().parse(path);
		XPath xPath = XPathFactory.newInstance().newXPath();
	    Node n = (Node)xPath.evaluate(xpath, doc, XPathConstants.NODE);
	    nl = n.getChildNodes();
	   
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
	}
	
	 return nl;
}

public static String generatepath(RequestContext context, String path){
	 String rootLocation = DCRUtils.getRootLocation(context);
     char separator;
     String fileLocation = null;
	/* separator based on environment */
	separator = File.separatorChar;
	LOGGER.error("seperator is : " + separator);
	if (rootLocation != null && path != null) {
			/* creating File absolute path */
			fileLocation = rootLocation + separator + path;
			fileLocation = fileLocation.replace('/', separator);
			LOGGER.error("Complete filepath is : " + fileLocation);
	}
	 return fileLocation;
}
}