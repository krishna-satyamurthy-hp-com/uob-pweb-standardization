package com.opentext.ls.db.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class PropertyReader  {
	private static Properties properties = new Properties();
	private static String APP_CONF_PATH = "/prodlib/WSMSGDS2/batch/PWEB/config/env.properties";
	private static final transient Log LOGGER = LogFactory.getLog(PropertyReader.class);

	static {
		try {
		//	properties.load(new FileInputStream(System		.getProperty("wsm.lforms.report.env")));
			properties.load(new FileInputStream(APP_CONF_PATH));
		} catch (IOException e) {
			LOGGER.error("application.properties loaded failed", e);
			e.printStackTrace();
		}
	}

	public static String getSystemPropertyValue(String key){
		LOGGER.info("Reading the value for the key : " + key
				+ " from system properties");
		String value = null;
		value = properties.getProperty(key);
		LOGGER.info("Return the value for the key : " + key
				+ " from system properties:" + value);
		return value;
	}
}
