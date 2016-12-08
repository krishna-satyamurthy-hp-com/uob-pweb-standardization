package com.opentext.ls.core.display.external;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import org.dom4j.Document;
import org.dom4j.Element;

import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.common.UOBBaseConstants;

public class BannerListingMain {

	public static void main(String[] args) throws ParseException {
		// TODO Auto-generated method stub
		Document finalDoc = Dom4jUtils.newDocument();
		Element root = finalDoc.addElement("Root");

		String fileLocation = "C:\\tmp\\herobanner.xml";
		Document doc = null;
		File file = new File(fileLocation);
		if (!file.exists()) {
			System.out.println("File Not found at location" + fileLocation);
		}
		int noOfBannersToDisplay = 4;
		doc = Dom4jUtils.newDocument(file);
		int noOfActiveHeroBanners = getActiveBanners(doc, root);
		int noOfEverGreenHeroBanner = noOfBannersToDisplay - noOfActiveHeroBanners;
		getEvenGreenBanners(doc, noOfEverGreenHeroBanner, root);
		System.out.println("Final Doc :::::::" + finalDoc.asXML());
	}
	
	public static int getActiveBanners (Document document, Element root) throws ParseException{
		
		String ExpiryDate = null;
		String label = null;
		int noOfActiveBanners = 0;
		Element rootPoint = document.getRootElement();
		for (Iterator<Element> rootiter = rootPoint.elements().iterator(); rootiter.hasNext();)
		{
			String heroBannerNode = "HeroBanner";
			Element rootelem = (Element) rootiter.next();
			System.out.println("getActiveBanners(RequestContext context) - rootelem Name is ->" + rootelem.getName());
			if (rootelem.getName() == heroBannerNode){
			for (Iterator<Element> iter = rootelem.elements().iterator(); iter.hasNext();)
			{
				Element elem = (Element) iter.next();
				if (elem.getName().equalsIgnoreCase("Expiry_Date"))
				{
					SimpleDateFormat sdf = new SimpleDateFormat(UOBBaseConstants.DATE_FORMAT);
					if (!elem.getStringValue().isEmpty())
					{
						ExpiryDate = elem.getStringValue();
						Date expiryDate = sdf.parse(ExpiryDate);
						System.out.println("getActiveBanners(RequestContext context) - Expiry Date : " + ExpiryDate);
						String currDate = (sdf.format(new Date()).toString()).trim();
						Date currdate = sdf.parse(currDate);
						System.out.println("expiryDate :"+expiryDate);
						System.out.println("currdate :"+currdate);
						if(expiryDate.compareTo(currdate)<=0){
			        		System.out.println("Banner Expired.");
						}
						/*if (ExpiryDate.equalsIgnoreCase(currDate))
							
						{
							System.out.println("Banner Expired.");
						}*/
						else{
							System.out.println("Banner is Active.");
							System.out.println("Active Banner xml : " +rootelem.asXML());
							rootelem.detach();
							root.add(rootelem);
							noOfActiveBanners++;
						}
					}
				}
			}
			}
		}
		System.out.println("Active Banner Count :" + noOfActiveBanners);
		return noOfActiveBanners;
	}
	
	public static void getEvenGreenBanners (Document document, int noOfEGHeroBanner, Element root){
		Element rootPoint = document.getRootElement();
		int counter =0;
		for (Iterator<Element> rootiter = rootPoint.elements().iterator(); rootiter.hasNext();)
		{
			Element rootelem = (Element) rootiter.next();
			System.out.println("getEverGreenBanners(RequestContext context) - rootelem Name is ->" + rootelem.getName());
		if (rootelem.getName() == "EverGreen" && counter<noOfEGHeroBanner){
			rootelem.setName("HeroBanner");
			System.out.println("EverGreen Banner xml : " + rootelem.asXML());
			rootelem.detach();
			root.add(rootelem);
			counter++;
			System.out.println("EverGreen Banner Counter:"+counter);
		}
		}
	}
}
	
	
