    $(document).ready(function () {
       if (isMobile.phone) {
            initMobileFunc();
            $("#geocodeInput").on('click', function() {
                $(this).select();
                this.setSelectionRange(0, 9999);
            });
        }
    });

    $(window).resize(function () {
       if (isMobile.phone) {
            initMobileFunc();
        }
      //  initFixedUOBMap();

    });

    $(window).load(function(){
        if (windowWidth > UOBMap.globalvar.widthResponsive) {
            var body = $('body'),
                    level1 = $('.sublink1'),
                    level2 = $('.sublink2'),
                    mainnav = $('.mainnav');

            $('> li', mainnav).off('mouseenter').on('mouseenter', function () {
                var $t = $(this);
                var $l2 = $('> .submenu-level1', this).find('.menu-level2.open'),
                        $cols = $l2.find('.card-content'),
                        $colnav = $l2.find('.submenu-level2').children();

                var index = $t.index();
                if(index != 0) {
                    //trigger close all dropdown
                    $('.open > button[data-toggle="dropdown"]').blur();
                    body.trigger('click');
                    clearTimeout($.data(this, 'timer'));
                    $.data(this, 'timer', setTimeout($.proxy(function () {
                        $('> .submenu-level1', this).stop(true, true).slideDown(400, function () {
                            if ($cols.length) {
                                var msnry = new Masonry($cols[0]);
                                msnry.on('layoutComplete', function (event, items) {
                                    $cols.parents('.hasfoursub').css('min-height', $cols.outerHeight());
                                });
                                msnry.layout();
                            }
                        });
                        $(this).addClass('open');
                    }, this), 250));
                }

            }).on('mouseleave', function () {
                clearTimeout($.data(this, 'timer'));
                $.data(this, 'timer', setTimeout($.proxy(function () {
                    $('> .submenu-level1', this).stop(true, true).slideUp(400);
                    $(this).removeClass('open');
                }, this), 250));
            });
        }

    });

    function initMobileFunc() {
        $('.branch, .geocodefilter').on('click', function () {
            UOBmenuSelect.css('top', menuUOBMapHeight + headerHeight - 6);
            selectBranchMenu.height(windowHeight - menuUOBMapHeight - headerHeight - $('.center-bottom-block').height() - 16);
        });

        $('.get-directions-btn').on('click', function () {
            var geocodemenuBlock = $('.geocodemenu-block'),
                    geocodeMenu = geocodemenuBlock.find('.geocodemenu');

            if (geocodeMenu.hasClass('mapview')) {
                geocodemenuBlock.click();
            }

//                        $('#header').hide();
        });

        $('.geocodemenu-block').on('click', function () {
            var nonDetectionStoreList = $('.non-auto-detection .storelist'),
                    nonDetectionSortlist = $('.non-auto-detection .sort-list'),
                    detectionKmMess = $('.non-auto-detection .kmMessage'),
                    nonDetectionSortlistUl = $('.non-auto-detection .sort-list ul');

            setTimeout(function () {
                if (detectionKmMess.length > 0) {
                    nonDetectionStoreList.height(uobMapContainer.height() - detectionKmMess.height() - menuUOBMapHeight - 25);
                }

                if (nonDetectionSortlist.length > 0) {
                    nonDetectionStoreList.height(uobMapContainer.height() - nonDetectionSortlist.height() - menuUOBMapHeight);
                }


            }, 350);


        });
        $('body').on('click', '.list-route-block ul li', function () {
            var me = $(this);
            if (me.hasClass('active')) {
                if (showRouteDetail.css('display') == 'block') {
                    sidePanelRoutePanel.height(windowHeight - headerHeight);
                }

            }

        });

        initUOBMAPContainer(headerHeight, footerHeight);
    }


    function initUOBMAPContainer(header, footer) {
        var uobMapContainerHeight = windowHeight - header;
        uobMapContainer.height(uobMapContainerHeight);
        mapFrame.height(uobMapContainerHeight - menuUOBMapHeight + 2);
    }