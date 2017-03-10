var currentOutlet = 0,
        outlets = [],
        dealMerchantName = "",
        dealFullDescription = "",
        dealStartDate = "",
        dealEndDate = "",
        dealId = 0,
        dealLoad = false;

$(document).ready(function () {
    $('body').addClass('promotion-detail');
    dealId = getUrlParameter('deal');
    dealCat = getUrlParameter('cat');
    callAjaxJSONP("dealCallbak", dealId);

    $(".breadcrumb").find("[data-input='deal-category-name']").text(dealCat);
    $(".breadcrumb").find("[data-input='deal-category-name']").attr("title", dealCat);
    $("[data-input='deal-category-name']").html(dealCat);


    $("#promotion_deal_offer_listing #pre_outlet").click(function () {
        if (currentOutlet >= 1) {
            toShowOutlet(currentOutlet - 1);
        }
    });

    $("#promotion_deal_offer_listing #next_outlet").click(function () {
        if (currentOutlet < outlets.length) {
            toShowOutlet(currentOutlet + 1);
        }
    });
	
	
  var isTouchDevice = (isMobile.phone || isMobile.tablet),
      isHover = isTouchDevice ? 'click' : 'mouseover',
      isTouch = isTouchDevice ? 'touchend' : 'mouseout';

  $('body').delegate('.share-add-this', isHover, function() {
    var el = $(this),
        addThis = $('.addthis_inline_share_toolbox');

    if (isTouchDevice) {
        if (!el.hasClass('is-clicked')) {
            el.addClass('is-clicked');
            addThis.css('display', 'block');
        } else {
            el.removeClass('is-clicked');
            addThis.css('display', 'none');
        }
    } else {
        addThis.css('display', 'block');
    }
    
  });
  $(document).off(isTouch).on(isTouch, function (e) {
    var container = $('.addthis_inline_share_toolbox'),
        expand = $('.atm-i'),
        share = $('.share-add-this');

    if (!container.is(e.target) && container.has(e.target).length === 0 && 
      !expand.is(e.target) && expand.has(e.target).length === 0) {
      if (isTouchDevice) {
        if (!share.is(e.target) && share.has(e.target).length === 0) {
            container.hide();
            share.removeClass('is-clicked');
        }
      } else {
          container.hide();
      }
    }
  });
  $(window).on('load', function () {
    $('.addthis_inline_share_toolbox').css('display', 'none');
  });
	
});

function dealCallbak(response) {
    if (response.outlets) {
        dealMerchantName = response.dealMerchantName;
        dealFullDescription = response.dealFullDescription;
        dealStartDate = response.dealStartDate;
        dealEndDate = response.dealEndDate;
        dealId = response.dealId;
        $(".breadcrumb").find("[data-input='deal-merchant-name']").html(dealMerchantName);
        outlets = response.outlets;

        if (outlets.length > 1) {
            $("#promotion_deal_offer_listing").show();
        }
        toShowOutlet(0);
    }
}

function toShowOutlet(id) {
    if (outlets[id] && dealLoad == false) {
        dealLoad = true;
        currentOutlet = id;
        dealTemplate(outlets[id]);
    }

}

function dealTemplate(outlet) {
    $('#promotion_deal_offer_content').html("");
    var dealOfferContent = $('#deal_deatils_template_container').clone();

    dealOfferContent.find("[data-input='deal-merchant-name']").html(dealMerchantName);
    dealOfferContent.find("[data-input='outlet-contact']").attr("href", "tel:" + outlet.outletContact);
    dealFullDescription = dealFullDescription.replace("<ul>", "");
    dealFullDescription = dealFullDescription.replace("</ul>", "");
    dealOfferContent.find("[data-input='deal-merchant-description']").html(dealFullDescription);
    dealOfferContent.find("[data-input='deal-merchant-valid-from']").html("<p>Valid from " + dealStartDate + " to " + dealEndDate + "</p>");
    if (!checkNull(outlet.outletWebsite)) {
        dealOfferContent.find("[data-input='outlet-website']").text("Click here");
        dealOfferContent.find("[data-input='outlet-website']").attr("href", "https://uniservices1.uobgroup.com/secure/forms/url_redirection.jsp?CC=SG&URL=" + outlet.outletWebsite);
        dealOfferContent.find("[data-input='outlet-website']").attr("title", outlet.outletWebsite);
    } else {
        dealOfferContent.find("[data-input='outlet-website']").parent().hide();
    }

    if (!checkNull(outlet.outletContact)) {
        dealOfferContent.find("[data-input='outlet-contact-desktop']").text(outlet.outletContact);
        dealOfferContent.find("[data-input='outlet-contact-desktop']").attr("title", outlet.outletContact);
        dealOfferContent.find("[data-input='outlet-contact-desktop']").attr("href", "tel:" + outlet.outletContact);
    } else {
        dealOfferContent.find("[data-input='outlet-contact-desktop']").parent().hide();
    }

    dealOfferContent.find("[data-input='outlet-address']").html(outlet.outletAddress);

    //Opening Hours
    var openingHrsList = loadOpeningHours(outlet.outletOpeningHours);
    if (!checkNull(openingHrsList)) {
        var OpeningHoursDiv = $("#deal_opening_hours_template_container").clone();

        OpeningHoursDiv.find("[data-input='opening-hours']").html(openingHrsList);

        dealOfferContent.find(".offer-openning-hours").html(OpeningHoursDiv.html());
    }

    if (!checkNull(outlet.outletLatitude) && !checkNull(outlet.outletLongitude)) {
        get_direction = "http://maps.google.com/maps?q=" + outlet.outletLatitude + "," + outlet.outletLongitude;

        dealOfferContent.find(".get-direct").attr('href' , get_direction);
    }else{
        dealOfferContent.find(".get-direct").hide();
    }

    var outletImage = diningImagePath,
            dinningCateogry = true;

    if (dealId.toString()[0] == "1") {
        outletImage = NonDiningImagePath;
        dinningCateogry = false;
    }

    if (checkNull(outlet.outletImage)) {
        outletImage = (dinningCateogry) ? "/images/promotion-detail/promotion_deal_dining_default.png" : "/images/promotion-detail/promotion_deal_default.jpg";
        dealOfferContent.find("[data-input='outlet-image']").attr("src", outletImage);
        $('#promotion_deal_offer_content').html(dealOfferContent.html());
        dealLoad = false;
    } else {
        outletImage += outlet.outletImage;

        imageExists(outletImage, function (exists) {
            if (exists === false) {
                //load defult image
                outletImage = (dinningCateogry) ? "/images/promotion-detail/promotion_deal_dining_default.png" : "/images/promotion-detail/promotion_deal_default.jpg";
            }

            dealOfferContent.find("[data-input='outlet-image']").attr("src", outletImage);

            $('#promotion_deal_offer_content').html(dealOfferContent.html());
            dealLoad = false;
        });
    }


}

function callAjaxJSONP(callBack, dealId) {
    apiUrl += dealId;
    $.ajax({
        type: "GET",
        url: apiUrl,
        //data: data,
        dataType: "jsonp",
        jsonpCallback: callBack
    });

}

function loadOpeningHours(outletOpeningHours) {
    var loadeddayOH = [],
            openingHoursList = "";

    for (var key in outletOpeningHours) {
        var obj = outletOpeningHours[key];
        if (!checkNull(obj.hours) && !checkNull(obj.hours.startTime) && !checkNull(obj.hours.endTime)) {
            openingHoursList += "<li>";
            if (isInArray(obj.day, loadeddayOH)) {
                openingHoursList += "<span>&nbsp;</span>";
            } else {
                loadeddayOH.push(obj.day);
                openingHoursList += "<span>" + openHrsDayMap[obj.day] + "</span>";
            }

            openingHoursList += makeTimeFormat(obj.hours.startTime) + " - " + makeTimeFormat(obj.hours.endTime);
            openingHoursList += "</li>";
        }
    }

    return openingHoursList;

}

