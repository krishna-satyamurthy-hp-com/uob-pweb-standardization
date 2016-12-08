package com.opentext.ls.core.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.opentext.ls.db.ConProvider;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Servlet implementation class FundSelectorServlet
 */
@WebServlet("/FundSelectorServlet")
public class FundSelectorServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final transient Log LOGGER = LogFactory.getLog(FundSelectorServlet.class);  
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FundSelectorServlet() {
        super();
        // TODO Auto-generated constructor stub
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
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		LOGGER.debug("Inside FundSelectorServlet : doPost");
		// TODO Auto-generated method stub
		Connection con = null;
		JSONArray jArray = new JSONArray();
		JSONObject fundDataJSON = new JSONObject();
		
		try{
			con = ConProvider.getConnection();
			System.out.println("Connection established successfully "+!con.isClosed());
			LOGGER.debug("Connection established successfully "+!con.isClosed());
			//Fetch Fund Selector data
			PreparedStatement ps=con.prepareStatement("select * from WSMSG_FUNDSELECTOR");
			ResultSet rs=ps.executeQuery();
			
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			
			System.out.println("Total column count "+columnCount);
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
			//LOGGER.error("\nJSON Object: " + fundDataJSON);
			System.out.println("Json object "+fundDataJSON);
			LOGGER.debug("Json object "+fundDataJSON);
			response.setContentType("application/json");
			// Get the printwriter object from response to write the required json object to the output stream      
			PrintWriter out = response.getWriter();
			// Assuming your json object is **jsonObject**, perform the following, it will return your json object  
			out.print(fundDataJSON);
			out.flush();
			
		}catch (SQLException s){
			System.out.println("SQL Exception occured :: "+s);
			s.printStackTrace();
		}
		catch(Exception ex){
			System.out.println(ex);
			ex.printStackTrace();
		}finally{
			try {	
				if(con!=null && !con.isClosed()){
					System.out.println("Inside FundSelectorServlet finally block");
					LOGGER.debug("Inside FundSelectorServlet finally block");
					con.close();
					System.out.println("Is connection closed successfully "+con.isClosed());
				} 
			}catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}catch(Exception ex){
				System.out.println(ex);
				ex.printStackTrace();
			}
		}		
	
	}

}
