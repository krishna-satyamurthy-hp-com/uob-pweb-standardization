IWEventRegistry.addFormHandler("onSaveValid", handleSaveValidEvent);

/* Only display alert and let user save form for now. */
function handleSaveValidEvent() {
	if (!isEvenNoOfFeatureGrids()) {} //return false; 
	if (!isEqualNoOfBanners()) {} // return false;
	return true;
}

/* Check if number of featureGrid banners is even */
/* Return true if yes, otherwise alert user and return false */
function isEvenNoOfFeatureGrids() {
	var featureGridNo = 0;
	while (IWDatacapture.getItem("/Root/FeatureGrid[" + (featureGridNo + 1) + "]")) {
		featureGridNo++;
	}

	if (featureGridNo % 2 == 0) return true;
	// alert("Number of Grid banners must be even.");
	alert("Number of Grid banners is not even.");
	return false;
}

/* Compare number of featureGrid banners and evergreen banners */
/* Return true if they're equal, otherwise alert user and return false */
function isEqualNoOfBanners() {
	var featureGridNo = 0;
	var evergreenNo = 0;
	// count number of featureGrid banners and evergreen banners
	while (IWDatacapture.getItem("/Root/FeatureGrid[" + (featureGridNo + 1) + "]")) {
		featureGridNo++;
	}
	while (IWDatacapture.getItem("/Root/Evergreen_FeatureGrid[" + (evergreenNo + 1) + "]")) {
		evergreenNo++;
	}
	
	if (featureGridNo == evergreenNo) return true;
	// alert("Numbers of Grid banners and Evergreen FeatureGrid banners must be equal.");
	alert("Numbers of Grid banners and Evergreen FeatureGrid banners are not equal.");
	return false;
}