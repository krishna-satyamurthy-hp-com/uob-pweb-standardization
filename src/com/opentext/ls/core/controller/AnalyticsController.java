package com.opentext.ls.core.controller;

import java.io.Serializable;
import java.net.URI;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Node;

import com.interwoven.livesite.common.web.ForwardAction;
import com.interwoven.livesite.runtime.RequestContext;
import com.interwoven.livesite.runtime.model.page.RuntimePage;
//import com.opentext.ls.core.common.UOBBaseConstants;
import com.opentext.ls.core.util.LSUtils;
import com.opentext.ls.db.utils.PropertyReader;

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
				//context.setParameterString("analyticsDCRPath", UOBBaseConstants.ANALYTICS_DCR_REL_PATH);
				context.setParameterString("analyticsDCRPath", PropertyReader.getSystemPropertyValue("ANALYTICS_DCR_REL_PATH"));
				Document analyticsDoc = LSUtils.loadDCRContent(context,"analyticsDCRPath");
				LOGGER.debug("analyticsDoc is "+analyticsDoc.asXML());
				
				//Cannonical rel link
				LOGGER.debug("Analytics getScheme::: "+ context.getRequest().getScheme());
				LOGGER.debug("Analytics getServerName::: "+ context.getRequest().getServerName());
				LOGGER.debug("Analytics getServerPort::: "+ context.getRequest().getServerPort());
				LOGGER.debug("Analytics getPageName::: "+ context.getPageName());
				LOGGER.debug("Analytics getPagePath::: "+ context.getSite().getPath());
				
			
				String var = context.getSite().getPath();
				var = var.substring(var.indexOf("sites/")+5);
				
				URI uri= null;
				/*
				uri = new URI(
						context.getRequest().getScheme().toString() ,
						null, 
						context.getSite().getHosts().get(0).getHostName().toString(), 
						context.getRequest().getServerPort(), 
						var+ "/" + context.getPageName()+".page" , 
						null, 
						null 
						);
				*/
				uri = new URI(
						context.getRequest().getScheme().toString() ,
						null,
						context.getRequest().getServerName().toString(),
						context.getRequest().getServerPort(),
						var+ "/" + context.getPageName()+".page", 
						null,
						null
						);
						
				LOGGER.debug("URI ::: "+ uri);
				LOGGER.debug("Canonical Link URL ::: "+ uri.toURL().toString());
				
				final Node analyticsHeadNode = analyticsDoc.selectSingleNode("//head_tag");
				if(analyticsHeadNode != null && !analyticsHeadNode.getText().isEmpty()){
					final String headSection = analyticsHeadNode.getText();
					LOGGER.debug("Analytics head section "+headSection);
					if(headSection != null && !headSection.isEmpty()){
						if(uri != null){							
							
							String cannonicalLinkRel= "<link rel='canonical' href='" + uri.toURL().toString() + "'  />";
							if(cannonicalLinkRel != null && !cannonicalLinkRel.isEmpty()){
						// ends
						String headSectionFinal= headSection + cannonicalLinkRel;
						context.getPageScopeData().put(RuntimePage.PAGESCOPE_HEAD_INJECTION, headSectionFinal);
						LOGGER.debug("Analytics head section injected");
							}
						}
				   }
				}else{
					if(uri != null && !uri.toString().isEmpty()){													
						String cannonicalLinkRel= "<link rel='canonical' href='" + uri.toURL().toString() + "'  />";
					String headSectionFinal= cannonicalLinkRel;
					context.getPageScopeData().put(RuntimePage.PAGESCOPE_HEAD_INJECTION, headSectionFinal);
					LOGGER.debug("Canonical Link in Head section injected");
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
	
	//*****************For non Analytics Sites Head Section script injection***************
	
	public ForwardAction injectNonAnalyticsScriptOnPage(RequestContext context){
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("Inside injectNonAnalyticsScriptOnPage");
		}
		if(context.isRuntime()){
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug("Setting page for non-analytics Head section script injection (only for runtime pages)");
			}
			try{
				LOGGER.debug("Analytics getScheme::: "+ context.getRequest().getScheme());
				LOGGER.debug("Analytics getPageName::: "+ context.getPageName());
				LOGGER.debug("Analytics getPath::: "+ context.getSite().getPath());
			
				String var = context.getSite().getPath();
				var = var.substring(var.indexOf("sites/")+5);
				
				URI uri= null;
				uri = new URI(
						context.getRequest().getScheme().toString() ,
						null, 
						context.getSite().getHosts().get(0).getHostName().toString(), 
						context.getRequest().getServerPort(), 
						var+ "/" + context.getPageName()+".page" , 
						null, 
						null 
						);
				
				LOGGER.debug("URI ::: "+ uri);
				LOGGER.debug("Canonical Link URL ::: "+ uri.toURL().toString());
				
				if(uri != null){							
					
					String cannonicalLinkRel= "<link rel='canonical' href='" + uri.toURL().toString() + "'  />";
					if(cannonicalLinkRel != null && !cannonicalLinkRel.isEmpty()){
				// ends
				String headSectionFinal= cannonicalLinkRel;
				context.getPageScopeData().put(RuntimePage.PAGESCOPE_HEAD_INJECTION, headSectionFinal);
				LOGGER.debug("Canonical Link in Head section injected");
					}
				}
				
			}catch(Exception analex){
				if(LOGGER.isErrorEnabled()){
					LOGGER.warn("Exception while injecting HeadSection script "+analex.getMessage());
				}
			}
			}
		
	return fa;
	}
	
	
}
