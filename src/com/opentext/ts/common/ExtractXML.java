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
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class ExtractXML {
	public static void main(String[] args)
			throws Exception
			{
			    String xml = "<A><B><id>0</id></B><B><id>1</id></B></A>";
			    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			    Document doc = dbf.newDocumentBuilder().parse("C:\\tmp\\deposits1.xml");

			    XPath xPath = XPathFactory.newInstance().newXPath();
			    Node result = (Node)xPath.evaluate("root/promo_details", doc, XPathConstants.NODE);
			    NodeList nl = result.getChildNodes();
			    System.out.println(nodeToString(result));
			    
			    JSONObject xmlJSONObj = XML.toJSONObject(nodeToString(result));
			    System.out.println(xmlJSONObj.toString());
			    
			    String emailFromUserInputForm =  xmlJSONObj.getJSONObject("product_category").toString();
	    		System.out.println("email From User InputForm : " + emailFromUserInputForm);
			}

			private static String nodeToString(Node node)
			throws TransformerException
			{
			    StringWriter buf = new StringWriter();
			    Transformer xform = TransformerFactory.newInstance().newTransformer();
			    xform.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			    xform.transform(new DOMSource(node), new StreamResult(buf));
			    return(buf.toString());
			}
}

