package com.opentext.ls.core.display.external;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.dom4j.io.DOMReader;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.common.UOBBaseConstants;

public class maintest {

	public static void main(String[] args) throws Exception {
		
		// DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		 ArrayList<String> featureCreditCard = new ArrayList<String>();
		 ArrayList<String> featureDebitCard = new ArrayList<String>();
		 ArrayList<String> travelCreditCard = new ArrayList<String>();
		 ArrayList<String> travelDebitCard = new ArrayList<String>();
		 ArrayList<String> rewardsCreditCard = new ArrayList<String>();
		 ArrayList<String> rewardsDebitCard = new ArrayList<String>();
		 ArrayList<String> rebateCreditCard = new ArrayList<String>();
		 ArrayList<String> rebateDebitCard = new ArrayList<String>();
		 Element xmlNodes=null;
		 //Element rootElement= null;
		 
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
		    
		try {
		
		    NodeList nl = getNodeList("C:\\temp\\compare", "/compare_cards" );
		    Element element;
		    for(int x = 0;x < nl.getLength();x++)
	        {
		    	
	        	if(nl.item(x).getNodeType() == Node.ELEMENT_NODE){
	        	 element =  (Element) nl.item(x);		         
	             
	             NodeList fcds = element.getElementsByTagName("feature-credit-card");
	             for(int y = 0;y < fcds.getLength();y++){
	            	 System.out.println(fcds.item(y).getTextContent());
	            	 featureCreditCard.add(fcds.item(y).getTextContent()) ;
	             }
	             
	             NodeList fdds = element.getElementsByTagName("feature-debit-card");
	             	for(int y = 0;y < fdds.getLength();y++){
	             	System.out.println(fdds.item(y).getTextContent());
	            	 featureDebitCard.add(fdds.item(y).getTextContent()) ;
	             }
	             	
             	NodeList tcds = element.getElementsByTagName("travel-credit-card");
	             for(int y = 0;y < tcds.getLength();y++){
	            	 System.out.println(tcds.item(y).getTextContent());
	            	 travelCreditCard.add(tcds.item(y).getTextContent()) ;
	             }
	             
	             NodeList tdds = element.getElementsByTagName("travel-debit-card");
	             for(int y = 0;y < tdds.getLength();y++){
	            	 System.out.println(tdds.item(y).getTextContent());
	            	 travelDebitCard.add(tdds.item(y).getTextContent()) ;
	             }
	             
	             NodeList rwcds = element.getElementsByTagName("rewards-credit-card");
	             for(int y = 0;y < rwcds.getLength();y++){
	            	 System.out.println(rwcds.item(y).getTextContent());
	            	 rewardsCreditCard.add(rwcds.item(y).getTextContent()) ;
	             }
	             
	             NodeList rwdds = element.getElementsByTagName("rewards-debit-card");
	             for(int y = 0;y < rwdds.getLength();y++){
	            	 System.out.println(rwdds.item(y).getTextContent());
	            	 rewardsDebitCard.add(rwdds.item(y).getTextContent()) ;
	             }
	             
	             NodeList rcds = element.getElementsByTagName("rebate-credit-card");
	             for(int y = 0;y < rcds.getLength();y++){
	            	 System.out.println(rcds.item(y).getTextContent());
	            	 rebateCreditCard.add(rcds.item(y).getTextContent()) ;
	             }
	             
	             NodeList rdds = element.getElementsByTagName("rebate-debit-card");
	             for(int y = 0;y < rdds.getLength();y++){
	            	 System.out.println(rdds.item(y).getTextContent());
	            	 rebateDebitCard.add(rdds.item(y).getTextContent()) ;
	             }
	        	}
	        }
		    
		    
		    
		    for(int y = 0;y < featureCreditCard.size();y++){	            	 
            	 xmlNodes =  (Element)  getNodeList(generatepath(featureCreditCard.get(y)), "/root/card_highlights" );
            	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
            	 featureCard.appendChild(featurecc);
            	 featurecc.appendChild(newNode);
             }
		    for(int y = 0;y < featureDebitCard.size();y++){	            	 
		    	 xmlNodes =  (Element)  getNodeList(generatepath(featureDebitCard.get(y)), "/root/card_highlights" );
            	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  	            	 
            	 featureCard.appendChild(featuredc);
            	 featuredc.appendChild(newNode);
             }
		    for(int y = 0;y < travelCreditCard.size();y++){	            	 
           	 xmlNodes =  (Element)  getNodeList(generatepath(travelCreditCard.get(y)), "/root/card_highlights" );
           	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
           	travelCard.appendChild(travelcc);
           	 travelcc.appendChild(newNode);
            }
		    for(int y = 0;y < travelDebitCard.size();y++){	            	 
		    	 xmlNodes =  (Element)  getNodeList(generatepath(travelDebitCard.get(y)), "/root/card_highlights" );
           	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  	            	 
           	travelCard.appendChild(traveldc);
           	 traveldc.appendChild(newNode);
            }
		    for(int y = 0;y < rewardsCreditCard.size();y++){	            	 
           	 xmlNodes =  (Element)  getNodeList(generatepath(rewardsCreditCard.get(y)), "/root/card_highlights" );
           	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
           	rewardsCard.appendChild(rewardscc);
           	 rewardscc.appendChild(newNode);
            }
		    for(int y = 0;y < rewardsDebitCard.size();y++){	            	 
		    	 xmlNodes =  (Element)  getNodeList(generatepath(rewardsDebitCard.get(y)), "/root/card_highlights" );
           	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  	            	 
           	rewardsCard.appendChild(rewardsdc);
           	 rewardsdc.appendChild(newNode);
            }
		    for(int y = 0;y < rebateCreditCard.size();y++){	            	 
           	 xmlNodes =  (Element)  getNodeList(generatepath(rebateCreditCard.get(y)), "/root/card_highlights" );
           	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  
           	rebateCard.appendChild(rebatecc);
           	 rebatecc.appendChild(newNode);
            }
		    for(int y = 0;y < rebateDebitCard.size();y++){	            	 
		    	 xmlNodes =  (Element)  getNodeList(generatepath(rebateDebitCard.get(y)), "/root/card_highlights" );
           	 Node newNode= (Node) newDoc.importNode(xmlNodes, true);  	            	 
           	rebateCard.appendChild(rebatedc);
           	 rebatedc.appendChild(newNode);
            }
		   // System.out.println("doc: " + newDoc.toString());
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
		System.out.println(dom4jDoc.asXML());
			
		
		
	/*	printDocument(newDoc, System.out);
		 File currentFile= new File("C:\\temp\\allcards.xml");
		 //writeToFile(rootElement, currentFile);*/
	}
	
	public static void printDocument(Document doc, OutputStream out) throws IOException, TransformerException {
	    TransformerFactory tf = TransformerFactory.newInstance();
	    Transformer transformer = tf.newTransformer();
	    transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
	    transformer.setOutputProperty(OutputKeys.METHOD, "xml");
	    transformer.setOutputProperty(OutputKeys.INDENT, "yes");
	    transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
	    transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

	    transformer.transform(new DOMSource(doc), 
	         new StreamResult(new OutputStreamWriter(out, "UTF-8")));
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
	
public static String generatepath(String path){
	
	 String temp = null;
		if(!path.equals(null)){
			
			temp= "C:\\temp\\"+path;
			System.out.println(temp);
		}
		 return temp;
	}


private static void writeToFile(Element rootElement, File file) throws Exception {
    // Transformer transformer = TransformerFactory.newInstance().newTransformer();
    // transformer.transform(new DOMSource(rootElement), new StreamResult(new FileWriter(file)));
                
                ByteArrayOutputStream baos = null;
                OutputStreamWriter osw = null;

    try {
                               baos = new ByteArrayOutputStream();
                               osw = new OutputStreamWriter(baos);

                               TransformerFactory tranFactory = TransformerFactory.newInstance();
                               Transformer aTransformer = tranFactory.newTransformer();
                               aTransformer.setOutputProperty(OutputKeys.INDENT, "yes");
                               aTransformer.setOutputProperty(OutputKeys.METHOD, "xml");
                               aTransformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
                               aTransformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
                               
                               StringWriter sw = new StringWriter();
                               StreamResult result = new StreamResult(sw);
                               DOMSource source = new DOMSource(rootElement);
                               aTransformer.transform(source, result);
                               String xmlString = sw.toString();

                               BufferedWriter bw = new BufferedWriter(new FileWriter(file));
                               bw.write(xmlString);
                               bw.flush();
                               bw.close();
                } catch (Exception exp) {
                               exp.printStackTrace();
                } 
 }
	
}
	
	
