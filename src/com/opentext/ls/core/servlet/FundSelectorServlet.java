package com.opentext.ls.core.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONObject;

import com.opentext.ls.db.utils.DataSourceConfig;



//import com.opentext.ls.db.ConProvider;

/**
 * Servlet implementation class FundSelectorServlet
 */
//@WebServlet("/wsm/fund-selector.do")
public class FundSelectorServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final transient Log LOGGER = LogFactory.getLog(FundSelectorServlet.class);  
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FundSelectorServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		LOGGER.debug("Inside FundSelectorServlet : doGet");
		doPost(request, response);
	}

	/**
	 * This servlet fetches the fund selector price information from DB and sends a json response of fund selector data
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 * @author OpenText CEM PS APJ
	 * @
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		LOGGER.debug("Inside FundSelectorServlet : doPost");
		Connection con = null;
		JSONArray jArray = new JSONArray();
		JSONObject fundDataJSON = new JSONObject();
		
		try{
					DataSourceConfig _dataSourceConfig=new DataSourceConfig();
		//	con = ConProvider.getConnection();
			
			con = _dataSourceConfig.dataSource().getConnection();
			
			LOGGER.debug("Connection established successfully "+!con.isClosed());
			//Fetch Fund Selector data
			PreparedStatement ps=con.prepareStatement("select * from WSMSG_FUNDSELECTOR");
			ResultSet rs=ps.executeQuery();
			
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			LOGGER.debug("Total column count "+columnCount);
			JSONObject jObj = null;
			String columnName;
			while(rs.next()){
				jObj = new JSONObject();
				for (int i = 1; i <= columnCount; i++ ) {					
					columnName = rsmd.getColumnName(i);
					jObj.put(columnName, rs.getString(columnName));					
				}
				jArray.put(jObj);				
			}
			fundDataJSON.put("funds",jArray );
			LOGGER.debug("Json object "+fundDataJSON);
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();
			out.print(fundDataJSON);
			out.flush();
			
		}catch (SQLException s){
			s.printStackTrace();
			LOGGER.error("SQL Exception caught in  FundSelectorServlet class "+s.getMessage());
		}
		catch(Exception ex){
			LOGGER.error("Exception caught in  FundSelectorServlet class "+ex.getMessage());
			ex.printStackTrace();
		}finally{
			try {	
				if(con!=null && !con.isClosed()){
					System.out.println("Inside FundSelectorServlet finally block");
					LOGGER.debug("Inside FundSelectorServlet finally block");
					con.close();
					System.out.println("Is connection closed successfully "+con.isClosed());
				} 
			}catch (SQLException s) {
				LOGGER.error("SQL Exception caught in finally block of FundSelectorServlet class "+s.getMessage());
				s.printStackTrace();
			}catch(Exception ex){
				LOGGER.error("Exception caught in finally block of FundSelectorServlet class "+ex.getMessage());
				ex.printStackTrace();
			}
		}		
	
	}

}
