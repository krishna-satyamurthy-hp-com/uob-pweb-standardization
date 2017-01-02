package com.opentext.ts.workflow;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class PromoListingRT {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListingRT.class);	
	
	public static void main(String[] args) {
		String jobID = args[0];
		String lsds_runtime_path = args[1];
		
		System.out.println(lsds_runtime_path);
		System.out.println("jobID: "+ jobID);
		LOGGER.debug("jobID: "+ jobID);
		LOGGER.debug("lsds_runtime_path: "+ lsds_runtime_path);
		if(jobID != null && !jobID.isEmpty()){
			LOGGER.debug("Inside If jobID: "+ jobID);
		PromoListing pl = new PromoListing();
		pl.updateRuntimePromoListing(jobID, lsds_runtime_path);
		}else{
			LOGGER.error("jobID is not defined");
		}
	}
}
