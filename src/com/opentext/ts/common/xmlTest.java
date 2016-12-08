package com.opentext.ts.common;
import java.io.StringWriter;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.json.JSONObject;
import org.json.XML;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class xmlTest {
	 public static void main(String[] args) throws Exception
	    {
	        //Parse the input document
	        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
	        //DocumentBuilder builder = factory.newDocumentBuilder();
	        //Document doc = builder.parse(new File("in.xml"));
	        Document doc = dbf.newDocumentBuilder().parse("C:\\tmp\\deposits1.xml");
	        
	        //Set up the transformer to write the output string
	        TransformerFactory tFactory = TransformerFactory.newInstance();
	        Transformer transformer = tFactory.newTransformer();
	        transformer.setOutputProperty("indent", "yes");
	        StringWriter sw = new StringWriter();
	        StreamResult result = new StreamResult(sw);

	        //Find the first child node - this could be done with xpath as well
	        //NodeList nl = doc.getDocumentElement().getChildNodes();
	        
	        XPath xPath = XPathFactory.newInstance().newXPath();
		    Node n = (Node)xPath.evaluate("/root/promo_details", doc, XPathConstants.NODE);
		    NodeList nl = n.getChildNodes();
		    
		    JSONObject promoDeatilsJSON = new JSONObject();
		    Element element;
	        DOMSource source = null;
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
	        String emailFromUserInputForm =  (String) promoDeatilsJSON.get("product_category");
    		System.out.println("email From User InputForm : " + emailFromUserInputForm);
	        //Do the transformation and output
	        transformer.transform(source, result);
	        System.out.println(sw.toString());
	        
	        JSONObject xmlJSONObj = XML.toJSONObject(sw.toString());
		    System.out.println(xmlJSONObj.toString());
	    }
}
