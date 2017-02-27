package com.opentext.ls.db.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class PropertyReader  {
	private static Properties properties = new Properties();
	
	//Below is a sample properties file added to JAR
	private static String APP_CONF_PATH = "constants.properties";
	//
	//For UOB Environment enable the below line
	//private static String APP_CONF_PATH = "/prodlib/WSMSGDS2/batch/PWEB/config/env.properties";
	
	private static final transient Log LOGGER = LogFactory.getLog(PropertyReader.class);

	static {
		try {
		//	properties.load(new FileInputStream(System		.getProperty("wsm.lforms.report.env")));
			properties.load(new FileInputStream(APP_CONF_PATH));
		} catch (IOException e) {
			LOGGER.error("Application Properties loading failed.", e);
			e.printStackTrace();
		}
	}

	public static String getSystemPropertyValue(String key){
		LOGGER.info("Reading the value for key : " + key
				+ " from Application properties");
		String value = null;
		value = properties.getProperty(key);
		LOGGER.info("Return the value for key : " + key
				+ " from Application properties:" + value);
		return value;
	}
}
