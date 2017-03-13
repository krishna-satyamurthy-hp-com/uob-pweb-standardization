$(document).ready(function () {
    currentTab = 4; // ALL Tap from dining
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
            loadDining(currentTab, 0, false);
        }
    });

    $(".dining_filters li").click(function () {
        var diningFilter = $(this).attr("data-val");

        if (diningFilter == "") {
            return false;
        }
        if (filterMap[diningFilter]) {
            pageInitAction();
            currentFilter = filterMap[diningFilter];
            loadDining(currentTab, 0, currentFilter);
        }else{
			if(diningFilter == "all"){
				pageInitAction();
				loadDining(currentTab, 0, false);
			}
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
    currentPage = 0;
    currentFilter = false;
    pageScroll = false;
}

function loaddiningQSIDIntoTab() {
    //desktop
    $("#promotion_dining_tab_1").html("");
    $("#promotion_dining_tab_2").html("");
    for (var key in diningTapMap) {
        var valDiningTapMap = diningTapMap[key];
        tapListDesktop = '<li data-id="' + valDiningTapMap[0] + '" ><a title="' + valDiningTapMap[1] + '" href="#" data-toggle="tab" role="tab" aria-selected="true" >' + valDiningTapMap[1] + '</a></li>';
        tapListMobile = '<li data-id="' + valDiningTapMap[0] + '">' + valDiningTapMap[1] + '</li>';
        $("#promotion_dining_tab_1").append(tapListDesktop);
        $("#promotion_dining_tab_2").append(tapListMobile);
    }
    $('#promotion_dining_tab_1 li:first-child').addClass('active');
    $('#promotion_dining_tab_2 li:first-child').addClass('active');

}

function loadDining(id, page, filter) {

    var data = {};
    data['diningQSID'] = id;
    data['page'] = page;
    data['size'] = totalDealPerPage;
    if (filter)
        data['alphanumeric'] = filter;

    callAjaxJSONP("diningCallBack", data);
}

function diningCallBack(response) {
    if (response.size > 0) {
		addAjaxLoading();
        var data = response.data;
        currentPage = response.currentPage;
        totalPages = response.totalPages;
        if (data.length > 0) {
            for (var key in data) {
                var obj = data[key];
                dealTemplate(obj, "Dine");
            }
        } else {
            if (currentPage == 0) {
                $("#deal_render_from_api").html('<div class="col-md-4 col-sm-4 col-xs-12 image-item-wrap-box" style="text-align: center;"><strong><span >No promotions were found, please try again</span></strong><div>');
            }
        }
        pageScroll = false;
        removeAjaxLoading();
    }

}



