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
		LOGGER.error("entering FetchActiveCarouselBanners::execute");		
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
		
		System.out.println("currentDate :: "+currentDate);
		
		for(int i=0;i<allBannersList.size();i++){
			bannerActivationDate = allBannersList.get(i).selectSingleNode("Activation_Date").getText();
			System.out.println("bannerActivationDate is "+bannerActivationDate);
			bannerExpiryDate = allBannersList.get(i).selectSingleNode("Expiry_Date").getText();
			System.out.println("bannerExpiryDate is "+bannerExpiryDate);
			try {
				activationDate = df.parse(bannerActivationDate);
				expiryDate = df.parse(bannerExpiryDate);
				if(!(activationDate.after(currentDate)) && !(expiryDate.before(currentDate))){
					System.out.println("Banner is active");
					activeBannerList.add(allBannersList.get(i));
				}else{
					if(activationDate.after(currentDate))
						System.out.println("Banner is not active yet");
					else if(expiryDate.before(currentDate))
						System.out.println("Banner is expired");
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
			System.out.println("Final Active banner list "+activeBannersDoc.asXML());
		}	
		activeBannerSB.append("</root>");
		LOGGER.error("Final Document : "+activeBannersDoc.asXML());
		return activeBannersDoc;
	}
	
	
	
	private Document loadDCR(RequestContext context) {
		LOGGER.error("entering loadDCR");
		Document document = null;
		String rootLocation = DCRUtils.getRootLocation(context);
		try {
			@SuppressWarnings("deprecation")
			String filerelativePath = context.getParameterString("carouselbanners");
			document = DCRUtils.loadFile(rootLocation, filerelativePath);
		} catch (Throwable ex) {
			LOGGER.error("Under Catch Error from loadDCR function : ", ex);
		}
		LOGGER.error("exiting loadDCR");
		return document;
	}
}
