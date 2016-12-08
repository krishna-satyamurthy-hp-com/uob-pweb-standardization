package com.opentext.ls.core.servlet;

import com.opentext.ls.db.ConProvider;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

public class TestDBConnection {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Connection con = null;
		JSONArray jArray = new JSONArray();
		JSONObject fundDataJSON = new JSONObject();
		
		try{
			con = ConProvider.getConnection();
			System.out.println("Connection established successfully "+!con.isClosed());
			
			//Fetch Fund Selector data
			PreparedStatement ps=con.prepareStatement("select * from WSMSG_FUNDSELECTOR");
			ResultSet rs=ps.executeQuery();
			
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			
			System.out.println("Total column count "+columnCount);
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
