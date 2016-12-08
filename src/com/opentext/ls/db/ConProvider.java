package com.opentext.ls.db;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class ConProvider {
	private static final Log LOGGER = LogFactory.getLog(ConProvider.class);
	
	static Properties dbprop = getDBdetails();
	static String driverClass = dbprop.getProperty("MSSQLJDBC.driver");
	static String url = dbprop.getProperty("MSSQLJDBC.url");
	static String username = dbprop.getProperty("MSSQLJDBC.username");
	static String password = dbprop.getProperty("MSSQLJDBC.password");
	
		public static Connection getConnection(){
			Connection con = null;
			try{
				System.out.println("Hi"+ driverClass + " " + url + " " + username + " " + password );
				//LOGGER.error(driverClass + " " + url + " " + username + " " + password );
				Class.forName(driverClass);
				con=DriverManager.getConnection(url, username, password);				
				}
			catch(Exception e){
				LOGGER.error(e);
				e.printStackTrace();
				}
			
			if (con != null) {
				System.out.println("You made it, take control your database now!");
				LOGGER.error("You made it, take control your database now!");
			} else {
				System.out.println("Failed to make connection!");
				LOGGER.error("Failed to make connection!");
			}
			return con;
			
		}
		
		public static Properties getDBdetails (){
			InputStream inputStream = null;
			String propFileName = "jdbc.properties";						
			Properties prop = new Properties();
			try 
				{
				inputStream = ConProvider.class.getClassLoader().getResourceAsStream(propFileName);
				if (inputStream != null)
					{
						prop.load(inputStream);
					}
				}
			catch (Exception e) 
			{
				LOGGER.error("Exception: " + e);
			} 	
			return prop;
		}
}

