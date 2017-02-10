package com.opentext.ts.common;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;

import com.interwoven.livesite.dom4j.Dom4jUtils;

public class LanguageSelector {

	private static final Log LOGGER = LogFactory.getLog(LanguageSelector.class);
	public static void main(String[] args) throws IOException {
		
		String languagesXML = args[0];
		//String languagesXML = "languages.xml"; 
		if(languagesXML != ""){
			final Document languageSelector = Dom4jUtils.newDocument(languagesXML);		
			
			if(languageSelector.hasContent()){
				StringBuilder lanugageOptionSB = new StringBuilder();
				lanugageOptionSB.append("<substitution>");
				@SuppressWarnings("unchecked")
				List<Node> languageNodeList = languageSelector.selectNodes("//Language");
				String languageLabel;
				String languageID;
				Element languageElement;
				for(Node languageNode : languageNodeList){
					languageElement = (Element) languageNode;
					languageID = languageElement.attributeValue("id");
					languageLabel = languageNode.getText();
					
					lanugageOptionSB.append("<option value=\"");
					lanugageOptionSB.append(languageLabel).append("|").append(languageID);
					lanugageOptionSB.append("\" ");
					lanugageOptionSB.append("label=\"");
					lanugageOptionSB.append(languageLabel);
					lanugageOptionSB.append("\" />");
				}
				lanugageOptionSB.append("</substitution>");
				PrintWriter out= new PrintWriter(System.out);
				out.print(lanugageOptionSB.toString());
				out.flush();
			}else{
				LOGGER.error("Lanugages xml file is empty "+languagesXML);
			}
		}else{
			LOGGER.error("Lanugages xml file does not exist "+languagesXML);
		}		
	} 
} 
