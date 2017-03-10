var UOBMap = new Object();
UOBMap.globalvar = {
    'heightW': '',
    'widthtW': '',
    'sidePane': '',
    'widthResponsive': 768,
    'ie8issue': true,
    'searchPlace': 'false',
    'destinationLatLng': google.maps.LatLng,
    'markerHere': google.maps.Marker,
    'map': '',
    'infoPlace': '',
    'userAddress': '',
    'destinationMarker': google.maps.Marker,
    'markerCluster': MarkerClusterer,
    'routedMarkerCluster': MarkerClusterer,
    'latNotFound': 1.352083,
    'longNotFound': 103.81983600000001,
    'isFound': false,
    'autoComplete': '',
    'directionFromAutocomplete': '',
    // Marker variable
    'pinMarker': '',
    'pinMarkerActive': '',
    // Dot green user
    'userGreen': '',
    // Marker Cluster Styles
    'clusterStyles': '',
    'isEmptyRoute': true,
    'preSelectMarker': '',
    'preSelectTypes': '',
    'sidePane_bottom': '',
    'itemArrSelectMenu': []
}
// optimize
var mylocationUrl = 'url(/images/uob-atm/mylocation.png)';
var plusUrl = '/images/uob-atm/plus.png';
var imageIconUrl = '/images/uob-atm/icons.png';

$(document).ready(function () {
    UOBMap.globalvar.heightW = $('.uobmap').height();
    UOBMap.globalvar.widthtW = $(window).width();
    UOBMap.globalvar.sidePane = $('.sidePane');
    UOBMap.globalvar.sidePane_bottom = $('.sidePane_bottom');

    UOBMap.globalvar.markerHere = new google.maps.Marker({});

    if (preMarker != "" && preMarker != undefined) {
        UOBMap.globalvar.preSelectMarker = preMarker.toLowerCase();
    }

    if (preTypes != "" && preTypes != undefined) {
        var preTypesArr = preTypes.split(',');
        UOBMap.globalvar.preSelectTypes = preTypesArr;
    }
});
