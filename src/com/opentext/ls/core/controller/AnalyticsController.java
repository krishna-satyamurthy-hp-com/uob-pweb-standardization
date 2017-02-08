package com.opentext.ls.core.controller;

import java.io.Serializable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Node;

import com.interwoven.livesite.common.web.ForwardAction;
import com.interwoven.livesite.runtime.RequestContext;
import com.interwoven.livesite.runtime.model.page.RuntimePage;
import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.core.util.LSUtils;

public class AnalyticsController implements Serializable {
	private static final long serialVersionUID = -2376353730570815972L;
	private static final Log LOGGER = LogFactory.getLog(AnalyticsController.class);
	ForwardAction fa = null;
	
	public ForwardAction injectAnalyticsScriptOnPage(RequestContext context){
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("Inside injectAnalyticsScriptOnPage");
		}
		if(context.isRuntime()){
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug("Setting page analytics only for runtime pages");
			}
			try{
				context.setParameterString("analyticsDCRPath", UOBBaseConstants.ANALYTICS_DCR_REL_PATH);
				Document analyticsDoc = LSUtils.loadDCRContent(context,"analyticsDCRPath");
				LOGGER.debug("analyticsDoc is "+analyticsDoc.asXML());
				
				final Node analyticsHeadNode = analyticsDoc.selectSingleNode("//head_tag");
				if(analyticsHeadNode != null){
					final String headSection = analyticsHeadNode.getText();
					LOGGER.debug("Analytics head section "+headSection);
					if(headSection != null && !headSection.isEmpty()){
						
						//Cannonical rel link
						
						String finalLink= context.getSite().getHosts().get(0).getHostName().toString(); 
						StringBuilder cannonicalLink= new StringBuilder();
						cannonicalLink.append(finalLink+context.getRequest().getRequestURI().toString());
						
						if(cannonicalLink != null){							
							LOGGER.debug("Cannonical Link Final::: "+cannonicalLink);
							String cannonicalLinkRel= "<link rel='canonical' href='http://" + cannonicalLink + "'  />";
							if(cannonicalLinkRel != null && !cannonicalLinkRel.isEmpty()){
						// ends
						String headSectionFinal= headSection + cannonicalLinkRel;
						context.getPageScopeData().put(RuntimePage.PAGESCOPE_HEAD_INJECTION, headSectionFinal);
						LOGGER.debug("Analytics head section injected");
							}
						}
				}
				}
				
				final Node analyticsBodyStartNode = analyticsDoc.selectSingleNode("//opening_body_tag");
				if(analyticsBodyStartNode != null){
					final String beforeBodySection = analyticsBodyStartNode.getText();
					LOGGER.debug("Analytics before body section "+beforeBodySection);
					if(beforeBodySection != null && !beforeBodySection.isEmpty()){
						context.getPageScopeData().put(RuntimePage.PAGESCOPE_BODY_INJECTION_TOP, beforeBodySection);
						LOGGER.debug("Analytics body top injected");
					}
				}
				
				final Node analyticsBodyBottomNode = analyticsDoc.selectSingleNode("//closing_body_tag");
				if(analyticsBodyBottomNode != null){
					final String bottomBodySection = analyticsBodyBottomNode.getText();
					LOGGER.debug("Analytics bottom body section "+bottomBodySection);
					if(bottomBodySection != null && !bottomBodySection.isEmpty()){
						context.getPageScopeData().put(RuntimePage.PAGESCOPE_BODY_INJECTION_BOTTOM, bottomBodySection);
						LOGGER.debug("Analytics body bottom injected");
					}
				}
				
			}catch(Exception analex){
				if(LOGGER.isErrorEnabled()){
					LOGGER.warn("Exception while injecting analytics "+analex.getMessage());
				}
			}
		}
		return fa;
	}
	
	
}
