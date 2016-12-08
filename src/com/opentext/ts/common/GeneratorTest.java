package com.opentext.ts.common;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import com.interwoven.livesite.common.util.GeneratorUtils;
import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.interwoven.livesite.external.PropertyContext;

public class GeneratorTest {
	
	public static void main(String[] args) throws Exception
	 {		
		Document document = null;
		Document doc_options = Dom4jUtils.newDocument();
		doc_options.addElement("Options");
		//Map params = context.getParameters();
		//String Categoryfile = (String) params.get("CategoryFile");
		//System.out.println("String from the Datumn is "+Categoryfile);
		File file = new File("C:\\tmp\\categories.xml");
		FileInputStream fis = null;
		String str = "";
		
		try {
			fis = new FileInputStream(file);
 
			//System.out.println("Total file size to read (in bytes) : "+ fis.available());
 
			int content;
			while ((content = fis.read()) != -1) {
				// convert to char and display it
				str += (char) content;
				
			}
			System.out.print("Converted the file to String "+str);
			
			document=getDocument(str);
			List<Node> nodes = document.selectNodes("/root/promo_category_details/promo_category_name");
		    System.out.println("Root element :"+ document.getRootElement().getName());
		    Element optionsBase = doc_options.getRootElement();
		    
		    
		    for (Node node : nodes) {
		          System.out.println("Student roll no : " + node.getText() );
     	            GeneratorUtils.addOption(optionsBase, node.getText(), node.getText());
		           }
			
			//Document doc = reader.read(str);  
 
		} catch (IOException e) {
			e.printStackTrace();
		} 
		//return doc_options;
		// TODO Auto-generated method stub

	}
	public static Document getDocument(String xmlFileName )
	{
		 Document xmldocument = null;
		 SAXReader reader = new SAXReader();
		     try
		       {
		        // xmldocument = reader.read( xmlFileName );
		         xmldocument = reader.read (new ByteArrayInputStream (xmlFileName.getBytes ("UTF-8")));

		       }
		 	      catch (DocumentException e)
		       {
	         e.printStackTrace();
		    } catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		  return xmldocument;
		
		
	}
}
