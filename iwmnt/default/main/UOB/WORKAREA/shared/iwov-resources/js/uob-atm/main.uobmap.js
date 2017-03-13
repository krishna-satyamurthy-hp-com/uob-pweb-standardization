var locationStart;
var heightbottom414 = 200;
var heightbottom320 = 150;
var defHeight = 150;
var scrollHeight = "";
var winResWidth = "";
var winResHeigh = "";

//1.308043, 103.829281
$(document).ready(function () {

    //detect IE & Edge
    initListFilterBranch();
    if (/MSIE/.test(navigator.userAgent) || /Edge/.test(navigator.userAgent)) {
        $('html').addClass('ie');
    }
    // initContainer(UOBMap.globalvar.heightW);

    $('.sidePane_facility_details').css({'margin-left': UOBMap.globalvar.widthtW, 'opacity': 0});

    $('.list-panel, .route-panel').height("auto");
    $('.ico-expand').on('click', function (e, para, distant) {
        var me = $(this),
            infowindow = $('.sidePane_bottom .infowindow');

        $('.sidePane_bottom').show();
        if (!me.is('.active') && infowindow.length > 0) {
            me.addClass('active');
            $('.sidePane_bottom').height(defHeight);
            $('.sidePane_bottom .infowindow').fadeIn();

        } else {
            if (para == undefined) {
                me.removeClass('active');
                $('.sidePane_bottom').height(8);
                $('.sidePane_bottom .infowindow').fadeOut();
            } else {
                me.addClass('active');
                $('.sidePane_bottom').height(defHeight);

            }

        }

        initSidePaneBottom();

    });


    if (UOBMap.globalvar.widthtW >= UOBMap.globalvar.widthResponsive) {
        $('.map-canvas').width($('#map-frame').width() - UOBMap.globalvar.sidePane.width());
    } else {
        $('.recent-searches').css('width', $(window).width() - 20);
        UOBMap.globalvar.sidePane.css('opacity', 1);
        UOBMap.globalvar.sidePane.css({'left': UOBMap.globalvar.widthtW});
    }
    $('.fac_header .navibar').on('click', function () {
        $('.branch').hide();
        $('.sidePane_facility_details').css({'marginLeft': UOBMap.globalvar.widthtW, 'opacity': 0});
        var previousPlace = $(this).attr('data-pr-page');
        if (previousPlace === "sidePane") {
            $('.geocodemenu-block').trigger('click');
        } else if (previousPlace === "mapview") {
            if (!$('.ico-expand').hasClass('active')) {
                $('.ico-expand').trigger('click');
            }
        }

    });

    $('body').on('click', '.button-srl', function () {
        var me = $(this),
            seeRouteList = me.closest('.see-route-list'),
            prefixSummary = seeRouteList.find('.prefix-summary'),
            listRouteLock = $(seeRouteList).nextAll('.list-route-block'),
            showRouteDetail = $(seeRouteList).nextAll('.show-route-detail');

        if (autoDetection) {
            $(listRouteLock).find('.detail').trigger('click');
            if ($(showRouteDetail).length > 0 && me.hasClass('inactive')) {
                $(showRouteDetail).slideUp();
                $('.route-panel').css('height', 'auto');
            } else {
                $(showRouteDetail).hide().width('100%').height($('.uobmap').height() - 46 - 48);
                $(showRouteDetail).slideDown();
            }
        } else {
            if ($(showRouteDetail).length > 0 && me.hasClass('inactive')) {
                $(listRouteLock).slideUp(function () {
                    $(showRouteDetail).slideUp();
                    $('.route-panel').css('height', 'auto');
                });
            } else {
                $(showRouteDetail).hide().width('100%').height($('.uobmap').height() - 46 - 48);
                $(listRouteLock).slideDown();
                // $(showRouteDetail).slideDown();
            }
        }

        $('.show-route-detail').height($(window).height() - $('.route').height() - $('.see-route-list').height() - 10);

        me.toggleClass('inactive');
        $(prefixSummary).toggle();
    });

    if (UOBMap.globalvar.widthtW < UOBMap.globalvar.widthResponsive) {

        // $('.sidePane_direction_form').css('left', UOBMap.globalvar.widthtW );


        $('.sidePane_direction_form .top-nav').on('click', function () {
            hideDirectionForm();
            var previousPlace = $(this).attr('data-pr-page');
            if (previousPlace === 'sidePane') {
                if ($('.geocodemenu-block .geocodemenu').hasClass('listview')) {
                    $('.geocodemenu-block').trigger('click');
                }
            } else if (previousPlace === 'facilityDetail') {
                $('.fac-direct').trigger('click', [$(this)]);
            } else if (previousPlace === 'sidePaneBottom') {
                UOBMap.globalvar.sidePane.css('left', $(window).width());
                if (!$('.ico-expand').hasClass('active')) {
                    $('.ico-expand').trigger('click');
                }
            }
        });
    }
    // var recentSearches = $('.recent-searches');
    initRecentSearch(geolocationInput);
    initRecentSearch(geolocationFromInput);

    if ($(window).width() >= UOBMap.globalvar.widthResponsive) {
        $('.get-directions-btn').on('click', function () {
            clearRoute();
            var directionFrom = $('#direction-from').val(),
                formattedAddress = getFormattedAddress($('#direction-from')),
                destLatlng = new google.maps.LatLng(destinationLat, destinationLng),
                markerGeolocation,
                txtStart = locationStart || directionFrom;
            if (directionFrom !== '') {
                saveDirectionFrom(formattedAddress, directionFrom);
                UOBMap.globalvar.isEmptyRoute = true;
                isSelectRoute = false;
                if (typeof marker !== 'undefined') {
                    markerGeolocation = marker.getPosition();
                } else {
                    markerGeolocation = '';
                }
                $('.text-start').html(txtStart);
                localHere = txtStart;
                var markerLocation = UOBMap.globalvar.markerHere.getPosition() || markerGeolocation;
                calcRoute(markerLocation, destLatlng, "DRIVING", 0);
                codeAddress(txtStart);
                $('#direction-to').val(markerName);
            } else {
                UOBMap.globalvar.isEmptyRoute = false;
                if (typeof marker !== 'undefined') {
                    marker.setMap(null);
                    marker.setPosition(null);
                }

                $('.list-route-block ul').html('<li class="choose-start-point">Please choose your starting point to get directions</li>');
                $('.text-start').text('');
                localHere = '';
            }

        });
    }

    $('.geocodemenu-block').unbind().click(function () {
        var me = $(this),
            showOffPane = "";

        // UOBMap.globalvar.sidePane.css({'position' : 'absolute', 'height': $(window).height() - 60});

        if (me.find('.geocodemenu').hasClass('listview')) {
            showListPanel();
        } else {
            hideListPanel();
        }


    });

    $('body').on('click touchend', '.sort-list ul li', function (e) {
        var me = $(this),
            sortUl = me.parent(),
            selectedSort = me.text();

        //if(!me.hasClass('active')){
        $(sortUl).find('.active').removeClass('active');
        me.addClass('active');

        var scrollEl = $('.storelist').find('[data-title="' + selectedSort + '"]'),
            topToSc = "";


        if (scrollEl.length > 0 || selectedSort == "All") {

            if (selectedSort == "All") {
                topToSc = 0;
            } else {
                topToSc = $(scrollEl.get(0)).offset().top - $('.storelist').offset().top + $('.storelist').scrollTop();
            }

            $('.storelist').animate({
                scrollTop: topToSc
            }, 500);
        }
        //}

    });
    $('noscript').remove();
    // show image quality
    qualityImage();

});
// window load
$(window).load(function () {

});

// window resize
$(window).resize(function () {

    winResWidth = $(window).width();
    winResHeigh = $(window).height();

    var menuHeight = $('#menu').height();
    var showResultHeight = $('.center-bottom-block').outerHeight();
    // initContainer(winResHeigh);
    $('.sort-list').width(winResWidth);
    if (winResWidth < UOBMap.globalvar.widthResponsive) {
        $('.recent-searches').css('width', winResWidth - 20);
        if ($('.mapview').length > 0) {
            UOBMap.globalvar.sidePane.css({'height': winResHeigh - menuHeight});
        }

        $('.sidePane_facility_details').css({'margin-left': winResWidth});
        $('.list-panel .storelist').height(UOBMap.globalvar.sidePane.height() - $('.kmMessage').outerHeight());
        $('.selectBranchMenu').height(winResHeigh - menuHeight - showResultHeight);

        if (parseInt(UOBMap.globalvar.sidePane.css('left').replace('px', '')) > 0) {
            UOBMap.globalvar.sidePane.css('left', winResWidth);

        }
        if (UOBMap.globalvar.sidePane.css('opacity') == 0) {
            UOBMap.globalvar.sidePane.css('left', winResWidth);
        }

        if ($('.sidePane_bottom_container').html().trim().length > 0 && $('.sidePane_bottom_container .infowindow').css('display') != 'none') {
            $('.sidePane_bottom').height(defHeight);
        }

        scrollHeight = $('.storelist')[0].scrollHeight;

        // $('.show-route-detail').height(winResHeigh - $('.route').height() - $('.see-route-list').height() - 10);
        initRouteHeight()

        initSidePaneBottom();

    } else {
        var mapHeight = $('#map-frame').height();
        $.each($('.slimScrollDiv'), function (idx, el) {
            var me = $(el);
            if (me.height() > 0) {
                me.find('[data-custom-scroll]').height(mapHeight);

                if (me.parent().is('.menu-select')) {
                    me.height(winResHeigh - menuHeight - showResultHeight);
                } else {
                    me.height(mapHeight);
                }
            }
        });
        $('.map-canvas').width($('#map-frame').width() - UOBMap.globalvar.sidePane.width());
    }
    // resize popup
    var popup = $('.m-popup');
    if (popup.is(':visible')) {
        popup.css({
            top: (winResHeigh - popup.height()) / 2,
            left: (winResWidth - popup.width()) / 2
        });
    }

});

function initContainer(heightW) {
    // UOBMap.globalvar.heightW = $('#container');
    if (winResWidth <= UOBMap.globalvar.widthResponsive) {
        $('#container').height(heightW);
        $('#map-frame').height(heightW - 60);
    }
}


function initSortList(charSortArr) {
    // var sortListChar = genCharArray('a', 'z');
    var sortList = $('.sort-list');
    var sortListUl = $(sortList).find('ul');

    for (var i = 0, len = charSortArr.length; i < len; i++) {
        var element = $("<li>" + charSortArr[i].toUpperCase() + "</li>");
        sortListUl.append(element);
    }
    $('.sort-list').width(UOBMap.globalvar.widthtW);

    var sortListLi = $('.sort-list ul li'),
        maxWidth = 0;
    for (var i = 0, len = sortListLi.length; i < len; i++) {
        maxWidth += $(sortListLi[i]).width();
    }
    $(sortListUl).width(maxWidth + 30);

    var arrR = $(sortList).find('.icon-arrow-right'),
        arrL = $(sortList).find('.icon-arrow-left');

    $(arrR).show();
    $(arrL).hide();

    var lastScrollLeft = 0;
    var maxScrollLeft = 230;
    if (sortList.length > 0) {
        var el = sortListUl.get(0);
        maxScrollLeft = el.scrollWidth - $(sortList).width();
    }
    $(".sort-list").scroll(function (e) {
        var listScrollLeft = $(sortList).scrollLeft();

        if (lastScrollLeft != listScrollLeft && listScrollLeft >= 10) {
            $(arrL).show();
            $(arrR).show();
        }

        if (listScrollLeft >= maxScrollLeft - 22) {
            $(arrR).hide();
        }

        if (listScrollLeft < 22) {
            $(arrL).hide();
            $(arrR).show();
        }
    });
    var dataTitle = $('[data-title]');

    for (var i = 0, len = dataTitle.length; i < len; i++) {
        var title = dataTitle[i]
    }
    scrollHeight = $('.storelist')[0].scrollHeight;


}

function initIconMan() {
    $('.icon-man').each(function () {
        var me = $(this),
            listStore = me.closest('li.store');

        me.css('top', $(listStore).outerHeight() - $(me).height() - 10);

    });
}

function initListFilterBranch() {
    var listarray = [
        //branches
        ["Branch", "Branch"], //0
        ["Lite", "Lite Branch"], //1
        ["Privilege", "Privilege Banking Centre"], //2
        ["Reserve", "Privilege Reserve Suite"], //3
        ["Wealth", "Wealth Banking Centre"], //4
        // ["Private", "Private Banking Centre"], //5
        ["ExHr", "Branch (Extended Hours)"], //6
        //machines
        ["ATM", "ATM"], //7
        ["CATM", "Contactless ATM"], //8
        ["CDM", "Cash Deposit"], //9
        ["PUM", "Passbook Update"], //10
        ["SATM", "OCBC ATM"], //11

        //others
        ["QCD", "Quick Cheque Deposit"], //12
        ["SDB", "Safe Deposit Box"], //13

    ];

    var branchMenu = "";
    var machineMenu = "";
    var otherMenu = "";
    for (var i = 0; i < 6; i++) {
        var iName = (listarray[i] != undefined) ? listarray[i][0] : "",
            iCheck = (listarray[i] != undefined) ? listarray[i][1] : "";

        branchMenu += '<div class="uobmap-list-item" name="' + iName + '"><div class="POI" style="width:40px"><div class="icon checkbox"></div></div><div class="menuPOItext">' + iCheck + '</div></div>';
    }
    for (var i = 6; i < 11; i++) {
        var iName = (listarray[i] != undefined) ? listarray[i][0] : "",
            iCheck = (listarray[i] != undefined) ? listarray[i][1] : "";
        machineMenu += '<div class="uobmap-list-item" name="' + iName + '"><div class="POI" style="width:40px"><div class="icon checkbox"></div></div><div class="menuPOItext">' + iCheck + '</div></div>';
    }
    for (var i = 11; i < 13; i++) {
        var iName = (listarray[i] != undefined) ? listarray[i][0] : "",
            iCheck = (listarray[i] != undefined) ? listarray[i][1] : "";
        otherMenu += '<div class="uobmap-list-item" name="' + iName + '"><div class="POI" style="width:40px"><div class="icon checkbox"></div></div><div class="menuPOItext">' + iCheck + '</div></div>';
    }

    $('.branchMenuPOI').html(branchMenu);
    $('.machineMenuPOI').html(machineMenu);
    $('.otherMenuPOI').html(otherMenu);

    $('.uobmap-list-item').eq(0).addClass('clicked');
}


function showDirectionForm(toLocation, fromLocation) {
    if (toLocation !== undefined) {
        $('#direction-to').val(toLocation);
    }
    $('.sidePane_direction_form').css('zIndex', 99);
    if (UOBMap.globalvar.widthtW >= UOBMap.globalvar.widthResponsive) {
        $('.sidePane_direction_form').css('display', 'block');
    } else {
        $('.sidePane_direction_form').css({'display': 'block', 'left': 0, 'opacity': 1});
        UOBMap.globalvar.sidePane.css('opacity', 0);
        loadRecentSearches($('#direction-to').closest('[data-parent-search]').find('.recent-searches'))
    }
    geolocationInput.val(fromLocation);
}

function showListPanel(isAnimated) {
    if (isAnimated === undefined) {
        isAnimated = true;
    }
    // UOBMap.globalvar.sidePane.css({'top': '60px', 'height': $(window).height() - 60});
    UOBMap.globalvar.sidePane.css({'top': '0px', 'height': $(window).height() - 60, 'position': 'absolute'});
    $('.list-panel .storelist').height(UOBMap.globalvar.sidePane.height() - $('.kmMessage').outerHeight());

    UOBMap.globalvar.sidePane.css({'left': 0, 'opacity': 1});
    $('.route-panel').hide();
    $('.list-panel').show();

    $('.geocodemenu').removeClass('listview');
    $('.geocodemenu').addClass('mapview');
}

function hideListPanel() {
    UOBMap.globalvar.sidePane.css({'left': UOBMap.globalvar.widthtW, 'opacity': 0});
    $('.geocodemenu').addClass('listview');
    $('.geocodemenu').removeClass('mapview');
}

function hideDirectionForm() {
    if (UOBMap.globalvar.widthtW >= UOBMap.globalvar.widthResponsive) {
        $('.sidePane_direction_form').css('display', 'none');
    } else {
        $('.sidePane_direction_form').css({
            'left': UOBMap.globalvar.widthtW,
            'opacity': 0,
            'display': 'none'
        });
    }
}

function menuBar(active) {
    if (windowWidth <= UOBMap.globalvar.widthResponsive) {
        var menu = $('#menu'),
            conta = menu.closest('#container'),
            mapfr = conta.find('#map-frame');
        if (active) {
            menu.show();
            mapfr.height(conta.height() - menu.height());
        } else {
            menu.hide();
            mapfr.height(conta.height() + 2);
        }
    }
}

function loadRecentSearches(item) {
    var cookie = getCookie('recentSearches');
    if (typeof cookie !== 'undefined' && cookie) {
        var recentSearchesArr = JSON.parse(cookie),
            html = '';
        for (var i = recentSearchesArr.length - 1; i < recentSearchesArr.length && i >= 0; i--) {
            html += '<div class="recent-item" data-formatted-address="' + recentSearchesArr[i].value + '">' + recentSearchesArr[i].name + '</div>'
        }
        $('.recent-searches').find('.recent-list').html(html);
        recentSearchItem(item.find('.recent-item'));
    }
    if (item.find('.recent-item').length > 0) {
        item.slideDown();
    }
}

function saveDirectionFrom(el, name) {
    var value = [];
    // var location = geolocationInput.val();
    if (el !== undefined && el.length > 1) {
        var nameValue = name;
        if (name == undefined || name === "") {
            nameValue = el;
        }

        nameValue = nameValue.replace(/\s+$/, '');
        var elStr = el.replace(/\s+$/, '');

        var item = {
            value: elStr,
            name: nameValue
        }
        if (getCookie('recentSearches')) {
            value = JSON.parse(getCookie('recentSearches'));
            // var item = el.replace(/\s+$/, '');
            for (var i = value.length - 1; i >= 0; i--) {
                if (value[i].value === item.value) {
                    value.splice(i, 1);
                }
            }
            if (value.length > 2) {
                value.shift();
            }
            value.push(item);
        } else {
            value.push(item);
        }
        setCookie('recentSearches', JSON.stringify(value));
    }
}
//input search autocomplete google place
function recentSearchItem(item) {
    $(item).on('mousedown', function (event) {
        event.preventDefault();
    }).on('click', function () {
        var me = $(this);

        geolocationInput.val($(this).text());
        geolocationFromInput.val($(this).text());
        geolocationInput.attr('data-formatted-address', $(this).attr('data-formatted-address'));
        geolocationFromInput.attr('data-formatted-address', $(this).attr('data-formatted-address'));
        geolocationInput.keypress();
        geolocationFromInput.keypress();
        // geocodeSearch();
        var input = document.getElementById('direction-from');
        google.maps.event.trigger(input, 'focus')
        google.maps.event.trigger(input, 'keydown', {
            keyCode: 13
        });
        geoCodeTrue = "false";
        clearRoute();
    });

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
}

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

String.prototype.getSortTitle = function () {
    var maxLength = this.length,
        prefixLength = this.indexOf("-"),
        title = this.substr(prefixLength + 1, maxLength).trim().substr(0, 1);

    return isNaN(title) ? title : '0-9';
};
function showPopup(msg) {
    var popup = $('.m-popup'),
        overlay = $('.overlay');

    if (popup.length > 0 && !popup.hasClass('active')) {

        if (msg == "not-detect") $('.not-detect').show();
        if (msg == "not-found") $('.not-found').show();
        if (msg == "query-limit") $('query-limit').show();
        popup.removeClass('hide').addClass('active');

        overlay.removeClass('hide');
        var windowEl = $(window),
            heightWin = windowEl.height(),
            widthWin = windowEl.width(),
            top = (heightWin - popup.height()) / 2,
            left = (widthWin - popup.width()) / 2;
        popup.css({
            top: top,
            left: left
        });
        $('.m-close').on('click.close', function () {
            popup.addClass('hide').removeClass('active');
            overlay.addClass('hide');
            $('.not-detect').hide();
            $('.not-found').hide();
            $('.query-limit').hide();
        });
    }
}
//print
function printMaps() {
    var body = $('.contentTop');
    var mapContainer = $('.map-canvas');
    var item = UOBMap.globalvar.sidePane;
    var mapContainerParent = mapContainer.parent();
    var printContainer = $('<div>');
    var markers = UOBMap.globalvar.markerCluster.getMarkers();
    var timer = null;
    UOBMap.globalvar.markerCluster.clearMarkers();
    google.maps.event.trigger(UOBMap.globalvar.map, 'resize');
    clearTimeout(timer);
    timer = setTimeout(function () {
        printContainer
            .addClass('print-container')
            .css('position', 'relative')
            .height(mapContainer.height())
            .append(mapContainer)
            .append(item)
            .prependTo(body);

        var content = body
            .children()
            .not('script')
            .not(printContainer)
            .detach();

        var patchedStyle = $('<style>')
            .attr('media', 'print')
            .text('img { max-width: none !important;}' +
                'a[href]:after { content: ""; }')
            .appendTo('head');

        window.print();

        body.prepend(content);
        mapContainerParent.prepend(mapContainer);
        mapContainerParent.prepend(item);

        printContainer.remove();
        patchedStyle.remove();
        UOBMap.globalvar.markerCluster.addMarkers(markers, true);
    }, 100);
}

var eKey13 = $.Event("keypress", {which: 13});

function initSidePaneBottom() {
    var sidePaneBottom = $('.sidePane_bottom_container');
    if (sidePaneBottom.html().trim().length > 0) {
        var distant = sidePaneBottom.find('.distance'),
            infowindowDetail = sidePaneBottom.find('.infowindow'),
            innerInfo = sidePaneBottom.find('.inner-info'),
            directionDetail = sidePaneBottom.find('.direction');

        var widthInfowindowDetail = $(infowindowDetail).width(),
            widthDistant = $(distant).width(),
            widthDirection = $(directionDetail).outerWidth();

        widthDistant = widthDistant == null ? 0 : widthDistant;
        $(innerInfo).outerWidth(widthInfowindowDetail - widthDistant - 5);
    }
}

//quality image
function qualityImage() {
    var devicePixelRatio = (window.devicePixelRatio === undefined ? 1 : window.devicePixelRatio);

    //init quality base on devies
    if (devicePixelRatio > 1) {
        // non desktop
        UOBMap.globalvar.pinMarker = {
            url: imageIconUrl,
            size: new google.maps.Size(35, 30),
            scaledSize: new google.maps.Size(50, 1250),
            origin: new google.maps.Point(2, 1099)
        };
        UOBMap.globalvar.pinMarkerActive = {
            url: imageIconUrl,
            size: new google.maps.Size(35, 31),
            scaledSize: new google.maps.Size(50, 1250),
            origin: new google.maps.Point(2, 1143)
        };
        UOBMap.globalvar.userGreen = {
            url: imageIconUrl,
            size: new google.maps.Size(37, 37),
            scaledSize: new google.maps.Size(50, 1250),
            origin: new google.maps.Point(5, 222),
            anchor: new google.maps.Point(18.5, 18.5)
        };
        UOBMap.globalvar.clusterStyles = [{
            textColor: '#fff',
            url: imageIconUrl,
            height: 30,
            width: 34,
            anchor: [-8, 0],
            backgroundPosition: '-3px -1187px',
            backgroundSize: '50px 1250px'
        }];
    } else {
        // desktop
        UOBMap.globalvar.pinMarker = {
            url: imageIconUrl,
            size: new google.maps.Size(40, 36),
            origin: new google.maps.Point(5, 2134)
        };
        UOBMap.globalvar.pinMarkerActive = {
            url: imageIconUrl,
            size: new google.maps.Size(41, 36),
            origin: new google.maps.Point(54, 2134)
        };
        UOBMap.globalvar.userGreen = {
            url: imageIconUrl,
            size: new google.maps.Size(37, 37),
            origin: new google.maps.Point(54, 217),
            anchor: new google.maps.Point(18.5, 18.5)
        };
        UOBMap.globalvar.clusterStyles = [{
            textColor: '#fff',
            url: imageIconUrl,
            height: 36,
            width: 38,
            anchor: [-11, 0],
            backgroundPosition: '-5px -2453px'
        }];
    }
}

function backDirection(element) {
    element.on('click', function () {
        $('.route-panel').hide();
        $('.back-branch').hide();
        var el = $(this);
        reclusterRoutedMarkers();
        clearRoute();

        $('.show-route-detail').slideUp();
        $('.geocodemenu').addClass('listview');
        $('.geocodemenu').removeClass('mapview');

        if ($('#direction-to').val() !== undefined && $('#direction-to').val() !== '') {
            showDirectionForm($('#direction-to').val(), geolocationInput.val());
        }

        if (element.attr('data-pr-page') == 'sidePane') {
            $('.geocodemenu-block').trigger('click');
        } else {
            UOBMap.globalvar.sidePane.css({'left': $('.window').width(), opacity: 0});
            menuBar(true);
        }

    });
}

function initRecentSearch(geoLocaInput) {
    var recentSearches = $('.recent-searches');
    geoLocaInput.on({
        'keypress': function (e) {
            if (e.which === 13) {
                clearRoute();
                geoLocaInput.attr('data-formatted-address', '');
                if (autoDetection || !geolocationFrom.is(':visible') && !$('.sidePane_direction_form').is(':visible')) {
                    // geocodeSearch();
                    var input = document.getElementById('geocodeInput');
                    google.maps.event.trigger(input, 'focus')
                    google.maps.event.trigger(input, 'keydown', {
                        keyCode: 13
                    });
                }
            }

            var geoblockRecentSearch = $(this).closest('[data-parent-search]').find(recentSearches);
            if (UOBMap.globalvar.widthtW >= UOBMap.globalvar.widthResponsive) {
                geoblockRecentSearch = recentSearches;
                if (geoblockRecentSearch.length) {
                    geoblockRecentSearch.stop(true, true).slideUp();
                }

            }

        },
        'keyup': function () {
            if (recentSearches.length && $(this).val() === '') {
                // showRecentSearches(recentSearches);
                var item = $(this).closest('[data-parent-search]').find(recentSearches);
                $(this).attr('data-formatted-address', "");
                loadRecentSearches(item);
            }
        },
        'click': function () {
            if (recentSearches.length && $(this).val() === '') {
                // showRecentSearches(recentSearches);
                var item = $(this).closest('[data-parent-search]').find(recentSearches);
                loadRecentSearches(item);
            }
        },
        'focusout': function () {
            var geoblockRecentSearch = $('.geocodesearch-block').find(recentSearches);
            if (UOBMap.globalvar.widthtW >= UOBMap.globalvar.widthResponsive) {
                geoblockRecentSearch = recentSearches;
            }
            geoblockRecentSearch.stop(true, true).slideUp();
            // var valueInput = $(geoLocaInput).val();
            // var idInput = $(geoLocaInput).attr('id');
            //
            // if(idInput == 'geocodeInput') {
            //     $('#direction-from').val(valueInput);
            // }
            // if(idInput == 'direction-from') {
            //     $('#geocodeInput').val(valueInput);
            // }

            // var input = document.getElementById('direction-from');
            // google.maps.event.trigger(input, 'focus')
            // google.maps.event.trigger(input, 'keydown', {
            //     keyCode: 13
            // });
        }

    });
}