package com.opentext.ts.common;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class CountryPopulate {
	private static final Log LOGGER = LogFactory.getLog(CountryPopulate.class);
	
	public static void main (String path[]) throws Exception
	{
		String filename = path[0];
		BufferedReader br = null;
		//FileReader fr = null;
		StringBuilder option = new StringBuilder("<substitution>");
		try {

			String sCurrentLine;
			br = new BufferedReader(new FileReader(filename));

			while ((sCurrentLine = br.readLine()) != null) {
				option.append("<option value=").append("\"").append(sCurrentLine).append("\"").append(" ").append("label=\"").append(sCurrentLine).append("\"/>").append("\n");
			}
			option.append("</substitution>");
			LOGGER.info("XML Output :: "+ option);
	        //System.out.println(option);
			PrintWriter out= new PrintWriter(System.out);
			out.print(option);
			out.flush();

		} catch (IOException e) {

			e.printStackTrace();

		} finally {

			try {
				if (br != null)
					br.close();
			} catch (IOException ex) {

				ex.printStackTrace();

			}

		}
	}
}