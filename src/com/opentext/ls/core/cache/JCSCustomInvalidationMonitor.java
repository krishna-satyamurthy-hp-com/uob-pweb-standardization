package com.opentext.ls.core.cache;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.jcs.JCS;
import org.apache.jcs.access.exception.CacheException;
import org.apache.jcs.admin.CacheElementInfo;
import org.apache.jcs.admin.JCSAdminBean;
import org.apache.jcs.engine.control.CompositeCacheManager;

import java.util.LinkedList;
import java.util.ListIterator;

/**
 * Created by ssrirang on 4/5/2017.
 */
public class JCSCustomInvalidationMonitor extends Thread {

    private final Log mLogger = LogFactory.getLog(JCSCustomInvalidationMonitor.class);
    private boolean mShutdown = false;
    private long mPollingIntervalSeconds = 30L;

    private JCS cache;
    private CompositeCacheManager ccm = CompositeCacheManager.getUnconfiguredInstance();

    public JCSCustomInvalidationMonitor() {

    }

    public long getPollingIntervalSeconds() {
        return this.mPollingIntervalSeconds;
    }

    public void shutdown() {
        this.mShutdown = true;
        interrupt();
        if (this.mLogger.isInfoEnabled()) {
            this.mLogger.info("shutdown: successfully shutdown JCSCustomInvalidationMonitor.");
        }
    }

    public void run() {
        if (this.mLogger.isDebugEnabled()) {
            this.mLogger.debug("run: starting invalidation monitor.");
        }
        long pollingInterval = getPollingIntervalSeconds();


        while (!this.mShutdown) {
            try {
                cache = JCS.getInstance(JCSCacheConstants.CACHE_REGION_NAME);
                JCSAdminBean admin = new JCSAdminBean();
                LinkedList<?> linkedList = admin.buildElementInfo(JCSCacheConstants.CACHE_REGION_NAME);
                ListIterator<?> iterator = linkedList.listIterator();

                while (iterator.hasNext()) {
                    CacheElementInfo info = (CacheElementInfo) iterator.next();
                    if (mLogger.isDebugEnabled()) {
                        mLogger.debug("Key: " + info.getKey());
                        mLogger.debug("Creation Time: " + info.getCreateTime());
                        mLogger.debug("Maximum Life (seconds): " + info.getMaxLifeSeconds());
                        mLogger.debug("Expires in (seconds): " + info.getExpiresInSeconds());
                    }
                    if (info.getExpiresInSeconds() <= 0) {
                        cache.remove(info.getKey());
                        mLogger.info("[EXPIRED] Removed JCS object: " + info.getKey());
                    }
                }
            } catch (CacheException e) {
                mLogger.error(e.getMessage(), e);
            } catch (Exception e) {
                mLogger.error(e.getMessage(), e);
            }
            try {
                Thread.sleep(pollingInterval * 1000L);
            } catch (InterruptedException e) {
                mLogger.error(e.getMessage(), e);
            }
        }
    }


}
