//Carousel FormAPI Functions

IWEventRegistry.addItemHandler("/root/banner_details/banner_life", "onItemChange", hideEvergreen);


function hideEvergreen(item){


var vpath= item.getName();
var ppath= vpath.replace('banner_life','Expiry_Date');

var epath=IWDatacapture.getItem(vpath).getValue();


if(epath == 1){

IWDatacapture.getItem(ppath).setVisible(false);
IWDatacapture.getItem(ppath).setRequired(false);

}
else if(epath == 0){

IWDatacapture.getItem(ppath).setVisible(true);
IWDatacapture.getItem(ppath).setRequired(true);
}

}

