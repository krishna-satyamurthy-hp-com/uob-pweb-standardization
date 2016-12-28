package com.opentext.ts.workflow;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class PromoListingRT {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListingRT.class);	
	
	public static void main(String[] args) {
		String jobID = args[0];
		if(jobID != null && !jobID.isEmpty()){
		PromoListing pl = new PromoListing();
		pl.updateRuntimePromoListing(jobID);
		}else{
			LOGGER.error("jobID is not defined");
		}
	}
}
