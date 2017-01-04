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
	private static final transient Log LOGGER = LogFactory
			.getLog(DBConnectionManager.class);
	private static Connection con = null;

	public Connection getRTDBConnection() {
		try {
			if (con == null || con.isClosed()) {
				DataSourceConfig _dataSourceConfig = new DataSourceConfig();
				con = _dataSourceConfig.dataSource().getConnection();
			}
		} catch (SQLException sqlex) {
			LOGGER.error("SQLException while trying to get Runtime DB Connection "
					+ sqlex.getLocalizedMessage());
		}
		return con;
	}

	public Connection getAuthDBConnection() {
		final String livesiteCustomer = UOBBaseConstants.LIVESITE_CUSTOMER_AUTH;
		final String databaseProperties = livesiteCustomer.concat("database.properties");
		final String keyProperties = livesiteCustomer.concat("key.properties");
		//final String databaseProperties = "database.properties";
		//final String keyProperties = "key.properties";
		try {
			if (con == null || con.isClosed()) {
				Properties props = new Properties();
				FileInputStream fis = new FileInputStream(databaseProperties);
				props.load(fis);
				fis.close();
				final String driverName = props
						.getProperty("development.driverClassName");
				final String jdbcURL = props.getProperty("development.url");
				//final String jdbcURL = props.getProperty("development.custom.url");
				final String dbUser = props.getProperty("development.username");
				String dbPwdEnc = props.getProperty("development.password");
				System.out.println("encrypted db password " + dbPwdEnc);
				System.out.println(dbPwdEnc.indexOf("ENC"));
				dbPwdEnc = dbPwdEnc.indexOf("ENC") != -1 ? dbPwdEnc
						.split("\\(")[1] : dbPwdEnc;
				File keyDotProperties = new File(keyProperties);
				DecryptDBPwdUtil decPwdUtil = new DecryptDBPwdUtil();
				decPwdUtil.setKeyPropsFile(keyDotProperties);
				decPwdUtil.setPassword(dbPwdEnc);
				final String dbPwdDec = decPwdUtil.decrypt();

				System.out.println("driver name " + driverName);
				System.out.println("DB URL " + jdbcURL);
				System.out.println("DB User name " + dbUser);
				System.out.println("DB Pwd enc " + dbPwdEnc);
				//System.out.println("DB pwd " + dbPwdDec);

				Class.forName(driverName);
				con = DriverManager.getConnection(jdbcURL, dbUser, dbPwdDec);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return con;
	}

	public Connection getLocalRTDBConnection() {
		final String livesiteCustomer = UOBBaseConstants.LIVESITE_CUSTOMER_AUTH;
		final String databaseProperties = livesiteCustomer.concat("database.properties");
		final String keyProperties = livesiteCustomer.concat("key.properties");
		//final String databaseProperties = "database.properties";
		//final String keyProperties = "key.properties";		
		try {
			if (con == null || con.isClosed()) {
				Properties props = new Properties();
				FileInputStream fis = new FileInputStream(databaseProperties);
				props.load(fis);
				fis.close();
				final String driverName = props
						.getProperty("development.driverClassName");
				final String jdbcURL = props.getProperty("development.custom.url");
				final String dbUser = props.getProperty("development.username");
				String dbPwdEnc = props.getProperty("development.password");
				System.out.println("encrypted db password " + dbPwdEnc);
				System.out.println(dbPwdEnc.indexOf("ENC"));
				dbPwdEnc = dbPwdEnc.indexOf("ENC") != -1 ? dbPwdEnc
						.split("\\(")[1] : dbPwdEnc;
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

	public static void main(String[] args) {
		DBConnectionManager dbCon = new DBConnectionManager();
		dbCon.getAuthDBConnection();
	}
}
