var dataElement = null;

document.addEventListener("DOMContentLoaded", function() {
	if (typeof(isTeamSiteServer) !="function" || isTeamSiteServer()) {
		return false;
	}
	dataElement = getAnalyticsData();
	initMainBannerForAnalytics();
	initEventForAnalytics();
});


function getAnalyticsData() {
	var result = {};
	result["pageName"] = getPageNameForAnalytics();
	result["language"] = getLanguageForAnalytics();
	result["country"] = getCountryForAnalytics();
	result["product_category"] = getProductCategoryForAnalytics();
	result["product_name"] = getProductNameForAnalytics();
	result["user_type"] = getUserTypeForAnalytics();
	result["event_name"] = ""; // getEventNameForAnalytics();
	result["segment"] = getSegmentForAnalytics();
	result["pageName"] = getPageNameForAnalytics();

	return result;
}

function getPageNameForAnalytics() {
	var params = getPathParams();
	if (params.length > 1) {
		params.splice(0, 1); // remove segment name
	}

	return (params.length > 0) ? params.join("/") : "";
}

function getLanguageForAnalytics() {
	return getMetaTagValue("language");
}

function getCountryForAnalytics() {
	return getMetaTagValue("country");
}

function getProductCategoryForAnalytics() {
	return getMetaTagValue("productcategory");
}

function getProductNameForAnalytics() {
	return getMetaTagValue("productname");
}

function getUserTypeForAnalytics() {
	return "anonymous";
}

// retrieve page's name, e.g. "product_name" from "../product_name.page"
/*function getPageNameForAnalytics() {
	var params = getPathParams();
	var pageName = (params.length >0) ? params[params.length - 1] : "";
	pageName = (pageName.indexOf(".page") > 0)? pageName.substring(0, pageName.indexOf(".page")) : "";

	return pageName;
}*/

// retrieve segment's name
function getSegmentForAnalytics() {
	var params = getPathParams();

	return (params.length > 1) ? params[0] : "";
}

function initEventForAnalytics() {
	addEventListenerList("Button", "click", updateEventDataForAnalytics);
	addEventListenerList("Banner", "click", updateEventDataForAnalytics);
	addEventListenerList("Link", "click", updateEventDataForAnalytics);	
}

function addEventListenerList(target, event, fn) {
	var selector = getSelector(target);
	if (!selector || selector.length == 0 ) return false;

	var list = document.querySelectorAll(getSelector(target));
	for (var i=0; i<list.length; i++) {
		list[i].addEventListener("click", function(event) {
			fn(this, target);
			return false;
		});
	}
}

function updateEventDataForAnalytics(obj, target) {
	var attrName = getHTMLAttributeName(target);
	var eventName = getAnalyticsName(target);
	if (attrName && eventName) {
		var objName = obj.hasAttribute(attrName)? obj.getAttribute(attrName) : "NoIdentifier";
		dataElement[eventName] = objName;	
	}

	return false;
}

/********************************************/

function getMetaTagValue(metaTagName) {
	var metas = document.getElementsByTagName('meta'); 

	for (var i=0; i<metas.length; i++) { 
		if (metas[i].getAttribute("name") == metaTagName) { 
			return metas[i].getAttribute("content"); 
		} 
	} 

    return "";
}

function getPathParams() {
	var path = document.location.pathname;
	var params = path.split(/[/+]/);
	for (var i=0; i<params.length; i++) {
		if (params[i].length == 0) {
			params.splice(i, 1); 
			i--;
		}
	}

	return params;
}

function isTeamSiteServer() {
	return (window.location.href.toLowerCase().indexOf("estudio") > 0 || window.location.href.toLowerCase().indexOf("iw-cc") > 0);
}

function getSelector(target) {
	switch (target.trim().toLowerCase()) {
		case "button":
			return ".dtm-button";
		case "banner":
			return ".dtm-banner";
		case "link":
			return ".dtm-link";
		default:
			break;
	}

	return null;
}

function getAnalyticsName(target) {
	switch (target.trim().toLowerCase()) {
		case "button":
			return "button_name";
		case "banner":
			return "banner_name";
		case "link":
			return "anchor_name";
		default:
			break;
	}

	return null;
}

function getHTMLAttributeName(target) {
	switch (target.trim().toLowerCase()) {
		case "button":
			return "button_name";
		case "banner":
			return "banner_name";
		case "link":
			return "anchor_name";
		default:
			break;
	}

	return null;
}

function initMainBannerForAnalytics() {
	var mainBanners = document.querySelectorAll(".mainbanner .bxslider li");
	for (var i=0; i<mainBanners.length; i++) {
		var label = mainBanners[i].querySelector(".caption h2");
		var button = mainBanners[i].querySelector(".btn-1");
		if (button && !button.className.match(/\bdtm-banner\b/)) {
			button.className += " dtm-banner";
			if (label && label.innerHTML) {
				button.setAttribute(getHTMLAttributeName("BANNER"), label.innerHTML);
			}
		}
	}
}