package com.opentext.ls.core.util;

import com.interwoven.livesite.runtime.RequestContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.net.URI;


public class ErrorRedirect {
	private static final Log LOGGER = LogFactory.getLog(ErrorRedirect.class);
	
	public static void doRedirect(RequestContext context){
		
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("Inside ErrorRedirect:: doRedirect call.");
		}
		if(context.isRuntime()){
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug("Setting error redirect only for runtime errors");
			}
			try{
			String pageSiteLoc= context.getRequest().getRequestURI().toString();
			
			LOGGER.debug("Setting error redirect only for runtime errors");
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
			
			LOGGER.debug("Page Redirection URL ::: "+ uri.toURL().toString());
			//LOGGER.debug("Page Redirect URI::" +rdPageLoc);
			
			context.getResponse().encodeRedirectURL(uri.toURL().toString());
			context.setRedirectUrl(uri.toURL().toString());
			context.getRedirectUrl();
			LOGGER.debug("Page now directing to ::: " +context.getRedirectUrl());
			context.getResponse().sendRedirect(context.getRedirectUrl());
			LOGGER.debug("Page Redirection Completed. Exiting Redirection Call.");
			
			//context.getPageScopeData().put(RuntimePage.PAGESCOPE_PAGE_TRACK, 1 );
			//LOGGER.debug("Setting pageScope trace ::: "+ context.getPageScopeData().get(RuntimePage.PAGESCOPE_PAGE_TRACK));
			//LOGGER.debug("Exiting Redirection Call.");
			//context.getPage().getComponentCache().clear();
			//LOGGER.debug("Page Redirect URL::" + context.getPage().getComponents().addAll(arg0));
				
			}catch(Exception e1){
				
				LOGGER.debug("Exception caught in redirect module.");
				e1.printStackTrace();
				//ErrorRedirect.doRedirect(context);
				
			}		
		}		
	}
}
