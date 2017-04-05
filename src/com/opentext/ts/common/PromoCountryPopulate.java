package com.opentext.ts.common;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;

public class PromoCountryPopulate {
private static final Log LOGGER = LogFactory.getLog(PromoCountryPopulate.class);

public static void main(String[] args) { 

		String filename = args[0]; 
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

		}
	}

}
