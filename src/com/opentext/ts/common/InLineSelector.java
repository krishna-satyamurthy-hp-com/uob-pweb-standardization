package com.opentext.ts.common;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;

import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

public class InLineSelector {	
	private static final Log LOGGER = LogFactory.getLog(InLineSelector.class);
	
	public static void main(String path[])throws Exception
	{
		LOGGER.debug("Entering InLineSelector::execute");	
		try{
			
		
		String filename=path[0];
		SAXReader reader=new SAXReader();
		Document doc=reader.read(filename);
		LOGGER.debug("DCR Path :: "+ doc);
		StringBuilder option=new StringBuilder("<substitution>");
		List l=doc.selectNodes("//root/promo_category_details/promo_category_name");
		for(Iterator ite=l.iterator();ite.hasNext();)
		{
		Node n=(Node)ite.next();
		 option.append("<option value=").append("\"").append(n.getText()).append("\"").append(" ").append("label=\"").append(n.getText()).append("\"/>").append("\n");
        }
		option.append("</substitution>");
       // System.out.println(option);
		LOGGER.info("XML Output :: "+ option);
		
		PrintWriter out= new PrintWriter(System.out);
		out.print(option);
		out.flush();
		
		
		}catch(Exception ex){
			
			LOGGER.debug("Error Occured :: "+ ex.getMessage());
			ex.printStackTrace();
		}
	}


}