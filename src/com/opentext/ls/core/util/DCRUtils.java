package com.opentext.ls.core.util;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;

import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.interwoven.livesite.external.PropertyContext;
import com.interwoven.livesite.file.FileDal;
import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.common.UOBBaseConstants;

public class DCRUtils {

	private static final Log LOGGER = LogFactory.getLog(DCRUtils.class);

	
	
	/**
	 * loadFile method is to open the DCR for parsing.
	 * 
	 */
	public static Document loadFile(String rootLocation, String filerelativePath) {
		LOGGER.debug("entering");

		Document document = null;
		String fileLocation = null;
		char separator;

		/* separator based on environment */
		separator = File.separatorChar;
		LOGGER.debug("seperator is : " + separator);

		if (rootLocation != null && filerelativePath != null) {
			/* creating File absolute path */
			fileLocation = rootLocation + separator + filerelativePath;
			fileLocation = fileLocation.replace('/', separator);
			LOGGER.debug("fileLocation is : " + fileLocation);

			/* open the File at specified location. */
			File file = new File(fileLocation);
			if (file.exists()) {
				document = Dom4jUtils.newDocument(file);				
			}else{
				LOGGER.debug("File Not found at location" + fileLocation);
			}
			
		} else {
			LOGGER.error("Not able to construct File Path.");
		}

		LOGGER.debug("exiting");

		return document;
	}

	public static String getRootLocation(RequestContext context) {

		String rootLocation = null;
		String seperator;

		/* To get the root location of the Application */
		FileDal dal = context.getFileDal();
		rootLocation = dal.getRoot();
		seperator = String.valueOf(dal.getSeparator());

		try {

			LOGGER.debug("Root Location is: " + rootLocation);

			LOGGER.debug("value of isprteview is: " + context.isPreview());
			LOGGER.debug("value of isRuntime is: " + context.isRuntime());

			/*
			 * If File is in Teamsite Environment, Sever Name will be replaced
			 * by teamsite mount drive e.g. 'Y:'
			 */
			if (!context.isRuntime()) {
				rootLocation = rootLocation.substring(
						rootLocation.indexOf(seperator + seperator) + 2,
						(rootLocation.length()));
				rootLocation = rootLocation.replaceFirst(
						rootLocation.substring(0,
								rootLocation.indexOf(seperator)),
						UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE);

				LOGGER.debug("rootLocation now is: " + rootLocation);

			}

		} catch (Exception e) {
			LOGGER.error("Error is " + e);
		}

		return rootLocation;
	}

	public static String getRootLocation(PropertyContext context) {

		String rootLocation = null;
		String seperator;

		/* To get the root location of the Application */
		FileDal dal = context.getFileDAL();
		rootLocation = dal.getRoot();
		seperator = String.valueOf(dal.getSeparator());

		rootLocation = rootLocation.substring(
				rootLocation.indexOf(seperator + seperator) + 2,
				(rootLocation.length()));
		rootLocation = rootLocation.replaceFirst(
				rootLocation.substring(0, rootLocation.indexOf(seperator)),
				UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE);

		return rootLocation;
	}

	// Get Runtime web location

	public static String getRuntimeHome() {
		final String livesiteCustomer = UOBBaseConstants.LIVESITE_CUSTOMER_AUTH;
		final String odProperties = livesiteCustomer
				.concat("opendeploy.properties");
		String location = "";

		try {

			Properties props = new Properties();
			FileInputStream fis = new FileInputStream(odProperties);
			props.load(fis);
			fis.close();
			location = props.getProperty("opendeploy.runtimeHome");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return location;
	}
	
}
