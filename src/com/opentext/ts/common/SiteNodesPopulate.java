package com.opentext.ts.common;


import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;



public class SiteNodesPopulate {
	private static final Log LOGGER = LogFactory.getLog(SiteNodePopulate.class);

	public static void main(String path[])throws Exception
	{
		LOGGER.debug("Entering SiteNodePopulate::execute");	
		try{
		
		String filename=path[0];
		SAXReader reader=new SAXReader();
		Document doc=reader.read(filename);
		LOGGER.debug("DCR Path :: "+ filename);
		StringBuilder option=new StringBuilder("<substitution>");
		
		@SuppressWarnings("unchecked")
		List<Node> nodeList = doc.selectNodes("//site-map/segment/node/node/label");
		//System.out.println(l);
		for(Iterator<Node> ite=nodeList.iterator();ite.hasNext();)
		{
		Node n=(Node)ite.next();
			if(n.getText()!="HOME"){
			 option.append("<option value=").append("\"").append(n.getText()).append("\"").append(" ").append("label=\"").append(n.getText()).append("\"/>").append("\n");
	        }
		}
		
		option.append("</substitution>");
		LOGGER.info("XML Output :: "+ option);
        //System.out.println(option);
		PrintWriter out= new PrintWriter(System.out);
		out.print(option);
		out.flush();	
	}catch(Exception ex){
		
		LOGGER.debug("Error Occured :: "+ ex.getMessage());
		ex.printStackTrace();
	}
		
	}
		
}

