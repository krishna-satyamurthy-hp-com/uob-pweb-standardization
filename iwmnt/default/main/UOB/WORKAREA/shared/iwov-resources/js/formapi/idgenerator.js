IWEventRegistry.addFormHandler("onFormInit", generateid);

function generateid() {
	if (IWDatacapture.getItem("/root/promo_details/promoId").getValue() != '') {
		IWDatacapture.getItem("/root/promo_details/promoId").setReadOnly(true);
		//alert("ID set::" + IWDatacapture.getItem("/root/promo_details/promoId").getValue());
		return true;

	} else {

		var idOne = Math.floor((Math.random() * 1000) + 100);
		var idTwo = Math.floor((Math.random() * 1000) + 100);
		var id = String(idOne) + String(idTwo);
		//alert("ID ::" + id);
		IWDatacapture.getItem("/root/promo_details/promoId").setValue(id);
		IWDatacapture.getItem("/root/promo_details/promoId").setReadOnly(true);
		//alert("ID set::" + IWDatacapture.getItem("/root/promo_details/promoId").getValue());
		return true;
	}
}
