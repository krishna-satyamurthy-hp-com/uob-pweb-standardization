package com.opentext.ls.db.utils;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.opentext.ls.core.common.UOBBaseConstants;

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
		final String livesiteCustomer = UOBBaseConstants.LIVESITE_CUSTOMER_AUTH;
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
				if (dbPassword == null) {
					// using oracle wallet
					con = DriverManager.getConnection(dbURL, new Properties());
				} else {
					// using JDBC DB connection URL
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
		final String livesiteCustomer = UOBBaseConstants.LIVESITE_CUSTOMER_AUTH;
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
		dbdriverclass = PropertyReader.getSystemPropertyValue(BatchConstants.dbDriverClassName);
		dbURL = PropertyReader.getSystemPropertyValue(BatchConstants.dbURL);
		dbUsername = PropertyReader.getSystemPropertyValue(BatchConstants.dbUsername);
		dbPassword = PropertyReader.getSystemPropertyValue(BatchConstants.dbPassword);
		walletLocation = PropertyReader.getSystemPropertyValue(BatchConstants.walletLocation);
		tnsAdmin = PropertyReader.getSystemPropertyValue(BatchConstants.tnsAdmin);
		System.setProperty("oracle.net.wallet_location", walletLocation);
		System.setProperty("oracle.net.tns_admin", tnsAdmin);
	}

	public static void main(String[] args) {
		DBConnectionManager dbCon = new DBConnectionManager();
		dbCon.getAuthDBConnection();
	}
}
