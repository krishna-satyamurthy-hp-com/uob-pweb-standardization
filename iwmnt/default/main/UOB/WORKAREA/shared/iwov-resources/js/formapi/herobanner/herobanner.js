
//--------------------herobanner.js for UOB  ----------------------------------------

IWEventRegistry.addItemHandler("/Root/HeroBanner/Banner_Position","onItemChange",handleBannersChange);

	 function handleBannersChange(item)
		{
			var grandParent=IWDatacapture.getItem(item.getName() + "/../..").getName();
			var parent=IWDatacapture.getItem(item.getName() + "/..").getName();
			
			var SurveyChildren=IWDatacapture.getItem(grandParent).getChildren();
			var count=SurveyChildren.length;

			//for (var i=1;i<count;i++) {
				var selection = item.getOptions()[item.getValue()].value;
				var imageFlag = selection == "image-only";
				var head = parent+ "/Banner_Headline_Text";
				var sub_head = parent+ "/Banner_Sub_heading_Text";
				var cta_label = parent+ "/CTA_Label";
				if (imageFlag){
					IWDatacapture.getItem(head).setVisible(false);
					IWDatacapture.getItem(sub_head).setVisible(false);
					IWDatacapture.getItem(cta_label).setVisible(false);

				} else {
					IWDatacapture.getItem(head).setVisible(true);
					IWDatacapture.getItem(sub_head).setVisible(true);
					IWDatacapture.getItem(cta_label).setVisible(true);
				}
			//}
		}