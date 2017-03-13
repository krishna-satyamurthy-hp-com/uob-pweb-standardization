//-----------------Image Size Check for herobanner--------------//
IWEventRegistry.addItemHandler("/Root/HeroBanner/Banner_Image", "onItemChange", checkImageSize);

function checkImageSize(item){

        var grandParent=IWDatacapture.getItem(item.getName() + "/../..").getName();
        var parent=IWDatacapture.getItem(item.getName() + "/..").getName();
        var img = parent+ "/Banner_Image";
        var img_path = IWDatacapture.getItem(img).getValue();
		var wa_p = IWDatacapture.getWorkarea();

		var wanew_path = wa_p.split("default");
		var str2 = wanew_path[1];
		var str1 = "/iw/cci/meta/no-injection/iw-mount/default";
		var res = str1.concat(str2);
		var new_url = res.concat(img_path);
		//alert("wanew_path "+ new_url);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  //alert('Size in bytes: ' + xhttp.getResponseHeader('Content-Length'));
                  var filesize = xhttp.getResponseHeader("Content-Length");
                  //alert(filesize);
                }
                if(filesize > 600000){
					alert("File Over 600Kb");
					IWDatacapture.getItem(img).setValid(false);
					//IWDatacapture.getItem(img).setHighlightMode(true);
					IWDatacapture.getItem(img).setFocus();
					IWDatacapture.redrawLabels();
                } else {
					IWDatacapture.getItem(img).setValid(true);
					IWDatacapture.getItem(img).setFocus();					
					IWDatacapture.redrawLabels();					
					
				}
          };
          xhttp.open("HEAD", new_url, true);
          xhttp.send();

}
