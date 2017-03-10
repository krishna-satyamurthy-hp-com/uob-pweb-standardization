window.onload = function() {
	updateShareButtons();
	return false;
};

function updateShareButtons() {
	var buttons = document.querySelectorAll("a.share-add-this");
	for (var i=0; i<buttons.length; i++) {
		var button = buttons[i];
		button.setAttribute('href', window.location.href);
	}
	return false;
}