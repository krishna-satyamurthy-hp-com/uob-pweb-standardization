package com.opentext.ts.workflow;

import java.io.File;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Node;

import com.interwoven.cssdk.common.CSException;
import com.interwoven.cssdk.filesys.CSFile;
import com.interwoven.cssdk.filesys.CSVPath;
import com.interwoven.livesite.dom4j.Dom4jUtils;
import com.opentext.ls.core.common.UOBBaseConstants;

public class PromoListingBean {
	private static final transient Log LOGGER = LogFactory.getLog(PromoListingBean.class);
	CSFile dcrCSFile;
	CSVPath dcrCSVPath;
	Node promoDCRDetailsNode;
    String promoID,expiryDate,activationDate,productCategory,promoImage,promoTitle,promoAltText,promoLife,promoPage,promoCountry,promoCreator,promoModifier;
    Date promoCreationDate,promoModifiedDate;
    String dcrServerPath = "";
    File dcrFile;    
    

	public PromoListingBean(CSFile dcrCSFile) throws CSException {
		LOGGER.debug("Entering  "+this.getClass());
		this.dcrCSFile = dcrCSFile;
		setPromoBeanValues();
	}
    
    public void setPromoBeanValues() throws CSException{
    	setDcrCSVPath(this.dcrCSFile.getVPath());
    	//LOGGER.debug("getDcrCSVPath "+getDcrCSVPath());
    	String dcrServerPath = UOBBaseConstants.TEAMSITE_SERVER_MOUNT_DRIVE.concat(this.dcrCSVPath.getPathNoServer().toString());
    	//LOGGER.debug("dcrServerPath "+dcrServerPath);
    	setDcrServerPath(dcrServerPath);    	
    	setDcrFile(new File(dcrServerPath));
    	
    	
    	final Document promoDCR = Dom4jUtils.newDocument(getDcrFile());
		final Node promoDCRDetailsNode = promoDCR.selectSingleNode(UOBBaseConstants.PROMOTION_DCR_ROOT_NODE);
    	
		if(promoDCRDetailsNode != null){
			setPromoDCRDetailsNode(promoDCRDetailsNode);

			//Setting of actual promo values from here
			setPromoID(getPromoXPathValue("promoId"));
			setExpiryDate(getPromoXPathValue("Expiry_Date"));
			setActivationDate(getPromoXPathValue("Activation_Date"));
			setProductCategory(getPromoXPathValue("product_category"));
			setPromoImage(getPromoXPathValue("promo_image"));
			setPromoTitle(getPromoXPathValue("promo_title"));
			setPromoAltText(getPromoXPathValue("promo_alt_text"));
			setPromoLife(getPromoXPathValue("promo_life"));
			setPromoPage(getPromoXPathValue("promo_page"));
			setPromoCountry(getPromoXPathValue("country"));
			
			//Added new
			setPromoCreator(this.dcrCSFile.getCreator().getName());
			setPromoCreationDate(this.dcrCSFile.getCreationDate());
			setPromoModifier(this.dcrCSFile.getLastModifier().getName());
			setPromoModifiedDate(this.dcrCSFile.getContentModificationDate());
			LOGGER.debug("Exiting  "+this.getClass());
		}
    	
    }
    
    public String getPromoXPathValue(String promoXPath){
    	Node tmpNode;
    	String tmpStr = "";
		
		tmpNode = this.promoDCRDetailsNode.selectSingleNode(promoXPath);
		if(tmpNode != null){
			tmpStr = tmpNode.getStringValue();
		}
		return tmpStr;
    }
    
    public CSVPath getDcrCSVPath() {
		return dcrCSVPath;
	}

	public void setDcrCSVPath(CSVPath dcrCSVPath) throws CSException{
		this.dcrCSVPath = this.dcrCSFile.getVPath();
	}
	
	public String getDcrServerPath() {
		return dcrServerPath;
	}

	public void setDcrServerPath(String dcrServerPath) {
		
		this.dcrServerPath = dcrServerPath;
	}
	
	public File getDcrFile() {
		return dcrFile;
	}

	public void setDcrFile(File dcrFile) {
		this.dcrFile = dcrFile;
	}

	public Node getPromoDCRDetailsNode() {
		return promoDCRDetailsNode;
	}

	public void setPromoDCRDetailsNode(Node promoDCRDetailsNode) {
		this.promoDCRDetailsNode = promoDCRDetailsNode;
	}

	
	public String getPromoID() {
		return promoID;
	}

	public void setPromoID(String promoID) {
		this.promoID = promoID;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getActivationDate() {
		return activationDate;
	}

	public void setActivationDate(String activationDate) {
		this.activationDate = activationDate;
	}

	public String getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}

	public String getPromoImage() {
		return promoImage;
	}

	public void setPromoImage(String promoImage) {
		this.promoImage = promoImage;
	}

	public String getPromoTitle() {
		return promoTitle;
	}

	public void setPromoTitle(String promoTitle) {
		this.promoTitle = promoTitle;
	}

	public String getPromoAltText() {
		return promoAltText;
	}

	public void setPromoAltText(String promoAltText) {
		this.promoAltText = promoAltText;
	}

	public String getPromoLife() {
		return promoLife;
	}

	public void setPromoLife(String promoLife) {
		this.promoLife = promoLife;
	}

	public String getPromoPage() {
		return promoPage;
	}

	public void setPromoPage(String promoPage) {
		this.promoPage = promoPage;
	}

	public String getPromoCountry() {
		return promoCountry;
	}

	public void setPromoCountry(String promoCountry) {
		this.promoCountry = promoCountry;
	}

	public String getPromoCreator() {
		return promoCreator;
	}

	public void setPromoCreator(String promoCreator) {
		this.promoCreator = promoCreator;
	}

	public Date getPromoCreationDate() {
		return promoCreationDate;
	}

	public void setPromoCreationDate(Date promoCreationDate) {
		this.promoCreationDate = promoCreationDate;
	}

	public String getPromoModifier() {
		return promoModifier;
	}

	public void setPromoModifier(String promoModifier) {
		this.promoModifier = promoModifier;
	}

	public Date getPromoModifiedDate() {
		return promoModifiedDate;
	}

	public void setPromoModifiedDate(Date promoModifiedDate) {
		this.promoModifiedDate = promoModifiedDate;
	}
	

}
