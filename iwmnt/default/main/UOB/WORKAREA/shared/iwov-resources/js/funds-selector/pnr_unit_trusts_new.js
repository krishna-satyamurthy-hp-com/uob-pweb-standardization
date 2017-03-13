var pnrUnitTrustsJson = "/iwov-resources/json/funds-selector/pnr_unit_trusts.json";
var servletURL = "/pweb/fund-selector.do";
var selectFundManagerSet = new Array();
var selectAssetTypeSet = new Array();
var selectGeographicRegionSet = new Array();
var selectRiskClassificationSet = new Array();
var selectCPFISSet = new Array();

var fundManagerMap = new Object();
var assetTypeMap = new Object();
var geographicRegionMap = new Object();
var riskClassificationMap = new Object();
var cpfisMap = new Object();
var fundNameMap = new Object();

var fundcodeList = new Array();
var fundnameList = new Array();
var funds = new Array();
var per_page = 10;
// The following logic is not applicable for page in runtime
// it will mistake .page with page in parameter
// if (document.URL.indexOf('page') > 0) {
// Correction:
if (document.URL.indexOf('page') > 0 && (
        (document.URL.indexOf('.page') == -1 ) || 
        (document.URL.indexOf('page') != document.URL.lastIndexOf('page'))
    )) {
    per_page = getUrlVars()['page'];
}
var paginationContainer = $(".pagination");

function handleJSONUrl(JSONLocation) {
    return window.location.origin + JSONLocation;
}

$(document).ready(function () {
    if (navigator.userAgent.indexOf("MSIE 10") > -1) {
        $('body').addClass('ie10');
    }

    fsFromLoadInitAction();
    $.ajax({
        type: "GET",
        url: handleJSONUrl(servletURL),
        dataType: 'json',
        async: false,
        success: function (response) {
            var data = response.funds;
            n = 1
            for (var key in data) {
                var obj = data[key];
                var view = {};
                for (var objKey in obj) {
                    var viewKey = getViewKey(objKey);
                    var viewValue = getViewValue(objKey, obj[objKey]);
                    if (viewKey) {
                        view[viewKey] = viewValue;
                    }
                }
                view.buynow = (obj.PIB == 'Y') ? '' : '';
                view.isbuy = (obj.PIB == 'Y') ? '' : 'nobuy';
                view.fundcurrency = '';
                view.fundclass = (n == 1) ? 'close' : 'close';

                fundcodeList.push(view.fundcode);
                fundnameList.push(view.fundname);
                // fill the map list. used in search by returning the fundcode
                fundNameMap[view.fundcode] = view.fundname;
                fundManagerMap[view.fundcode] = view.fundmanager;
                assetTypeMap[view.fundcode] = view.assettype;
                geographicRegionMap[view.fundcode] = view.geographicregion;
                riskClassificationMap[view.fundcode] = view.riskclassification;
                cpfisMap[view.fundcode] = view.cpfis;
                funds.push(view);

                
                // Initialize dropdown search filters
                if ($.inArray(view.fundmanager, selectFundManagerSet) <= -1) {
                    selectFundManagerSet.push(view.fundmanager);
                    $("#select-FundManager").append("<option value='" + view.fundmanager + "'>" + view.fundmanager + "</option>");
                }
                if ($.inArray(view.assettype, selectAssetTypeSet) <= -1) {
                    selectAssetTypeSet.push(view.assettype);
                    $("#select-AssetType").append("<option value='" + view.assettype + "'>" + view.assettype + "</option>");
                }
                if ($.inArray(view.geographicregion, selectGeographicRegionSet) <= -1) {
                    selectGeographicRegionSet.push(view.geographicregion);
                    $("#select-GeographicRegion").append("<option value='" + view.geographicregion + "'>" + view.geographicregion + "</option>");
                }
                if ($.inArray(view.riskclassification, selectRiskClassificationSet) <= -1) {
                    selectRiskClassificationSet.push(view.riskclassification);
                    $("#select-RiskClassification").append("<option value='" + view.riskclassification + "'>" + view.riskclassification + "</option>");
                }
                if ($.inArray(view.cpfis, selectCPFISSet) <= -1) {
                    selectCPFISSet.push(view.cpfis);
                    $("#select-CPFIS").append("<option value='" + view.cpfis + "'>" + view.cpfis + "</option>");
                }
                n++;
            }

            getUnitTrustTemplate(0, parseInt(per_page), true);
            // trigger selectpicker again to make sure all filters are loaded
            $('.selectpicker').selectpicker();
        },
        error: function (error) {
            alert("fail" + error);
        }
    });

    $('select').on('change', function () {
        unit_filter();
    });
});

function unit_filter() {
    fundcodeList = new Array();
    fundnameList = new Array();
    funds = new Array();
    var container = 0;
    var lines = new Array();

    fsFromLoadInitAction();
    $.ajax({
        type: "GET",
        url: handleJSONUrl(servletURL),
        dataType: 'json',
        success: function (response) {
            var data = response.funds;
            n = 1
            for (var key in data) {
                var obj = data[key];
                var view = {};
                for (var objKey in obj) {
                    var viewKey = getViewKey(objKey);
                    var viewValue = getViewValue(objKey, obj[objKey]);
                    if (viewKey) {
                        view[viewKey] = viewValue;
                    }
                }
                view.buynow = (obj.PIB == 'Y') ? '' : '';
                view.isbuy = (obj.PIB == 'Y') ? '' : 'nobuy';
                view.fundcurrency = '';
                view.fundclass = (n == 1) ? 'close' : 'close';

                if (unit_filter_callback(view)) {
                    fundcodeList.push(view.fundcode);
                    fundnameList.push(view.fundname);
                    funds.push(view);
                    n++;
                }
            }
            getUnitTrustTemplate(0, parseInt(per_page), true);
        }
    });
}

function unit_filter_callback(fundView) {
    var manager = $('#select-FundManager option:selected').val(),
            risk = $('#select-RiskClassification').val(),
            asset = $('#select-AssetType option:selected').val(),
            srs = $('#select-CPFIS option:selected').val(),
            region = $('#select-GeographicRegion option:selected').val(),
            fund_name = $.trim($('#nova-searchbox').val()),
            manager_filter = 1,
            risk_filter = 1,
            asset_filter = 1,
            srs_filter = 1,
            region_filter = 1,
            fund_filter = 1;

    if (manager != '' && manager != 'Fund Manager' && manager != 'All') {
        if (manager != fundView.fundmanager) {
            manager_filter = 0;
        }
    }

    if (fund_name != '' && fund_name != 'Search by Fund Name') {
        
        var fund_name = fund_name.toLowerCase().trim();
        if(fundView.fundname.indexOf(fund_name) == -1){
            fund_filter = 0;
        }
    }
  
    if (risk != '' && risk != 'All' && risk != null) {
        risk_filter = 0;
        for (index = 0; index < risk.length; ++index) {
            if (risk[index] == fundView.riskclassification) {
                risk_filter = 1;
            }
        }
    }

    if (asset != '' && asset != 'Asset Type' && asset != 'All') {
        if (asset != fundView.assettype) {
            asset_filter = 0;
            
        }
    }
    
    if (srs != '' &&  srs != 'CPFIS / SRS' && srs != 'All') {
        if (srs != fundView.cpfis) {
            srs_filter = 0;
        }
    }
    
    if (region != '' && region != 'Geographic Region' && region != 'All' ) {
        if (region != fundView.geographicregion) {
            region_filter = 0;
        }
    }

    
    if (manager_filter == 1 && risk_filter == 1 && asset_filter == 1 && srs_filter == 1 && region_filter == 1 && fund_filter == 1)
        return true;
    return false;
}


function getUnitTrustTemplate(start, end, onComplete) {
    $('#nova-funds-list-table tbody').html('');
    if (funds.length > 0) {
        if (end > funds.length) {
            end = funds.length;
        }

        j = 1;
        for (i = start; i < end; i++) {
            fundRow = generateFundsRow(funds[i], j);
            $('#nova-funds-list-table tbody').append(fundRow);
            j++;
        }
        if (onComplete) {
            generatePaging();
        }

    } else {
        $(".no-results").html("There are no funds matching your request.You might like to review your search criteria or continue browsing other unit trusts funds available.");
    }
    fsFromLoadEndAction();
}

function generateFundsRow(fund, rowId) {

    var downloadIconDiv = $('.fs-download-templates-container').clone(),
            expandContentDiv = $('.fs-expand-content-template-container').clone(),
            toggleCollapseExpandDiv = $('.fs-toggle-collapse-expand-template-container').clone();


    downloadIconDiv.find("#fact-sheet").attr("href", fund.factsheet);
    downloadIconDiv.find("#product-highlight").attr("href", fund.producthighlight);
    downloadIconDiv.find("#prospectus").attr("href", fund.prospectus);
    downloadIconDiv.find("#annual-report").attr("href", fund.annualreport);

    toggleCollapseExpandDiv.find('[data-toggle="collapse"]').attr("data-target", "#collapse" + rowId);
    toggleCollapseExpandDiv.find('[data-toggle="collapse"]').attr("aria-controls", "collapse" + rowId);

    expandContentDiv.find("#fs-fund-manager").html(fund.fundmanager);
    expandContentDiv.find("#fs-fund-product-risk-classification").html("Product Risk Classification:" + fund.riskclassification);
    expandContentDiv.find("#fs-minimum").html("Minimum: " + fund.minimum);
    expandContentDiv.find("#fs-subsequent").html("Subsequent: " + fund.subsequent);
    expandContentDiv.find("#fs-launch-date").html(fund.launchdate);
    expandContentDiv.find("#fs-cpfis").html(fund.cpfis);
    expandContentDiv.find("#fs-factsheet").attr("href", fund.factsheet);
    expandContentDiv.find("#fs-product-highlights").attr("href", fund.producthighlight);
    expandContentDiv.find("#fs-prospectus").attr("href", fund.prospectus);
    expandContentDiv.find("#fs-annual-report").attr("href", fund.annualreport);
    expandContentDiv.find('[data-toggle="collapse"]').attr("data-target", "#collapse" + rowId);
    expandContentDiv.find('[data-toggle="collapse"]').attr("aria-controls", "collapse" + rowId);
    expandContentDiv.find('.expand-content').attr("id", "collapse" + rowId);

    var tableRow = '<tr>';
    tableRow += '<td><p><strong>' + fund.fundname + '<strong></p></td>';
    tableRow += '<td><p class="big">' + fund.fundnav + '</p></td>';
    tableRow += '<td><p>' + fund.funddate + '</p></td >';
    tableRow += '<td><p>' + downloadIconDiv.html() + '</p></td>';
    tableRow += '<td><p><a href="#" target="_blank" title="Buy now" class="btn-1"> Buy now </a></p></td>';
    tableRow += '<td><p>' + toggleCollapseExpandDiv.html() + '</p></td>';
    tableRow += '</tr>';
    tableRow += '<tr>';
    tableRow += '<td colspan="6">' + expandContentDiv.html() + '</td>';
    tableRow += '</tr>';

    return tableRow;

}

function generatePaging() {
    var page_html = '<a href="javascript:void(0);" data-id="0" id="prev"> <span class="fa fa-angle-left"></span></a>';
    var current_link = 0;
    number_of_pages = Math.ceil((funds.length / per_page));

    while (number_of_pages > current_link) {
        if (current_link == 0) {
            page_html += '<a class="page_link active" href="javascript:void(0);" data-id="' + current_link + '" id="' + current_link + '">' + (current_link + 1) + '</a>';
        }
        else {
            page_html += '<a class="page_link" href="javascript:void(0);" data-id="' + current_link + '" id="' + current_link + '">' + (current_link + 1) + '</a>';
        }
        current_link++;
    }
    page_html += '<a href="javascript:void(0);" data-id="1" id="next"><span class="fa fa-angle-right"></a>';

    $(".pagination").html(page_html);
    $(".pagination").show();
    $('.pagination .page_link').click(function (e) {
        $(".pagination a").removeClass('active');
        gotopage($(this).attr('data-id'));
    });
    $('.pagination #next').click(function (e) {
        $(".pagination .page_link").removeClass('active');
        gotopage($(this).attr('data-id'));
    });
    $('.pagination #prev').click(function (e) {
        $(".pagination .page_link").removeClass('active');
        gotopage($(this).attr('data-id'));
    });
}

function gotopage(page) {

    var total = Math.ceil((funds.length / per_page));
    page = parseInt(page);

    if (page == 0) {
        $('.page-nav #next').attr('href', 1);
        $('pagination #prev').attr('href', 0);
    }
    else if (page == parseInt(total) - 1) {
        $('.pagination #next').attr('data-id', parseInt(page));
        $('.pagination #prev').attr('data-id', parseInt(page) - 1);
    } else {
        $('.pagination #next').attr('data-id', parseInt(page) + 1);
        $('.pagination #prev').attr('data-id', parseInt(page) - 1);
    }

    fsFromLoadInitAction();
    getUnitTrustTemplate(page * per_page, ((page * per_page) + parseInt(per_page)), false);
    $('.pagination #' + page).addClass('active');
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function addAjaxLoading() {
    $(".ajax-loading").html('<div id="loading"><div>Please wait a moment while we load the funds.</div><img src="/iwov-resources/images/loading.gif" /></div>');
}

function removeAjaxLoading() {
    $(".ajax-loading").html('');
}

function fsFromLoadInitAction() {
    $(".no-results").html("");
    addAjaxLoading();
    $('select').attr('disabled', 'disabled');
    paginationContainer.hide();
}

function fsFromLoadEndAction() {
    removeAjaxLoading();
    $('select').removeAttr('disabled');
    if (funds.length > per_page) {
        paginationContainer.show(); 
    }else{
        paginationContainer.hide();
    }
    $("#nova-searchbox").val("");
   
}

function getViewKey(objKey) {
    switch (objKey) {
        case "NAV": return "fundnav";
        case "AS_AT_DATE": return "funddate";
        case "MINIMUM_INVESTMENT_INITIAL": return "minimum";
        case "MINIMUM_INVESTMENT_SUBSEQUENT": return "subsequent";
        case "PRODUCT_RISK_CLASSIFICATIONS": return "riskclassification";
        case "LINK_TO_FACT_SHEET": return "factsheet";
        case "LINK_TO_PRODUCT_HIGHLIGHTS": return "producthighlight";
        case "LINK_TO_PROSPECTUS": return "prospectus";
        case "LINK_TO_ANNUAL_REPORT": return "annualreport"; 
        default:
            return objKey.replace("_", "").toLowerCase();
    }
    return null;
}

function getViewValue(objKey, objVal) {
    return objVal;
}


function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        var fund_name = $.trim($('#nova-searchbox').val())
        if (fund_name != '' && fund_name != 'Search by Fund Name') {
            unit_filter();
        }
    }
});