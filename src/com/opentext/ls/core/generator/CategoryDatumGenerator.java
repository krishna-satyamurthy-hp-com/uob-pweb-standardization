package com.opentext.ls.core.generator;

import com.interwoven.livesite.common.util.GeneratorUtils;
import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.interwoven.livesite.external.PropertyContext;
import com.opentext.ls.core.util.DCRUtils;
import com.opentext.ls.db.utils.PropertyReader;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;

import java.util.List;

public class CategoryDatumGenerator {	
	private static final Log LOGGER = LogFactory.getLog(CategoryDatumGenerator.class);
	PropertyReader is= new PropertyReader();
	public Document generateCategoryOptions(PropertyContext context) {
		
		Document document = null;
		Document doc_options = Dom4jUtils.newDocument();
		doc_options.addElement("Options");
		document = loadDCR(context);
		
			List<Node> nodes = document.selectNodes("/root/promo_category_details/promo_category_name");
		    LOGGER.debug("Root element :"+ document.getRootElement().getName());
		    Element optionsBase = doc_options.getRootElement();
		    
		    for (Node node : nodes) {
		    	LOGGER.debug("Category Name : " + node.getText() );
     	            GeneratorUtils.addOption(optionsBase, node.getText(), node.getText());
		           }
		return doc_options;
	}

	
	private Document loadDCR(PropertyContext context)
	{
		LOGGER.error("entering");
		Document document = null;
		String rootLocation = DCRUtils.getRootLocation(context);
		LOGGER.debug("rootlocation: "+ rootLocation);
		try
		{
			//Map params = context.getParameters();
			//String filerelativePath = (String) params.get("CategoryFile");
			String filerelativePath =  is.getSystemPropertyValue("PROMOTION_CATEGORY_TEMPLATEDATA_PATH").concat(context.getSite().getName());
			LOGGER.debug("filepath: "+filerelativePath);
			document = DCRUtils.loadFile(rootLocation, filerelativePath);
			LOGGER.debug("Returned document: "+ document.asXML());
		}
		catch (Throwable ex)
		{
			LOGGER.error("Under Catch Error from loadDCR function : ", ex);	
		}
		
		LOGGER.error("exiting");
		return document;
	}
}
