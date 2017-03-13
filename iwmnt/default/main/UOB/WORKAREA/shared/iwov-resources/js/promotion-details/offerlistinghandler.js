var prevButton = ".pre-offer-arrow";
var nextButton = ".next-offer-arrow";
var buttonContainer = ".offer-nav";
var JSONLocation = "/iwov-resources/json/promodata.json";

function setOfferListingButtons(promoId) {
	var href = window.location.href;
	var array = href.split(/[/]+/);
	var url = array[0] + "//" + array[1] + JSONLocation;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
			try {
				var data = JSON.parse(xmlHttp.responseText);
				var currentPromo = getPromoById(data, promoId);
				var prevPromo = null;
				var nextPromo = null;
				if (currentPromo) {
					var currentIndex = getPromoIndex(data, promoId);
					for (var i=currentIndex -1 ; i>=0; i--) {
						if (data.promo_details[i].product_category == currentPromo.product_category &&
							isWithinValidDateRange(data.promo_details[i])) {
							prevPromo = data.promo_details[i];
							break;
						}
					}
					for (var i=currentIndex + 1 ; i<data.promo_details.length; i++) {
						if (data.promo_details[i].product_category == currentPromo.product_category &&
							isWithinValidDateRange(data.promo_details[i])) {
							nextPromo = data.promo_details[i];
							break;
						}
					}
				}
				/*displayOfferListingButton(prevButton, prevPromo);
				displayOfferListingButton(nextButton, nextPromo);*/
				displayOfferListingButtons(prevPromo, nextPromo);
			} catch (error) {
				console.log(error);
			}

		}
	}
	xmlHttp.send();
}

function getPromoById(data, promoId) {
	if (data.promo_details && data.promo_details.length > 0) {
		for (var i=0; i<data.promo_details.length; i++) {
			if (data.promo_details[i].promoId == promoId) {
				return data.promo_details[i];
			}
		}
	}

	return null;
}

function getPromoIndex(data, promoId) {
	if (data.promo_details && data.promo_details.length > 0) {
		for (var i=0; i<data.promo_details.length; i++) {
			if (data.promo_details[i].promoId == promoId) {
				return i;
			}
		}
	}

	return null;
}

function displayOfferListingButton(buttonClass, promo) {
	var button = document.getElementsByClassName(buttonClass);
	if (button.length == 0) return false;
	button = button[0];
	if (promo && promo.promo_page) {
		var link = "$PAGE_LINK[" +  promo.promo_page.replace("/sites/en/", "").replace(".page", "") + "]";
		button.href = link;
	} else {
		button.style.display = "none";
	}
}

function displayOfferListingButtons(prev, next) {
	var container = document.getElementsByClassName(buttonContainer.substr(1));
	if (container.length == 0) return false;
	container = container[0];
	container.innerHTML = "";
	if (prev && prev.promo_page) {
		var prevLink = "$PAGE_LINK[" +  prev.promo_page.replace("/sites/en/", "").replace(".page", "") + "]";
		container.innerHTML += '<a href="' + prevLink + '" title="Previous offer" class="pre-offer-arrow"><img src="/iwov-resources/images/promotion-detail/left-arrow.png" alt="Previous offer"></a>';		
	}
	if (next && next.promo_page) {
		var nextLink = "$PAGE_LINK[" +  next.promo_page.replace("/sites/en/", "").replace(".page", "") + "]";
		container.innerHTML += '<a href="' + nextLink + '" title="Next offer" class="next-offer-arrow"><img src="/iwov-resources/images/promotion-detail/right-arrow.png" alt="Next offer"></a></div>';		
	}
	return false;
}


function isWithinValidDateRange(element) {
	if (!element.Activation_Date || !element.Expiry_Date) return false;
	return (( new Date(element.Activation_Date) <= new Date()) &&
			( new Date(element.Expiry_Date) >= new Date()));	
}