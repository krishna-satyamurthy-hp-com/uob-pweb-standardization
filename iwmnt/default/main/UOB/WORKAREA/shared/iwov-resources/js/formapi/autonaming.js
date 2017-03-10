//--------------Autosave DCR with year value--------------//
IWEventRegistry.addFormHandler("onSaveValid", autonaming);

function autonaming(){
  // Get the value of year field
  var yearValue = IWDatacapture.getItem("/root/year").getValue();
  // Initiate server request
  IWDCRInfo.setDCRName(yearValue);
  statusCheck();
}
// Check status of the call
function statusCheck(){
  var status = IWDCRInfo.getStatus();
  if(status == IWDCRInfo.PENDING){
    // Call back in 2 seconds
    setTimeout("statusCheck()", 2000);
  }else if(status = IWDCRInfo.AVAILABLE || status == IWDCRInfo.UNAVAILABLE){
    IWDatacapture.save();
  }else{
    alert('Could not save the DCR as: ' + yearValue);
  }
}
