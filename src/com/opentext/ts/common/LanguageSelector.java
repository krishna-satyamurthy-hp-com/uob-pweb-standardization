package com.opentext.ts.common;

import com.interwoven.livesite.dom4j.Dom4jUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;

import java.io.File;
import java.io.PrintWriter;
import java.util.List;

public class LanguageSelector {

	private static final Log LOGGER = LogFactory.getLog(LanguageSelector.class);
	public static void main(String[] args) {
		
		String languagesXML = args[0];
		//String languagesXML = "languages.xml"; 
		LOGGER.error("Languages.xml "+languagesXML);
		if(languagesXML != ""){
			final File languagesFile = new File(languagesXML);
			if(languagesFile.exists() && languagesFile.canRead()){
				final Document languageSelector = Dom4jUtils.newDocument(languagesFile);		
				
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
				LOGGER.error("Lanugages xml file does not have enough permissions to read "+languagesXML);
			}
		}else{
			LOGGER.error("Lanugages xml file does not exist "+languagesXML);
		}
	} 
} 
