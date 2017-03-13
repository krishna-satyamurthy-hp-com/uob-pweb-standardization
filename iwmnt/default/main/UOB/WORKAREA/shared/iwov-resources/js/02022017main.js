/*jshint scripturl:true*/ //- Ignore the Script URL of jsHint
var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})();
jQuery(function($) {
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        viewport = 0,
        body = $('body');

    function scrollableTab(){
        $('.scrolltabs-container').SplashScrollTab();
    }

    function detectbrowser() {
        jQuery.uaMatch = function (ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || /(trident)[\/]([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser: match[1] || '',
                version: match[2] || '0'
            };
        };
        var matched = jQuery.uaMatch(navigator.userAgent),
            browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        jQuery.browser = browser;
        if ($.browser.msie) {
            if (parseInt($.browser.version) < 10) {
                $('html').addClass('oldie');
            }
        }
        $('.message-close').click(function () {
            $(this).parent().hide('fast');
        });
    }

    function configFont() {
        WebFontConfig = {
            google: {families: ['Lato:100,300,400,700,900']}
        };

        (function () {
            var wf = document.createElement('script');
            wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
                '://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();
    }

    function closemenu() {
        $('.mainnav .open').removeClass('open');
        $('.submenu-level1').hide();
        $('.submenu-level1 .first').addClass('open');
    }

    function stickybar() {
        if (isMobile.phone) {
            $('.d-wideget').addClass('m-wideget');
            $('.m-wideget').removeClass('d-wideget');
            $('.m-wideget').addClass('on');
        } else {
            var sidebar = $('.d-wideget .dock'),
                wrapperWidth = $('.wrapper').width();
            if (windowWidth > wrapperWidth) {
                sidebar.css('right', (windowWidth - wrapperWidth) / 2 - 15);
            } else {
                sidebar.css('right', '-15px');
            }
        }
    }


    var resizeMainWindow = function() {
        var windowWidthNew = jQuery(window).width();
        var windowHeightNew = jQuery(window).height();
        var oldViewport = viewport;
        if(windowWidthNew<768){
            viewport = 0;
        }else if(windowWidthNew<992){
            viewport = 1;
        }else{
            viewport = 2;
        }
        if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
            windowWidth = windowWidthNew;
            windowHeight = windowHeightNew;
            stickybar();
            initImageBlock();
            initImageBox();
            initApplynowFixed();
            if(viewport!==oldViewport){
                datasrcImg();
            }
            //Fix main menu
            if (windowWidth > 767) {
                setTimeout(function () {
                    var cols = $('.menu-level2').find('.col');
                    if (cols.length && !$('html').hasClass('open-menu')) {
                        cols.removeAttr('style');
                    } else if ($('html').hasClass('open-menu')) {
                        var cols2 = $('.menu-level1:not(.open)').find('.col');
                        if (cols2.length)cols2.removeAttr('style');
                        var cols3 = $('.menu-level1.open .menu-level2:not(.open)').find('.col');
                        if (cols3.length)cols3.removeAttr('style');
                    }
                }, 200);
            }
            // if(windowWidthNew<768){
            //     var w = 0;
            //     scroll_li.width(windowWidthNew/viewabletab);
            //     for(var i=0,l=scroll_li.length;i<l;i++){
            //       w += $(scroll_li[i]).width();
            //     }
            //     scroll_ul.width(w);
            //     var index = scroll_li.index(scroll_ul.find('li.active')[0]);
            //     if(index+1>=viewabletab){
            //       if(index<scroll_li.length-1){
            //         scroll_ul.css(prefix.css+'transform','translate3d(-'+(index-1)*(windowWidth/viewabletab)+'px,0,0)');
            //       }else{
            //         scroll_ul.css(prefix.css+'transform','translate3d(-'+(index-2)*(windowWidth/viewabletab)+'px,0,0)');
            //       }
            //     }else{
            //       scroll_ul.css(prefix.css+'transform','translate3d(0,0,0)');
            //     }
            // }else{
            //     scroll_li.width($('.sticky-nav').width()/scroll_li.length);
            //     scroll_ul.removeAttr('style');
            // }
        }
    };

    // Functions
    function sidebar() {
        var lis = $('.side-wideget li'),
            key = $('.key-wideget li'),
            olis = $('.out-dock li'),
            out = $('.out-dock'),
            socialTab = $('.social-tab'),
            closeCaption = function () {
                $('.d-wideget .active').removeClass('active');
            };
        if (isMobile.phone) {
            socialTab.bind('click', function () {
                var $t = $(this),
                    eq = $t.index();
                if (out.hasClass('active')) {
                    out.removeClass('active');
                    $(this).removeClass('active');
                } else {
                    out.addClass('active');
                    out.parent().addClass('active');
                    $(this).addClass('active');
                    lis.eq(eq).addClass('active');
                }

            });

            $('.w-close').on('click', function () {
                $('.m-wideget .active').removeClass('active');
            });
        } else if (isMobile.tablet) {
            $('.d-wideget li').on('click', function () {
                var el = $(this);

                if (el.is('.active')) {
                    closeCaption();
                } else {
                    closeCaption();
                    out.addClass('active');
                    el.addClass('active');

                    if (el.closest('.key-wideget').length) {
                        lis.eq(el.index()).addClass('active');
                    } else {
                        key.eq(el.index()).addClass('active');
                    }
                }
            });

            // prevent blur function
            $(document).on('click', function (e) {
                if (!$(e.target).closest('.d-wideget').length) {
                    closeCaption();
                }
            });
        } else {
            olis.bind('mouseenter', function () {
                out.addClass('active');
                var $t = $(this);
                $t.addClass('active');
                var eq = $t.index();
                lis.eq(eq).addClass('active');
            }).bind('mouseleave', function() {
                out.removeClass('active');
                lis.removeClass('active');
                $(this).removeClass('active');
            });
            lis.bind('mouseenter', function () {
                $(this).addClass('active');
                var eq = $(this).index();
                $('.key-wideget li').eq(eq).addClass('active');
            }).bind('mouseleave', function () {
                $('.key-wideget li').removeClass('active');
                $(this).removeClass('active');
            });
            var tabw = $('.side-wideget li a');
            tabw.focus(function () {
                out.addClass('active');
                var $tw = $(this).parent();
                $tw.siblings().removeClass('active');
                $tw.addClass('active');
                var eq = $tw.index();
                key.removeClass('active');
                key.eq(eq).addClass('active');
            });
        }
    }

    function menu() {
        var level1 = $('.sublink1'),
            level2 = $('.sublink2'),
            mainnav = $('.mainnav');

        if (isMobile.phone || $(window).width() < 768) {
            $('.menu-level2.first').removeClass('open');
            $('.navbar-toggle').click(function () {
                $('html').toggleClass('open-menu');
                $(this).closest('.iw_section').toggleClass('iw_section_open_menu');
                $('#main-navbar').closest('.iw_section').toggleClass('iw_section_open_menu');
                $(this).toggleClass('off');
                $('.mainnav .open').removeClass('open');
                $('.mainnav .deactive').removeClass('deactive');
                $('.mainnav li').show();
            });
            // Back to
            level1.on('click', function (e) {
                var el = $(this),
                    parent = el.parent();

                if (parent.hasClass('open')) {
                    e.preventDefault();
                    if (parent.hasClass('open')) {
                        parent.removeClass('open');
                        var i = $('.menu-level1.open').index();
                        $('.mainnav > li').show();
                    }
                }

            });

            level2.on('click', function (e) {
                var el = $(this),
                    parent = el.parent(),
                    oldnote = el.closest('.menu-level1');
                if (parent.hasClass('open')) {
                    e.preventDefault();
                    if (parent.hasClass('open')) {
                        oldnote.removeClass('deactive');
                        parent.removeClass('open');
                        var i = $('.menu-level2.open').index();
                        $('.menu-level2').show();
                    }
                }

            });

            $('.lv1').on('click', function () {
                var el = $(this).parent();

                $('.mainnav .deactive').length && $('.mainnav .deactive').removeClass('deactive');
                $('.mainnav .open').length && $('.mainnav .open').removeClass('open');
                el.siblings('.menu-level1').removeClass('open');
                el.addClass('open');
                //var i = $('.menu-level1.open').index();
                //$('.mainnav > li:lt(' + i + ')').hide();
                $('.mainnav > li').hide();
            });
            $('.lv2').on('click', function () {
                var il = $(this).parent(),
                    oldnote = il.closest('.menu-level1');
                il.siblings('.menu-level2').removeClass('open');
                oldnote.addClass('deactive');
                il.addClass('open');
                //var i = $('.menu-level2.open').index();
                //$('.menu-level2:lt(' + i + ')').hide();
                $('.menu-level2').hide();
            });
            // menu mobile
        } else if (isMobile.tablet) {
            $('.nav-backdrop').on('click', function () {
                $('.menu-level1.open').removeClass('open');
                $('html').removeClass('open-menu');
                $('.iw_section_open_menu').removeClass('iw_section_open_menu');
                $('.submenu-level1').slideUp('fast');
            });
            $('.sublink1').bind('click', function (event) {
                var el = $(this).parent();
                if (!el.hasClass('open')) {
                    event.preventDefault();
                    el.addClass('open');
                    el.siblings('.menu-level1').removeClass('open');
                    el.siblings().find('.submenu-level1').slideUp('fast');
                    el.find('.submenu-level1').slideDown('fast', function () {
                        var $t = $(this).parent();
                        var $l2 = $('> .submenu-level1', $t).find('.menu-level2.open'),
                            $cols = $l2.find('.card-content'),
                            $colnav = $l2.find('.submenu-level2').children();
                        if ($cols.length) {
                            var msnry = new Masonry($cols[0]);
                            msnry.on('layoutComplete', function (event, items) {
                                $cols.parents('.hasfoursub').css('min-height', $cols.outerHeight());
                            });
                            msnry.layout();
                        }
                    });
                    $('html').addClass('open-menu');
                    $(this).closest('.iw_section').addClass('.iw_section_open_menu');
                } else {
                    window.location = $(this).attr('href');
                    el.removeClass('open');
                    el.find('.submenu-level1').slideUp('fast');
                    $('html').removeClass('open-menu');
                    $('.iw_section_open_menu').removeClass('iw_section_open_menu');
                }
            });
            $('.sublink2').bind('click', function (event) {
                var el = $(this).parent();
                if (!el.hasClass('open')) {
                    event.preventDefault();
                    el.siblings('.menu-level2').removeClass('open');
                    el.addClass('open');
                    el.siblings().removeClass('open');

                    var $t = $(this).parent();
                    var $l2 = $('> .submenu-level2', $t),
                        $cols = $l2.find('.card-content'),
                        $colnav = $l2.find('.submenu-level2').children();
                    if ($cols.length) {
                        var msnry = new Masonry($cols[0]);
                        msnry.on('layoutComplete', function (event, items) {
                            $cols.parents('.hasfoursub').css('min-height', $cols.outerHeight());
                        });
                        msnry.layout();
                    }
                } else {
                    window.location = $(this).attr('href');
                    el.removeClass('open');
                    $('.submenu-level1 .first').addClass('open');
                }
            });
            // menu tablet
        } else {
            $('> li', mainnav).on('mouseenter', function () {
                var $t = $(this);
                var $l2 = $('> .submenu-level1', this).find('.menu-level2.open'),
                    $cols = $l2.find('.card-content'),
                    $colnav = $l2.find('.submenu-level2').children();

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
            }).on('mouseleave', function () {
                clearTimeout($.data(this, 'timer'));
                $.data(this, 'timer', setTimeout($.proxy(function () {
                    $('> .submenu-level1', this).stop(true, true).slideUp(400);
                    $(this).removeClass('open');
                }, this), 250));
            });

            $('.menu-level2').on('mouseenter', function () {
                var el = $(this);

                el.siblings('.menu-level2').removeClass('open');
                el.addClass('open');
                var $cols = el.find('.card-content');
                if ($cols.length) {
                    var msnry = new Masonry($cols[0]);
                    msnry.on('layoutComplete', function (event, items) {
                        el.parents('.hasfoursub').css('min-height', $cols.outerHeight());
                    });
                    msnry.layout();
                }
            }).on('mouseleave', function () {
                $(this).removeClass('open');
                $('.submenu-level1 .first').addClass('open');
            });

            // tab detection
            $('.sublink1').focus(function () {
                var el = $(this).parent();
                el.siblings().removeClass('open');
                el.addClass('open');
                el.siblings().find('.submenu-level1').stop(true).slideUp('fast');
                el.find('.submenu-level1').stop(true).slideDown('fast');
                $('.navbar-right .open').removeClass('open');
            });
            $('.sublink2').focus(function () {
                var el = $(this).parent();
                el.siblings('.menu-level2').removeClass('open');
                el.addClass('open');
            });
            var notMouseAction = true;
            $('.btn-focus').bind('mousedown', function () {
                notMouseAction = false;
            });
            $('.btn-focus').focus(function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (notMouseAction) {
                    $('.block-personal,.block-languages').removeClass('open');
                    $(this).parent().addClass('open');
                }
            });
            $(document).keyup(function (e) {
                if (e.keyCode === 27) {
                    closemenu();
                }
            });
            // menu desktop
        }
        $('.closetab').focus(function () {
            closemenu();
            $('.d-wideget').find('.active').removeClass('active');
        });
    }

    function saveMainSlider() {
        var el = $('.bxslider-type-2 > ul'),
            banner = $('.banner-slider'),
            pager = $('.bx-pager'),
            pitem = $('#bx-pager a');
        if (el.length) {
            var slider = el.bxSlider({
                mode: 'fade',
                controls: false,
                infiniteLoop: true,
                moveSlides: 1,
                auto: true,
                pause: 5000,
                onSlideAfter: function() {
                    slider.stopAuto();
                    slider.startAuto();
                }
            });

            if (banner.length > 0) {
                if (banner.length === 1) {
                    pager.hide();
                } else if (banner.length === 2) {
                    pitem.addClass('bx-2item');
                } else if (banner.length === 3) {
                    pitem.addClass('bx-3item');
                }
            }

            pitem.hover(function () {
                slider.stopAuto();
            }, function () {
                slider.startAuto();
            });

            pitem.bind('click', function () {
                var a_href = $(this).attr('href');
                if (a_href) {
                    window.location.href = a_href;
                }
            });
        }
    }

    function mainslider() {
        var el = $('.bxslider'),
            banner = $('.banner-slider'),
            pager = $('.bx-pager'),
            pitem = $('#bx-pager a'),
            slider;

        if (el.length) {
            slider = el.bxSlider({
                pagerCustom: pager,
                mode: 'fade',
                controls: false,
                infiniteLoop: true,
                moveSlides: 1,
                auto: true,
                pause: 500000,
                onSlideAfter: function () {
                    slider.stopAuto();
                    slider.startAuto();
                }
            });
            if (banner.length > 0) {
                if (banner.length === 1) {
                    pager.hide();
                } else if (banner.length === 2) {
                    pitem.addClass('bx-2item');
                } else if (banner.length === 3) {
                    pitem.addClass('bx-3item');
                }
            }

            pitem.hover(function () {
                slider.stopAuto();
            }, function () {
                slider.startAuto();
            });

            pitem.bind('click', function () {
                var a_href = $(this).attr('href');
                if (a_href) {
                    window.location.href = a_href;
                }
            });
        }

    }

    function initOfferSlider() {
        var pager = false;

        if (isMobile.phone) {
            pager = true;
        }

        var bxslider3 = $('.bxslider-type-3 ul');
        if (!$('.bxslider-type-3').hasClass('no-slider')) {
            bxslider3.bxSlider({
                pager: pager,
                mode: 'fade',
                controls: false,
                infiniteLoop: true,
                moveSlides: 1,
                auto: true,
                pause: 5000,
                onSlideAfter: function () {
                    bxslider3.stopAuto();
                    bxslider3.startAuto();
                }
            });
        }
    }

    function hidehash() {
        var hl = $('.hide-hash');
        hl.each(function () {
            if (!$('html').hasClass('no-js')) {
                $(this).attr('href', 'javascript:void(0);');
            }
        });
    }

    function searchOverload() {
        var buttonSearch = $('.navbar-form #toggle-search');
        buttonSearch.on('click', function () {
            var el = $(this);
            if (!el.parent().hasClass('open')) {
                el.parent().addClass('open');
                body.addClass('fixed');

                // Fix for iphone
                if (isMobile.apple.phone) {
                    $('#header').css('width', window.innerWidth);
                    $('#frm-search').parent().css('width', window.innerWidth);
                }
                body.append('<span class="overlay"></span>');
            } else {
                el.parent().removeClass('open');
                body.removeClass('fixed');
                $('.overlay').remove();
            }

            $('#txt-search').trigger('focus');
        });

        $(document).on('click', function (e) {
            if (!buttonSearch.is(e.target) && buttonSearch.has(e.target).length === 0 && $('.overlay').length > 0) {
                $('body,html').animate({
                    scrollTop: 0
                }, 300);
                $('.navbar-form .dropdown').removeClass('open');
                body.removeClass('fixed');
                $('.overlay').remove();
            }
        });
        $('.block-login button').focus(function (e) {
            // if (!buttonSearch.is(e.target) && buttonSearch.has(e.target).length === 0 && $('.overlay').length > 0) {
            //     $('body,html').animate({
            //         scrollTop: 0
            //     }, 300);
            //     $('.navbar-form .dropdown').removeClass('open');
            //     body.removeClass('fixed');
            //     $('.overlay').remove();
            // }
        });
    }

    function fieldPlaceholder() {
        $('input, textarea').placeholder();
    }

    function announcementShowHide() {
        var announcemen = $('.alert'),
            close = announcemen.find('.close'),
            announcementItem = sessionStorage.getItem('announcement', '');
        if (announcementItem !== null) {
            announcemen.hide();
        }
        close.on('click', function () {
            sessionStorage.setItem('announcement', 'hide');
            announcemen.hide();
        });
    }

    function datasrcImg() {
        var isPlatform = '';
        if (isMobile.phone) {
            if (isMobile.apple.phone) {
                isPlatform = 'iphone';
            } else if (isMobile.android.phone) {
                isPlatform = 'android';
            } else {
                isPlatform = 'mobile';
            }
        } else if (isMobile.android.phone) {
            isPlatform = 'tablet';
        }
        $('img').each(function () {
            var el = $(this),
                dataPlatform = el.data('tg-' + isPlatform + '-src'),
                datamobilesrc = typeof(dataPlatform) !== 'undefined' ? dataPlatform : el.data('uob-tg-mobile-src'),
                datatabletsrc = typeof(dataPlatform) !== 'undefined' ? dataPlatform : el.data('uob-tg-tablet-src');
            if (isMobile.phone || windowWidth<768) {
                el.attr('src', datamobilesrc);
            } else {
                el.attr('src', datatabletsrc);
            }
        });
    }

    function scrollToElement(selector, time, verticalOffset) {
        var element = $(selector),
            offset = element.offset(),
            offsetTop = offset.top + verticalOffset;

        time = typeof(time) !== 'undefined' ? time : 1000;
        verticalOffset = typeof(verticalOffset) !== 'undefined' ? verticalOffset : 0;
        $('html, body').animate({
            scrollTop: offsetTop
        }, time);
    }

    function formula() {
        if (isMobile.phone) {
            $('#txt-interactive-m').slider({
                ticks_labels: ['10k', '50k'],
                step: 5,
                tooltip: 'always'
            });
        } else {
            $('#txt-interactive-d').slider({
                ticks_labels: ['10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k'],
                step: 5
            });
        }

    }

    // Hashto
    function hashto() {
        $('.nav-heading').on('click.scr', 'li', function () {
            var el = $(this),
                target = $(el.find('a').attr('href')),
                heading = target.find('> .heading2'),
                navbar = $('.sticky-nav'),
                top = navbar.height();

            heading.attr('tabindex', '1'); // Web Accessibility
            if (top === null || top === 0 || undefined) {
                top = 0;
            }
            if (!(navbar).hasClass('affix')) {
                top += top + (navbar.outerHeight(true) - navbar.innerHeight());
            }
            el.addClass('active').siblings().removeClass('active');
            $('html, body').stop().animate({
                scrollTop: (target.offset().top) - top
            }, 600, function () {
                // Web Accessibility
                document.activeElement.blur();
                heading.focus();
            });
        });
    }

    // Affix
    function affixTab(el) {
        for(var i=0,len=el.length;i<len;i++){
            if($(el[i]).hasClass('affix-top')){
                $(el[i]).affix({
                    offset: {
                        top: $(el[i]).offset().top
                    }
                });
            }
        }
    }


    function setNumbericType() {
        $('input[type=number]').on('input', function () {
            this.value = this.value.replace(/[^0-9\.]/g, '');
        });
    }

    //Active item when page load
    function scrollTopItem() {
        var hashItem = window.location.hash,
            sticky = $('.sticky-nav'),
            heightSticky = sticky.outerHeight(true),
            item = $(hashItem);
        if (item.length > 0) {
            var liItem = sticky.find('a', 'li').filter('[href="' + hashItem + '"]'),
                top = item.get(0).offsetTop;
            window.oo = item.get(0);
            if (sticky.is('[data-tab]')) {
                $('[href="' + hashItem + '"]').tab('show');
            } else {
                liItem.closest('li').addClass('active').siblings().removeClass('active');
            }

            setTimeout(function () {
                var offsetTop;
                if(sticky.hasClass('affix-top')){
                    if(item.get(0).offsetTop>=sticky.offset().top){
                        sticky.removeClass('affix-top').addClass('affix');
                        offsetTop = item.get(0).offsetTop-sticky.outerHeight();
                    }else{
                        offsetTop = item.get(0).offsetTop;
                    }
                }else{
                    offsetTop = item.get(0).offsetTop-sticky.outerHeight();
                }
                $('html, body').animate({
                    scrollTop: offsetTop
                });
            }, 600);
        }
    }

    //Active link when scroll
    // function checkActiveLink() {
    //   var sticky = $('.sticky-nav'),
    //       liItem = sticky.find('a', 'li'),
    //       heightSticky = sticky.outerHeight(true),
    //       height = (sticky.hasClass('affix-top') ? heightSticky : (heightSticky + sticky.innerHeight())),
    //       $window = $(window);

    //   if (sticky.length) {
    //     $('section').each(function(){
    //       var el = $(this),
    //           item = liItem.filter('[href="#'+el.attr('id')+'"]');

    //       if($window.scrollTop() + $window.height() === $(document).height() ||
    //         $window.scrollTop() >= el.offset().top - height) {
    //         item.closest('li').addClass('active').siblings().removeClass('active');
    //       }
    //     });
    //   }
    // }


    // login menu on mobile
    function menuLogin() {
        var blockLogin = $('.block-login'),
            btn = blockLogin.find('button'),
            menu = $('.navbar-toggle'),
            buttonSearch = $('.navbar-form #toggle-search');

        btn.on('click', function () {
            //loginMouseAction = true;
            if (isMobile.phone || $(window).width() < 768) {
                if (!menu.hasClass('off')) {
                    menu.trigger('click');
                }
                if (buttonSearch.closest('.dropdown').hasClass('open')) {
                    buttonSearch.trigger('click');
                }
                if (!blockLogin.hasClass('open')) {
                    body.addClass('fixed');
                    //Calculator login when open
                    calcLogin();
                    if ($('.overlay').length) {
                        $('.overlay').css('display', 'block');
                    } else {
                        body.append('<span class="overlay"></span>');
                    }
                } else {
                    body.removeClass('fixed');
                    $('.overlay').css('display', 'none');
                }
            }
        });
    }

    function calcLogin() {
        var blockLogin = $('.block-login'),
            listItem = blockLogin.find('.list-unstyled');

        if (windowHeight < windowWidth) {
            listItem.css('height', windowHeight - $('.navbar-header').height());
        } else {
            listItem.css('height', 'auto');
        }
    }

    // Accessibility for tab
    var setTabAccessibility = function () {
        $('a[data-toggle="tab"]').on('keydown', function (e) {
            if (e.which === 13) {
                $(this).click().focus();
            }
        });

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $(e.target).attr('aria-selected', 'true'); // newly activated tab
            $(e.relatedTarget).attr('aria-selected', 'false'); // previous active tab
        });
    };

    var stickyTab = function () {
        $('[data-tab].sticky-nav a').on('click.stickyTab', function (e) {
            $('.nav-heading').off('click.scr', 'li');
            e.preventDefault();
            $(this).tab('show');
            var href = $.attr(this, 'href');
            if(!$('body').hasClass('promotion-landing')) {
                window.location.hash = href;
            }
        });
    };

    function initApplynowFixed() {
        var applyFixed = $('.apply-now-fixed'),
            element = $('.apply-now-fixed .wrap-content');

        if (applyFixed.length > 0) {
            if (!isMobile.phone) {
                $('footer').css('margin-top', '105px');
            }
            var height = $('#header').outerHeight() + $('#main-navbar').outerHeight() + $('.breadcrumb').outerHeight() + $('h1.heading1').outerHeight() + $('.main-banner').outerHeight();

            if (!isMobile.phone) {
                if ($(window).scrollTop() + $(window).height() - 180 < height) {
                    applyFixed.fadeOut();
                }

                $(window).scroll(function () {
                    if ($(window).scrollTop() + $(window).height() - 180 >= height) {
                        applyFixed.show();
                    } else {
                        applyFixed.fadeOut();
                    }

                    if ($(window).scrollTop() + $(window).height() + 60 >= $(document).height()) {
                        applyFixed.addClass('bottom');
                    } else {
                        applyFixed.removeClass('bottom');
                    }
                });
            } else {
                if (windowWidth > windowHeight) {
                    if ($(window).scrollTop() + $(window).height() < height) {
                        applyFixed.fadeOut();
                    }
                    $(window).scroll(function () {
                        if ($(window).scrollTop() + $(window).height() + 60 >= height) {
                            applyFixed.show();
                        } else {
                            applyFixed.fadeOut();
                        }
                        if ($(window).scrollTop() + $(window).height() + 60 >= $(document).height()) {
                            applyFixed.addClass('bottom');
                        } else {
                            applyFixed.removeClass('bottom');
                        }
                    });
                } else {
                    // $(window).off('scroll');
                    $(window).on('scroll', function () {
                        if ($(window).scrollTop() + $(window).height() + 60 >= $(document).height()) {
                            applyFixed.addClass('bottom');
                        } else {
                            applyFixed.removeClass('bottom');
                        }
                    });
                    applyFixed.show();
                }
            }

            $('.arrow-expand').off('click.expand').on('click.expand', function () {
                var me = $(this);
                if (!me.hasClass('open')) {
                    me.addClass('open');
                    element.slideDown();
                } else {
                    me.removeClass('open');
                    element.slideUp();
                }
            });
        }
    }

    function initMobileSrc() {
        if (isMobile.phone) {
            $('[data-uob-src-mobile]').each(function (indx, element) {
                var src = $(element).attr('src');

                $(element).attr('src', src.replace('.jpg', '-m.jpg'));

            });
        }
    }

    function initImageBlock() {
        if ($('.image-item-wrap').length > 0) {

            $('.image-item-wrap').parent().each(function(){
                var parent = $(this),
                    elements = parent.find('.image-item-wrap');

                elements.css('height', 'auto');
                elements.find('.content-text').css('height', 'auto');
                // reset height card
                if (!isMobile.phone || $(window).width() > 767) {
                    parent.find('.image-item-wrap .content-text').setAllToMaxHeight();
                    parent.find('.image-item-wrap.type-card .content-text').css('height', 'auto');
                    parent.find('.image-item-wrap a').css('height', 'auto');

                    parent.find('.image-item-wrap a').setAllToMaxHeight();

                }
                if(isMobile.phone||$(window).width()<768){
                    parent.find('.image-item-wrap').setImageBlockToMaxHeight();
                }

            });
        }
    }

    function initImageBox() {
        if ($('.image-item-wrap-box').length > 0) {
            if (!isMobile.phone || $(window).width() > 767) {
                $('.image-item-wrap-box .content-text').setAllToMaxHeight();
            }
        }
    }

    function initDropdownSelect() {
        $('.dropdown-select ul li').on('click', function () {
            var me = $(this),
                dropdownOpen = me.closest('.dropdown'),
                buttonDropDown = dropdownOpen.find('.btn-dropdown-select'),
                spanText = buttonDropDown.find('span:first-child');

            if (spanText.text() !== me.text()) {
                $(spanText).animate({ opacity: 0 })
                    .queue(function() { $(this).text(me.text()).dequeue(); })
                    .animate({ opacity: 1 }, 350);
            }
        });
    }

    function initFilterAlphabelt() {
        var filterAlpha = $('.filter-item');
        if (filterAlpha.length > 0) {
            $('body').on('click', '.filter-item li', function () {
                var me = $(this),
                    listli = filterAlpha.find('li');

                if (!me.is('.active')) {
                    listli.removeClass('active');
                    me.addClass('active');
                }
            });
        }
    }

    function initArchorTop() {
        $('body').on('click', '.archor-top li', function () {
            $('body,html').animate({
                scrollTop: 0
            }, 300);
        });
    }

    function growItemBlock() {
        var gridItems = $('.grid-items');
        if (!isMobile.phone) {
            if (gridItems.length > 0) {
                $.each(gridItems, function (idx, el) {
                    var gridItem = $(el),
                        gridThumb = gridItem.find('.grid-thumbnail'),
                        gridDesc = gridItem.find('.grid-desc');

                    $(gridDesc).css('max-height', gridThumb.height());
                });
            }

        }

    }

    function setImageBackground() {
        var floatBanner = $('.float-banner');
        if(floatBanner.length) {
            if(isMobile.phone||$(window).width()<768){
                floatBanner.each(function(){
                    var ele = $(this),
                        img = ele.find('img');
                    ele.css({
                        'backgroundImage' : 'url('+img.attr('src')+')',
                        'backgroundSize' : 'contain',
                        'backgroundPosition' : 'center'
                    });
                });
            }else {
                floatBanner.each(function(){
                    var ele = $(this),
                        img = ele.find('img');
                    ele.css({
                        'background' : 'none'
                    });
                });
            }
        }
    }

    // Functions end
    $.fn.setAllToMaxHeight = function () {
        return this.height(Math.max.apply(this, $.map(this, function (e) {
            return $(e).height();
        })));
    };

    $.fn.setImageBlockToMaxHeight = function () {
        $.each(this, function (idx, el) {
            var nextEl = $(el).next('.image-item-wrap'),
                contentTxt = $(el).find('.content-text'),
                nextContentTxt = $(nextEl).find('.content-text');

            var arrEl = [$(contentTxt), $(nextContentTxt)];

            if (idx % 2 === 0) {
                var maxH = Math.max.apply(arrEl, $.map(arrEl, function (e) {
                    return $(e).height();
                }));
                $(contentTxt).height(maxH);
                $(nextContentTxt).height(maxH);
            }
        });
    };

    $.fn.stopScroll = function (options) {
        options = $.extend({
            delay: 250,
            callback: function () {
            }
        }, options);

        return this.each(function () {
            var $element = $(this),
                element = this;
            $element.scroll(function () {
                clearTimeout($.data(element, 'scrollCheck'));
                $.data(element, 'scrollCheck', setTimeout(function () {
                    options.callback();
                }, options.delay));
            });
        });
    };

    // $(window).scroll(function () {
    //   clearTimeout($.data(this, 'scrollCheck'));
    //   $.data(this, 'scrollCheck', setTimeout(function () {
    //     var navActive = $('.nav-heading li.active');
    //     tabScrollLeft(navActive);
    //   }, 250));
    // });

    // $('#calculate-btn').on('click', function(e) {
    //     var el = $(this),
    //         recalText = el.data('retext');
    //
    //     e.preventDefault();
    //     $('.calculator-block .total').slideDown();
    //     el.text(recalText).attr('title', recalText);
    // });

    $(window).bind('resize', resizeMainWindow);

    $(document).ready(function () {
        configFont();
        detectbrowser();
        menu();
        mainslider();
        saveMainSlider();
        stickybar();
        stickyTab();
        sidebar();
        hidehash();
        searchOverload();
        datasrcImg();
        fieldPlaceholder();
        announcementShowHide();
        // formula();
        hashto();
        setNumbericType();

        // checkActiveLink();
        setTabAccessibility();
        initApplynowFixed();
        initMobileSrc();
        initDropdownSelect();
        menuLogin();


        //scrollabletab
        scrollableTab();
        setImageBackground();
    });

    $(window).load(function () {
        var scrollBtn = $('.btnScrollTo');
        if (scrollBtn.length) {
            scrollBtn.on('click', function (e) {
                e.preventDefault();
                scrollToElement($(scrollBtn.attr('href')), 500, 0);
            });
        }

        affixTab($('#sticky-navibar'));
        affixTab($('.sticky-nav'));
        scrollTopItem();
        initImageBlock();
        initImageBox();
        initFilterAlphabelt();
        initArchorTop();
        initOfferSlider();
        growItemBlock();
    });

    $(window).scroll(function () {
        // checkActiveLink();
    });
});
