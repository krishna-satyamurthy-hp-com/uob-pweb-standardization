/* Tab : diningQSID
 All : 4
 New in Town : 8
 1 for 1 : 8
 Western / European : 8
 Chinese : 8
 Japanese + Korean : 8
 Entertainment : 8
 */
var tapMapping = [4, 8, 8, 8, 8, 8, 8];  // diningQSID can be change here . 

var filterMap = {};
filterMap['0-9'] = "0,1,2,3,4,5,6,7,8,9";
filterMap['A-E'] = "a,b,c,d,e";
filterMap['F-J'] = "f,g,h,i,j";
filterMap['K-O'] = "k,l,m,n,o";
filterMap['P-T'] = "p,q,r,s,t";
filterMap['U-Z'] = "u,v,w,x,y,z";
filterMap['Others'] = "%23";

var apiUrl = "http://10.100.105.221:8082/mighty-dining/deals",
        totalDealPerPage = 9,
        orderBy = "MERCHANT_NAME_ASC",
        currentPage = 0,
        totalPages = 0,
        currentTab = tapMapping['0'],
        currentFilter = false,
        pageScroll = false;

$(document).ready(function () {
    loaddiningQSIDIntoTab();
    intLoads();
    pageInitAction();
    loadDining(currentTab, 0, false); //load all dining
});

function intLoads() {
    $(".promotion_dining_tab li").click(function () {
        var diningId = $(this).attr("data-id");
        if (diningId > 0) {
            pageInitAction();
            currentTab = diningId;
            loadDining(currentTab, 0, currentFilter);
        }
    });

    $(".dining_filters li").click(function () {
        var diningFilter = $(this).attr("data-val");
        
        if(diningFilter == ""){
            return false;
        }
        if (filterMap[diningFilter]) {
            pageInitAction();
            currentFilter = filterMap[diningFilter];
            loadDining(currentTab, 0, currentFilter);
        }

    });

    //infinite Scroll
    // Append a scroll event handler to the container
    $(window).scroll(function () {

        if (pageScroll) {
            return false;
        }
        // activate new load when scrollbar reaches 150 pixels or less from the bottom
        if ($(window).height() + $(window).scrollTop() >= $(document).height() - 350) {
            if (currentPage + 1 < totalPages) {
                pageScroll = true;
                loadDining(currentTab, currentPage + 1, currentFilter);
            }

        }
    });

    $("html, body").animate({
        scrollTop: 0
    }, 10);
}

function pageInitAction() {
    $("#deal_render_from_api").html("");
    currentFilter = false;
    pageScroll = false;
}

function loaddiningQSIDIntoTab() {
    //desktop
    i = 0; 
    $("#promotion_dining_tab_1").find('li').each(function () {
        var current = $(this);
        if (tapMapping[i]) {
            current.attr("data-id", tapMapping[i]);
        }
        i++;
    });
     //mobile
    i = 0;
    $("#promotion_dining_tab_2").find('li').each(function () {
        var current = $(this);
        if (tapMapping[i]) {
            current.attr("data-id", tapMapping[i]);
        }
        i++;
    });
}

function loadDining(id, page, filter) {

    var data = {};
    data['diningQSID'] = id;
    data['page'] = page;
    data['size'] = totalDealPerPage;
    if (filter)
        data['alphanumeric'] = filter;

    addAjaxLoading();
    callAjaxJSONP("diningCallBack", data);
}

function diningCallBack(response) {
    if (response.size > 0) {
        var data = response.data;
        currentPage = response.currentPage;
        totalPages = response.totalPages;
        if (data.length > 0) {
            for (var key in data) {
                var obj = data[key];
                dealTemplate(obj);
            }
        } else {
            if (currentPage == 0) {
                $("#deal_render_from_api").html('<div class="col-md-4 col-sm-4 col-xs-12 image-item-wrap-box" style="text-align: center;"><strong><span >No promotions were found, please try again</span></strong><div>');
            }
        }
        pageScroll = false;
    }
    removeAjaxLoading();
}

function dealTemplate(obj) {
    console.log(obj);
    var dealTemplate = $('.deal-template-container').clone();

    dealTemplate.find(".MapdealMerchantLink").attr("title", obj.dealMerchantName);
    dealTemplate.find(".MapdealMerchantName").html(obj.dealMerchantName);
    dealTemplate.find(".MapdealShortDescription").html(obj.dealShortDescription);

    $("#deal_render_from_api").append(dealTemplate.html());

}

function callAjaxJSONP(callBack, data) {
    data['orderBy'] = orderBy;

    $.ajax({
        type: "GET",
        url: apiUrl,
        data: data,
        dataType: "jsonp",
        jsonpCallback: callBack
    });
}

function addAjaxLoading() {
    $(".ajax-loading").html('<div id="loading" style="text-align:center;padding: 10px;"><img src="images/loading.gif" /></div>');
}

function removeAjaxLoading() {
    $(".ajax-loading").html('');
}