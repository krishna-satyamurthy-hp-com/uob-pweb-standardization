package com.opentext.ls.core.util;

import com.interwoven.livesite.runtime.RequestContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;

public class LSUtils {
	
	private static final transient Log LOGGER = LogFactory.getLog(LSUtils.class);
	
	/**
	 * injectMetaIntoPageHead will inject metaname and metavalue into the page header
	 * @param metaName
	 * @param metaValue
	 */
	public static String createMetaString(String metaName, String metaValue){
		LOGGER.debug("Enter injectMetaIntoPageHead");
		LOGGER.debug("metaName "+metaName);
		LOGGER.debug("metaValue "+metaValue);
		StringBuilder metaStringSB = new StringBuilder();
		metaStringSB.append("<meta name=\"");
		metaStringSB.append(metaName);
		metaStringSB.append("\" ");
		metaStringSB.append("content=\"");
		metaStringSB.append(metaValue);
		metaStringSB.append("\" />");
		final String metaString = metaStringSB.toString();		
		return metaString;
	}
	
	public static Document loadDCRContent(RequestContext context, String dcrPathParamName) {
		LOGGER.debug("entering loadDCR method");
		Document document = null;
		String rootLocation = DCRUtils.getRootLocation(context);
		try {
			@SuppressWarnings("deprecation")
			final String filerelativePath = context.getParameterString(dcrPathParamName);
			LOGGER.debug("filerelativePath is " + filerelativePath);
			document = DCRUtils.loadFile(rootLocation, filerelativePath);
		} catch (Throwable ex) {
			LOGGER.error("Under Catch Error from loadDCR function : ", ex);
		}
		LOGGER.debug("exiting loadDCR method");
		return document;
	}
}
