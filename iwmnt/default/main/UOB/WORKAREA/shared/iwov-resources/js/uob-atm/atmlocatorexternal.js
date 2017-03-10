
    var headerHeight = '',
            footerHeight = '',
            headerfooterHeight = '',
            menuUOBMapHeight = '',
            UOBmenuSelect = '',
            selectBranchMenu = '',
            mapFrame = '',
            uobMapContainer = '',
            sidePanelRoutePanel = '',
            windowHeight = '';

    $(document).ready(function(){
        headerHeight = $('#header').height();
        footerHeight = $('#footer').height();
        headerfooterHeight = headerHeight + footerHeight;
        menuUOBMapHeight = $('.uobmap .menu .float-right').height();
        UOBmenuSelect = $('.menu-select');
        selectBranchMenu = $('.selectBranchMenu');
        mapFrame = $('#map-frame');
        uobMapContainer = $('.uobmap #container');
        sidePanelRoutePanel = $('.sidePane .route-panel');
        windowHeight = $(window).height();
        windowWidth = $(window).width ();

        if(windowWidth < UOBMap.globalvar.widthResponsive){
            initMobileFunc();
        }

    });

    function initMobileFunc(){
        $('.branch, .geocodefilter').on('click', function () {
            UOBmenuSelect.css('top', menuUOBMapHeight + headerHeight - 6);
            selectBranchMenu.height(windowHeight - menuUOBMapHeight - headerHeight - $('.center-bottom-block').height() - 16);
        });

        $('.get-directions-btn').on('click', function () {
//                        $('#header').hide();
        });

        $('.geocodemenu-block').on('click',function () {
            var nonDetectionStoreList = $('.non-auto-detection .storelist'),
                    nonDetectionSortlist = $('.non-auto-detection .sort-list'),
                    detectionKmMess = $('.non-auto-detection .kmMessage'),
                    nonDetectionSortlistUl = $('.non-auto-detection .sort-list ul');

            setTimeout(function(){
                if(detectionKmMess.length > 0){
                    nonDetectionStoreList.height(uobMapContainer.height() - detectionKmMess.height() - menuUOBMapHeight - 25);
                }

                if(nonDetectionSortlist.length > 0){
                    nonDetectionStoreList.height(uobMapContainer.height() - nonDetectionSortlist.height() - menuUOBMapHeight);
                }



            }, 350);



        });
        $('body').on('click', '.list-route-block ul li', function (){
            sidePanelRoutePanel.height(windowHeight - menuUOBMapHeight);
        })

        initUOBMAPContainer(headerHeight, footerHeight);
    }


    function initUOBMAPContainer(header, footer) {
        var uobMapContainerHeight =  windowHeight - header - footer;
        uobMapContainer.height(uobMapContainerHeight - 25);
        mapFrame.height(uobMapContainerHeight - menuUOBMapHeight - 25 + 8);
    }
