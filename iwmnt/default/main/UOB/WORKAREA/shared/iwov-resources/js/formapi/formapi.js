//-----------------------------------------------------------------------------
// File formapi.js
//
//-----------------------------------------------------------------------------
// Call the initialization routine on load.
//


IWEventRegistry.addFormHandler("onFormInit", Init);

//
// Purpose:	Initialize the form for the FormAPI on the datacapture file
//
function Init()
{

 //alert('Hi');
 //Call and Set the Options for First Instance
 if ((IWDCRInfo.getDCRName() =='')) {

	//set_navigationitems("/quick_links/type[1]");

	}else {
	
		IWDatacapture.getItem( "/quick_links/SiteName" ).setReadOnly(true);
	}


 IWEventRegistry.addItemHandler("/quick_links/SiteName", "onItemChange", setSiteName);
 
 //IWEventRegistry.addItemHandler("/quick_links/SiteName", "onItemChange", set_navigationitems);

 IWEventRegistry.addItemHandler("/quick_links/type", "OnReplicantAdded", set_navigationitems_add);

 //IWEventRegistry.addItemHandler("/quick_links/type/type_name", "onItemChange", validateNavName);

return;
}

function setSiteName()
{

	var r = confirm("Do you want to set this Site name ? It willl be locked for this Form");
	if (r == true) {
	   // x = "You pressed OK!";
		IWDatacapture.getItem( "/quick_links/SiteName" ).setReadOnly(true);
		IWDatacapture.redraw();
		set_navigationitems();
	} else {
	    x = "You pressed Cancel!";

	 //IWDatacapture.getItem( "/quick_links/SiteName" ).setReadOnly(false);
	}
  return;
}

function set_navigationitems(item)
{
		var path=IWDatacapture.getItem("/quick_links/type");
			var children = path.getChildren();
			var numChildren = children.length;
			//alert('Childs:'+numChildren);
	//for (var i = 0; i < numChildren; i++) {
		
   		var navitempath = children[0].getChildByName('type_name');
	
		var server = window.location.hostname;
   
		var params = new Object();
				
		var siteItem = IWDatacapture.getItem("/quick_links/SiteName");
		var item = IWDatacapture.getItem("/quick_links/SiteName");
		var siteName = item.getOptions()[item.getValue()].text;
		
		params.ItemName  = navitempath.getName();
		params.WorkArea  =  IWDatacapture.getWorkarea ();
		params.siteName  =  siteName;

		top.hiddenFrameRunning = true;
		//alert(navitempath.getName());
		
		IWDatacapture.callServer("/iw-bin/getPrimaryNav.pl",params, true);
		//sleep(3000)
		//alert('CallServer call done');
		//}
	return;	
}

function set_navigationitems_add(item)
{
	
	var replicantpath =item.getName(); 
	var result = replicantpath.split("[");
	var index = result[1].split("]");

	index = parseInt(index);

	//alert('INDEX'+index +':: Replicant:>'+replicantpath);

    var navitempath = item.getChildByName('type_name');
	var server = window.location.hostname;
	var siteItem = IWDatacapture.getItem("/quick_links/SiteName");
	var siteName = siteItem.getOptions()[siteItem.getValue()].value;

	//alert("SiteName >"+siteName);
	
	if (siteName == '' ) {		
		alert("Please choose Site Name !!");
		var parent = IWDatacapture.getItem(item.getName() + "/..");		
		IWDatacapture.getItem(parent).deleteInstance(index);
		return 0;	
	}
	
	var params = new Object();
	params.ItemName  = navitempath.getName();		
	params.WorkArea  =  IWDatacapture.getWorkarea ();		
	params.siteName  =  siteName;


	top.hiddenFrameRunning = true;

	IWDatacapture.callServer("/iw-bin/getPrimaryNav.pl",params, true);
 
 return;
}


function populate(value,item){

//alert('In populate');

	//var item = item.replace("/type_name","");
	
	var res = value.split("|");

	var setItem = IWDatacapture.getItem(item);

	//alert("Return Item >"+setItem);


	var newOptions = new Array();	

	for (i in res) {
		if (res[i] == value) 
			{
				newOptions[i] = new Option(res[i], res[i], false, true);
			} else {
				newOptions[i] = new Option(res[i], res[i], false, false);
			}
		}

	setItem.setOptions(newOptions);
return;
}
