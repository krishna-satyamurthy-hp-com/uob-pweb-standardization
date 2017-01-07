package com.opentext.ls.core.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;

import com.interwoven.livesite.runtime.RequestContext;
import com.interwoven.livesite.runtime.model.page.RuntimePage;

public class LSUtils {
	
	private static final transient Log LOGGER = LogFactory.getLog(LSUtils.class);
	
	/**
	 * injectMetaIntoPageHead will inject metaname and metavalue into the page header
	 * @param context
	 * @param metaName
	 * @param metaValue
	 */
	public static void injectMetaIntoPageHead(RequestContext context, String metaName, String metaValue){
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
		context.getPageScopeData().put(RuntimePage.PAGESCOPE_HEAD_INJECTION, metaString);
		LOGGER.debug("After injection metaString "+metaString);
		LOGGER.debug("Exit injectMetaIntoPageHead");
	}
	
	public static Document loadDCRContent(RequestContext context) {
		LOGGER.debug("entering loadDCR method");
		Document document = null;
		String rootLocation = DCRUtils.getRootLocation(context);
		try {
			@SuppressWarnings("deprecation")
			final String filerelativePath = context.getParameterString("dcrPath");
			LOGGER.debug("filerelativePath is " + filerelativePath);
			document = DCRUtils.loadFile(rootLocation, filerelativePath);
		} catch (Throwable ex) {
			LOGGER.error("Under Catch Error from loadDCR function : ", ex);
		}
		LOGGER.debug("exiting loadDCR method");
		return document;
	}
}
