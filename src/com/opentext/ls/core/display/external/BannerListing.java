package com.opentext.ls.core.display.external;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;

import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.interwoven.livesite.runtime.RequestContext;
//import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.core.util.DCRUtils;
import com.opentext.ls.db.utils.PropertyReader;


public class BannerListing {
	private static final Log LOGGER = LogFactory.getLog(BannerListing.class);
	
	public Document execute(RequestContext context) throws ParseException{
		LOGGER.error("entering");
		
		Document finalDoc = Dom4jUtils.newDocument();
		Element root = finalDoc.addElement("Root");
		String bannerCountToDisplay = context.getParameterString("banner_count");
		LOGGER.error("Number of Banners to display: "+bannerCountToDisplay);
		int noOfActiveHeroBanners = getActiveBanners(context, root);
		int noOfEverGreenHeroBanner = Integer.parseInt(bannerCountToDisplay) - noOfActiveHeroBanners;
		getEvenGreenBanners(context, noOfEverGreenHeroBanner, root);
		LOGGER.error("Final Document : "+finalDoc.asXML());
		return finalDoc;
	}
	
		private int getActiveBanners (RequestContext context, Element root) throws ParseException{
			Document document = null;
			
			int noOfActiveBanners = 0;
			String heroBannerNode = context.getParameterString("herobannernode");
			LOGGER.error("herobanner "+ heroBannerNode);
			try
			{
				document = loadDCR(context);
			}
			catch (Throwable ex)
			{
				LOGGER.error("Under Catch Error from loadDCR function : ", ex);	
			}
			Element rootPoint = document.getRootElement();
			for (Iterator<Element> rootiter = rootPoint.elements().iterator(); rootiter.hasNext();)
			{
				String ExpiryDate = null;
				String ActivationDate = null;
				Date eDate = null, sDate = null;
				Element rootelem = (Element) rootiter.next();
				LOGGER.error("getActiveBanners(RequestContext context) - rootelem Name is ->" + rootelem.getName());
				if (rootelem.getName().equals(heroBannerNode)){
					LOGGER.error("inside if of heroBannerNode");
				for (Iterator<Element> iter = rootelem.elements().iterator(); iter.hasNext();)
				{
					Element elem = (Element) iter.next();
					/*if (elem.getName().equalsIgnoreCase("Expiry_Date"))
					{
						SimpleDateFormat sdf = new SimpleDateFormat(UOBBaseConstants.DATE_FORMAT);
						if (!elem.getStringValue().isEmpty())
						{
							ExpiryDate = elem.getStringValue();
							Date eDate = sdf.parse(ExpiryDate);
							LOGGER.error("getActiveBanners(RequestContext context) - Expiry Date : " + ExpiryDate);
							String currDate = (sdf.format(new Date()).toString()).trim();
							Date cdate = sdf.parse(currDate);
							LOGGER.error("expiryDate :"+eDate);
							LOGGER.error("currdate :"+cdate);
							if(eDate.compareTo(cdate)<=0){
								LOGGER.error("Banner Expired.");
							}
							if (ExpiryDate.equalsIgnoreCase(currDate))
								
							{
								System.out.println("Banner Expired.");
							}
							else{
								LOGGER.error("Banner is Active.");
								LOGGER.error("Active Banner xml : " +rootelem.asXML());
								rootelem.detach();
								root.add(rootelem);
								noOfActiveBanners++;
							}
						}
					}*/
					//SimpleDateFormat sdf = new SimpleDateFormat(UOBBaseConstants.DATE_FORMAT);
					//SimpleDateFormat sdf = new SimpleDateFormat(is.getProperties("DATE_FORMAT"));
					PropertyReader is= new PropertyReader();
			
					SimpleDateFormat sdf = new SimpleDateFormat(is.getSystemPropertyValue("DATE_FORMAT"));
					
					if (elem.getName().equalsIgnoreCase("Activation_Date"))
					{
						if (!elem.getStringValue().isEmpty())
						{ 
						ActivationDate = elem.getStringValue();
						sDate = sdf.parse(ActivationDate);
						LOGGER.error("getActiveBanners(RequestContext context) - Activation Date : " + ActivationDate);
						}
					}
					
					if (elem.getName().equalsIgnoreCase("Expiry_Date"))
					{
						if (!elem.getStringValue().isEmpty())
						{ 
						ExpiryDate = elem.getStringValue();
						eDate = sdf.parse(ExpiryDate);
						LOGGER.error("getActiveBanners(RequestContext context) - Expiry Date : " + ExpiryDate);
						}
					}
					
					if (sDate !=null && eDate != null){
						String currDate = (sdf.format(new Date()).toString()).trim();
						Date cdate = sdf.parse(currDate);
						if (cdate.after(sDate) && cdate.before(eDate) || cdate.equals(sDate) || cdate.equals(eDate)){
							LOGGER.error("Banner is Active.");
							LOGGER.error("Active Banner xml : " +rootelem.asXML());
							rootelem.detach();
							root.add(rootelem);
							noOfActiveBanners++;
							break;
						}
					}
				}
				}
			}
			LOGGER.error("Active Banner Count :" + noOfActiveBanners);
			return noOfActiveBanners;
		}
		
		private void getEvenGreenBanners (RequestContext context, int noOfEGHeroBanner, Element root){
			Document document = null;
			String heroBannerNode = context.getParameterString("herobannernode");
			String everGreenBannerNode = context.getParameterString("evergreenbannernode");
			LOGGER.error("everGreenBannerNode "+ everGreenBannerNode);
			try
			{
				document = loadDCR(context);
			}
			catch (Throwable ex)
			{
				LOGGER.error("Under Catch Error from loadDCR function : ", ex);	
			}
		
			Element rootPoint = document.getRootElement();
			int counter =0;
			
			for (Iterator<Element> rootiter = rootPoint.elements().iterator(); rootiter.hasNext();)
			{
				Element rootelem = (Element) rootiter.next();
				LOGGER.error("getEverGreenBanners(RequestContext context) - rootelem Name is ->" + rootelem.getName());
			if (rootelem.getName().equals(everGreenBannerNode) && counter<noOfEGHeroBanner){
LOGGER.error("inside if of everGreenBannerNode");
				rootelem.setName(heroBannerNode);
				LOGGER.error("EverGreen Banner xml : " + rootelem.asXML());
				rootelem.detach();
				root.add(rootelem);
				counter++;
				LOGGER.error("EverGreen Banner Counter:"+counter);
			}
			}
		}
		
		/**
		 * Method to load the DCR with Holiday and timing information
		 * 
		 * @param context
		 *            - Request Context
		 * @return Document - xml for the DCR
		 */
		private Document loadDCR(RequestContext context)
		{
			LOGGER.error("entering");
			Document document = null;
			String rootLocation = DCRUtils.getRootLocation(context);
			try
			{
				String filerelativePath = context.getParameterString("herobanner");
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
