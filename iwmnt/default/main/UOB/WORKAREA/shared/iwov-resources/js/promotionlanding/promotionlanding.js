var containerId = "#promotion-list-wrapper";
var data = null;
// var JSONLocation = "/iwov-resources/json/promodata.json";
var JSONLocation = "/wsm/getpromotions.do";

// To call when rendering promotions
// Parameter: data - JSON object containing list of promotions
function renderItemList(data) {
	if (!data) {
		return false;
	}

	// need the id of container here
	var rowDiv = document.querySelector(containerId + " > div.row");
	if (!rowDiv) {
		return false;
	}
	rowDiv.innerHTML = "";
	
	// loop through the list of items
	for (var i=0; i< data.promo_details.length; i++) {
		var item = renderItem(data.promo_details[i]);
		rowDiv.innerHTML += item;
	}
}

function renderItem(item) {
	if (!item) return false;
	// get attributes' values
	var linkUrl = "javascript:void(0);"; //item.link;
	var linkText = item.PromoTitle;
	var imgSrc = item.PromoImage;
	var imgAlt = item.PromoAltText;
	var contentText = item.PromoTitle;
	var promoText = ""; 

	var itemHTML = "";
	itemHTML = 
		"<div class='col-md-4 col-sm-4 col-xs-12 image-item-wrap-box'>" +	
		"  <a href='" + linkUrl + "' title='" + linkText + "'>" +
		"    <div class='img-wrapper'>" + 
		"      <img class='img-responsive' src='" + imgSrc + "' + alt='" + imgAlt +"' />" + 
		"    </div>" +
		"    <div class='content-text'>" +
		"      <strong><span>" + contentText +"</span></strong>" +
		// "      <strong><span>" + promoText + "</span></strong>" +
		"    </div>" +
		"  </a>" +
		"</div>";

	return itemHTML;		
}

function handleTitleFilterEvent(element) {
	if (!data) {
		loadJSONData("Title", element);
		return false;
	}

	var filterOption = element;
	if (element && element.innerHTML) {
		filterOption = element.innerHTML;
		// apply style for current selection
		switch (element.nodeName.toLowerCase()) {
			case 'li':
				var dropdown = element.parentElement.parentElement.parentElement;
				var span = (dropdown) ? dropdown.querySelector("button span") : null;
				if (span) {
					span.innerHTML = filterOption;
				} 
				break;
			case 'a':
				var current = document.querySelector("ul.filter-item li.active");
				var newActive = element.parentElement;
				current.removeAttribute("class");
				newActive.className = "active";
				break;
			default:
				break;
		}
	}
	var tempData = null;
	switch (filterOption) {
		case "All":
			tempData = JSON.parse(JSON.stringify(data));
			break;
		case "Others":
			tempData = handleNonAlphanumericalFilterEvent();
			break;
		default:
			tempData = handleAlphanumericalFilterEvent(filterOption);
			break;
	}
	if (!tempData || !tempData.promo_details) return false;
	// always applied date filter
	// tempData.promo_details = tempData.promo_details.filter(isWithinValidDateRange);
 	// apply Category filter based on title of #promotion-list-wrapper
	var container = document.querySelector(containerId);
	if (container.hasAttribute("title")) {
		tempData.promo_details = 
			tempData.promo_details.filter(isOfCategory(container.getAttribute("title")));
	}	
	renderItemList(tempData);
	return false;
}

function handleNonAlphanumericalFilterEvent() {
	if (!data) {
		return false;
	}

 	var tempData = JSON.parse(JSON.stringify(data));
 	tempData.promo_details = data.promo_details.filter(isNonAlphanumerical);
 	return tempData;
}

// Filtering by first letter in promo_title 
// Parameters: 	data - JSON object containing list of promotions
//				filterOption: option to filter by alpphabetical
// e.g. handleAlphabeticalFilterEvent(data, "A - E")
function handleAlphanumericalFilterEvent(filterOption) {
	if (!data) {
		return false;
	}

	// available filterOption (in string format):
 	// "A - E", "F - J", "K - O", "P - T", "U - Z"
 	// all options are not case-sensitive
 	var start_letter = end_letter = "";
 	switch (filterOption) {
 		case "0 - 9":
 			start_letter = "0"; end_letter = "9"; break;
 		case "A - E":
 			start_letter = "A"; end_letter = "E"; break;
 		case "F - J":
 			start_letter = "F"; end_letter = "J"; break;
 		case "K - O":
 			start_letter = "K"; end_letter = "O"; break;
 		case "P - T":
 			start_letter = "P"; end_letter = "T"; break;
 		case "U - Z":
 			start_letter = "U"; end_letter = "Z"; break;
 		default:
 	}
 	if (start_letter === end_letter) {
 		// TODO: raise exception here
 		return false;
 	}

 	var tempData = JSON.parse(JSON.stringify(data));
 	tempData.promo_details = data.promo_details.filter(isBetweenCharacter(start_letter, end_letter));
 	return tempData;
}

// Filtering by the activate_date and expiry_date
// Parameters: 	data - JSON object containing list of promotions
/* UNUSED */
function handleDateFilterEvent() {
	if (!data) {
		loadJSONData("Date");
		return false;
	}

	var tempData = JSON.parse(JSON.stringify(data));
 	tempData.promo_details = data.promo_details.filter(isWithinValidDateRange);
	renderItemList(tempData);
}

// Filtering by category
// Parameters: 	data - JSON object containing list of promotions
// 				categoryOption - chosen category for filtering
// 					(categoryOption is case-sensitive)
// e.g. handleCategoryFilterEvent(data, "CashPlus")
function handleCategoryFilterEvent(categoryOption) {
	if (!data) {
		loadJSONData("Category");
		return false;
	}

	var tempData = JSON.parse(JSON.stringify(data));
 	switch (categoryOption) {
 		case "All":
 			break;
 		default:
 			tempData.promo_details = data.promo_details.filter(isOfCategory(categoryOption));
 			break;
 	}
	// always applied date filter
 	// tempData.promo_details = tempData.promo_details.filter(isWithinValidDateRange);
	renderItemList(tempData);
}

// HELPERS
function isBetweenCharacter(start_letter, end_letter) {
	return function(element) {
		if (!element.PromoTitle || element.PromoTitle.length == 0) return false;
		return (start_letter <= element.PromoTitle[0].toUpperCase() && 
				end_letter >= element.PromoTitle[0].toUpperCase());
	}
}

function isNonAlphanumerical(element) {
	if (!element.PromoTitle) return false;
	return (element.PromoTitle.length == 0 || /[^a-zA-Z0-9]/.test(element.PromoTitle[0]));
}

function isWithinValidDateRange(element) {
	if (!element.ActivationDate || !element.ExpiryDate) return false;

	if (element.ExpiryDate == "00-00-0000") {
		return (new Date(element.ActivationDate) <= new Date());
	}

	return (( new Date(element.ActivationDate) <= new Date()) &&
			( new Date(element.ExpiryDate) >= new Date()));	
}

function isOfCategory(categoryOption) {
	return function(element) {
		// if (!element.ProductCategory) return false;
		if (!element.ProductCategory) return true; // undefined == "All"
		if (element.ProductCategory.length == 0) return true;
		return element.ProductCategory == categoryOption;
	}
}

// END HELPERS

// ELEMENT'S BEHAVIORS
// (Require jQuery to run properly)
// $('div.dropdown ul li').on('click', function() {
// 	var option = $(this).html();
// 	// modify displayed text
// 	var dropdownContainer = $(this).closest('div.dropdown');
// 	var button = dropdownContainer.find('button').first();
// 	var buttonText = button.find('span.text-bold');
// 	buttonText.html(option);
// 	// apply filtering
// 	switch(button.attr('id')) {
// 		case 'category':
// 			handleCategoryFilterEvent(option); break;
// 		case 'sort-by':
// 			handleTitleFilterEvent(option); break;
// 		default:
// 			break;
// 	}
// 	dropdownContainer.removeClass('open');
// 	return false;
// });

function loadJSONData(filter, element) {
	var href = window.location.href;
	var array = href.split("/");
	var url = array[0] + "//" + array[2] + JSONLocation;
	// send request to server
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url);
	xmlHttp.onreadystatechange = function() {
		// if (xmlHttp.status == 200 && xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200  && xmlHttp.readyState >= 3) {
			try {
				data = JSON.parse(xmlHttp.responseText);
				handleTitleFilterEvent(element);
			} catch (error) {
				console.log(error);
			}

		}
	}
	xmlHttp.send();
}