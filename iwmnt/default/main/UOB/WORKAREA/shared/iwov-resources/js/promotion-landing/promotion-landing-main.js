$(document).ready(function () {
    $('body').addClass('promotion-landing');
});

function dealTemplate(obj, category) {
    var dealTemplate = $('.deal-template-container').clone();

    dealTemplate.find(".MapdealMerchantLink").attr("title", obj.dealMerchantName);
    dealTemplate.find(".MapdealMerchantLink").attr("href", "promotion-detail.html?deal=" + obj.dealId + "&cat=" + category);

    dealTemplate.find(".MapdealMerchantName").html(obj.dealMerchantName);
    dealTemplate.find(".MapdealShortDescription").html(obj.dealShortDescription);

    var outletImage = diningImagePath,
            dinningCateogry = true;

    if (obj.dealId.toString()[0] == "1") {
        outletImage = NonDiningImagePath;
        dinningCateogry = false;
    }


    if (checkNull(obj.outlets['0'].outletImage)) {
        outletImage = (dinningCateogry) ? "/images/promotion-detail/promotion_deal_dining_default.png" : "/images/promotion-detail/promotion_deal_defult.jpg";
        dealTemplate.find(".img-wrapper img").attr("src", outletImage);
        dealTemplate.find(".img-wrapper img").attr("alt", outletImage);
        $("#deal_render_from_api").append(dealTemplate.html());
    } else {
        outletImage += obj.outlets['0'].outletImage;

        imageExists(outletImage, function (exists) {
            if (exists === false) {
                //load defult image
                outletImage = (dinningCateogry) ? "/images/promotion-detail/promotion_deal_dining_default.png" : "/images/promotion-detail/promotion_deal_defult.jpg";
            }

            dealTemplate.find(".img-wrapper img").attr("src", outletImage);
            dealTemplate.find(".img-wrapper img").attr("alt", outletImage);
            $("#deal_render_from_api").append(dealTemplate.html());
        });
    }
}

function callAjaxJSONP(callBack, data) {
    data['orderBy'] = orderBy;
    
    if(ajaxOn){
        return false;
    }
    
    ajaxOn = true;

    $.ajax({
        type: "GET",
        url: apiUrl,
        data: data,
        dataType: "jsonp",
        jsonpCallback: callBack
    });

}

function addAjaxLoading() {
    $(".ajax-loading").html('<div id="loading" style="text-align:center;padding: 10px;"><img src="/images/loading.gif" /></div>');
}

function removeAjaxLoading() {
    $(".ajax-loading").html('');
    ajaxOn = false;
}

// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () {
        callback(true);
    };
    img.onerror = function () {
        callback(false);
    };
    img.src = url;
}
