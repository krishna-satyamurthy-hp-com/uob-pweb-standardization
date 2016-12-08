package com.opentext.ls.core.display.external;

import java.util.ArrayList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;

public class test {
	public static void main(String[] args) throws Exception {
		
		// DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		 ArrayList<String> creditCard = new ArrayList<String>();
		 ArrayList<String> debitCard = new ArrayList<String>();
		 Element xmlNodes=null;
		 //Element rootElement= null;
		 
		 DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
         DocumentBuilder domBuilder = domFactory.newDocumentBuilder();
         Document doc = domBuilder.parse("C:\\temp\\compare");
         Document newDoc = domBuilder.newDocument();			   
         newDoc.setXmlStandalone(true);
         NodeList nList = doc.getElementsByTagName("feature_cards");
         
         for (int temp = 0; temp < nList.getLength(); temp++) {

     		Node nNode = nList.item(temp);

     		System.out.println("\nCurrent Element :" + nNode.getNodeName());

     		if (nNode.getNodeType() == Node.ELEMENT_NODE) {

     			Element eElement = (Element) nNode;

     			System.out.println("Staff id : " + eElement.getAttribute("id"));
     			System.out.println("First Name : " + eElement.getElementsByTagName("firstname").item(0).getTextContent());
     			System.out.println("Last Name : " + eElement.getElementsByTagName("lastname").item(0).getTextContent());
     			System.out.println("Nick Name : " + eElement.getElementsByTagName("nickname").item(0).getTextContent());
     			System.out.println("Salary : " + eElement.getElementsByTagName("salary").item(0).getTextContent());

     		}
     	}
         
}
}
