package com.opentext.ts.common;


import java.util.Iterator;
import java.util.List;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;

public class inlineselector {
	public static void main(String path[])throws Exception
	{
		String filename=path[0];
		SAXReader reader=new SAXReader();
		Document doc=reader.read(filename);
		StringBuilder option=new StringBuilder("<substitution>");
		List l=doc.selectNodes("//root/promo_category_details/promo_category_name");
		for(Iterator ite=l.iterator();ite.hasNext();)
		{
		Node n=(Node)ite.next();
		 option.append("<option value=").append("\"").append(n.getText()).append("\"").append(" ").append("label=\"").append(n.getText()).append("\"/>").append("\n");
        }
		option.append("</substitution>");
        System.out.println(option);
			
	}


}