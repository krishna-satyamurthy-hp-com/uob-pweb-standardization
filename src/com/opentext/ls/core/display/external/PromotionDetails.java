package com.opentext.ls.core.display.external;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
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
//import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.db.utils.PropertyReader;
import com.opentext.ls.core.util.LSUtils;

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
	String env="";
	String promoSiteName = "";
	PropertyReader is= new PropertyReader();
	
	public Document execute(RequestContext context) throws ParseException{
		LOGGER.debug("entering PromotionDetails external");
		Document promotionListingDoc = LSUtils.loadDCRContent(context,"dcrPath");
		//Fetch offer listing links
		this.currentPromoCategory = ((Element)promotionListingDoc.selectSingleNode("//product_category" )).getText();		
		LOGGER.debug("currentPromoCategory is "+currentPromoCategory);
		this.env = context.isRuntime()?"runtime":"authoring";
		LOGGER.debug("env is "+env);
		this.promoSiteName = context.getSite().getName();
		LOGGER.debug("promoSiteName is "+promoSiteName);
		fetchPromoPrevNextURLs(context);
		
		promotionListingDoc.getRootElement().addElement("PrevPromo").setText(prevURL);
		promotionListingDoc.getRootElement().addElement("NextPromo").setText(nextURL);
		
		LOGGER.debug("promotionListing XML : "+ promotionListingDoc.asXML());
		LOGGER.debug("exiting PromotionDetails");
		return promotionListingDoc;
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
		LOGGER.debug("Scheme is "+scheme);
		String hostname = context.getRequest().getServerName();
		LOGGER.debug("hostname is "+hostname);
		String requestURI = context.getRequest().getRequestURI();
		LOGGER.debug("requestURI is "+requestURI);
		LOGGER.debug("Get context path is "+context.getRequest().getContextPath());
		LOGGER.debug("Get getServerName "+context.getRequest().getServerName());
		LOGGER.debug("Get getServletPath "+context.getRequest().getServletPath());
		
		//int port = context.getRequest().getLocalPort();
		int port = context.getRequest().getServerPort();
		LOGGER.debug("remote port is "+port);
		//String promoServletPath = UOBBaseConstants.PROMOTION_SERVLET_URL;
		String promoServletPath = is.getSystemPropertyValue("PROMOTION_SERVLET_URL");
		promoServletPath = !(env.equalsIgnoreCase("runtime"))?"/iw-cc"+promoServletPath:promoServletPath;
		
		final String charset = "UTF-8";
		String query = String.format("env=%s&promoSiteName=%s&promoCategory=%s", 
			     URLEncoder.encode(this.env, charset), 
			     URLEncoder.encode(this.promoSiteName, charset), 
			     URLEncoder.encode(this.currentPromoCategory, charset));
		URI uri = null;
		uri = new URI(scheme, null, hostname, port, promoServletPath, null, null);
		LOGGER.debug("URI:" + uri.toString());
		LOGGER.debug("URL:" + uri.toURL().toString());
		
		URLConnection connection = new URL(uri.toURL() + "?" + query).openConnection(); 
		connection.setRequestProperty("Accept-Charset", charset);
		InputStream response = connection.getInputStream();
		BufferedReader in = new BufferedReader(new InputStreamReader(response,charset)); 
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
						promoPage = promoLHM.get("PROMOPAGE");
						LOGGER.debug("promo page from json is "+promoPage);	
						if(promoPage != null && !promoPage.isEmpty()){
							if(promoPage.contains(currentPromoPage)){
								LOGGER.debug("Current page matches an entry in promo json. Fetching the prev and next urls...");							
								//Define prev and next urls				
								prevURL = i!=0?(String) (promoAL.get(i-1).get("PROMOPAGE")):(String) (promoAL.get(totalActivePromotions-1).get("PROMOPAGE"));							
								nextURL = i!=totalActivePromotions-1?(String) (promoAL.get(i+1).get("PROMOPAGE")):(String) (promoAL.get(0).get("PROMOPAGE"));
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
							LOGGER.error("Promo Page is empty for the promo id "+promoLHM.get("PROMOID"));
						}
					}
				}
				
			}//End of if(promoJSON.exists() && promoJSON.canRead())
			else{
				LOGGER.error("Promo json file is empty "+line);
			}
		}catch (URISyntaxException e) {
			e.printStackTrace();
			LOGGER.error(e.getReason());
		}catch (IOException e) {			
			e.printStackTrace();
			LOGGER.error("IO exception occured in promo details external"+e.getCause());
			LOGGER.error("IO exception occured in promo details external"+e.getLocalizedMessage());
			LOGGER.error("IO exception occured in promo details external"+e.getMessage());
		} catch (Exception ex) {			
			ex.printStackTrace();
			LOGGER.error("Exception occured in promo details external"+ex.getCause());
		}
		LOGGER.debug("exiting fetchPromoPrevNextURLs method");
	}
	
	public static void main(String[] args) throws UnsupportedEncodingException {
		//String promoServletPath = UOBBaseConstants.PROMOTION_SERVLET_URL;
		PropertyReader is= new PropertyReader();
		String promoServletPath = is.getSystemPropertyValue("PROMOTION_SERVLET_URL");
		String env = "runtime";
		String currentPromoCategory = "Deposits";
		promoServletPath = !(env.equalsIgnoreCase("runtime"))?"/iw-cc"+promoServletPath:promoServletPath;
		
		final String charset = "UTF-8";
		String query = String.format("env=%s&promoCategory=%s", 
			     URLEncoder.encode(env, charset), 
			     URLEncoder.encode(currentPromoCategory, charset));
		String promoServletURL = promoServletPath.concat("?").concat(query);
		promoServletURL = URLEncoder.encode(promoServletURL,charset);
		System.out.println(promoServletURL);
	}
		
}
