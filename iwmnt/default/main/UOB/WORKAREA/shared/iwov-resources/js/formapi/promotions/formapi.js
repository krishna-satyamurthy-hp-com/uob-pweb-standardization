//Promotions FormAPI Functions

//*********************************************************************************************************
// *************************Purpose:	Promotion Category handling ***************************************
//*********************************************************************************************************
IWEventRegistry.addFormHandler("onFormInit", Init);
IWEventRegistry.addItemHandler("/root/promo_details/promotion_category_label", "onItemChange", setHidden);

// Declare a MAP type object global
var myMap = new Map();
//
// Purpose:	Initialize the form for the FormAPI on the datacapture file
//
function Init()
{
	if ((IWDCRInfo.getDCRName() !='')) {
	
	IWDatacapture.getItem( "/root/promo_details/SiteName" ).setReadOnly(true);
	// set_navigationitems("/Content/primarynavimage[1]");

	}
	generateid();
	IWDatacapture.getItem("root/promo_details/promotion_category_name").setVisible(false);
	
	
}

IWEventRegistry.addItemHandler("/root/promo_details/SiteName", "onItemChange", setSiteName);

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


function setSiteName()
{

	var r = confirm("Do you want to set this Site name ? It willl be locked for this Form");
	if (r == true) {
	   // x = "You pressed OK!";
		IWDatacapture.getItem( "/root/promo_details/SiteName" ).setReadOnly(true);
		
		var workarea= IWDatacapture.getWorkarea();
		var dcrpath= workarea+'/templatedata/promotion/categories/data/';
		
		var item = IWDatacapture.getItem("/root/promo_details/SiteName");
		var siteName = item.getOptions()[item.getValue()].text;
		
		console.log("WorkArea Name::"+workarea);
		//alert(dcrpath);
		var params = new Object();
		
		params.WorkArea  =  workarea;
		params.siteName  =  siteName;

		top.hiddenFrameRunning = true;
		
		IWDatacapture.callServer("/iw-bin/getCategories.pl",params, true);
		//alert('Callserver');
		//IWDatacapture.redraw();
	
}
}

function populateLocations(catLabels, catNames){

	//alert('Inside Populate');
	var setItemLabel = IWDatacapture.getItem("root/promo_details/promotion_category_label");
	//var setItemName = IWDatacapture.getItem("root/promo_details/promotion_category_name");
	
	
	var resL = catLabels.split("|");
	var resN = catNames.split("|");
	
	console.log(resL);
	console.log(resN);
	
	var newOptionsL = new Array();
	var newOptionsN = new Array();
	
	for(i in resL){
		
		if(resL[i] != '' && resN[i] != ''){
		console.log("count::"+i);
		newOptionsL[i] = new Option(resL[i], resL[i], false, false);
		console.log("Label::"+resL[i]);
		
		newOptionsN[i] = new Option(resN[i], resN[i], false, false);
		console.log("Name::"+resN[i]);
		
		myMap.set(resL[i],resN[i]);
		}
	}
	setItemLabel.setOptions(newOptionsL);
	//setItemName.setOptions(newOptionsN);
}

function setHidden(item){
	
	IWDatacapture.redraw();
	var setHiddenName = IWDatacapture.getItem("root/promo_details/promotion_category_name");
	//alert("bling="+item.getValue());
	var count= item.getValue();
	var newOptionsM = new Array();
	var i=0;
	
	for(j in count){
		var k=count[j]
		for (var entry in myMap.entries()) {
			var key = entry.key; var value = entry.value
			if(key == item.getOptions()[k].text){
			console.log(key + ' = ' + value);
			newOptionsM[i] = new Option(key,value,false,true);
			i=i+1;
			}
		}
	}
	
	setHiddenName.setOptions(newOptionsM);
//var label = item.getOptions()[item.getValue()].value;

	//console.log(myMap.get(label));
	
}




//************************************************************************************************************
//***********			Handling Promotion Expiration 		**************************************************
//************************************************************************************************************
//IWEventRegistry.addFormHandler("onSave", setEvergreen);
//IWEventRegistry.addFormHandler("onSaveDone", handleOnSaveDone);
IWEventRegistry.addItemHandler("/root/promo_details/promo_life", "onItemChange", hideEvergreen);


function hideEvergreen(item){


var path=IWDatacapture.getItem("/root/promo_details/promo_life").getValue();


if(path == 1){

IWDatacapture.getItem("/root/promo_details/Expiry_Date").setVisible(false);
IWDatacapture.getItem("/root/promo_details/Expiry_Date").setRequired(false);

}
else if(path == 0){

IWDatacapture.getItem("/root/promo_details/Expiry_Date").setVisible(true);
IWDatacapture.getItem("/root/promo_details/Expiry_Date").setRequired(true);
}

}

function setEvergreen(){

//alert(IWDatacapture.getItem("/root/promo_details/Expiry_Date").isVisible());

if(IWDatacapture.getItem("/root/promo_details/Expiry_Date").isVisible() == false){

IWDatacapture.getItem("/root/promo_details/Expiry_Date").setValue("00-00-0000");
return true;

} else{
return true;}

}

function handleOnSaveDone(obj) {
	IWDatacapture.displayMessage('Save Complete');
	return true;

}