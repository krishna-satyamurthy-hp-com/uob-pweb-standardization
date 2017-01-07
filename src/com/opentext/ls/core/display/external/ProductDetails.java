package com.opentext.ls.core.display.external;

import java.text.ParseException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;

import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.util.DCRUtils;
import com.opentext.ls.core.util.LSUtils;

public class ProductDetails {
	private static final transient Log LOGGER = LogFactory.getLog(ProductDetails.class);
	
	public Document execute(RequestContext context) throws ParseException{
		LOGGER.debug("entering PromotionDetails external");
		Document productDetailsDoc = LSUtils.loadDCRContent(context);
		//Get Product Category and Product Name to be injected into the body for analytics
		final String productName = productDetailsDoc.selectSingleNode("//product_name")!=null?productDetailsDoc.selectSingleNode("//product_name").getText():"";
		if(productName != null && !productName.isEmpty()){
			LSUtils.injectMetaIntoPageHead(context, "productname", productName);
		}
		final String productCategory = productDetailsDoc.selectSingleNode("//product_category")!=null?productDetailsDoc.selectSingleNode("//product_category").getText():"";
		if(productCategory != null && !productCategory.isEmpty()){
			LSUtils.injectMetaIntoPageHead(context, "productcategory", productCategory);
		}		
		return productDetailsDoc;
	}
	
}
