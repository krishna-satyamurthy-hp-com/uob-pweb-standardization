package com.opentext.ls.core.display.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.interwoven.livesite.common.web.ForwardAction;
import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.core.util.DCRUtils;
import com.opentext.ls.db.ConProvider;

public class DBToJSONWriterPreController {
	
	private static final Log LOGGER = LogFactory.getLog(DBToJSONWriterPreController.class);
	//private static final String filePath = "C:\\temp\\funddata.json";
	//private static final String fundsJSONFilePath = "iwov-resources/json/pnr_unit_trusts.json";
	
	public ForwardAction handleExecution(RequestContext context) throws IOException, JSONException  {
		LOGGER.error("entering");
		String seperator = String.valueOf(context.getFileDal().getSeparator());
		String rootLocation = DCRUtils.getRootLocation(context);
		System.out.println("Files WA path : "+rootLocation);
		LOGGER.error("Files WA path : "+rootLocation);
		String jsonOutputFilePath = rootLocation.concat(seperator).concat(UOBBaseConstants.FUNDS_JSON_FILE_PATH);
		System.out.println("Output JSON File path : "+jsonOutputFilePath);
		LOGGER.error("Output JSON File path : "+jsonOutputFilePath);
		
		File jsonOutputFile = new File(jsonOutputFilePath);
		
		JSONArray jArray = new JSONArray();
		JSONObject fundDataJSON = new JSONObject();
		
		try{
			Connection con=ConProvider.getConnection();
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
			fundDataJSON.put("funds",jArray );
			LOGGER.error("\nJSON Object: " + fundDataJSON);
			writeToFile(fundDataJSON, jsonOutputFile);
		}catch(Exception e){
			LOGGER.debug(e);
		}	
		return null;
}


public static void writeToFile(JSONObject userDataJSON, File jsonOutputFile) throws IOException, JSONException{
	if (!jsonOutputFile.exists() || jsonOutputFile.length()==0) {
		LOGGER.error("Creating JSON File..");
		jsonOutputFile.createNewFile();
			}
	FileWriter fw = new FileWriter(jsonOutputFile);
	BufferedWriter bw = new BufferedWriter(fw);
	bw.write(userDataJSON.toString());
	bw.close();
	LOGGER.error("Successfully Copied JSON Object to File...");
}	
}