
//
//Function called at Form Initialization
IWEventRegistry.addFormHandler("onFormInit", init);
IWEventRegistry.addItemHandler("/root/tab_feature_segment/title", "onItemChange", changeContName_onchange);

//IWEventRegistry.addFormHandler("onFormInit", initProductDetails);
IWEventRegistry.addItemHandler("/root/product_category","onItemChange",handleCategoryChange);
IWEventRegistry.addItemHandler("/root/SiteName", "onItemChange", setSiteName);





			// For existing DCR in Edit mode
            // Change Container names for already created DCR's
            function init(){
			
			if ((IWDCRInfo.getDCRName() !='')) {
              maxReplicantSize = 8;
              for(var i = 1; i <= maxReplicantSize; i++){
                var TabName = IWDatacapture.getItem("/root/tab_feature_segment[" + i + "]/title").getValue();
                IWDatacapture.getItem(IWDatacapture.getItem("/root/tab_feature_segment[" + i + "]/title").getName() + "/..").setLabel(TabName);
              }

			  initProductDetails();
			}
            }

            // Change Container name according with Title value
            function changeContName_onchange(item){
              var TabName = item.getValue();
              IWDatacapture.getItem(item.getName() + "/..").setLabel(TabName);
            }



function initProductDetails() {

	//Check if existing DCR, if Yes, set site selection as readonly
	if ((IWDCRInfo.getDCRName() !='')) {

	IWDatacapture.getItem( "/root/SiteName" ).setReadOnly(true);

	}
	// get current selected category
	// and retrieve product names
	var categoryIndex = IWDatacapture.getItem("/root/product_category").getValue();
	if (categoryIndex != null && categoryIndex >=0) {
		var categoryValue = IWDatacapture.getItem("/root/product_category").getOptions()[categoryIndex].value;
        getProductOptions(categoryIndex, categoryValue);
	}
}

function handleCategoryChange(item) {
	var index = item.getValue();
	if (index!= null && index >= 0) {
		var value = item.getOptions()[index].value;
		getProductOptions(index, value);
	}
}

function setSiteName()
{

	var r = confirm("Do you want to set this Site name ? It willl be locked for this Form");
	if (r == true) {
	   // x = "You pressed OK!";
		IWDatacapture.getItem( "/root/SiteName" ).setReadOnly(true);
		
		getProductCatOptions();

}
}

// To populate Product Name from Product Category DCR
function getProductOptions(catIndex, category) {

//Get Site name for product category DCR read
	var item = IWDatacapture.getItem("/root/SiteName");
	var siteName = item.getOptions()[item.getValue()].text;
	
	var request = new XMLHttpRequest();

    request.open("GET", "/templatedata/product/categories/data/product-categories_"+siteName, false);
	// request.open("GET", "/templatedata/product/categories/data/product-categories", false);
    request.onreadystatechange = function ()
    {
        if(request.readyState === 4)
        {
            if(request.status === 200 || request.status == 0)
            {
                var XMLContent = $.parseXML(request.responseText);
                var $xml = $( XMLContent );
                var productName = [];
                $xml.find("product_category_details").each(function() {
                    if ($(this).find("product_category_name").text() == category) {
                        $(this).find("product_name").each(function() {
                            productName.push($(this).text());
                        });
                        return false;
                    }
                }); 
                var selectedOptionIndex = IWDatacapture.getItem("/root/product_name").getValue();
                var selectedOptionValue = null;
                if (selectedOptionIndex != null && selectedOptionIndex >=0) {
                    selectedOptionValue = IWDatacapture.getItem("/root/product_name").getOptions()[selectedOptionIndex].value;
                }
                var options = new Array();
                for (var i=0; i<productName.length; i++) {
                    options[i] = new Option(productName[i], productName[i], false, false);
                    if (productName[i] == selectedOptionValue) {
                        options[i] = new Option(productName[i], productName[i], true, true);
                    }
                }
                IWDatacapture.getItem("/root/product_name").setOptions(options);
            }
        }
    }
    request.send(null);
}

function getProductCatOptions() {
	
	console.log("Function called for populating product categories");

//Get Site name for product category DCR read
	var item = IWDatacapture.getItem("/root/SiteName");
	var siteName = item.getOptions()[item.getValue()].text;
	
	var request = new XMLHttpRequest();

    request.open("GET", "/templatedata/product/categories/data/product-categories_"+siteName, false);
	// request.open("GET", "/templatedata/product/categories/data/product-categories", false);
    request.onreadystatechange = function ()
    {
        if(request.readyState === 4)
        {
            if(request.status === 200 || request.status == 0)
            {
                var XMLContent = $.parseXML(request.responseText);
                var $xml = $( XMLContent );
                var productCatName = [];
                $xml.find("product_category_details").each(function() {
                    
                        $(this).find("product_category_name").each(function() {
                            productCatName.push($(this).text());
							
                        });
                        
                    
                }); 
                var selectedOptionIndex = IWDatacapture.getItem("/root/product_category").getValue();
                var selectedOptionValue = null;
                if (selectedOptionIndex != null && selectedOptionIndex >=0) {
                    selectedOptionValue = IWDatacapture.getItem("/root/product_category").getOptions()[selectedOptionIndex].value;
                }
                var options = new Array();
                for (var i=0; i<productCatName.length; i++) {
                    options[i] = new Option(productCatName[i], productCatName[i], false, false);
					console.log(options[i]);
                    if (productCatName[i] == selectedOptionValue) {
                        options[i] = new Option(productCatName[i], productCatName[i], true, true);
						
                    }
                }
				
                IWDatacapture.getItem("/root/product_category").setOptions(options);
            }else{
				
				alert("DCR not found for selected site.");
			}
        }
    }
    request.send(null);
}