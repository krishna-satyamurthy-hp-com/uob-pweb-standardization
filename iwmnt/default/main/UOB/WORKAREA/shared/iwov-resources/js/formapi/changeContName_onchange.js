IWEventRegistry.addItemHandler("onItemChange", changeContName_onchange);

function changeContName_onchange(item){
  //Title for products details
  var FeatureTitle = IWDatacapture.getItem("/root/tab_feature_segment/title").getValue();
  alert("The value on Feature Title is: " + FeatureTitle);
  // Change Tabbed Features Container
  //IWDatacapture.getItem("/root/tab_feature_segment").setValue(FeatureTitle);
}
