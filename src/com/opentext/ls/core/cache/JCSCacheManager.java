package com.opentext.ls.core.cache;

/**
 * Created by ssrirang on 4/5/2017.
 */

import org.apache.jcs.JCS;
import org.apache.jcs.access.exception.CacheException;
import org.apache.jcs.admin.CacheElementInfo;
import org.apache.jcs.admin.JCSAdminBean;
import org.apache.jcs.engine.control.CompositeCacheManager;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.dom4j.Document;

import java.util.LinkedList;
import java.util.ListIterator;

public final class JCSCacheManager {

    private static final Logger LOGGER = Logger.getLogger(JCSCacheManager.class);

    private static JCS cache;
    private static CompositeCacheManager ccm = CompositeCacheManager.getUnconfiguredInstance();

    private JCSCacheManager() {
    }

    public static void CacheInvalidationMonitor() {
        try {
            JCSAdminBean admin = new JCSAdminBean();
            LinkedList<?> linkedList = admin.buildElementInfo(JCSCacheConstants.CACHE_REGION_NAME);
            ListIterator<?> iterator = linkedList.listIterator();

            while (iterator.hasNext()) {
                CacheElementInfo info = (CacheElementInfo) iterator.next();
                if (LOGGER.isDebugEnabled()) {
                    LOGGER.debug("Key: " + info.getKey());
                    LOGGER.debug("Creation Time: " + info.getCreateTime());
                    LOGGER.debug("Maximum Life (seconds): " + info.getMaxLifeSeconds());
                    LOGGER.debug("Expires in (seconds): " + info.getExpiresInSeconds());
                }
                if (info.getExpiresInSeconds() <= 0) {
                    cache.remove(info.getKey());
                    LOGGER.info("[EXPIRED] Removed JCS object: " + info.getKey());
                }
            }
        } catch (CacheException e) {
            LOGGER.log(Level.ERROR, e.getMessage(), e);
        } catch (Exception e) {
            LOGGER.log(Level.ERROR, e.getMessage(), e);
        }
    }

    public static void cacheDocument(String jcsKey, Document jcsDoc) {
        try {
            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("Creating JCS Cache Object: " + jcsKey);
                LOGGER.debug("Cached document content: " + jcsDoc.asXML().toString());
            }
            cache = JCS.getInstance(JCSCacheConstants.CACHE_REGION_NAME);
            cache.put(jcsKey, jcsDoc);
            LOGGER.info("Created JCS cache object with key: " + jcsKey);
        } catch (Exception e) {
            LOGGER.log(Level.ERROR, e.getMessage(), e);
        }

    }

    public static void cacheString(String jcsKey, String jcsValue) {
        try {
            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("Creating JCS Cache Object: " + jcsKey);
                LOGGER.debug("Cached document content: " + jcsValue);
            }
            cache = JCS.getInstance(JCSCacheConstants.CACHE_REGION_NAME);
            cache.put(jcsKey, jcsValue);
            LOGGER.info("Created JCS cache object with key: " + jcsKey);
        } catch (Exception e) {
            LOGGER.log(Level.ERROR, e.getMessage(), e);
        }
    }

    public static String getString(String jcsKey) {
        String cachedDataString = null;
        try {
            cache = JCS.getInstance(JCSCacheConstants.CACHE_REGION_NAME);
            cachedDataString = (String) cache.get(jcsKey);
        } catch (CacheException e) {
            LOGGER.error("Unable to retrieve String from Cache");
            LOGGER.log(Level.ERROR, e.getMessage(), e);
        }
        return cachedDataString;
    }

    public static Document getDocument(String jcsKey) {
        Document cachedData = null;
        try {
            cache = JCS.getInstance(JCSCacheConstants.CACHE_REGION_NAME);
            cachedData = (Document) cache.get(jcsKey);

            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("JCS Key: " + jcsKey);
                String str = cachedData != null ? cachedData.asXML() : " ::Empty:: ";
                LOGGER.debug("Retrieved Cached Document: " + str);
            }

        } catch (CacheException e) {
            LOGGER.error("Unable to retrieve Document from Cache");
            LOGGER.log(Level.ERROR, e.getMessage(), e);
        }
        return cachedData;
    }

    public static void removeCache(String jcsKey) {
        try {
            cache = JCS.getInstance(JCSCacheConstants.CACHE_REGION_NAME);
            cache.remove(jcsKey);
        } catch (Exception e) {
            LOGGER.log(Level.ERROR, e.getMessage(), e);
        }
    }


}