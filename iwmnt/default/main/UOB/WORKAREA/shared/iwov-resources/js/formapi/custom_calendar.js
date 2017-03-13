//--------------------custom_calendar.js for UOB  ----------------------------------------




// Set Calendar variables
var fwContextPath = "/iw-cc";
var calendar_skin = new Object();
calendar_skin.full_months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

                        
	IWEventRegistry.addItemHandler("/Root/HeroBanner/Expiry_Date", "onCallout", calendar_date);
	IWEventRegistry.addItemHandler("/Root/HeroBanner/Activation_Date", "onCallout", calendar_date);
	IWEventRegistry.addItemHandler("/Root/FeatureGrid/Expiry_Date", "onCallout", calendar_date);
	IWEventRegistry.addItemHandler("/Root/FeatureGrid/Activation_Date", "onCallout", calendar_date);
	IWEventRegistry.addItemHandler("/root/promo_details/Expiry_Date", "onCallout", calendar_date);
	IWEventRegistry.addItemHandler("/root/promo_details/Activation_Date", "onCallout", calendar_date);
	//IWEventRegistry.addItemHandler("/root/Content/AvailabilityHours/FutureDatesUnAvailabilityHours/Start_Time", "onItemChange", calendar_time);
	IWEventRegistry.addItemHandler("/Root/HeroBanner/Expiry_Date", "onItemChange", doCompareExpire);
	IWEventRegistry.addItemHandler("/Root/FeatureGrid/Expiry_Date", "onItemChange", doCompareExpire);
	IWEventRegistry.addItemHandler("/root/promo_details/Expiry_Date", "onItemChange", doCompareExpire);

	IWEventRegistry.addItemHandler("/root/banner_details/Activation_Date", "onCallout", calendar_date);
	IWEventRegistry.addItemHandler("/root/banner_details/Expiry_Date", "onCallout", calendar_date);
	IWEventRegistry.addItemHandler("/root/banner_details/Expiry_Date", "onItemChange", doCompareExpire);
	
	
	function calendar_time(iwItem) 
	{ 
		
	//var item=iwItem.getValue();
	//alert(item);
    re = /^(20|21|22|23|[01]\d)(([0-5]\d){1,2})$/;
	if(iwItem.getValue() != '' && !iwItem.getValue().match(re))
		{ 
		alert("Invalid time format: " + iwItem.getValue()+ " \nTime Format Should be like HHMM");
		iwItem.setValue("");
	  
		} 
}
	
function calendar_date(item)
{
	var theCalendarWindow = fwShowCalendar("-callback", DateCallBack, "-initialdate", new Date().valueOf());
	
	function DateCallBack(date)
	{
		//alert("Expiration date "+ date);
		var thedate=formatDate(date, "MM-dd-yyyy");
		//alert("Expiration date after format "+ thedate);
		var status=	validateDate(thedate);
		if(status=="invalid")
		{
			alert("Date Should be Greater than or Equal to Today");
			item.setValue("");
		}
		else
		{
			item.setValue(thedate);
			item.setFocus();
		}
		
		return true;
	}
}


//Date Validation function Validated format  MM-DD-YYYY*/
//We are converting the input date into a string then
//passing into an array then comparing with the system date

function validateDate(thedate)
{
	
	//var expdate=IWDatacapture.getItem("/root/Metadata/ExpirationDate").setValue("");
	var status="valid";
	var currentTime = new Date();
	var chngtoString = thedate.toString();     //Breaking up the Input date
	var ar_chngtoString = new Array;
	ar_chngtoString = chngtoString.split('-');           //Splitting up the Input date
	var currentTime = new Date();
	var current_month = currentTime.getMonth() + 1;
	var current_day = currentTime.getDate();
	var current_year = currentTime.getFullYear();
	
	if (ar_chngtoString[2] > current_year) 
	{
	return status;
	}
	else if (ar_chngtoString[2] < current_year)
	{
		status="invalid";
		return status;
	}
	else if (ar_chngtoString[0] > current_month) 
	{
	return 1;
	}
	else if (ar_chngtoString[0] < current_month) 
	{
		status="invalid";
		return status;
	}
	else if (ar_chngtoString[1] > current_day) 
	{
	return status;
	}
	else if (ar_chngtoString[1] < current_day) 
	{
		status="invalid";
		return status;
	}
	else return status;
}

//Function to caompare Activation and Expriy Dates

function doCompareExpire(item)
{

	var path = item.getName();
	var newpath= path.replace('Expiry_Date','Activation_Date');
	var visible=IWDatacapture.getItem(path).isVisible();


        var activatedate= IWDatacapture.getItem(newpath).getValue();
	var activatedate_string= activatedate.toString();
        var ar_activatedate_string = new Array;
	ar_activatedate_string = activatedate_string.split('-');
        var activedate = new Date(ar_activatedate_string[2], ar_activatedate_string[0], ar_activatedate_string[1]);

       

        var selecteddate= item.getValue();
	var selecteddate_string= selecteddate.toString(); 
        var ar_selecteddate_string = new Array;
	ar_selecteddate_string = selecteddate_string.split('-');
        var selectdate = new Date(ar_selecteddate_string[2], ar_selecteddate_string[0], ar_selecteddate_string[1]);

	//alert ("Activation Date::" +activedate+"- Expiration Date::"+selectdate); 
if (activedate =='')
	{
	 alert ("Activation Date should be selected before Expiration Date"); 
	item.setValue("");
	  return false;
	 }
	else if (visible ==true && activedate >= selectdate)
	{
	 alert("The Expiration Date should be same or after Activation Date");
	item.setValue("");
	  return false;
	 }
	else {
	//alert("The Expiration Date is after Activation Date");
	 return true;
	}
	
}

//Function to caompare Activation and Expriy Dates

    IWEventRegistry.addItemHandler("/Root/HeroBanner/Activation_Date", "onItemChange", doCompareActivate);
	IWEventRegistry.addItemHandler("/Root/FeatureGrid/Activation_Date", "onItemChange", doCompareActivate);
	IWEventRegistry.addItemHandler("/root/promo_details/Activation_Date", "onItemChange", doCompareActivate);

function doCompareActivate(item)
{

	var path = item.getName();
	var newpath= path.replace('Activation_Date','Expiry_Date');
	var visible= IWDatacapture.getItem(newpath).isVisible();

        var expirydate= IWDatacapture.getItem(newpath).getValue();
	var expirydate_string= expirydate.toString();
        var ar_expirydate_string = new Array;
	ar_expirydate_string = expirydate_string.split('-');
        var expiredate = new Date(ar_expirydate_string[2], ar_expirydate_string[0], ar_expirydate_string[1]);

       

        var selecteddate= item.getValue();
	var selecteddate_string= selecteddate.toString(); 
        var ar_selecteddate_string = new Array;
	ar_selecteddate_string = selecteddate_string.split('-');
        var selectdate = new Date(ar_selecteddate_string[2], ar_selecteddate_string[0], ar_selecteddate_string[1]);

	//alert ("Activation Date::" +expiredate+"- Expiration Date::"+selectdate); 
 if (expiredate <= selectdate  && visible ==true)
	{
	 alert("The Expiration Date should be same or after Activation Date");
	item.setValue("");
	  return false;
	 }
	else {
	//alert("The Expiration Date is after Activation Date");
	 return true;
	}
	
}