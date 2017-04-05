package com.opentext.ls.db.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class PropertyReader  {
	 private static Properties prop = new Properties();  
     private static String APP_CONF_PATH = "constants.properties";   
     private static final transient Log LOGGER = LogFactory.getLog(PropertyReader.class);
	/*private static Properties properties = new Properties();
	
	
	
	//Below is a sample properties file for testing purpose
	private static String APP_CONF_PATH = "/usr/Interwoven/TeamSite/local/config/constants.properties";
	
	//****
	//**** For UOB Environment enable the below line
	//****
	//private static String APP_CONF_PATH = "/prodlib/WSMSGDS2/batch/PWEB/config/env.properties";
	
	private static final transient Log LOGGER = LogFactory.getLog(PropertyReader.class);

	static {
		try {
			properties.load(new FileInputStream(System.getProperty("wsm.lforms.report.env")));
			properties.load(new FileInputStream(APP_CONF_PATH));
			
		// Load property from classpath **For local use ONLY**
		//	InputStream inputStream;
		//	inputStream = getClass().getClassLoader().getResourceAsStream(APP_CONF_PATH);
		//	properties.load(inputStream);
		//****************************************************	
			
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
	}*/
	
	public Properties getProperties () throws IOException {
      InputStream inputStream;
      //String propFileName = "config.properties";
      inputStream = getClass().getClassLoader().getResourceAsStream(APP_CONF_PATH);
      //Properties prop = new Properties();
      try{  
    	  if (inputStream != null) {
               prop.load(inputStream);
            } 
         else {
              throw new FileNotFoundException("property file '" + APP_CONF_PATH + "' not found in the classpath");
            }
         }
	  catch (Exception e) {
	      LOGGER.debug("Exception: " + e);
	  } 
      return prop;
    }
	
	
	public String getSystemPropertyValue(String key) {                              
              LOGGER.info("Reading the value for key : " + key + " from Application properties");
              String value = null;              
              try {
                   value= getProperties().getProperty(key);
              } catch (IOException e) {
                 // TODO Auto-generated catch block
                 e.printStackTrace();
              }
              LOGGER.info("Return the value for key : " + key + " from Application properties:" + value);
              return value;
               } 
	}
