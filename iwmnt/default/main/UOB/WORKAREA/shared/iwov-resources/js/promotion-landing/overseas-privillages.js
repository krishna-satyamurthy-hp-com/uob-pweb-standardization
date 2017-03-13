var countryFilterDropdown = $("#country_filter_dropdown");
var categoryFilterDropdown = $("#category_filter_dropdown");
var countryFilter = 0;
var categoryFilter = 0;
$(document).ready(function () {
    loadDropdownData();
    pageInitAction();
    intLoads();
    loadOPDeals(countryFilter, categoryFilter, currentPage); //load all dining
});

function loadDropdownData() {
    countryFilterDropdown.html("");
    for (var key in countryFilterMap) {
        countryList = '<li data-id="' + key + '">' + countryFilterMap[key] + '</li>';
        countryFilterDropdown.append(countryList);
    }

    categoryFilterDropdown.html("");
    for (var key in categoryFiltermap) {
        categoryList = '<li data-id="' + key + '">' + categoryFiltermap[key] + '</li>';
        categoryFilterDropdown.append(categoryList);
    }
}

function pageInitAction() {
    $("#deal_render_from_api").html("");
    currentPage = 0;
    pageScroll = false;
}

function loadOPDeals(countryFilter, categoryFilter, page) {
    var data = {};
    if (countryFilter) {
        data['countryFilter'] = countryFilter;
    } else {
        data['countryFilter'] = "SG";
    }

    if (categoryFilter) {
        data['categoryFilter'] = categoryFilter;
    }

    data['page'] = page;
    data['size'] = totalDealPerPage;

    addAjaxLoading();
    callAjaxJSONP("overseasPrivillagesCallBack", data);
}

function overseasPrivillagesCallBack(response) {
    if (response.size > 0) {
        var data = response.data;
        currentPage = response.currentPage;
        totalPages = response.totalPages;
        if (data.length > 0) {
            for (var key in data) {
                var obj = data[key];
                dealTemplate(obj, "Overseas-Privillages");
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

function intLoads() {
    countryFilterDropdown.find("li").click(function () {
        countryFilter = $(this).attr("data-id");
        pageInitAction();
        loadOPDeals(countryFilter, categoryFilter, 0);

    });

    categoryFilterDropdown.find("li").click(function () {
        categoryFilter = $(this).attr("data-id");
        pageInitAction();
        loadOPDeals(countryFilter, categoryFilter, 0);
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
                loadOPDeals(countryFilter, categoryFilter, currentPage + 1);
            }

        }
    });

    $("html, body").animate({
        scrollTop: 0
    }, 10);
}