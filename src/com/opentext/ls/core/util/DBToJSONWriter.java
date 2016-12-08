package com.opentext.ls.core.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.db.ConProvider1;

public class DBToJSONWriter {
	
	private static final Log LOGGER = LogFactory.getLog(DBToJSONWriter.class);
	private static final String filePath = "C:\\temp\\funddata.json";
	//private static final String filePath = "/opt/UPS/rss2email/userdatafromdb.json";
	static File file = new File(filePath);
	
	
	public static void main(String[] args) {
	//public Document test(RequestContext context){
			JSONArray jArray = new JSONArray();
			JSONObject userDataJSON = new JSONObject();
			
			try{
				Connection con=ConProvider1.getConnection();
				PreparedStatement ps=con.prepareStatement("select * from WSMSG_FUNDSELECTOR");
				ResultSet rs=ps.executeQuery();
				while(rs.next()){
					 JSONObject jObj = new JSONObject();
					 jObj.put("FundCode", rs.getString("FUND_CODE"));
					 jObj.put("FundDescription", rs.getString("FUND_DESCRIPTION"));
					 jObj.put("FundManager", rs.getString("FUND_MANAGER"));
					 jObj.put("FundName", rs.getString("FUND_NAME"));
					 jObj.put("LaunchDate", rs.getString("LAUNCH_DATE"));
					 jObj.put("MinimumInvestmentAmount", rs.getString("MINIMUM_INVESTMENT_INITIAL"));
					 jObj.put("SubsequentInvestmentAmount", rs.getString("MINIMUM_INVESTMENT_SUBSEQUENT"));
					 jObj.put("CPFIS", rs.getString("CPFIS"));
					 jObj.put("GeographicRegion", rs.getString("GEOGRAPHIC_REGION"));
					 jObj.put("SpecialistSector", rs.getString("SPECIALIST_SECTOR"));
					 jObj.put("AssetType", rs.getString("ASSET_TYPE"));
					 jObj.put("ProductRiskClassification", rs.getString("PRODUCT_RISK_CLASSIFICATIONS"));
					 jObj.put("FactSheetURL", rs.getString("LINK_TO_FACT_SHEET"));
					 jObj.put("ProspectusURL", rs.getString("LINK_TO_PROSPECTUS"));
					 jObj.put("ProductHighlightsURL", rs.getString("LINK_TO_PRODUCT_HIGHLIGHTS"));
					 jObj.put("AnnualReportURL", rs.getString("LINK_TO_ANNUAL_REPORT"));
					 jObj.put("PIB", rs.getString("PIB"));
					 jObj.put("NAV2", rs.getString("NAV2"));
					 jObj.put("NAV", rs.getString("NAV"));
					 jObj.put("AsAtDate", rs.getString("AS_AT_DATE"));
					 jArray.put(jObj);
				}
				con.close();
				userDataJSON.put("funds",jArray );
				LOGGER.debug("\nJSON Object: " + userDataJSON);
			}catch(Exception e){LOGGER.debug(e);}
			
			
			try {
					writeToFile(userDataJSON);
				} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				}	
			//return null;
			
		}
	
	public static void writeToFile(JSONObject userDataJSON) throws IOException, JSONException{
		if (!file.exists() || file.length()==0) {
			LOGGER.debug("Creating JSON File..");
				file.createNewFile();
				}
		FileWriter fw = new FileWriter(file.getAbsoluteFile());
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(userDataJSON.toString());
		bw.close();
		LOGGER.debug("Successfully Copied JSON Object to File...");
		
	} 
}
