package com.opentext.ls.core.display.external;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.dom4j.Document;
import org.dom4j.Element;

import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.core.util.DCRUtils;

/**
 * This class is for fetching Promo Details DCR and its offer listing items : prev and next promotion links
 * The fetching of prev and next links works in both runtime and preview environments
 * @author OpenText APJ CEM PS
 * @version 1.0
 * @category - pweb standardization
 */

public class PromotionDetails {
	private static final transient Log LOGGER = LogFactory.getLog(PromotionDetails.class);
	String prevURL = "";
	String nextURL = "";
	String currentPromoCategory = "";
	public Document execute(RequestContext context) throws ParseException{
		LOGGER.debug("entering PromotionDetails external");
		Document promotionListingDoc = loadDCR(context);
		//Fetch offer listing links
		this.currentPromoCategory = ((Element)promotionListingDoc.selectSingleNode("//product_category" )).getText();		
		LOGGER.debug("currentPromoCategory is "+currentPromoCategory);
		fetchPromoPrevNextURLs(context);
		
		promotionListingDoc.getRootElement().addElement("PrevPromo").setText(prevURL);
		promotionListingDoc.getRootElement().addElement("NextPromo").setText(nextURL);
		
		LOGGER.debug("promotionListing XML : "+ promotionListingDoc.asXML());
		LOGGER.debug("exiting PromotionDetails");
		return promotionListingDoc;
	}
	
	@SuppressWarnings("deprecation")
	private Document loadDCR(RequestContext context)
	{
		LOGGER.debug("entering loadDCR method");
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
		LOGGER.debug("exiting loadDCR method");
		return document;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void fetchPromoPrevNextURLs(RequestContext context){
		LOGGER.debug("entering fetchPromoPrevNextURLs method");
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, ArrayList<LinkedHashMap>> promodataMap;
		try {			
			/*String promoJsonFilePath = "";
			if(context.isRuntime())
				promoJsonFilePath = context.getFileDal().getRoot()+File.separator+UOBBaseConstants.PROMOTION_JSON_FILE_PATH;
			else
				promoJsonFilePath = DCRUtils.getRootLocation(context)+File.separator+UOBBaseConstants.PROMOTION_JSON_FILE_PATH;
			
		LOGGER.debug("Promo json file path is "+promoJsonFilePath);
		final File promoJSON = new File(promoJsonFilePath);
		if(promoJSON.exists() && promoJSON.canRead()){
			promodataMap = mapper.readValue(new File(promoJsonFilePath), HashMap.class);*/
		String line;
		String scheme = context.getRequest().getScheme();
		String hostname = context.getRequest().getLocalAddr();
		int port = context.getRequest().getLocalPort();
		String path = "/wsm/getpromotions.do";
		URI uri = null;
		try {
			uri = new URI(scheme, null, hostname, port, path, null, null);
			LOGGER.debug("URI:" + uri.toString());
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
		BufferedReader in = new BufferedReader(new InputStreamReader(uri.toURL().openStream())); 
		line = in.readLine(); 
		LOGGER.debug("JSON output from servlet:"+line);
		if(!line.isEmpty()){
			promodataMap = mapper.readValue(line, HashMap.class);			
				final ArrayList<LinkedHashMap> promoAL = promodataMap.get("promo_details");
				
				//Define next set of variables
				//String currentPromoPage = "/en/loans-promotion-listing-456125.page";
				final String currentPromoPage = context.getPageName();
				System.out.println("current promo page is "+currentPromoPage);
				LOGGER.debug("current promo page is "+currentPromoPage);
				LinkedHashMap<String, String> promoLHM = null;
				String promoPage = "";
				
				if(promoAL != null && !promoAL.isEmpty()){
					final int totalActivePromotions = promoAL.size();
					LOGGER.debug("Total active promotions "+totalActivePromotions);					
					LOGGER.debug("get pagename "+context.getPageName());
					LOGGER.debug("get request url " +context.getRequest().getRequestURL());
					
					for(int i=0; i<totalActivePromotions; i++){
						promoLHM = promoAL.get(i);
						promoPage = promoLHM.get("PromoPage");
						LOGGER.debug("promo page from json is "+promoPage);						
						if(promoPage.contains(currentPromoPage)){
							LOGGER.debug("Current page matches an entry in promo json. Fetching the prev and next urls...");							
							//Define prev and next urls				
							prevURL = i!=0?(String) (promoAL.get(i-1).get("PromoPage")):(String) (promoAL.get(totalActivePromotions-1).get("PromoPage"));							
							nextURL = i!=totalActivePromotions-1?(String) (promoAL.get(i+1).get("PromoPage")):(String) (promoAL.get(0).get("PromoPage"));
							if(prevURL.indexOf("/sites/") != -1){
								prevURL = prevURL.split("/sites/")[1];
								this.prevURL = prevURL.substring(prevURL.indexOf("/")+1,prevURL.indexOf(".page"));
							}
							if(nextURL.indexOf("/sites/") != -1){
								nextURL = nextURL.split("/sites/")[1];
								this.nextURL = nextURL.substring(nextURL.indexOf("/")+1,nextURL.indexOf(".page"));
							}
							//prevURL = prevURL.indexOf("/sites") != -1?prevURL.substring("/sites/")
							LOGGER.debug("Prev URL "+this.prevURL);
							LOGGER.debug("Next URL "+this.nextURL);
							break;
						}
					}
				}
				
			}//End of if(promoJSON.exists() && promoJSON.canRead())
			else{
				LOGGER.error("Promo json file is empty "+line);
			}
		} catch (IOException e) {			
			e.printStackTrace();
			LOGGER.error("IO exception occured in promo details external"+e.getMessage());
		} catch (Exception ex) {			
			ex.printStackTrace();
			LOGGER.error("Exception occured in promo details external"+ex.getMessage());
		}
		LOGGER.debug("exiting fetchPromoPrevNextURLs method");
	}
		
}
