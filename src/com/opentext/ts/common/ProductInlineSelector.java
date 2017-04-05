package com.opentext.ts.common;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;

import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

public class ProductInlineSelector {
	private static final Log LOGGER = LogFactory
			.getLog(ProductInlineSelector.class);

	public static void main(String path[]) throws Exception {
		LOGGER.debug("Entering ProductInLineSelector::execute");
		try {

			String filename = path[0];
			SAXReader reader = new SAXReader();
			Document doc = reader.read(filename);
			LOGGER.debug("DCR Path :: " + doc);
			StringBuilder option = new StringBuilder("<substitution>");
			List l = doc.selectNodes("//root/product_category_details");
			int countCat = l.size();
			int index = 0;
			for (Iterator ite = l.iterator(); ite.hasNext();) {
				Node category = (Node) ite.next();
				List pl = category.selectNodes("/product_details/product_name");
				for (Iterator ite2 = l.iterator(); ite2.hasNext();) {
					Node productName = (Node) ite2.next();
					String value = "\"" + String.format("%03d", index) + " - "
							+ productName.getText() + "\"";
					String text = "\"" + productName.getText() + "\"";
					option.append("<option value=").append(value)
							.append(" label=").append(text).append(" />")
							.append("\n");
				}
			}
			option.append("</substitution>");
			// System.out.println(option);
			LOGGER.info("XML Output :: " + option);

			PrintWriter out = new PrintWriter(System.out);
			out.print(option);
			out.flush();

		} catch (Exception ex) {

			LOGGER.debug("Error Occured :: " + ex.getMessage());
			ex.printStackTrace();
		}
	}
}
