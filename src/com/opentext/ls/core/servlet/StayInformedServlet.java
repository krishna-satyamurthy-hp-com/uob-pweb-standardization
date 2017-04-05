package com.opentext.ls.core.servlet;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;

//import javax.servlet.annotation.WebServlet;




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
	@SuppressWarnings("deprecation")
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		LOGGER.debug("Inside StayInformedServlet : doPost");
		
		BufferedReader readCSVbuffer = null;

		try {
			//If to check PATH or DCRPATH parameter has been passed
			if(request.getParameter("path")!=null && !request.getParameter("path").isEmpty()){
			//If CSV Path is passed
			String outputCSV = "";
			
			
			LOGGER.debug("::Local Address:"+request.getRealPath("/"));			
			LOGGER.debug("Reading CSV Path"+ request.getParameter("path"));
			
			
			String fullpath= request.getRealPath("/")+request.getParameter("path");
			LOGGER.debug("Fullpath created"+ fullpath);
			
			readCSVbuffer= new BufferedReader(new FileReader(fullpath));

			//outputCSV = outputCSV.concat(readCSVbuffer.readLine());
			//LOGGER.debug("Display::" + outputCSV);
			
			for (String line = readCSVbuffer.readLine(); line != null; line = readCSVbuffer.readLine()) {
				//LOGGER.debug("Inside loop");
				outputCSV= outputCSV.concat(line);
				outputCSV= outputCSV.concat("\n");
				//LOGGER.debug("Display line::" + line);
			    }
		
			LOGGER.debug("Display String Whole::" + outputCSV);

			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			out.print(outputCSV);
			out.flush();
			LOGGER.debug("Printing CSV done");
			
			}
			//If DCR Path is passed
			else if(request.getParameter("dcrpath")!=null && !request.getParameter("dcrpath").isEmpty()){
			
				String outputCSV = "";
				
				LOGGER.debug("::Local Address:"+request.getRealPath("/"));			
				LOGGER.debug("Reading CSV Path"+ request.getParameter("dcrpath"));
				
				String fullpath= request.getRealPath("/")+request.getParameter("dcrpath");
				
				LOGGER.debug("Fullpath created"+ fullpath);
				
				readCSVbuffer= new BufferedReader(new FileReader(fullpath));

				for (String line = readCSVbuffer.readLine(); line != null; line = readCSVbuffer.readLine()) {
					//LOGGER.debug("Inside loop");
					outputCSV= outputCSV.concat(line);
					outputCSV= outputCSV.concat("\n");
					//LOGGER.debug("Display line::" + line);					
				    }

				response.setContentType("text/xml");
		        PrintWriter out = response.getWriter();
				out.print(outputCSV);
				out.flush();
				LOGGER.debug(outputCSV);
				LOGGER.debug("Printing DCR done");
				
			} else{
				
				LOGGER.debug("No valid parameters has been passed");
			}
								
		} catch (Exception ex) {
			LOGGER.error("Exception caught in StayInformedServlet class"
					+ ex.getMessage());
			ex.printStackTrace();
		} 
	}
}
