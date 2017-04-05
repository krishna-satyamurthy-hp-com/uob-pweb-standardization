package com.opentext.ls.db.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

//import com.opentext.ls.core.common.UOBBaseConstants;

public class DBConnectionManager {
	private static final transient Log LOGGER = LogFactory.getLog(DBConnectionManager.class);
	private static Connection con = null;
	// Added for Oracle Wallet Implementation
	private static String dbURL = null;
	private static String dbUsername = null;
	private static String dbPassword = null;

	private static String dbdriverclass = null;
	private static String walletLocation = null;
	private static String tnsAdmin = null;

	PropertyReader is= new PropertyReader();
	
	// Added for Oracle Wallet Implementation
	public Connection getRTDBConnection() {
		try {
			if (con == null || con.isClosed()) {
				DataSourceConfig _dataSourceConfig = new DataSourceConfig();
				con = _dataSourceConfig.dataSource().getConnection();
			}
		} catch (SQLException sqlex) {
			LOGGER.error("SQLException while trying to get Runtime DB Connection " + sqlex.getLocalizedMessage());
		}
		return con;
	}

	public Connection getAuthDBConnection() {
		//final String livesiteCustomer = UOBBaseConstants.LIVESITE_CUSTOMER_AUTH;
		final String livesiteCustomer = is.getSystemPropertyValue("LIVESITE_CUSTOMER_AUTH");
		final String databaseProperties = livesiteCustomer.concat("database.properties");
		final String keyProperties = livesiteCustomer.concat("key.properties");
		// final String databaseProperties = "database.properties";
		// final String keyProperties = "key.properties";
		try {
			if (con == null || con.isClosed()) {
				Properties props = new Properties();
				FileInputStream fis = new FileInputStream(databaseProperties);
				props.load(fis);
				fis.close();
				final String driverName = props.getProperty("development.driverClassName");
				final String jdbcURL = props.getProperty("development.url");
				// final String jdbcURL =
				// props.getProperty("development.custom.url");
				final String dbUser = props.getProperty("development.username");
				String dbPwdEnc = props.getProperty("development.password");
				System.out.println("encrypted db password " + dbPwdEnc);
				System.out.println(dbPwdEnc.indexOf("ENC"));
				dbPwdEnc = dbPwdEnc.indexOf("ENC") != -1 ? dbPwdEnc.split("\\(")[1] : dbPwdEnc;
				File keyDotProperties = new File(keyProperties);
				DecryptDBPwdUtil decPwdUtil = new DecryptDBPwdUtil();
				decPwdUtil.setKeyPropsFile(keyDotProperties);
				decPwdUtil.setPassword(dbPwdEnc);
				final String dbPwdDec = decPwdUtil.decrypt();

				System.out.println("driver name " + driverName);
				System.out.println("DB URL " + jdbcURL);
				System.out.println("DB User name " + dbUser);
				System.out.println("DB Pwd enc " + dbPwdEnc);
				// System.out.println("DB pwd " + dbPwdDec);

				Class.forName(driverName);
				con = DriverManager.getConnection(jdbcURL, dbUser, dbPwdDec);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return con;
	}

	public Connection getConnectionUsingOracleWallet() {
		if (con == null) {
			try {
				readOracleWalletConfig();
				Class.forName(dbdriverclass);
				LOGGER.debug("dbPassword "+dbPassword);
								
				// using oracle wallet
				LOGGER.debug("Using oracle wallet for connection ");
				LOGGER.debug("dbURL "+dbURL);
				LOGGER.debug("wallet location from system "+System.getProperty("oracle.net.wallet_location"));
				LOGGER.debug("tns admin from system "+System.getProperty("oracle.net.tns_admin"));
				con = DriverManager.getConnection(dbURL, new Properties());
				
				if(con == null){
					// using JDBC DB connection URL
					LOGGER.debug("Connection from wallet is null.. resorting to use jdbc url");
					con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);
					
				}
				con.setAutoCommit(false);
			} catch (ClassNotFoundException e) {
				LOGGER.error("Exception in loading DataBase Driver class " + dbdriverclass + ". " + e.getMessage());

			} catch (SQLException e) {
				LOGGER.error("Exception in creating the DB Connection. " + e.getMessage());

			}
		}
		return con;
	}

	public Connection getLocalRTDBConnection() {
		//final String livesiteCustomer = UOBBaseConstants.LIVESITE_CUSTOMER_AUTH;
		final String livesiteCustomer = is.getSystemPropertyValue("LIVESITE_CUSTOMER_AUTH");
		final String databaseProperties = livesiteCustomer.concat("database.properties");
		final String keyProperties = livesiteCustomer.concat("key.properties");
		// final String databaseProperties = "database.properties";
		// final String keyProperties = "key.properties";
		try {
			if (con == null || con.isClosed()) {
				Properties props = new Properties();
				FileInputStream fis = new FileInputStream(databaseProperties);
				props.load(fis);
				fis.close();
				final String driverName = props.getProperty("development.driverClassName");
				final String jdbcURL = props.getProperty("development.custom.url");
				final String dbUser = props.getProperty("development.username");
				String dbPwdEnc = props.getProperty("development.password");
				System.out.println("encrypted db password " + dbPwdEnc);
				System.out.println(dbPwdEnc.indexOf("ENC"));
				dbPwdEnc = dbPwdEnc.indexOf("ENC") != -1 ? dbPwdEnc.split("\\(")[1] : dbPwdEnc;
				File keyDotProperties = new File(keyProperties);
				DecryptDBPwdUtil decPwdUtil = new DecryptDBPwdUtil();
				decPwdUtil.setKeyPropsFile(keyDotProperties);
				decPwdUtil.setPassword(dbPwdEnc);
				final String dbPwdDec = decPwdUtil.decrypt();

				System.out.println("driver name " + driverName);
				System.out.println("DB URL " + jdbcURL);
				System.out.println("DB User name " + dbUser);
				System.out.println("DB Pwd enc " + dbPwdEnc);
				System.out.println("DB pwd " + dbPwdDec);

				Class.forName(driverName);
				con = DriverManager.getConnection(jdbcURL, dbUser, dbPwdDec);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return con;
	}

	private static void readOracleWalletConfig() {
		PropertyReader is= new PropertyReader();
		dbdriverclass = is.getSystemPropertyValue(BatchConstants.dbDriverClassName);
		dbURL = is.getSystemPropertyValue(BatchConstants.dbURL);
		dbUsername = is.getSystemPropertyValue(BatchConstants.dbUsername);
		dbPassword = is.getSystemPropertyValue(BatchConstants.dbPassword);
		walletLocation = is.getSystemPropertyValue(BatchConstants.walletLocation);
		tnsAdmin = is.getSystemPropertyValue(BatchConstants.tnsAdmin);
		System.setProperty("oracle.net.wallet_location", walletLocation);
		System.setProperty("oracle.net.tns_admin", tnsAdmin);
	}

	public static void main(String[] args) {
		DBConnectionManager dbCon = new DBConnectionManager();
		dbCon.getAuthDBConnection();
	}
}
