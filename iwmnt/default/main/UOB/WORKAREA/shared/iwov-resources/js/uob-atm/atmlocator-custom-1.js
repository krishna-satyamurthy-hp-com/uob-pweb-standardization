var headerHeight = '',
            footerHeight = '',
            navBarHeight = '',
            headerfooterHeight = '',
            menuUOBMapHeight = '',
            topMenuUOBMapHeight = '',
            UOBmenuSelect = '',
            selectBranchMenu = '',
            mapFrame = '',
            uobMapContainer = '',
            sidePanel = '',
            sidePanelRoutePanel = '',
            showRouteDetail = '',
            uobmap = '',
            windowWidth = '',
            windowHeight = '';




    // getUrlParameter
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var preMarker = getUrlParameter('marker');
    var preTypes = getUrlParameter('types');

    function initFixedUOBMap(){
        var fixedHeight = $(window).height() - headerHeight - footerHeight - navBarHeight;

        if(isMobile.phone) {

        } else if(isMobile.tablet){
            uobmap.height(fixedHeight);
            uobMapContainer.height(fixedHeight);
            mapFrame.height(fixedHeight - topMenuUOBMapHeight);
            sidePanel.height(fixedHeight - topMenuUOBMapHeight);

        } else {
            if (fixedHeight <= 600) {
                fixedHeight = 600;

            }
            uobmap.height(fixedHeight);
            uobMapContainer.height(fixedHeight);
            mapFrame.height(fixedHeight - topMenuUOBMapHeight);
            sidePanel.height(fixedHeight - topMenuUOBMapHeight);
        }

    }

    $(document).ready(function() {
        uobmap = $('.uobmap');
        headerHeight = $('#header').height();
        footerHeight = $('#footer').outerHeight();
        navBarHeight = $('#main-navbar').height();
        headerfooterHeight = headerHeight + footerHeight;
        topMenuUOBMapHeight = $('.uobmap .menu').outerHeight();
        menuUOBMapHeight = $('.uobmap .menu .float-right').height();
        UOBmenuSelect = $('.menu-select');
        selectBranchMenu = $('.selectBranchMenu');
        mapFrame = $('#map-frame');
        uobMapContainer = $('#container');
        sidePanel = $('.sidePane');
        sidePanelRoutePanel = $('.sidePane .route-panel');
        showRouteDetail = $('.show-route-detail');
        windowHeight = $(window).height();
        windowWidth = $(window).width();
		
        initFixedUOBMap();
    });
    $(window).resize(function () {
        windowHeight = $(window).height();
        windowWidth = $(window).width();
		headerHeight = $('#header').height();
        initFixedUOBMap();
    });