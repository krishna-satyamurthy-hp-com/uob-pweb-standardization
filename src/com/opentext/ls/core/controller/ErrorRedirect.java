package com.opentext.ls.core.controller;

import java.net.URI;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.interwoven.livesite.common.web.ForwardAction;
import com.interwoven.livesite.runtime.RequestContext;


public class ErrorRedirect {
	private static final Log LOGGER = LogFactory.getLog(ErrorRedirect.class);
	ForwardAction fa = null;

public ForwardAction doRedirect(RequestContext context){
		
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("Inside 404 -ErrorRedirect:: doRedirect call.");
		}
		if(context.isRuntime()){
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug("Setting error redirect only for 404 errors.");
			}
			try{
			String pageSiteLoc= context.getRequest().getRequestURI().toString();
			
			LOGGER.debug("Error Page URI::" +pageSiteLoc);
			
			String rdPageLoc= pageSiteLoc.substring(0,pageSiteLoc.lastIndexOf('/'));
			
			URI uri= null;
			uri = new URI(
					context.getRequest().getScheme().toString() ,
					null, 
					context.getSite().getHosts().get(0).getHostName().toString(), 
					context.getRequest().getServerPort(), 
					rdPageLoc , 
					null, 
					null 
					);
			
			LOGGER.debug("Redirecting URL Created ::: "+ uri.toURL().toString());
			//LOGGER.debug("Page Redirect URI::" +rdPageLoc);
			
			context.getResponse().encodeRedirectURL(uri.toURL().toString());
			context.setRedirectUrl(uri.toURL().toString());
			context.getRedirectUrl();
			LOGGER.debug("Performing Page Redirect Now::" +context.getRedirectUrl());
			context.getResponse().sendRedirect(context.getRedirectUrl());
			LOGGER.debug("Redirection Completed. Exiting call");
			//context.getPage().getComponentCache().clear();
			//LOGGER.debug("Page Redirect URL::" + context.getPage().getComponents().addAll(arg0));
				
			}catch(Exception e1){
				
				LOGGER.warn("Exception encountered during Error 404 Redirect:: Msg: "+e1.getMessage());
				
			}		
	}
		return fa;
}
}
