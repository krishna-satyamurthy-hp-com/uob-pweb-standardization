package com.opentext.ls.core.display.external;

import java.text.ParseException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;

import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.util.DCRUtils;

public class PromotionDetails {
private static final Log LOGGER = LogFactory.getLog(BannerListing.class);
	
	public Document execute(RequestContext context) throws ParseException{
		LOGGER.error("entering");
		String promoIdValue = null;
		Document promotionListingDoc = loadDCR(context);
		LOGGER.error("promotionListing XML : "+ promotionListingDoc.asXML());
		Element promoIdElement = (Element)promotionListingDoc.selectSingleNode("//promoId" );
		if (promoIdElement != null){
			promoIdValue = promoIdElement.getText();
			System.out.println("promoId : "+ promoIdValue);
			LOGGER.error("promoId : "+ promoIdValue);
		}
		context.getPageScopeData().put("promoId", promoIdValue);
		LOGGER.error("exiting");
		return promotionListingDoc;
	}
	
	private Document loadDCR(RequestContext context)
	{
		LOGGER.error("entering");
		Document document = null;
		String rootLocation = DCRUtils.getRootLocation(context);
		try
		{
			String filerelativePath = context.getParameterString("promotionlisting");
			document = DCRUtils.loadFile(rootLocation, filerelativePath);
		}
		catch (Throwable ex)
		{
			LOGGER.error("Under Catch Error from loadDCR function : ", ex);	
		}
		LOGGER.error("exiting");
		return document;
	}
		
}
