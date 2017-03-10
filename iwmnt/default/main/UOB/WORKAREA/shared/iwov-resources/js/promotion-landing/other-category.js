var CategoryId = $("#category_id").val();
var CategoryName = $("#category_name").val();
$(document).ready(function () {
    pageInitAction();
    intLoads();
    loadDealsOtherCategory(CategoryId, currentFilter, 0);
});

function pageInitAction() {
    $("#deal_render_from_api").html("");
    pageScroll = false;
    currentPage = 0;
}

function intLoads() {
    $(".other_category_filters li").click(function () {
        var otherCategoryFilter = $(this).attr("data-val");

        if (otherCategoryFilter == "") {
            return false;
        }
		
        if (filterMap[otherCategoryFilter]) {
            pageInitAction();
            currentFilter = filterMap[otherCategoryFilter];
            loadDealsOtherCategory(CategoryId, currentFilter, 0);
        }else{
			if(otherCategoryFilter == "all"){
				pageInitAction();
				loadDealsOtherCategory(CategoryId, false, 0);
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
                loadDealsOtherCategory(CategoryId, currentFilter, currentPage + 1);
            }

        }
    });

    $("html, body").animate({
        scrollTop: 0
    }, 10);
}

function loadDealsOtherCategory(catId, filter, page) {
    var data = {};
    data['countryFilter'] = "SG";
    data['categoryFilter'] = catId;
    if (filter)
        data['alphanumeric'] = filter;
    data['page'] = page;
    data['size'] = totalDealPerPage;

    addAjaxLoading();
    callAjaxJSONP("otherCategoryCallBack", data);
}

function otherCategoryCallBack(response) {
    if (response.size > 0) {
        var data = response.data;
        currentPage = response.currentPage;
        totalPages = response.totalPages;
        if (data.length > 0) {
            for (var key in data) {
                var obj = data[key];
                dealTemplate(obj, CategoryName);
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