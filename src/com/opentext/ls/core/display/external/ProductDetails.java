package com.opentext.ls.core.display.external;

import java.text.ParseException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;

import com.interwoven.livesite.runtime.RequestContext;
import com.interwoven.livesite.runtime.model.page.RuntimePage;
import com.opentext.ls.core.util.LSUtils;

public class ProductDetails {
	private static final transient Log LOGGER = LogFactory.getLog(ProductDetails.class);
	
	public Document execute(RequestContext context) throws ParseException{
		LOGGER.debug("entering PromotionDetails external");
		Document productDetailsDoc = LSUtils.loadDCRContent(context,"dcrPath");
		
		if(context.isRuntime()){
		//Get Product Category and Product Name to be injected into the body for analytics
			StringBuilder productMetaStringSB = new StringBuilder();
			final String productName = productDetailsDoc.selectSingleNode("//product_name")!=null?productDetailsDoc.selectSingleNode("//product_name").getText():"";
			if(productName != null && !productName.isEmpty()){
				productMetaStringSB.append(LSUtils.createMetaString("productname", productName));
			}
			final String productCategory = productDetailsDoc.selectSingleNode("//product_category")!=null?productDetailsDoc.selectSingleNode("//product_category").getText():"";
			if(productCategory != null && !productCategory.isEmpty()){
				productMetaStringSB.append(LSUtils.createMetaString("productcategory", productCategory));
			}
			final String productMetaString = productMetaStringSB.toString();
			LOGGER.debug("Final product meta string is "+productMetaString);
			
			context.getPageScopeData().put(RuntimePage.PAGESCOPE_HEAD_INJECTION, productMetaString);
			LOGGER.debug("After injection productMetaString "+productMetaString);
			LOGGER.debug("Exit injectMetaIntoPageHead");
		}
		return productDetailsDoc;
	}
	
}
