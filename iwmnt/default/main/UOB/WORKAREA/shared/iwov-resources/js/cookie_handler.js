document.onreadystatechange = function(e) {
	if (document.readyState = "complete") {
		handleSiteCookie();		
	}
}

var expire_duration = 30; // in days

function handleSiteCookie() {
	// ignore if site is in eStudio
	if (isTeamSiteServer()) {
		return false;
	}

	var host = window.location.hostname;
	var path = window.location.pathname;
	var params = path.split(/[/]+/);
	if (params) {
		for (var i=0; i<params.length; i++) {
			if (params[i] == "") {
				params.splice(i, 1);
				i--;
			}
		}
	}

	if (typeof(isSegmentSelectorPage)=="undefined") {
		if (isSegmentLandingPage(host, params)) {
			if (getMetaTagValue("segment")) {
				setPathCookie("/" + getMetaTagValue("segment"));	
			}
			setPathCookie(path);
		}
	} else {
		handleSegmentSelector();
		setSegmentLinkBehaviour();
	}
}

function isSegmentLandingPage(host, params) {	
	if (!params || params.length == 0) {
		switch (host) {
			case "uobgroup.com":
			case "uob.com.sg":
				return true;
			default:
				break;
		}
	}

	if (params.length == 1) {
		return true;
	}

	switch (params[params.length - 1].toLowerCase()) {
		case "index.page":
		default: 
			return true;
	}

	return false;
}

function handleSegmentSelector() {
	var cookieValues = readCookie();
	if (!cookieValues || !cookieValues["segment-cookie"]) {
		return false;
	}

	var expires =  new Date(cookieValues["segment-expires"]);
	if (!expires || expires == new Date(0) || expires < new Date()) return false;	

	window.location.href = cookieValues["segment-cookie"];
}

function setSegmentLinkBehaviour() {
	$('.business-item a').on('click', function(e) {
		var path = $(this).attr('href');
		setPathCookie(path);
		window.location.href = path;
	});
}

function readCookie() {
	var cookie = document.cookie;
	var result = {};

	if (!cookie) return result;

	var statements = cookie.split(";");
	
	for (var i=0; i<statements.length; i++)  {
		var pair = statements[i].split("=");
		if (pair.length==2) {
			result[pair[0].trim()] = pair[1].trim();
		}
	}

	return result;
}

function setPathCookie(path) {
	if (path.indexOf("http:/") < 0 && path.indexOf("https:/") < 0) {
		path = path.replace(/[/]+/g,'/');
	}
	if (path.indexOf("/index.page") >=0 ) {
		path = path.substring(0, path.indexOf("/index.page"));
	}

	var expires = new Date();
	expires.setTime(expires.getTime() + (expire_duration * 24 * 60 * 60 * 1000));

	document.cookie = "segment-cookie=" + path;
	document.cookie = "segment-expires=" + expires;
}