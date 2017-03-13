//backup unsused variable
/*
var circleCenter, circle = new google.maps.Circle({
    map: null,
    fillColor: "#CC0000", // the circle color
    fillOpacity: 0, //opacity of the color
    strokeColor: "#CC0000", // the border color
    strokeOpacity: 0 //opacity of the border color
});

 var infoWindowArray = new Array();

 var directionsDisplay = new google.maps.DirectionsRenderer();

 var markerHere = new google.maps.Marker({});

*/
//end backup unsused variable
var close = false;
var lat = 1.27996;
var lng = 103.85379;
var bounds = "";
var receivedData = "";
// var destinationLatLng = 0;
var destinationLat = 0;
var destinationLng = 0;
var setSGcenter = new google.maps.LatLng(1.27996, 103.85379);

var markerArray = new Array();

//marker search

//marker current location
var markerCurrent = new google.maps.Marker({});
// diretion services:
var directionsService = new google.maps.DirectionsService();

//Markers
var markers = [];
var markerName;
var localHere;
var globalLat;
var geolocationValue;
//variables boolean
var autoDetection = false;
var isClickItem = false;
var isSelectRoute = false;
var clusterClicked = false;
//template
var routeTemplate = $('[data-template-route]');
var detailBlockTemplate = $('[data-template-detail-block]');
var routeDetailTemplate = $('[data-template-route-detail]');
//variable data
var geolocationInput = $('[data-geolocation-input]');
var geolocationFromInput = $('[data-direction-from-input]');
var geolocationFrom = $('[data-direction-from]');
//variable integer
var heightInfo = 0;

var infowindowLocal = new google.maps.InfoWindow();
var infowindow = new google.maps.InfoWindow({
    scrollwheel: false,
    maxWidth: 350
});
var animateMarker;
var checkedBranches = [];
var map;


function initialize() {
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(1.355255, 103.82313899999997),
        mapTypeControl: false,
        streetViewControl: false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var ne = new google.maps.LatLng(1.483676, 104.096146);
    var sw = new google.maps.LatLng(1.185753, 103.593521);
    bounds = new google.maps.LatLngBounds(sw, ne);
    UOBMap.globalvar.map = map;
    loadBranches();
    // loadSearch();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            autoDetection = true;
            var geocoder = new google.maps.Geocoder();
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var latlng = new google.maps.LatLng(pos.lat, pos.lng);
            globalLat = latlng;
            // infowindowMan.setPosition(pos);

            //reverse geocode the coordinates, returning location information.
            geocoder.geocode({'latLng': latlng}, function (results, status) {
                var result = results[0];
                localHere = result.formatted_address;
                UOBMap.globalvar.userAddress = result.formatted_address;
                if (typeof UOBMap.globalvar.markerHere !== 'undefined') {
                    UOBMap.globalvar.markerHere.setMap(null);
                }
                geolocationInput.val(localHere);

                marker = new google.maps.Marker({
                    map: map,
                    position: latlng,
                    icon: UOBMap.globalvar.userGreen // null = default icon
                });

                map.setCenter(pos);
                infowindowLocal.setContent(localHere);
                infowindowLocal.open(map, marker);

                google.maps.event.addListener(marker, 'click', function () {
                    infowindowLocal.open(map, marker);
                });
                addYourLocationButton(map, marker);
                $('.geocodesearch').trigger('click');
            });

        }, function (error) {
            handleLocationError(true, infowindow, map.getCenter());
            if (error.code === error.PERMISSION_DENIED || error.message === 'Timeout expired') {
                autoDetection = false;
                //show popup
                if ($(window).width() < UOBMap.globalvar.widthResponsive) {
                    showPopup("not-detect");
                }
                initGeoDetectionState(autoDetection);
                initClickGreenColor(map);
            }
        }, {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 5000
        });


    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infowindow, map.getCenter());
    }

    initGeoDetectionState(autoDetection);
    initPreSelectedTypes();
    openFilterBranch();
}

function initClickGreenColor(map) {
    // click anywhere on the map to set green color
    google.maps.event.clearListeners(map, 'click');
    google.maps.event.addListener(map, 'click', function (event) {
        // geolocationInput.focusout();
        if (!clusterClicked) {
            clearRoute();
            reclusterRoutedMarkers();
            if ($('.list-route-block').is(':visible')) {
                $('.list-route-block ul').html('');
                $('.text-start').html('');
            }
            UOBMap.globalvar.markerHere.setMap(null);
            UOBMap.globalvar.markerHere.setPosition(null);
            if (typeof marker !== 'undefined' && marker) {
                marker.setMap(null);
                marker.setVisible(false);

            }
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                icon: UOBMap.globalvar.userGreen
            });

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'latLng': event.latLng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var result = results[0];
                    localHere = result.formatted_address;
                    geolocationInput.val(localHere);
                    // geolocationInput.keypress();
                    $('#direction-from').val(localHere);
                    geolocationInput.attr('data-formatted-address', localHere);
                    $('#direction-from').attr('data-formatted-address', localHere);
                    geolocationValue = localHere;
                    infowindowLocal.setContent(localHere);
                    infowindowLocal.open(map, marker);
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindowLocal.open(map, marker);
                    });
                } else {
                    geolocationInput.val(status);
                    $('#direction-from').val(status);
                    geolocationInput.attr('data-formatted-address', status);
                    $('#direction-from').attr('data-formatted-address', status);
                    geolocationValue = status;
                    infowindowLocal.setContent(status);
                    infowindowLocal.open(map, marker);
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindowLocal.open(map, marker);
                    });
                }
            });
        } else {
            clusterClicked = false;
            // alert('ClusterClicked map click not executed');
        }
    });
}
function initGeoDetectionState(isAutoDetection) {
    if (isAutoDetection) {
        $('.sidePane .list-panel').removeClass('non-auto-detection');
    } else {
        $('.sidePane .list-panel').addClass('non-auto-detection');
        $('.sidePane .sidePane-top-filter').css('display', 'block');
        initClickGreenColor(UOBMap.globalvar.map);
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
// function geocodeLatLng(position) {
//   var geocoder = new google.maps.Geocoder;
//   var latlngStr = [position.coords.latitude, position.coords.longitude];
//   var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
// geocoder.geocode({'location': latlng}, function(results, status) {
//   if (status === google.maps.GeocoderStatus.OK) {
//     localHere = results;
//   } else {
//     window.alert('Geocoder failed due to: ' + status);
//   }
// });
// }
//google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addDomListener(window, "resize", function () {
    // var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    // map.setCenter(setSGcenter);
});


/*================================================================================  */
/*EVENT: Toggle Button - hide/expand Pane*/
// $('.sidePane').click(function(){
$('.toggle').click(function () {
    /*================================================================================  */
    /*EVENT: change the toggleImg*/
    var toggleImg = parseInt($(".sidePane").css('marginLeft')) == 0 ? 'url(img/toggerBtnOpen.png)' : 'url(img/toggerBtnClose.png)'; //check panel. If close, change the picture to close panel img, else open
    $('.toggle').css('background-image', toggleImg);

    /*================================================================================  */
    /*EVENT: Pane Animation*/
    var $marginLefty = $(".sidePane").next();


    //Pane animation
    // $(this).animate({
    $(".sidePane").animate({
        marginLeft: parseInt($(".sidePane").css('marginLeft')) == 0 ? // set condition to check panel's width
            282 : 0 // if 0, toggle to 270px else 0px
    }, 500, "swing");
    //set map-canvas size
    $(".map-canvas").animate({
        "width": parseInt($(".sidePane").css('marginLeft')) == 0 ? // set condition to check panel's width
            "+=290px" : "-=290px" // resize map canvas width accordingly
    }, 500, "swing");
    google.maps.event.trigger(map, 'resize');

    //set Google Map resize
    setTimeout(function () {
        google.maps.event.trigger(map, "resize");
        //google.maps.event.trigger(panorama, "resize");
    }, 500);
});


/*================================================================================  */
/*Fuction: Calculate and sort POIs*/
function calDist(latlng) {
    if (latlng == null)
        if (Latlng = null) return;
    for (var i = 0; i < receivedData.length; i++) {
        receivedData[i].compDist = parseInt(google.maps.geometry.spherical.computeDistanceBetween(receivedData[i].latlng, latlng));
    }
    //sorting
    var listArray = receivedData;
    listArray = listArray.sort(function (a, b) {
        if (a.compDist == b.compDist) {
            return a.sortid - b.sortid;
        } else {
            return a.compDist - b.compDist;
        }
    });
}

function nullDist() {
    for (var i = 0; i < receivedData.length; i++) {
        receivedData[i].compDist = null;
    }
}

function loadMarker(loadMarkerArray) {
    var branchId;
    var urlName = unescape(getUrlParameter("name")); //get Url Parameter
    urlName = urlName.toLowerCase();
    markers = [];
    for (var i = 0; i < loadMarkerArray.length; i++) {
        if (loadMarkerArray[i].compDist === null || loadMarkerArray[i].compDist < 5000) {
            if (loadMarkerArray[i].name.toLowerCase() === urlName) {
                resetMarker();
                branchId = i;
            }
            var markerLatlng = new google.maps.LatLng(loadMarkerArray[i].lat, loadMarkerArray[i].lng);
            var marker = new google.maps.Marker({
                lat: loadMarkerArray[i].lat,
                lng: loadMarkerArray[i].lng,
                position: markerLatlng,
                map: map,
                icon: UOBMap.globalvar.pinMarker,
                id: i,
                address: loadMarkerArray[i].address,
                postalcode: loadMarkerArray[i].postalcode,
                name: loadMarkerArray[i].name,
                tel: loadMarkerArray[i].tel,
                fax: loadMarkerArray[i].fax,
                OpHrMonFri: loadMarkerArray[i].OpHrMonFri,
                OpHrSat: loadMarkerArray[i].OpHrSat,
                OpHrSun: loadMarkerArray[i].OpHrSun,
                descSum: loadMarkerArray[i].DescSum,
                descDe: loadMarkerArray[i].DescDe,
                descSum1: loadMarkerArray[i].DescSum1,
                descDe1: loadMarkerArray[i].DescDe1,
                descSum2: loadMarkerArray[i].DescSum2,
                descDe2: loadMarkerArray[i].DescDe2,
                descSum3: loadMarkerArray[i].DescSum3,
                descDe3: loadMarkerArray[i].DescDe3,
                type: loadMarkerArray[i].type
            });
            markers.push(marker);

            if (marker.type == "SATM") {
                marker.setZIndex(999);
            }
            markerArray[i] = marker;
            markerArray[i].setMap(map);

            //click marker to show infowindow on map
            google.maps.event.addListener(marker, 'click', function (doesShowInfoWindow) {
                var marker = this,
                    timer = null,
                    speedTimer = 0;

                if (isClickItem) {
                    map.setZoom(19); // zoom map when trigger list item branch
                    map.panTo(marker.getPosition());
                    speedTimer = 500;
                } else {
                    var listPanel = $('.list-panel'),
                        storeItem = listPanel.find('.storelist'),
                        listItem = storeItem.find('li'),
                        pinIndex = marker.id,
                        pos = 0, kmHeight = 0;
                    if ($('.kmMessage').length) {
                        kmHeight = $('.kmMessage').outerHeight(true);
                    } else {
                        kmHeight = 0;
                    }
                    for (var i = 0; i < pinIndex; i++) {
                        pos += listItem.eq(i).outerHeight(true);
                    }
                    if ($(window).width() >= UOBMap.globalvar.widthResponsive) {
                        listPanel.slimscroll({scrollTo: pos + kmHeight});
                    }
                    listItem.eq(pinIndex).addClass('selected').siblings().removeClass('selected');
                    speedTimer = 0;
                }
                clearTimeout(timer);
                timer = setTimeout(function () {
                    markerClick(marker, doesShowInfoWindow);
                }, speedTimer);

                isClickItem = false;
                if ($('.infowindow').length) {
                    heightInfo = 0;
                } else {
                    heightInfo = 20;
                }
            });
        }

        if (branchId == i) {
            map.setZoom(15);
            i = loadMarkerArray.length;
        }
    }

    initMarkerClusterer(markers);

    google.maps.event.clearListeners(infowindow, 'domready');

    google.maps.event.addListener(infowindow, 'domready', function () {
        var infoEl = $('.infowindow');
        //add class custom infowindow
        var customEl = infoEl.closest('.gm-style-iw').parent().addClass('custom-iw');
        infoEl.closest('.gm-style-iw').next().addClass('custom-iw-close').attr('title', 'Close').find('img').remove();
        //remove infowindow arrow default
        $('.custom-iw').find('div').eq(0).find('div:last').siblings().remove();
        //add class to custom arrow infowindow
        if (!$('.infowindow-arrow').length) {
            $('<span class="icon infowindow-arrow"></span>').insertBefore($('.gm-style-iw'));
        }
        //set position infowindow
        var infoArrow = $('.infowindow-arrow');
        if (infoEl.closest('.gm-style-iw').offset().left > 120) {
            infowindow.setOptions({
                'pixelOffset': new google.maps.Size((customEl.outerWidth(true) / 2) + 50, customEl.outerHeight(true) + heightInfo)
            });
            infoArrow.removeClass('bottom');
        } else {
            infowindow.setOptions({
                'pixelOffset': new google.maps.Size(15, 5)
            });
            infoArrow.addClass('bottom');
            map.setCenter(infowindow.getPosition());
        }
        var heightIframe = $('.map-frame').height() - 80;

        if (infoEl.outerHeight(true) > heightIframe) {
            infoEl.slimscroll({
                height: heightIframe,
                wheelStep: 3
            }).parent().css({
                'padding-bottom': 15
            });
        }

        getDirection(infoEl.find('.direction'));

    });

}

function initMarkerClusterer(markers) {
    // var clusterStyles = [{
    //   textColor: '#fff',
    //   url: 'img/cluster.png',
    //   height: 26,
    //   width: 28,
    //   anchor: [-8, 0]
    // }];
    var mcOptions = {
        gridSize: 50,
        maxZoom: 18,
        styles: UOBMap.globalvar.clusterStyles

    };

    if (typeof UOBMap.globalvar.markerCluster !== 'undefined' && UOBMap.globalvar.markerCluster instanceof MarkerClusterer) {
        UOBMap.globalvar.markerCluster.clearMarkers();
    }
    UOBMap.globalvar.markerCluster = createMarkerClusterer(mcOptions, markers);

    if (typeof UOBMap.globalvar.routedMarkerCluster !== 'undefined' && UOBMap.globalvar.routedMarkerCluster instanceof MarkerClusterer) {
        UOBMap.globalvar.routedMarkerCluster.clearMarkers();
    }
    UOBMap.globalvar.routedMarkerCluster = createMarkerClusterer(mcOptions, []);
}

function createMarkerClusterer(option, markers) {
    var markerClusterer;
    markerClusterer = new MarkerClusterer(map, markers, option);
    google.maps.event.addListener(markerClusterer, 'clusterclick', function (cluster) {
        clusterClicked = true;
    });

    return markerClusterer;
}

function excludeRoutedMarkerFromCluster() {
    reclusterRoutedMarkers();
    UOBMap.globalvar.markerCluster.removeMarker(UOBMap.globalvar.destinationMarker);
    UOBMap.globalvar.routedMarkerCluster.addMarker(UOBMap.globalvar.destinationMarker, true);
    reDrawMarkerClusterer();
}


function reclusterRoutedMarkers() {
    var excludedMarkers = UOBMap.globalvar.routedMarkerCluster.getMarkers();
    UOBMap.globalvar.routedMarkerCluster.clearMarkers();
    UOBMap.globalvar.markerCluster.addMarkers(excludedMarkers, true);
    reDrawMarkerClusterer();
}

function reDrawMarkerClusterer() {
    UOBMap.globalvar.routedMarkerCluster.redraw();
    UOBMap.globalvar.markerCluster.redraw();
}

//function click marker on map
function markerClick(marker, doesShowInfoWindow) {
    // isClickItem = false;
    infowindowLocal.close();
    // geolocationInput.focusout();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(UOBMap.globalvar.pinMarker);
    }
    UOBMap.globalvar.destinationMarker = marker;
    marker.setIcon(UOBMap.globalvar.pinMarkerActive);
    // clearRoute();
    markerName = marker.name;
    // infowindowMan.close();
    // infowindow.close();

    UOBMap.globalvar.destinationLatLng = marker.position;
    destinationLat = marker.lat;
    destinationLng = marker.lng;
    ditant = '0KM';
    if (autoDetection) {
        var distantMap = parseInt(google.maps.geometry.spherical.computeDistanceBetween(globalLat, UOBMap.globalvar.destinationLatLng));
        var ditant = Math.round((distantMap / 1000) * 10) / 10 + 'KM';
    } else {
        $('#direction-to').val(marker.name);
    }

    var distance = '<div class="distance">' + ditant + '</div>';
    if ($(window).width() >= UOBMap.globalvar.widthResponsive || !autoDetection) {
        distance = "";
    }
    var html = '<div class="infowindow" id="infowindow">' +
        distance +
        '<div class="inner-info">' +
        '<div class="title">' + marker.name + '</div>' +
        '<div class="address">' + marker.address + ' ' + marker.postalcode + '</div>' +
        '<div class="tel">Tel: ' + marker.tel + '</div>';

    html += '<div class="type hid-desktop">' + marker.type + '</div>';

    if (marker.OpHrMonFri != '' && typeof(marker.OpHrMonFri) != 'undefined') {
        html += '<div class="openhour"><div class="tit-head">Operating Hours</div>';
        html += '<div class="openhourDetail"> Mon-Fri: ' + marker.OpHrMonFri;
        if (marker.OpHrSat != '' && typeof(marker.OpHrSat) != 'undefined') {
            html += '<br>Sat: ' + marker.OpHrSat;
        }
        if (marker.OpHrSun != '' && typeof(marker.OpHrSun) != 'undefined') {
            html += '<br>Sun: ' + marker.OpHrSun;
        }
        html += '</div></div>'
    }
    html += '<div class="available-services hid-phone"><div class="tit-head">Available Services</div>';
    html += '<div class="type">' + marker.type + '</div>';
    html += '</div>';

    if (marker.descSum != '' && typeof(marker.descSum) != 'undefined' ||
        marker.descDe != '' && typeof(marker.descDe) != 'undefined' ||
        marker.descSum1 != '' && typeof(marker.descSum1) != 'undefined' ||
        marker.descDe1 != '' && typeof(marker.descDe1) != 'undefined' ||
        marker.descSum2 != '' && typeof(marker.descSum2) != 'undefined' ||
        marker.descDe2 != '' && typeof(marker.descDe2) != 'undefined' ||
        marker.descSum3 != '' && typeof(marker.descSum3) != 'undefined' ||
        marker.descDe3 != '' && typeof(marker.descDe3) != 'undefined') {
        html += '<div class="service-message"><div class="tit-head">Service Message</div>';
        if (marker.descSum != '' && typeof(marker.descSum) != 'undefined') {
            html += '<div class="descSum">' + marker.descSum + '</div>';
        }
        if (marker.descDe != '' && typeof(marker.descDe) != 'undefined') {
            html += '<div class="desDe">' + marker.descDe + '</div>';
        }
        if (marker.descSum1 != '' && typeof(marker.descSum1) != 'undefined') {
            html += '<div class="descSum">' + marker.descSum1 + '</div>';
        }
        if (marker.descDe1 != '' && typeof(marker.descDe1) != 'undefined') {
            html += '<div class="desDe">' + marker.descDe1 + '</div>';
        }
        if (marker.descSum2 != '' && typeof(this.descSum2) != 'undefined') {
            html += '<div class="descSum">' + marker.descSum2 + '</div>';
        }
        if (marker.descDe2 != '' && typeof(marker.descDe2) != 'undefined') {
            html += '<div class="desDe">' + marker.descDe2 + '</div>';
        }
        if (marker.descSum3 != '' && typeof(marker.descSum3) != 'undefined') {
            html += '<div class="descSum">' + marker.descSum3 + '</div>';
        }
        if (marker.descDe3 != '' && typeof(marker.descDe3) != 'undefined') {
            html += '<div class="desDe">' + marker.descDe3 + '</div>';
        }
        html += '</div>';
    }
    html += '</div><div class="direction" title="Get Directions"><span>Get Directions</span></div>';
    html += '</div>'; //end div

    if ($(window).width() >= UOBMap.globalvar.widthResponsive) {
        infowindow.setContent(html);
        infowindow.open(map, marker);
    } else {
        $('.sidePane_bottom_container').html(html);
        $('.sidePane_bottom_container').addClass('initing');
        if (html.length > 0) {
            if ((doesShowInfoWindow !== undefined) && doesShowInfoWindow) {
                $('.ico-expand').trigger('click', 'update', 'distance');
            }
            $('.sidePane_bottom_container').removeClass('initing');
            getFacilityDetail($('.sidePane_bottom_container').find('.inner-info').addClass('fac-direct'));
            getDirection($('.sidePane_bottom_container').find('.direction').addClass('fac-detail-direct'));

        }
    }

    $('.desDe').addClass('selected');
}
function loadPaneItem(loadMarkerArray) {
    // $('.resultPane').html('');
    $('.list-panel').html('');
    var storelist = '';
    if (UOBMap.globalvar.searchPlace == "true") {
        storelist += '<div class="kmMessage">Showing results within 5 km of your search</div>'
    } else {
        storelist += '<div class="sort-list"><span class="icon-arrow-left"></span><ul><li class="active">All</li></ul><span class="icon-arrow-right"></span></div>'
    }
    storelist += '<ul class="storelist">';
    var charnum = 0;
    var listArray = [];
    var loadingPane = "false";
    var branchId;

    var directionBtn = "";


    var urlName = unescape(getUrlParameter("name")); //get Url Parameter
    urlName = urlName.toLowerCase();
    var charSortArr = new Array();

    for (var i = 0; i < loadMarkerArray.length; i++) {
        if (loadMarkerArray[i].compDist == null || loadMarkerArray[i].compDist < 5000) {
            var sortType = loadMarkerArray[i].name.getSortTitle();
            if ($.inArray(sortType, charSortArr) < 0) {
                charSortArr.push(sortType);
            }

            if (loadMarkerArray[i].name.toLowerCase() == urlName) {
                branchId = i;
                storelist = '<ul class="storelist">';
            }
            var compDist = loadMarkerArray[i].compDist != null && typeof(loadMarkerArray[i].compDist) != "undefined";
            var comp = "";
            if (compDist) {
                comp = "compDist";
            }
            loadingPane = "true";
            storelist += '<li class="store marker' + i + ' ' + comp + '" data-title="' + sortType + '">';
            storelist += '<div class="store"><div class="title" data-id=" ' + i + ' ">' + loadMarkerArray[i].name + '</div>';
            if (compDist) {
                storelist += '<div style="font-weight:normal;" class="distance">' + Math.round((loadMarkerArray[i].compDist / 1000) * 10) / 10 + 'KM</div><div class="address">' + loadMarkerArray[i].address + '</div>';
            }
            storelist += '<div class="type">' + loadMarkerArray[i].type + '</div>';
            storelist += '<div class="openhour">';
            loadMarkerArray[i].OpHrMonFri !== '' ? storelist += '<div class="time">Mon-Fri: ' + loadMarkerArray[i].OpHrMonFri + '</div>' : '';
            loadMarkerArray[i].OpHrSat !== '' ? storelist += '<div class="time">Sat: ' + loadMarkerArray[i].OpHrSat + '</div>' : '';
            loadMarkerArray[i].OpHrSun !== '' ? storelist += '<div class="time">Sun: ' + loadMarkerArray[i].OpHrSun + '</div>' : '';
            storelist += '</div>';

            if (loadMarkerArray[i].DescSum != "" && typeof(loadMarkerArray[i].DescSum) != "undefined") {
                storelist += '<div class="descSum' + i + '"style="color:#a76d71; font-size: 12px; padding-bottom: 10px;">' + loadMarkerArray[i].DescSum + '</div>';
            }

            if (loadMarkerArray[i].DescSum1 != "" && typeof(loadMarkerArray[i].DescSum1) != "undefined") {
                storelist += '<div class="descSum' + i + '"style="color:#a76d71; font-size: 12px; padding-bottom: 10px;">' + loadMarkerArray[i].DescSum1 + '</div>';
            }

            if (loadMarkerArray[i].DescSum2 != "" && typeof(loadMarkerArray[i].DescSum2) != "undefined") {
                storelist += '<div class="descSum' + i + '"style="color:#a76d71; font-size: 12px; padding-top: 5px;">' + loadMarkerArray[i].DescSum2 + '</div>';
            }

            if (loadMarkerArray[i].DescSum3 != "" && typeof(loadMarkerArray[i].DescSum3) != "undefined") {
                storelist += '<div class="descSum' + i + '"style="color:#a76d71; font-size: 12px; padding-top: 5px;">' + loadMarkerArray[i].DescSum3 + '</div>';
            }
            // storelist += '</div><div><img class="searchStreetview" style="padding-top:5px; max-width:95%; cursor: pointer;" src="/uob-branches-and-atms/assets/img/street-view.gif">';

            if ($(window).width() < UOBMap.globalvar.widthResponsive) {
                storelist += '</div><div class="direction-list-branch" data-lat="' + loadMarkerArray[i].lat + '" data-long="' + loadMarkerArray[i].lng + '">';
            }

            charnum++;

            if (branchId == i) {
                i = loadMarkerArray.length;
            }
        }
    }

    /*********************************************/
    /*To take care of "show within 5km" text to be position at center for condition where storelist is empty and not empty*/

    if (storelist == '<ul class="storelist">') {
        var textLength = "260px;";
    } else {
        var textLength = "";
    }
    /**********************************************/
    storelist += '</ul>';
    // $(".resultPane").append(storelist);
    $('.list-panel').append(storelist);
    initSortList(charSortArr);
    if ($('.icon-man').length > 0) {
        initIconMan();
    }
}

var itemClick;
if ($(window).width() >= UOBMap.globalvar.widthResponsive) {
    itemClick = 'ul.storelist li';
} else {
    itemClick = 'ul.storelist li > .store';
}

$('body').on('click', itemClick, function (e) {
    isClickItem = true;
    var el = $(this),
        index = el.find('[data-id]').data('id').trim();
    if ($('.selectBranchMenu').length) {
        $('.selectBranchMenu').removeClass('show');
        $('.menu-select').css('display', 'none');
    }
    el.addClass('selected').siblings().removeClass('selected');
    var marker = markerArray[index];

    google.maps.event.trigger(marker, 'click', false); //trigger marker click

    if ($(window).width() < UOBMap.globalvar.widthResponsive) {

        if (UOBMap.globalvar.sidePane_bottom.hasClass('preSelectMarker')) {
            UOBMap.globalvar.sidePane_bottom.removeClass('preSelectMarker');
            $('.ico-expand').trigger('click', 'preselectMarker');
            // google.maps.event.trigger(marker, 'click', true);
        } else {
            $('.geocodemenu-block').trigger('click');
            var clickTimeout = setInterval(function () {
                if (!$('.sidePane_bottom_container').hasClass('initing')) {
                    $('.fac-direct').trigger('click', [itemClick]);
                    clearInterval(clickTimeout);
                }
            }, 500);
        }

        $('.fac_header .navibar').attr('data-pr-page', 'sidePane');
    }
});

$('body').on('click', '.direction-list-branch', function (e) {
    var liStore = $(this).closest('li.store'),
        title = liStore.find('.title'),
        store = liStore.find('.store'),
        lat = $(this).attr('data-lat'),
        long = $(this).attr('data-long');

    var classNum = liStore.attr('class').split(' ')[1],
        tempNum = classNum.search('marker'),
        index = parseInt(classNum.substring(tempNum + 6, classNum.length));

    var destinationMarker = markerArray[index];
    UOBMap.globalvar.destinationMarker = destinationMarker;

    if (!autoDetection) {
        UOBMap.globalvar.destinationLatLng = destinationMarker.getPosition();
        $('.sidePane_direction_form .top-nav').attr('data-pr-page', $(this).closest('[data-container]').attr('data-container'));
        showDirectionForm(title.text(), geolocationInput.val());
    } else {
        isSelectRoute = false;
        var destLatlng = new google.maps.LatLng(lat, long);
        destinationLng = long;
        destinationLat = lat;
        UOBMap.globalvar.destinationLatLng = destLatlng;
        var markerGeolocation;
        if (typeof marker !== 'undefined') {
            markerGeolocation = marker.getPosition();
        } else {
            markerGeolocation = '';
        }
        var markerLocation = UOBMap.globalvar.markerHere.getPosition() || markerGeolocation;
        calcRoute(markerLocation, destLatlng, "DRIVING", 0);
        codeAddress($('#geocodeInput').val());
        $('.sidePane').css({'top': 0, 'position': 'fixed'});
        $('.desc-block').hide();
        $('.list-route-block').hide();
        $('.show-route-detail').hide();
        $('.sidePane').css({'height': 'auto'});

        $('.route-back-mobile').attr('data-pr-page', $(this).closest('[data-container]').attr('data-container'));

        //$('.sidePane_facility_details').animate({'marginLeft': widthtW, 'opacity': 0}, 500);
    }

    excludeRoutedMarkerFromCluster();

});

if ($(window).width() < UOBMap.globalvar.widthResponsive) {
    $('.get-directions-btn').off('click').on('click', function () {
        var directionFrom = $('#direction-from').val();
        var formattedFrom = getFormattedAddress($('#direction-from'));
        var directionTo = $('#direction-to').val();
        if (directionFrom === '' || directionTo === '') {
            return;
        }

        var geocoder = new google.maps.Geocoder();
        UOBMap.globalvar.ie8issue = false;

        geocoder.geocode({ //["geocode","establishment"]
            "address": formattedFrom,
            "bounds": bounds,
            "region": "sg"
        }, function (result, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var lat = result[0].geometry.location.lat();
                var lng = result[0].geometry.location.lng();

                var latlng = new google.maps.LatLng(lat, lng);

                UOBMap.globalvar.ie8issue = true;
                var markerGeolocation;
                if (typeof marker !== 'undefined') {
                    markerGeolocation = marker.getPosition();
                } else {
                    markerGeolocation = '';
                }
                var markerLocation = UOBMap.globalvar.markerHere.getPosition() || markerGeolocation || latlng;
                getRouteNonAutoDetection(directionFrom, markerLocation, UOBMap.globalvar.destinationLatLng);
            }
        });
        saveDirectionFrom(formattedFrom, directionFrom);
        hideDirectionForm();

    });
}


function getRouteNonAutoDetection(fromPlace, fromPlaceLatlng, toPlace) {
    isSelectRoute = false;
    reloadRoute();

    setTimeout(function () {
        $('.sidePane').css({'top': 0, 'position': 'fixed'});
        $('.sidePane').css('left', $(window).width());
    }, 350);

    $('.list-panel').parent().css('height', 0);
    $('.route-panel').parent().css('height', $('.sidePane').height());
    $('.show-route-detail').width('100%').height(UOBMap.globalvar.heightW - 46 - 48);
    if ($('.ico-expand').hasClass('active')) {
        $('.ico-expand').trigger('click');
    }

    UOBMap.globalvar.markerHere.setPosition(fromPlaceLatlng);

    destinationLng = toPlace.lng();
    destinationLat = toPlace.lat();
    UOBMap.globalvar.destinationLatLng = toPlace;


    calcRoute(fromPlaceLatlng, toPlace, "DRIVING", 0);
    codeAddress(fromPlace);
    $('.button-srl').addClass('inactive');
    $('.sidePane_direction_form').css('zIndex', 10);

    $('.sidePane').css('height', 'auto');
    $('.sidePane').animate({
        'left': 0,
        'opacity': 1
    }, 500, function () {
        $(this).css('position', 'absolute');
        $(this).find('.route-panel').css('top', 0);
        menuBar(false);

    });

    hideDirectionForm();

};

$('ul.storelist li').on('mouseover', function () {
    // var infowindow = new google.maps.InfoWindow();
    mapx = void 0, mapy = void 0;
    var classNum = $(this).attr('class').split(' ')[1];
    var tempNum = classNum.search('marker');
    var index = parseInt(classNum.substring(tempNum + 6, classNum.length));
    var marker = markerArray[index];
    infoPixelOffset = new google.maps.Size(-161, 0);

    if ((animateMarker != marker) && $(window).width() >= UOBMap.globalvar.widthResponsive) {
        try {
            animateMarker.setAnimation(google.maps.Animation.NONE);
        } catch (e) {
        }
        marker.setAnimation(google.maps.Animation.BOUNCE);
        animateMarker = marker;
    }

});
$('div.sidePane').on('mouseleave', function () {
    //hoverinfowindow.close();
    try {
        animateMarker.setAnimation(google.maps.Animation.NONE);
    } catch (e) {
    }
});

/**********************************************************************
 MENU Animation
 ***********************************************************************/

var closelisttimer = null;
var customSelect = $('.custom-select');
var geocodefilterBlock = $('.geocodefilter-block');

$('.branch, .geocodefilter').on('click', function () {
    if (!customSelect.hasClass('active')) {
        $('.selectBranchMenu').addClass('show');
        $('.menu-select').css('display', 'block');
        customSelect.addClass('active');
        geocodefilterBlock.addClass('active');
        if ($('.uobmap-list-item').eq(0).hasClass('clicked')) {
            UOBMap.globalvar.itemArrSelectMenu.push(0);
        }
        if ($(window).width() < UOBMap.globalvar.widthResponsive) {
            $('.menu').addClass('menu-fixed');
        }
    } else {
        customSelect.removeClass('active');
        closeMenuSelect();
    }

    $('.uobmap-list-item').removeClass('clicked');
    for (var i = 0; i < UOBMap.globalvar.itemArrSelectMenu.length; i++) {
        $('.uobmap-list-item').eq(UOBMap.globalvar.itemArrSelectMenu[i]).addClass('clicked');
    }
});

function closeMenuSelect() {
    $('.selectBranchMenu').removeClass('show');
    $('.menu-select').css('display', 'none');
    customSelect.removeClass('active');
    geocodefilterBlock.removeClass('active');
    $('.menu').removeClass('menu-fixed');
}

$(document).add(parent.document).click(function (e) {
    var container = $('.branch');
    var geofilter = $('.geocodefilter');
    var selectBranchMenu = $('.selectBranchMenu');
    if (!container.is(e.target) // if the target of the click isn't the container...
        && !geofilter.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0
        && !selectBranchMenu.is(e.target)
        && selectBranchMenu.has(e.target).length === 0) // ... nor a descendant of the container
    {
        closeMenuSelect();
    }
    if (!geolocationFromInput.is(e.target) && !geolocationInput.is(e.target) && $('html').hasClass('ie')) {
        $('.recent-searches').css('display', 'none');
        $('.pac-container').css('display', 'none');
    }
});

/**********************************************************************
 Lite Service Dialog
 ***********************************************************************/

/**********************************************************************
 Menu Item Selection
 ***********************************************************************/

var menuSelect = $('.show-result');
//select menu
menuSelect.on('click.menu-select', function () {
    var listItem = $('.uobmap-list-item');
    UOBMap.globalvar.itemArrSelectMenu = [];
    for (var i = 0; i < listItem.length; i++) {
        if (listItem.eq(i).hasClass('clicked')) {
            UOBMap.globalvar.itemArrSelectMenu.push(i);
        }
    }
    closeMenuSelect();
    loadBranches();
    getBranches();

});

//select filter
$('body').on('click', '.uobmap-list-item', function (e) {
    var el = $(this);
    if (!el.hasClass('clicked')) {
        el.addClass('clicked');
        if (el.attr('name') == "Lite") {
            liteBranch = true;
        }
        if (el.attr('name') == "ExHr") {
            exHrBranch = true;
        }
    } else {
        el.removeClass('clicked');
        if (el.attr('name') == "Lite") {
            liteBranch = false;
        }
        if (el.attr('name') == "ExHr") {
            exHrBranch = false;
        }
    }
});

/**********************************************
 Filter of options
 ***********************************************/
var liteBranch = new Boolean(false);
;
var exHrBranch = new Boolean(false);
;

function loadBranches() {
    checkedBranches = [];
    for (var i = 0; i < $(".uobmap-list-item.clicked").length; i++) {
        checkedBranches[i] = $(".uobmap-list-item.clicked").eq(i).attr('name');
    }
    if ($(window).width() < UOBMap.globalvar.widthResponsive) {
        setTimeout(function () {
            $('.storelist').height($(window).height() - $('.menu').height() - $('.sort-list').height());
        }, 350);

    }

}

function getBranches() {
    resetMarker();

    //sort the data
    tempData = new Array();
    for (var i = 0; i < receivedData.length; i++) {

        if (checkSelectedtype(receivedData[i])) { //receivedData[i].type == selectedType 
            tempData.push(receivedData[i]);
        }
    }

    if (autoDetection !== false) {

        if (receivedData[0].compDist) {
            tempData.sort(function (a, b) {

                if (a.compDist < b.compDist) return -1;
                if (a.compDist > b.compDist) return 1;
                if (a.name.getSortTitle() > b.name.getSortTitle()) return -1;
                if (a.name.getSortTitle() < b.name.getSortTitle()) return 1;

                return 0;
            });
        } else {
            tempData.sort(function (a, b) {

                if (a.name.getSortTitle() < b.name.getSortTitle()) return -1;
                if (a.name.getSortTitle() > b.name.getSortTitle()) return 1;

                return 0;
            });
        }
    } else {

        if (receivedData[0].compDist) {
            tempData.sort(function (a, b) {

                if (a.compDist < b.compDist) return -1;
                if (a.compDist > b.compDist) return 1;
                if (a.name.getSortTitle() > b.name.getSortTitle()) return -1;
                if (a.name.getSortTitle() < b.name.getSortTitle()) return 1;
                return 0;
            });
        } else {
            tempData.sort(function (a, b) {

                if (a.name.getSortTitle() < b.name.getSortTitle()) return -1;
                if (a.name.getSortTitle() > b.name.getSortTitle()) return 1;

                return 0;
            });
        }

    }

    loadMarker(tempData);
    loadPaneItem(tempData); /// remember open it
}

function resetMarker() {
    zIndex = 100000;
    for (var i = 0; i < markerArray.length; i++) {
        if (i === markerArray.id) {
            markerArray[i].setMap(null);
        }
    }
    markerArray = new Array();
}

function checkSelectedtype(type) {

    if (type.type == "Branch") {
        if (type.Lite == "Y") {
            type.type = "Lite";
            if (liteBranch == true) {
                tempData.push(type);
                return false;
            }
        }
    }
    //}

    if (exHrBranch == true) {
        if (type.type == "Branch") {
            if (type.ExHr == "Y") {
                type.type = "ExHr";
                tempData.push(type);
                return false;
            }
        }
    }

    for (var i = 0; i < checkedBranches.length; i++) {
        //if(liteBranch != true && type.type == "Lite"){
        //  type.type="Branch";
        //}
        if (exHrBranch != true && type.type == "ExHr") {
            type.type = "Branch";
        }
        if (checkedBranches[i] == type.type) {
            return true;
        }
    }
    return false;
}

function geocodeSearch() {
    var geocoder = new google.maps.Geocoder();
    UOBMap.globalvar.isFound = true;
    UOBMap.globalvar.ie8issue = false;
    if (typeof marker !== 'undefined') {
        marker.setMap(null);
        marker.setPosition(null);
    }
    if (typeof markerCurrent !== 'undefined') {
        markerCurrent.setMap(null);
        markerCurrent.setPosition(null);
    }
    if (geolocationFrom.is(':visible') && $('.sidePane_direction_form').is(':visible')) {
        geolocationValue = getFormattedAddress(geolocationFrom);
    } else {
        geolocationValue = getFormattedAddress(geolocationInput);
    }
    UOBMap.globalvar.markerHere.setMap(null);
    UOBMap.globalvar.markerHere.setIcon(UOBMap.globalvar.userGreen);

    UOBMap.globalvar.markerHere.setVisible(true);
    if (geolocationValue === '') {
        nullDist();
        UOBMap.globalvar.searchPlace = 'false';
        UOBMap.globalvar.markerHere.setMap(null);
        UOBMap.globalvar.markerHere.setPosition(null);
        map.setCenter(setSGcenter);
        map.setZoom(15);
        getBranches();
        markerName = '';
        infowindowLocal.close();
        return;
    } else {
        UOBMap.globalvar.markerHere.setMap(map);
    }
    geocoder.geocode({ //["geocode","establishment"]
        "address": geolocationValue,
        "bounds": bounds,
        "componentRestrictions": {
            "country": "SG"
        }
    }, function (result, status) {
        UOBMap.globalvar.searchPlace = "true";
        if (status === google.maps.GeocoderStatus.OK) {

            lat = result[0].geometry.location.lat();
            lng = result[0].geometry.location.lng();
            addr = result[0].formatted_address;
            addr = addr.replace(", Singapore", "");
            latlng = new google.maps.LatLng(lat, lng);
            map.setCenter(latlng);
            map.setZoom(14);
            globalLat = latlng;
            UOBMap.globalvar.isFound = true;
            infowindowLocal.setContent(UOBMap.globalvar.infoPlace);
            infowindowLocal.open(map, UOBMap.globalvar.markerHere);

            google.maps.event.addListener(UOBMap.globalvar.markerHere, 'click', function () {
                infowindowLocal.open(map, UOBMap.globalvar.markerHere);
            });
            //if out of bounds throw back default
            var outBounds = false;
            if (lng < bounds.getSouthWest().lng()) {
                outBounds = true;
                // return false;
            }
            if (lng > bounds.getNorthEast().lng()) {
                outBounds = true;
                // return false;
            }
            if (lat < bounds.getSouthWest().lat()) {
                outBounds = true;
                // return false;
            }
            if (lat > bounds.getNorthEast().lat()) {
                outBounds = true;
                // return false;
            }

            if (lat == UOBMap.globalvar.latNotFound && lng == UOBMap.globalvar.longNotFound) {
                UOBMap.globalvar.isFound = false;
                showPopup('not-found');
                infowindowLocal.close();
            }
            var latlng = new google.maps.LatLng(lat, lng);

            UOBMap.globalvar.markerHere.setPosition(latlng);

            calDist(result[0].geometry.location);
            if (autoDetection || !geolocationFrom.is(':visible') && !$('.sidePane_direction_form').is(':visible')) {
                getBranches();
                if ($(window).width() >= UOBMap.globalvar.widthResponsive) {
                    $('.back-branch').trigger('click');
                }
            }
            UOBMap.globalvar.ie8issue = true;
        } else {
            UOBMap.globalvar.isFound = false;
            showPopup('query-limit');
            infowindowLocal.close();
        }

    });

    if (!UOBMap.globalvar.isFound) {
        showPopup('not-found');
    }
    $('#geocodeInput, #direction-from').addClass('initing');
    setTimeout(function () {
        $('#geocodeInput, #direction-from').removeClass('initing');
    }, 1000);

    return false;
}

$('.geocodesearch').on('click.location', function (e) {
    var input = document.getElementById('geocodeInput');
    geolocationInput.attr('data-formatted-address', '');
    // geocodeSearch();
    google.maps.event.trigger(input, 'focus');
    google.maps.event.trigger(input, 'keydown', {
        keyCode: 13
    });
    geoCodeTrue = "false";
    clearRoute();
    saveDirectionFrom(getFormattedAddress($("#geocodeInput")), $("#geocodeInput").val());
});

/****************************************************************
 function load google place autocomplete
 *****************************************************************/
var geoCodeTrue = "false";
function loadSearch() {

    var input = (document.getElementById('geocodeInput'));
    var directionFromInput = (document.getElementById('direction-from'));
    var acOptions = {
        types: [],
        componentRestrictions: {
            country: 'sg'
        }
    };
    var searchBox = new google.maps.places.SearchBox(input, acOptions);
    var directionFromAutocomplete = new google.maps.places.SearchBox(directionFromInput, acOptions);
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
        directionFromAutocomplete.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', function () {
        autoCompleteSearch(searchBox, input, "searchBox");
    });

    directionFromAutocomplete.addListener('places_changed', function () {
        autoCompleteSearch(directionFromAutocomplete, directionFromInput, "directionFromAutocomplete");
    });


    // var directionFromAutocomplete = new google.maps.places.Autocomplete(directionFromInput, acOptions);
    // directionFromAutocomplete.bindTo('bounds', map);
    // //non auto detection place
    // google.maps.event.addListener(directionFromAutocomplete, 'place_changed', function () {
    //     autoCompleteSearch(directionFromAutocomplete, directionFromInput);
    // });
}

/****************************************************************
 function show google place autocomplete
 *****************************************************************/
function autoCompleteSearch(autocomplete, inputCompte, initInputEl) {
    if (geoCodeTrue === "true") {
        return;
    }

    if (initInputEl == "directionFromAutocomplete" && autoDetection) {
        return;
    }

    if ($('#geocodeInput').hasClass('initing') || $('#direction-from').hasClass('initing')) {
        return;
    }
    // $(inputCompte).addClass("initing");

    UOBMap.globalvar.markerHere.setVisible(false);
    inputCompte.className = '';
    var places = autocomplete.getPlaces();
    var place = places[0];
    if (place === undefined) {
        showPopup('not-found');
        infowindowLocal.close();
        return;
    }
    // add cookie
    var stringRoad;
    if (place.vicinity) {
        var road = place.vicinity;
        var arrayRoad = road.split(' ');
        arrayRoad.shift();
        stringRoad = arrayRoad.join(' ');
    } else {
        stringRoad = '';
    }
    var fullAddress = place.formatted_address;
    if (fullAddress === "Singapore") {
        fullAddress = place.name;
    }
    saveDirectionFrom(fullAddress, place.name);
    if (!place.geometry) {
        // Inform the user that the place was not found and return.
        inputCompte.className = 'notfound';
        // showPopup("not-found");
        infowindowLocal.close();
        return;
    }
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15); // Why 17? Because it looks good.
    }
    if (typeof marker !== 'undefined') {
        marker.setMap(null);
        marker.setPosition(null);
    }
    if (typeof markerCurrent !== 'undefined') {
        markerCurrent.setMap(null);
        markerCurrent.setPosition(null);
    }
    infowindowLocal.close();
    UOBMap.globalvar.markerHere.setIcon(UOBMap.globalvar.userGreen);

    UOBMap.globalvar.markerHere.setMap(map);
    UOBMap.globalvar.markerHere.setVisible(true);
    UOBMap.globalvar.markerHere.setPosition(place.geometry.location);
    UOBMap.globalvar.infoPlace = place.name;

    infowindowLocal.setContent(UOBMap.globalvar.infoPlace);
    infowindowLocal.open(map, UOBMap.globalvar.markerHere);
    $(inputCompte).attr('data-formatted-address', fullAddress);

    google.maps.event.addListener(UOBMap.globalvar.markerHere, 'click', function () {
        infowindowLocal.open(map, UOBMap.globalvar.markerHere);
    });
    var address = '';
    if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
    }
    UOBMap.globalvar.searchPlace = "true";
    calDist(place.geometry.location);
    clearRoute();
    if (autoDetection || !geolocationFrom.is(':visible') && !$('.sidePane_direction_form').is(':visible')) {
        geocodeSearch();
    }


}
/****************************************************************
 Travel
 *****************************************************************/
var directionsDisplay = [];

function calcRoute(start, end, type, index, afterCalRoute) {
    // var start = document.getElementById('start').value;
    // var end = document.getElementById('end').value;
    clearRoute();
    reloadRoute();

    var trafficModel = map.get("traffic"),
        request, html = '',
        routeColor, polyIndex;

    if (type === "TRANSIT")
        request = {
            origin: start,
            destination: end,
            provideRouteAlternatives: true,
            travelMode: google.maps.TravelMode.TRANSIT,
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
                departureTime: new Date(),
                trafficModel: trafficModel
            }
        };
    if (type === "DRIVING")
        request = {
            origin: start,
            destination: end,
            provideRouteAlternatives: true,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
                departureTime: new Date(),
                trafficModel: trafficModel
            }
        };
    if (type === "WALK")
        request = {
            origin: start,
            destination: end,
            provideRouteAlternatives: true,
            travelMode: google.maps.TravelMode.WALKING,
            drivingOptions: {
                departureTime: new Date(),
                trafficModel: trafficModel
            }
        };

    directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            var len = response.routes.length,
                icons, opacity,
                lineSymbol = {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillOpacity: 1,
                    scale: 3
                };
            if (type === "TRANSIT" && len > 3) {
                len = len - 1;
            }
            if (type === 'WALK') {
                opacity = 0;
                icons = [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '10px'
                }];
            } else {
                opacity = .7;
                icons = '';
            }
            var polyIndex = parseInt(len) * 2;
            for (var i = 0; i < len; i++) {
                if (index === i) {
                    routeColor = '#0353b0';
                    polyIndex = len;
                } else {
                    routeColor = '#ccc';
                    polyIndex = len - 1;
                }
                directionsDisplay.push(new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response,
                    suppressMarkers: true,
                    routeIndex: i,
                    // draggable: true,
                    polylineOptions: {
                        radius: 500,
                        strokeColor: routeColor,
                        strokeOpacity: opacity,
                        icons: icons,
                        strokeWeight: 5,
                        zIndex: polyIndex
                    }
                }));
                polyIndex -= 1;
                directionsDisplay.push(new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response,
                    suppressMarkers: true,
                    routeIndex: i,
                    // draggable: true,
                    polylineOptions: {
                        radius: 500,
                        strokeColor: '#666',
                        strokeOpacity: opacity,
                        strokeWeight: 7,
                        icons: icons,
                        zIndex: polyIndex
                    }
                }));

                var route = response.routes[i],
                    distance = (route.legs[0].distance.value / 1000).toFixed(1),
                    duration = (route.legs[0].duration.value / 60).toFixed(0),
                    duration_in_traffic;

                if (route.legs[0].duration_in_traffic) {
                    duration_in_traffic = (route.legs[0].duration_in_traffic.value / 60).toFixed(0);
                } else {
                    duration_in_traffic = duration;
                }
                var detailBlockTemplateItem = detailBlockTemplate.find('ul');
                detailBlockTemplateItem.find('.type').children().attr('class', 'icon m-icon-' + type.toLowerCase());
                detailBlockTemplateItem.find('.info p').html('Via ' + route.summary);
                detailBlockTemplateItem.find('.info span').html(duration + ' minutes without traffic');
                detailBlockTemplateItem.find('.distance p').html(duration_in_traffic + ' mins');
                detailBlockTemplateItem.find('.distance span').html(distance + 'km');


                html += detailBlockTemplateItem.html();

            }
            if (!isSelectRoute) {
                $('.list-route-block ul').html(html);
            }
            selectRoute(response);
        } else {
            if (geolocationValue === '') {
                $('.list-route-block ul').html('<li class="choose-start-point">Please choose your starting point to get directions</li>');
            } else {
                $('.list-route-block ul').html('<li class="no-service">No service</li>');
            }

        }

        if (afterCalRoute !== undefined) {
            afterCalRoute();
        }
    });
    infowindow.close();
}

function clearRoute() {
    if (directionsDisplay && directionsDisplay.length > 0) {
        for (var i = 0; i < directionsDisplay.length; i++) {
            directionsDisplay[i].setMap(null);
        }
        directionsDisplay = [];
    }

}
function getDirection(direction) {
    $(direction).off('click').on('click', function () {
        isSelectRoute = false;
        $('.branch').css('display', 'none');
        $('.back-branch').css('display', 'inline-block');
        $('.list-panel').parent().css('height', 0);
        $('.route-panel').parent().css('height', $('.sidePane').height());
        infowindow.close();

        var destLatlng = new google.maps.LatLng(destinationLat, destinationLng);
        var markerGeolocation;
        if (typeof marker !== 'undefined') {
            markerGeolocation = marker.getPosition();
        } else {
            markerGeolocation = '';
        }

        excludeRoutedMarkerFromCluster();

        if (!autoDetection) {
            $('.sidePane_direction_form .top-nav').attr('data-pr-page', $(this).closest('[data-container]').attr('data-container'));
            showDirectionForm(markerName, geolocationInput.val());
        }
        if ($(window).width() >= UOBMap.globalvar.widthResponsive || ($(window).width() < UOBMap.globalvar.widthResponsive && autoDetection)) {
            var markerLocation = UOBMap.globalvar.markerHere.getPosition() || markerGeolocation;
            if (markerLocation !== null) {
                calcRoute(markerLocation, destLatlng, "DRIVING", 0);
            } else {
                $('.list-route-block ul').html('<li class="choose-start-point">Please choose your starting point to get directions</li>');
                localHere = '';
            }
        }

        codeAddress(geolocationValue);

        if ($(window).width() < UOBMap.globalvar.widthResponsive) {

            if ($(this).is('.fac-detail-direct')) {
                $('.desc-block').hide();
                $('.list-route-block').hide();
                $('.show-route-detail').hide();
                if (autoDetection) {
                    $('.sidePane').css({'top': 0, 'height': 'auto', 'position': 'fixed'});
                    $('.sidePane').animate({
                        'left': 0,
                        'opacity': 1
                    }, 500, function () {
                        $(this).css('position', 'absolute');
                        $(this).find('.route-panel').css('top', 0);

                    });

                    $('.ico-expand').trigger('click');
                }
            }

            $('.sidePane_facility_details').animate({'marginLeft': UOBMap.globalvar.widthtW, 'opacity': 0}, 500);
        }
    });
    backToBranch();
}

function backToBranch() {
    $('.back-branch').on('click', function () {
        clearRoute();
        reclusterRoutedMarkers();
        $('.branch').css('display', 'inline-block');
        $('.back-branch').css('display', 'none');
        $('.route-panel').parent().css('height', 0);

        if ($(window).width() >= UOBMap.globalvar.widthResponsive) {
            $('.sidePane').height($('#map-canvas').height());
        }

        $('.list-panel').css({
            'display': 'block',
            'height': $('.list-panel').closest('.sidePane').height()
        });
        $('.list-panel').parent().css('height', $('.sidePane').height());
        hideDirectionForm();
    });
}
function selectRoute(response) {
    var detailBlock = $('.list-route-block').find('.detail-block'),
        detail = $('<p class="detail">Details</p>');
    if (!isSelectRoute) {
        detailBlock.eq(0).addClass('active').find('.info').append(detail);
        var distance = $(detailBlock.eq(0)).find('.distance span').text(),
            duration_in_traffic = $(detailBlock.eq(0)).find('.distance p').text();
        $('.see-route-list .distantce').text(distance + " (" + duration_in_traffic + ")");
    }
    if (detailBlock.length) {
        detailBlock.off('click.routeDetail').on('click.routeDetail', function () {
            isSelectRoute = true;
            var el = $(this);
            if (!el.hasClass('active')) {
                //Addclass active for route
                el.addClass('active').siblings().removeClass('active').find('.detail').remove();
                el.find('.info').append(detail);
                //Hightlight route by select
                var destLatlng = new google.maps.LatLng(destinationLat, destinationLng);
                var markerGeolocation;
                if (typeof marker !== 'undefined') {
                    markerGeolocation = marker.getPosition();
                } else {
                    markerGeolocation = '';
                }
                markerLocation = UOBMap.globalvar.markerHere.getPosition() || markerGeolocation;
                var icon = el.find('.type').children().attr('class').split('-')[2].toUpperCase();
                calcRoute(markerLocation, destLatlng, icon, el.index());
                var distance = el.find('.distance span').text(),
                    duration_in_traffic = el.find('.distance p').text();
                $('.see-route-list .distantce').text(distance + " (" + duration_in_traffic + ")");


            } else {
                $('.desc-block').css('display', 'none');
                $('.list-route-block').css('display', 'none');

                var routeDetail = response.routes[el.index()],
                    distance = (routeDetail.legs[0].distance.value / 1000).toFixed(1),
                    duration = (routeDetail.legs[0].duration.value / 60).toFixed(0),
                    startAddress = routeDetail.legs[0].start_address,
                    endAddress = routeDetail.legs[0].end_address,
                    localHere = (typeof localHere !== 'undefined') ? localHere : '';

                routeDetailTemplate.find('.text-from').html('From: ' + $('.route-panel').find('.text-start').text());
                routeDetailTemplate.find('.text-to').html('To: ' + markerName);
                routeDetailTemplate.find('.route-duration').html(duration + ' mins');
                routeDetailTemplate.find('.route-distance').html('(' + distance + 'km)');
                routeDetailTemplate.find('.route-summary').html('Via ' + routeDetail.summary);
                routeDetailTemplate.find('.route-duration-traffic').html(duration);
                routeDetailTemplate.find('.location-start').html(startAddress);
                routeDetailTemplate.find('.location-end').html(endAddress);

                $('.show-route-detail').css('display', 'block').html(routeDetailTemplate.html());
                $('.route-detail-step').html(stepsDetail(routeDetail.legs[0].steps));

                // back to menu branch
                $('.icon-back').on('click', function () {
                    $('.show-route-detail').html('');
                    $('.desc-block').css('display', 'block');
                    $('.list-route-block').css('display', 'block');
                });
                // print
                $('.icon-print').on('click', function () {
                    // window.print();
                    $('.map-canvas').width('100%');
                    printMaps();
                });
            }
            if ($(window).width() < UOBMap.globalvar.widthResponsive) {
                initRouteHeight();
            }

        });
    }
}

function initRouteHeight() {
    // UOBMap.globalvar.sidePane.css('position', 'absolute');
    // $('#menu').hide();
    // $('#map-frame').height($(window).height());
    $('.route-panel').css('height', 'auto');
    $('.show-route-detail').css('height', 'auto');
    if ($('.route-panel').height() > $(window).height()) {
        $('.route-panel').css('height', $(window).height());
    }
}

function initFacilityDetail() {

}

function stepsDetail(result) {
    var html = '';
    for (var i = 0; i < result.length; i++) {
        html += '<li><div class="describe">' + (i + 1) + '. ' + result[i].instructions + '</div>'
            + '<span>' + (result[i].distance.value / 1000).toFixed(1) + 'KM</span>'
            + '</li>'
    }
    return html;
}
function codeAddress(address) {
    localHere = (typeof localHere !== 'undefined') ? localHere : '';
    $('.list-panel').css('display', 'none');
    var routePanel = $('.route-panel');
    routePanel.css('display', 'block').html(routeTemplate.html());

    if (autoDetection) {
        routePanel.find('.text-start').html(geolocationValue);
    } else {
        routePanel.find('.text-start').html((geolocationFrom.val() || localHere));
    }
    setTimeout(function () {
        if (routePanel.height() > $(window).height()) {
            routePanel.height($(window).height());
        }
    }, 500);

    routePanel.find('.text-end').html(markerName);
    $('.route li').off('click').on('click', function () {
        var el = $(this);
        var listRoutBlock = $('.list-route-block');
        var btnSrl = $('.sidePane .button-srl');
        isSelectRoute = false;
        if (!el.hasClass('active')) {
            el.addClass('active').siblings().removeClass('active');
            if (typeof marker !== 'undefined') {
                markerGeolocation = marker.getPosition();
            } else {
                markerGeolocation = '';
            }
            var destLatlng = new google.maps.LatLng(destinationLat, destinationLng),
                markerLocation = UOBMap.globalvar.markerHere.getPosition() || markerGeolocation,
                icon = el.children().attr('class').split('-')[1].toUpperCase();
            if (UOBMap.globalvar.isEmptyRoute) {
                calcRoute(markerLocation, destLatlng, icon, 0, function () {
                    // if (autoDetection && ($(window).width() < UOBMap.globalvar.widthResponsive)) {
                    if ($(window).width() < UOBMap.globalvar.widthResponsive) {
                        if (btnSrl.hasClass('inactive')) {

                            if (autoDetection) {
                                listRoutBlock.find('.detail').trigger('click');
                            }

                        } else {
                            if (!autoDetection) {
                                btnSrl.addClass('inactive');
                            }
                        }

                    }
                });
            }

            reloadRoute();
        }
    });
    // back to direction
    var routeBackMobile = $('.route-back-mobile');
    if (routeBackMobile.length > 0) {
        backDirection(routeBackMobile);
    }
}
function reloadRoute() {
    if ($(window).width() >= UOBMap.globalvar.widthResponsive) {
        $('.list-route-block').css('display', 'block');
        $('.desc-block').css('display', 'block');
        $('.show-route-detail').css('display', 'none');
    } else {
        if (!autoDetection) {
            $('.list-route-block').css('display', 'block');
            $('.show-route-detail').css('display', 'none');
        }
    }

}

function getFacilityDetail(direction) {
    $(direction).off('click').on('click', function (event, clickedItem) {
        var me = $(this),
            infowindow = me.parent();

        var facility_form = $(infowindow).clone().prop('id', 'infowindow-mobile');
        $('.fac_cont').html(facility_form);
        $('#infowindow-mobile').show();
        $('.sidePane_facility_details').css({'marginLeft': 0, 'opacity': 1});
        var facility_details_inner = $('.sidePane_facility_details').find('.inner-info');

        var source = me;
        if (clickedItem !== undefined) {
            source = $(clickedItem);
        }
        if (source.is('.store')) {
            $('.fac_header .navibar').attr('data-pr-page', 'sidePane');
        } else if (source.is('.fac-direct')) {
            $('.fac_header .navibar').attr('data-pr-page', 'mapview');
        }

        var fac_direction = $('.sidePane_facility_details').find('.direction').removeClass('fac-direct').addClass('fac-detail-direct');
        $(facility_details_inner).height($(window).height() - $('.fac_header').height() - 15);
        // $('.ico-expand').trigger('click');
        getDirection(fac_direction);
    });

}

/******************************************
 Get URL Parameter
 *******************************************/
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

/*****************************************************************
 scroll bar (JQuery)
 *****************************************************************/
$(function () {
    var windowW = $(window).width();
    //$('.selectBranchMenu').slimscroll({});
    if (windowW >= UOBMap.globalvar.widthResponsive) {
        var heightWdesk = UOBMap.globalvar.heightW;
        var heightMenu = Math.ceil(heightWdesk * 75 / 100);
        var customSelect = $('.branch');
        $('.selectBranchMenu').slimscroll({
            height: heightMenu,
            width: customSelect.width() - 2,
            wheelStep: 3,
            touchScrollStep: 30
        }).parent().css({
            width: customSelect.width(),
        });
        $('.selectBranchMenu').parent().find('.slimScrollBar').css('right', '10px');

        $('[data-custom-scroll]:not(.selectBranchMenu)').slimscroll({
            height: heightWdesk - 60,
            wheelStep: 3,
            touchScrollStep: 30
        });
        $('.sidePane').height(heightWdesk + 60 - 15);
    } else {
        var heightWphone = $(window).height() - 60 - 66;
        var customSelect = $('.branch');
        $('.selectBranchMenu').height(heightWphone);
        // $('.selectBranchMenu').slimscroll({
        //   height: heightWphone ,
        //   width: windowW,
        //   wheelStep: 3
        // });
        // $('.selectBranchMenu').parent().find('.slimScrollBar').css('right', '10px');
    }

});
/*****************************************************************
 Remove Array Item
 *****************************************************************/
Array.prototype.removeItemArr = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


function getFormattedAddress(geoLocInput) {
    var formattedAddress = geoLocInput.attr('data-formatted-address');
    if (formattedAddress == undefined || formattedAddress === "") {
        return geoLocInput.val();
    }

    return formattedAddress;
}

$(document).ready(function () {

    initialize();
    loadSearch();
    // directionsDisplay.setMap(map);
    receivedData = branchList;
    for (var i = 0; i < receivedData.length; i++) {
        receivedData[i].latlng = new google.maps.LatLng(receivedData[i].lat, receivedData[i].lng);
        receivedData[i].compDist = null;
    }

    //calDist();
    getBranches();
    //loadPaneItem(receivedData);
    //loadMarker(receivedData);

});

function addYourLocationButton(map, marker) {
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0px';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = mylocationUrl;
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'dragend', function () {
        $('#you_location_img').css('background-position', '0px 0px');
    });

    firstChild.addEventListener('click', function () {
        var imgX = '0';
        var animationInterval = setInterval(function () {
            if (imgX == '-18') imgX = '0';
            else imgX = '-18';
            $('#you_location_img').css('background-position', imgX + 'px 0px');

        }, 500);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                if (typeof UOBMap.globalvar.markerHere !== 'undefined' || typeof marker !== 'undefined') {
                    UOBMap.globalvar.markerHere.setMap(null);
                    marker.setMap(null);
                }
                markerCurrent.setMap(null);
                localHere = UOBMap.globalvar.userAddress;
                geolocationInput.val(UOBMap.globalvar.userAddress);
                geolocationInput.attr('data-formatted-address', UOBMap.globalvar.userAddress);
                markerCurrent = new google.maps.Marker({
                    map: map,
                    position: latlng,
                    icon: UOBMap.globalvar.userGreen // null = default icon
                });
                markerCurrent.setPosition(latlng);
                map.setCenter(latlng);
                clearInterval(animationInterval);
                $('#you_location_img').css('background-position', '-144px 0px');
                google.maps.event.addListener(markerCurrent, 'click', function () {
                    infowindowLocal.open(map, markerCurrent);
                });
                $('.geocodesearch').trigger('click');
            });
        } else {
            clearInterval(animationInterval);
            $('#you_location_img').css('background-position', '0px 0px');
        }
    });

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}
function initPreSelectedTypes() {

    if (UOBMap.globalvar.preSelectTypes != "") {

        $('.branchMenuPOI .clicked').removeClass('clicked');
        var menuPOI = $('.menuPOItext');
        var listTextMenuPOI = [];
        for (var i = 0, len = menuPOI.length; i < len; i++) {
            var text = $(menuPOI[i]).text().trim().toLowerCase();
            listTextMenuPOI.push(text);
            $(menuPOI[i]).closest('.uobmap-list-item').attr('data-uob-select-type', text)
        }

        $.each(UOBMap.globalvar.preSelectTypes, function (idx, el) {
            var type = decodeURIComponent(el.trim().toLowerCase());
            if (listTextMenuPOI.indexOf(type) >= 0) {
                $('[data-uob-select-type="' + type + '"]').addClass('clicked');
            }
        });
        setTimeout(function () {
            menuSelect.click();
            setTimeout(function () {
                initPreSelectedMarker();
            }, 350);

        }, 350);

    }

}

function initPreSelectedMarker() {
    if (UOBMap.globalvar.preSelectMarker != "") {
        var storeList = $('.storelist .title');
        var listTextStoreList = [];

        var preMarker = decodeURIComponent(UOBMap.globalvar.preSelectMarker.trim().toLowerCase());
        for (var i = 0, len = storeList.length; i < len; i++) {
            var text = $(storeList[i]).text().trim().toLowerCase();
            if (preMarker === text) {
                if ($(window).width() >= UOBMap.globalvar.widthResponsive) {
                    $(storeList[i]).closest('li').click();
                } else {
                    UOBMap.globalvar.sidePane_bottom.addClass("preSelectMarker");
                    $(storeList[i]).closest('.store').click();
                }
                return;
            }
        }
    }

}

function openFilterBranch() {
    if (windowWidth >= UOBMap.globalvar.widthResponsive) {
        if (UOBMap.globalvar.preSelectTypes == "") {
            $('.branch').click();
        } else {
            setTimeout(function () {
                $('.branch').click();
            }, 350);

        }

    }
}
