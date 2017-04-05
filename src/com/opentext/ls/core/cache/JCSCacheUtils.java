package com.opentext.ls.core.cache;

/**
 * Created by ssrirang on 4/5/2017.
 */

import com.interwoven.livesite.runtime.RequestContext;
import com.opentext.ls.core.util.DCRUtils;
import org.apache.log4j.Logger;
import org.dom4j.Document;

public class JCSCacheUtils {

    private static final Logger LOGGER = Logger.getLogger(JCSCacheUtils.class);

    public static String generateJCSKey(RequestContext context, String configname) {

        String adminserver = context.getSite().getAdminServer();

        String branchPath = context.getSite().getBranch();
        branchPath.replace("//" + adminserver.lastIndexOf(":"), "");
        branchPath.replace("/", "-");

        String siteName = context.getSite().getName();

        return branchPath + "-" + siteName + "-" + configname;
    }

    public static Document loadDocumentFromCache(RequestContext context, String dcrPathParamName) {

        Document document = null;
        String rootLocation = DCRUtils.getRootLocation(context);

        try {

            String cachekey = JCSCacheUtils.generateJCSKey(context, JCSCacheConstants.ANALYTICS_KEY);
            document = JCSCacheManager.getDocument(cachekey);

            if (document == null) {
                @SuppressWarnings("deprecation")
                String path = context.getParameterString(dcrPathParamName);
                LOGGER.debug("filerelativePath is " + path);
                document = DCRUtils.loadFile(rootLocation, path);
                JCSCacheManager.cacheDocument(cachekey, document);
            }
        } catch (Exception ex) {
            LOGGER.error("Error loading document from cache: ", ex);
        }

        return document;
    }


}
