package com.opentext.ls.db.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class PropertyReader  {
	private static Properties properties = new Properties();
	private static String APP_CONF_PATH = "/prodlib/WSMSGDS2/batch/PWEB/config/env1.properties";
	private static final Logger logger = LoggerFactory
			.getLogger(PropertyReader.class);

	static {
		try {
		//	properties.load(new FileInputStream(System		.getProperty("wsm.lforms.report.env")));
			properties.load(new FileInputStream(APP_CONF_PATH));
		} catch (IOException e) {
			logger.error("application.properties loaded failed", e);
			e.printStackTrace();
		}
	}

	public static String getSystemPropertyValue(String key){
		logger.info("Reading the value for the key : " + key
				+ " from system properties");
		String value = null;
		value = properties.getProperty(key);
		logger.info("Return the value for the key : " + key
				+ " from system properties:" + value);
		return value;
	}
}
