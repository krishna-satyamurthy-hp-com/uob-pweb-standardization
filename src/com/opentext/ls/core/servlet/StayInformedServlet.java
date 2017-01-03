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
 * Servlet implementation class StayInformedServlet
 */
// @WebServlet("/stm/stayinformed.do")
public class StayInformedServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final transient Log LOGGER = LogFactory
			.getLog(StayInformedServlet.class);

	public StayInformedServlet() {
		super();
	}

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
		
		BufferedReader readCSVbuffer = null;

		try {
			//If to check PATH or DCRPATH parameter has been passed
			if(request.getParameter("path")!=null && !request.getParameter("path").isEmpty()){
			//If CSV Path is passed
			String outputCSV = "";
			
			LOGGER.debug("Path Infomration: COntext path "+request.getContextPath() +":: Local Address:"+request.getLocalAddr()+":: Remote Host:"+request.getRemoteAddr());
			
			LOGGER.debug("Reading CSV Path"+ request.getParameter("path"));
			
			String fullpath= "/usr/Interwoven/LiveSiteDisplayServices/runtime/web"+request.getParameter("path");
			LOGGER.debug("Fullpath created"+ fullpath);
			
			readCSVbuffer= new BufferedReader(new FileReader(fullpath));

			//outputCSV = outputCSV.concat(readCSVbuffer.readLine());
			//LOGGER.debug("Display::" + outputCSV);
			
			for (String line = readCSVbuffer.readLine(); line != null; line = readCSVbuffer.readLine()) {

				//LOGGER.debug("Inside loop");
				outputCSV= outputCSV.concat(line);
				//LOGGER.debug("Display line::" + line);
				
			    }
		
			LOGGER.debug("Display String Whole::" + outputCSV);

			response.setContentType("text/csv");
			OutputStream out = response.getOutputStream();
			out.write(outputCSV.getBytes());
	        //PrintWriter out = response.getWriter();
			//out.print(outputCSV);
			out.flush();
			
			LOGGER.debug("Printing CSV done");
			
			}else if(request.getParameter("dcrpath")!=null && !request.getParameter("dcrpath").isEmpty()){
				//If DCR Path is passed
				String outputCSV = "";
				
				LOGGER.debug("Path Infomration: COntext path "+request.getContextPath() +":: Local Address:"+request.getLocalAddr()+":: Remote Host:"+request.getRemoteAddr());
				
				LOGGER.debug("Reading CSV Path"+ request.getParameter("dcrpath"));
				
				String fullpath= "/usr/Interwoven/LiveSiteDisplayServices/runtime/web"+request.getParameter("dcrpath");
				LOGGER.debug("Fullpath created"+ fullpath);
				
				readCSVbuffer= new BufferedReader(new FileReader(fullpath));

				

				response.setContentType("text/csv");
		        PrintWriter out = response.getWriter();
				out.print(outputCSV);
				out.flush();
				
				LOGGER.debug("Printing CSV done");
				
			} else{
				
				LOGGER.debug("No valid parameters has been passed");
			}
			
					
		} catch (Exception ex) {
			LOGGER.error("Exception caught in StayInformedServlet class "
					+ ex.getMessage());
			ex.printStackTrace();
		} 
	}
}
