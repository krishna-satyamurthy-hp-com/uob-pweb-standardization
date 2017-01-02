package com.opentext.ls.core.servlet;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONObject;


/**
 * Servlet implementation class PromoListingServlet
 */
// @WebServlet("/wsm/getpromotions.do")
public class StayInformedServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final transient Log LOGGER = LogFactory
			.getLog(StayInformedServlet.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public StayInformedServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		LOGGER.debug("Inside StayInformedServlet : doGet");
		doPost(request, response);
	}

	/**
	 * This servlet fetches the stay informed csv path
	 * 
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 * @author OpenText CEM PS APJ @
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		LOGGER.debug("Inside StayInformedServlet : doPost");
		
		//JSONArray jArray = new JSONArray();
		//JSONObject promoListJSON = new JSONObject();
		
		BufferedReader readCSVbuffer = null;

		try {
			
			LOGGER.debug("Connection established successfully ");	
			
			String readCSV;
			String outputCSV = null;
			
			readCSVbuffer= new BufferedReader(new FileReader(request.getParameter("path")));
			
			response.setContentType("text/csv");
			while( (readCSV = readCSVbuffer.readLine())!= null){
				
				outputCSV= outputCSV.concat(readCSV);
				
			}
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(outputCSV.getBytes());
			outputStream.flush();
	        outputStream.close();
			
			LOGGER.debug("Total column count ");
					
		} catch (Exception ex) {
			LOGGER.error("Exception caught in  PromoListingServlet class "
					+ ex.getMessage());
			ex.printStackTrace();
		} 
	}
}
