package com.opentext.ls.core.display.external;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;

import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.util.DCRUtils;

public class FetchActiveCarouselBanners {
	private static final Log LOGGER = LogFactory.getLog(FetchActiveCarouselBanners.class);
	
	public Document execute(RequestContext context) throws ParseException{
		LOGGER.debug("entering FetchActiveCarouselBanners::execute");		
		final Document allBannersDoc = loadDCR(context);
		//Document allBannersDoc = Dom4jUtils.newDocument(new File("commonbanner.xml"));
		Document activeBannersDoc = null;	
		
		@SuppressWarnings("unchecked")
		final List<Element> allBannersList = allBannersDoc.getRootElement().elements();
		//Node abc = activeCarouselBanners.getPath("/root/banner_details");
		List<Element> activeBannerList = new ArrayList<Element>();
		String bannerActivationDate = "";
		String bannerExpiryDate = "";
		Date activationDate;
		Date expiryDate;
		Date currentDate = new Date();
		DateFormat df = new SimpleDateFormat("MM-dd-yyyy");
		LOGGER.debug("currentDate :: "+currentDate);
		for(int i=0;i<allBannersList.size();i++){
			bannerActivationDate = allBannersList.get(i).selectSingleNode("Activation_Date").getText();
			LOGGER.debug("bannerActivationDate is "+bannerActivationDate);
			bannerExpiryDate = allBannersList.get(i).selectSingleNode("Expiry_Date").getText();
			LOGGER.debug("bannerExpiryDate is "+bannerExpiryDate);
			try {
				activationDate = df.parse(bannerActivationDate);
				expiryDate = df.parse(bannerExpiryDate);
				if(!(activationDate.after(currentDate)) && !(expiryDate.before(currentDate))){
					activeBannerList.add(allBannersList.get(i));
				}else{
					if(activationDate.after(currentDate))
						LOGGER.debug("Banner is not active yet :: "+allBannersList.get(i).selectSingleNode("heading").getText());
					else if(expiryDate.before(currentDate))
						LOGGER.debug("Banner is expired :: "+allBannersList.get(i).selectSingleNode("heading").getText()););
				}
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		//System.out.println("Active banners size "+activeBannerList.size());
		StringBuilder activeBannerSB = new StringBuilder("<root>");
		if(activeBannerList != null && !activeBannerList.isEmpty()){
			
			for(Element activeBannerEle : activeBannerList){
				activeBannerSB.append(activeBannerEle.asXML());				
			}
						
			activeBannersDoc = Dom4jUtils.newDocument(activeBannerSB.toString());
			LOGGER.debug("Final Active banner list "+activeBannersDoc.asXML());
		}	
		activeBannerSB.append("</root>");
		LOGGER.debug("Final Document : "+activeBannersDoc.asXML());
		return activeBannersDoc;
	}
	
	
	
	private Document loadDCR(RequestContext context) {
		LOGGER.debug("entering loadDCR");
		Document document = null;
		String rootLocation = DCRUtils.getRootLocation(context);
		try {
			@SuppressWarnings("deprecation")
			String filerelativePath = context.getParameterString("carouselbanners");
			document = DCRUtils.loadFile(rootLocation, filerelativePath);
			LOGGER.debug("exiting loadDCR");
		} catch (Throwable ex) {
			LOGGER.error("Under Catch Error from loadDCR function : ", ex);
		}		
		return document;
	}
}
