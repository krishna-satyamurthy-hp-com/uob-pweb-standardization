package com.opentext.ls.core.display.external;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

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

		 Map <String, String> featureCreditCard = new HashMap<String, String>();
		 Map <String, String> featureDebitCard = new HashMap<String, String>();
		 Map <String, String> travelCreditCard = new HashMap<String, String>();
		 Map <String, String> travelDebitCard = new HashMap<String, String>();
		 Map <String, String> rewardsCreditCard = new HashMap<String, String>();
		 Map <String, String> rewardsDebitCard = new HashMap<String, String>();
		 Map <String, String> rebateCreditCard = new HashMap<String, String>();
		 Map <String, String> rebateDebitCard = new HashMap<String, String>();
	 
		 String feature_section_title = null;
		 String travel_section_title = null;
		 String rewards_section_title = null;
		 String rebate_section_title = null;
		 
		 DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
         DocumentBuilder domBuilder = domFactory.newDocumentBuilder();
         Document newDoc = domBuilder.newDocument();			   
         newDoc.setXmlStandalone(true);
         
        Element rootElement = newDoc.createElement("contentRoot");
	    newDoc.appendChild(rootElement);
 	    
         String cardComapreFilePath = context.getParameterString("cardscompare");
         LOGGER.error("Cards compare DCR path: "+cardComapreFilePath);
         
         try {
        	 //Nodelist for Category one cards
        	 NodeList fcnl = getNodeList(generatepath(context, cardComapreFilePath), "//feature_cards" );
			    for(int x = 0;x < fcnl.getLength();x++)
		        {	
		        	if(fcnl.item(x).getNodeType() == Node.ELEMENT_NODE){	  
		        	if (fcnl.item(x).getNodeName() == "section_title"){
		        		feature_section_title = fcnl.item(x).getTextContent();
		        		LOGGER.error("Category one Section Title: " + feature_section_title);
		        	}
		        	if (fcnl.item(x).getNodeName() == "credit_card"){
		        		LOGGER.error("Category one Credit Card details: " + fcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue() + "" +fcnl.item(x).getAttributes().getNamedItem("url").getNodeValue());
		        		featureCreditCard.put(fcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue(), fcnl.item(x).getAttributes().getNamedItem("url").getNodeValue()) ;
		        	}
		        	if (fcnl.item(x).getNodeName() == "debit_card"){
		        		LOGGER.error("Category one Debit Card details" + fcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue() + "" +fcnl.item(x).getAttributes().getNamedItem("url").getNodeValue());
		        		featureDebitCard.put(fcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue(), fcnl.item(x).getAttributes().getNamedItem("url").getNodeValue()) ;
		        	}		
		        	}
		        }
			    Element featureCategoryElement = generateCardsElement(context, newDoc, featureCreditCard, featureDebitCard, feature_section_title);
			    rootElement.appendChild(featureCategoryElement);  
			   
			    //Nodelist for Category two cards
			    NodeList tcnl = getNodeList(generatepath(context, cardComapreFilePath), "//travel_cards" );
			    for(int x = 0;x < tcnl.getLength();x++)
		        {	
		        	if(tcnl.item(x).getNodeType() == Node.ELEMENT_NODE){	  
		        	if (tcnl.item(x).getNodeName() == "section_title"){
		        		travel_section_title = tcnl.item(x).getTextContent();
		        		LOGGER.error("Category two Section Title: " + travel_section_title);
		        	}
		        	if (tcnl.item(x).getNodeName() == "credit_card"){
		        		LOGGER.error("Category two Credit Card details: " + tcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue() + "" +tcnl.item(x).getAttributes().getNamedItem("url").getNodeValue());
		        		travelCreditCard.put(tcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue(), tcnl.item(x).getAttributes().getNamedItem("url").getNodeValue()) ;
		        	}
		        	if (tcnl.item(x).getNodeName() == "debit_card"){
		        		LOGGER.error("Category two Debit Card details: " + tcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue() + "" +tcnl.item(x).getAttributes().getNamedItem("url").getNodeValue());
		        		travelDebitCard.put(tcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue(), tcnl.item(x).getAttributes().getNamedItem("url").getNodeValue()) ;
		        	}	
		        	}
		        }
			  
			    Element travelCategoryElement = generateCardsElement(context, newDoc, travelCreditCard, travelDebitCard, travel_section_title);
			    rootElement.appendChild(travelCategoryElement);
			    
			    //Nodelist for Category three cards
			    NodeList rwcnl = getNodeList(generatepath(context, cardComapreFilePath), "//rewards_cards" );
			    for(int x = 0;x < rwcnl.getLength();x++)
		        {	
		        	if(rwcnl.item(x).getNodeType() == Node.ELEMENT_NODE){	  
		        	if (rwcnl.item(x).getNodeName() == "section_title"){
		        		rewards_section_title = rwcnl.item(x).getTextContent();
		        		LOGGER.error("Category three Section Title: " + rewards_section_title);
		        	}
		        	if (rwcnl.item(x).getNodeName() == "credit_card"){
		        		LOGGER.error("Category three Credit Card details: " + rwcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue() + "" +rwcnl.item(x).getAttributes().getNamedItem("url").getNodeValue());
		        		rewardsCreditCard.put(rwcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue(), rwcnl.item(x).getAttributes().getNamedItem("url").getNodeValue()) ;
		        	}
		        	if (rwcnl.item(x).getNodeName() == "debit_card"){
		        		LOGGER.error("Category three Debit Card details: " + rwcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue() + "" +rwcnl.item(x).getAttributes().getNamedItem("url").getNodeValue());
		        		rewardsDebitCard.put(rwcnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue(), rwcnl.item(x).getAttributes().getNamedItem("url").getNodeValue()) ;
		        	}		
		        	}
		        }
			  
			    Element rewardCategoryElement = generateCardsElement(context, newDoc, rewardsCreditCard, rewardsDebitCard, rewards_section_title);
			    rootElement.appendChild(rewardCategoryElement);
			    
			    //Nodelist for Category four cards
			    NodeList recnl = getNodeList(generatepath(context, cardComapreFilePath), "//rebate_cards" );
			    for(int x = 0;x < recnl.getLength();x++)
		        {	
		        	if(recnl.item(x).getNodeType() == Node.ELEMENT_NODE){	  
		        	if (recnl.item(x).getNodeName() == "section_title"){
		        		rebate_section_title = recnl.item(x).getTextContent();
		        		LOGGER.error("Category four Section Title: " + rebate_section_title);
		        	}
		        	if (recnl.item(x).getNodeName() == "credit_card"){
		        		LOGGER.error("Category four Credit Card details: " + recnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue() + "" +recnl.item(x).getAttributes().getNamedItem("url").getNodeValue());
		        		rebateCreditCard.put(recnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue(), recnl.item(x).getAttributes().getNamedItem("url").getNodeValue()) ;
		        	}
		        	if (recnl.item(x).getNodeName() == "debit_card"){
		        		LOGGER.error("Category four Debit Card details: " + recnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue() + "" +recnl.item(x).getAttributes().getNamedItem("url").getNodeValue());
		        		rebateDebitCard.put(recnl.item(x).getAttributes().getNamedItem("filepath").getNodeValue(), recnl.item(x).getAttributes().getNamedItem("url").getNodeValue()) ;
		        	}
		        	}
		        }
			  
			    Element rebateCategoryElement = generateCardsElement(context, newDoc, rebateCreditCard, rebateDebitCard, rebate_section_title);
			    rootElement.appendChild(rebateCategoryElement);
			    
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
 		LOGGER.error("Final Credit Cards Comapre XML : " + dom4jDoc.asXML());
 			
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

public static Element generateCardsElement(RequestContext context, Document newDoc,  Map <String, String> creditCards,  Map <String, String> debitCard, String sectionTitle) throws Exception{
	Element categoryElement = newDoc.createElement("category");
	Element xmlNodes=null;
	categoryElement.setAttribute("name", sectionTitle);
	Iterator creditCardsItr = creditCards.keySet().iterator();
	 while(creditCardsItr.hasNext()) {
		 String key = (String) creditCardsItr.next();
		 if (key != null && !key.isEmpty()){
    	 Element creditElement = newDoc.createElement("credit_card");
    	 categoryElement.appendChild(creditElement);
    	 creditElement.setAttribute("filepath", key);
    	 creditElement.setAttribute("url", creditCards.get(key) );
    	 
    	 xmlNodes =  (Element)  getNodeList(generatepath(context, key), "/root/card_highlights" );
    	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
    	 System.out.println(newNode.getNodeValue());
    	 creditElement.appendChild(newNode);
		 }
     }
	 Iterator debitCardsItr = debitCard.keySet().iterator();
	 while(debitCardsItr.hasNext()) { 
		 String key = (String) debitCardsItr.next();
		 if (key != null && !key.isEmpty()){
    	 Element debitElement = newDoc.createElement("debit_card");
    	 categoryElement.appendChild(debitElement);
    	 debitElement.setAttribute("filepath", key);
    	 debitElement.setAttribute("url", debitCard.get(key) );
    	
    	 xmlNodes =  (Element)  getNodeList(generatepath(context, key), "/root/card_highlights" );
    	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);
    	 debitElement.appendChild(newNode);
		 }
     }
    return categoryElement;
	}


public static String generatepath(RequestContext context, String path){
	 String rootLocation = DCRUtils.getRootLocation(context);
     char separator;
     String fileLocation = null;
	/* separator based on environment */
	separator = File.separatorChar;
	//LOGGER.error("seperator is : " + separator);
	if (rootLocation != null && path != null) {
			/* creating File absolute path */
			fileLocation = rootLocation + separator + path;
			fileLocation = fileLocation.replace('/', separator);
			//LOGGER.error("Complete filepath is : " + fileLocation);
	}
	 return fileLocation;
}
}