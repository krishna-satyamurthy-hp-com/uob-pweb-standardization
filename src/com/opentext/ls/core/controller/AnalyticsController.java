package com.opentext.ls.core.controller;

import com.interwoven.livesite.common.web.ForwardAction;
import com.interwoven.livesite.runtime.RequestContext;
import com.interwoven.livesite.runtime.model.page.RuntimePage;
import com.opentext.ls.core.cache.JCSCacheUtils;
import com.opentext.ls.db.utils.PropertyReader;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Node;

import java.io.Serializable;
import java.net.URI;

public class AnalyticsController implements Serializable {

	private static final long serialVersionUID = -2376353730570815972L;
	private static final Log LOGGER = LogFactory.getLog(AnalyticsController.class);
    private Document analyticsDoc = null;
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

                PropertyReader is = new PropertyReader();
                context.setParameterString("analyticsDCRPath", is.getSystemPropertyValue("ANALYTICS_DCR_REL_PATH"));
                context.setParameterString("branchAnalyticsDCRPath", getBranchAnalyticsDCRPath(context.getParameterString("analyticsDCRPath")));
                String analyticsPath = context.getParameterString("branchAnalyticsDCRPath");
                analyticsDoc = JCSCacheUtils.loadDocumentFromCache(context, "branchAnalyticsDCRPath");
                if (analyticsDoc == null) {
                	analyticsDoc = JCSCacheUtils.loadDocumentFromCache(context, "analyticsDCRPath");
                	analyticsPath = context.getParameterString("analyticsDCRPath");
                }

                if (LOGGER.isDebugEnabled()) {
                	LOGGER.debug("analytics file path: " + analyticsPath);
                    LOGGER.debug("analyticsDoc is " + analyticsDoc.asXML());
                }

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

	private String getBranchAnalyticsDCRPath(String commonAnalyticsDCRPath) {
		String branchPath = context.getSite().getBranch();
		branchPath = branchPath.substring(branchPath.indexOf("default/main/") + 13);
		branchPath = branchPath.replace("/", "-");
		branchPath = branchPath.toLowerCase();
		return  commonAnalyticsDCRPath.substring(0, commonAnalyticsDCRPath.lastIndexOf("/") + 1) + 
				branchPath + "-" + commonAnalyticsDCRPath.substring(commonAnalyticsDCRPath.lastIndexOf("/") + 1);
	}

}
