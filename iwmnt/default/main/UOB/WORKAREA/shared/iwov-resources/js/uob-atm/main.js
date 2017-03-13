;(function($, window, undefined){
	'use strict';

  var pluginName = 'collapse';


  function Collapse(element, options) {
    this.element = $(element);
    this.options = $.extend(true, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Collapse.prototype = {
    init: function() {
      var that = this,
        mCheckPoint,
        dCheckPoint;

      if(isMobile.phone) {
        this.element.on('click','.collapse-nav', function(e) {
          var el = $(this),
            activeEl = $('.active', that.element),
            collapseEl = $(el.attr('href')),
            gridContent = el.parents('.grid-content');

          mCheckPoint = gridContent.offset().top - 70;
          e.preventDefault();
          if(!$('.appended', gridContent).length) {
            collapseEl.addClass('appended').appendTo(gridContent);
          }

          if(collapseEl.is(':hidden') && activeEl.length) {
            activeEl.removeClass('active');
            activeEl.find('.collapse').stop().slideUp(400);
            clearTimeout($.data(this, 'timer'));
            $.data(this, 'timer', setTimeout($.proxy(function(){
              mCheckPoint = gridContent.offset().top - 40;
              if(mCheckPoint) {
                $('body, html').animate({scrollTop: mCheckPoint}, 600);
                mCheckPoint = null;
              }
              gridContent.addClass('active');
              collapseEl.stop().slideDown(600);
            }, this), 400));
          } else if(activeEl.length) {
            activeEl.removeClass('active');
            activeEl.find('.collapse').slideUp(400);
            if(mCheckPoint) {
              $('body, html').animate({scrollTop: mCheckPoint}, 600);
              mCheckPoint = null;
            }
          } else {
            gridContent.addClass('active');
            collapseEl.slideDown(600);
          }
        });
      } else {
        this.element.on('click','.collapse-nav', function(e) {
          var el = $(this),
            isCollapseBtnTop = el.parents('.grid-content').length,
            hasActive = $('.active', that.element).length,
            gridContent = el.parents('.grid-content'),
            collapseEl = $(el.attr('href'));

          e.preventDefault();

          if(isCollapseBtnTop) {
            dCheckPoint = gridContent.offset().top - 70;

            if(collapseEl.is(':hidden') && hasActive) {
              $('.active', that.element).removeClass('active');
              $('.collapse:visible', that.element).slideUp(400);
              clearTimeout($.data(this, 'timer'));
              $.data(this, 'timer', setTimeout($.proxy(function(){
                collapseEl.slideDown(600);
                gridContent.addClass('active');
              }, this), 400));
            } else if(hasActive) {
              $('.active', that.element).removeClass('active');
              $('.collapse:visible', that.element).slideUp(400);
            } else {
              collapseEl.slideDown(600);
              gridContent.addClass('active');
            }
          } else {
            $('.active', that.element).removeClass('active');
            $('.collapse:visible', that.element).slideUp(400);
            if(dCheckPoint) {
              $('body, html').animate({scrollTop: dCheckPoint}, 600);
              dCheckPoint = null;
            }
          }
        });
      } // end desktop
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if(!instance) {
        $.data(this, pluginName, new Collapse(this, options));
      }
    });
  };

  $.fn[pluginName].defaults = {};

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });
}(jQuery, window));

/*jshint scripturl:true*/ //- Ignore the Script URL of jsHint
jQuery(function($) {
  var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      body = $('body');

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
    $('.message-close').click(function(){
      $(this).parent().hide('fast');
    });
  }

  function configFont() {
    WebFontConfig = {
      google: { families: [ 'Lato:100,300,400,700,900'] }
    };

    (function() {
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
    if(isMobile.phone){
      $('.d-wideget').addClass('m-wideget');
      $('.m-wideget').removeClass('d-wideget');
      $('.m-wideget').addClass('on');
    }else{
      var sidebar = $('.d-wideget .dock'),
          wrapperWidth = $('.wrapper').width();
      if(windowWidth>wrapperWidth){
        sidebar.css('right',(windowWidth-wrapperWidth)/2-15);
      }else{
          sidebar.css('right','-15px');
      }
    }
  }

    var resizeMainWindow = function() {
      var windowWidthNew = jQuery(window).width();
      var windowHeightNew = jQuery(window).height();
      if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
          windowWidth = windowWidthNew;
          windowHeight = windowHeightNew;
          stickybar();
      }
  };

  // Functions
  function sidebar() {
    var lis = $('.side-wideget li'),
        key = $('.key-wideget li'),
        olis = $('.out-dock li'),
        out = $('.out-dock'),
        socialTab = $('.social-tab'),
        closeCaption = function() {
          $('.d-wideget .active').removeClass('active');
        };
    if(isMobile.phone){
      socialTab.bind('click',function(){
        var $t = $(this),
            eq = $t.index();
            if(out.hasClass('active')) {
              out.removeClass('active');
              $(this).removeClass('active');
            } else {
              out.addClass('active');
              out.parent().addClass('active');
              $(this).addClass('active');
              lis.eq(eq).addClass('active');
            }

      });

      $('.w-close').on('click',function(){
        $('.m-wideget .active').removeClass('active');
      });
    } else if(isMobile.tablet) {
      $('.d-wideget li').on('click', function() {
        var el = $(this);

        if(el.is('.active')) {
          closeCaption();
        } else {
          closeCaption();
          out.addClass('active');
          el.addClass('active');

          if(el.closest('.key-wideget').length) {
            lis.eq(el.index()).addClass('active');
          } else {
            key.eq(el.index()).addClass('active');
          }
        }
      });

      // prevent blur function
      $(document).on('click', function(e) {
        if(!$(e.target).closest('.d-wideget').length) {
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
      }).bind('mouseleave', function () {
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
      tabw.focus(function(){
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

    if(isMobile.phone){
      $('.menu-level2.first').removeClass('open');
      $('.navbar-toggle').click(function(){
        $('html').toggleClass('open-menu');
        $(this).toggleClass('off');
        $('.mainnav .open').removeClass('open');
        $('.mainnav .deactive').removeClass('deactive');
        $('.mainnav li').show();
      });
      // Back to
      level1.on('click', function(e) {
        var el = $(this),
            parent = el.parent();

        if(parent.hasClass('open')) {
          e.preventDefault();
          if(parent.hasClass('open')) {
            parent.removeClass('open');
            var i = $('.menu-level1.open').index();
            $('.mainnav > li:lt('+ i +')').show();
          }
        }

      });

      level2.on('click', function (e) {
        var el = $(this),
            parent = el.parent(),
            oldnote = el.closest('.menu-level1');
        if(parent.hasClass('open')) {
           e.preventDefault();
          if(parent.hasClass('open')) {
          oldnote.removeClass('deactive');
          parent.removeClass('open');
          var i = $('.menu-level2.open').index();
          $('.menu-level2:lt('+ i +')').show();
        }
        }

      });

      $('.lv1').on('click', function () {
        var el = $(this).parent();

        $('.mainnav .deactive').length && $('.mainnav .deactive').removeClass('deactive');
        $('.mainnav .open').length && $('.mainnav .open').removeClass('open');
        el.siblings('.menu-level1').removeClass('open');
        el.addClass('open');
        var i = $('.menu-level1.open').index();
        $('.mainnav > li:lt('+ i +')').hide();
      });
      $('.lv2').on('click', function () {
        var il = $(this).parent(),
            oldnote = il.closest('.menu-level1');
        il.siblings('.menu-level2').removeClass('open');
          oldnote.addClass('deactive');
          il.addClass('open');
          var i = $('.menu-level2.open').index();
          $('.menu-level2:lt('+ i +')').hide();
      });
    // menu mobile
    }else if(isMobile.tablet){
      $('.nav-backdrop').on('click',function(){
        $('.menu-level1.open').removeClass('open');
        $('html').removeClass('open-menu');
        $('.submenu-level1').slideUp('fast');
      });
      $('.sublink1').bind('click', function (event) {
        var el = $(this).parent();
        if(!el.hasClass('open')){
          event.preventDefault();
          el.addClass('open');
          el.siblings('.menu-level1').removeClass('open');
          el.siblings().find('.submenu-level1').slideUp('fast');
          el.find('.submenu-level1').slideDown('fast');
          $('html').addClass('open-menu');
        }else{
          window.location = $(this).attr('href');
          el.removeClass('open');
          el.find('.submenu-level1').slideUp('fast');
          $('html').removeClass('open-menu');
        }
      });
      $('.sublink2').bind('click', function (event) {
        var el = $(this).parent();
        if(!el.hasClass('open')){
          event.preventDefault();
          el.siblings('.menu-level2').removeClass('open');
          el.addClass('open');
          el.siblings().removeClass('open');
        } else {
          window.location = $(this).attr('href');
          el.removeClass('open');
          $('.submenu-level1 .first').addClass('open');
        }
      });
    // menu tablet
    }else{
      $('> li', mainnav).on('mouseenter', function() {
        clearTimeout($.data(this, 'timer'));
        $.data(this, 'timer', setTimeout($.proxy(function() {
          $('> .submenu-level1', this).stop(true, true).slideDown(400);
          $(this).addClass('open');
        }, this), 250));
      }).on('mouseleave', function(){
        clearTimeout($.data(this, 'timer'));
        $.data(this, 'timer', setTimeout($.proxy(function() {
          $('> .submenu-level1', this).stop(true, true).slideUp(400);
          $(this).removeClass('open');
        }, this), 250));
      });

      $('.menu-level2').on('mouseenter', function () {
        var el = $(this);

        el.siblings('.menu-level2').removeClass('open');
        el.addClass('open');
      }).on('mouseleave', function () {
        $(this).removeClass('open');
        $('.submenu-level1 .first').addClass('open');
      });

      // tab detection
      $('.sublink1').focus(function(){
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
      $('.btn-focus').bind('mousedown',function(){
        notMouseAction = false;
      });
      $('.btn-focus').focus(function(e){
        e.preventDefault();
        e.stopPropagation();
        if(notMouseAction){
          $('.block-personal,.block-languages').removeClass('open');
          $(this).parent().addClass('open');
        }
      });
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          closemenu();
        }
      });
    // menu desktop
    }
    $('.closetab').focus(function(){
      closemenu();
      $('.d-wideget').find('.active').removeClass('active');
    });
  }

  function saveMainSlider(){
    var el = $('.bxslider-type-2 > ul'),
      banner = $('.banner-slider'),
      pager = $('.bx-pager'),
      pitem = $('#bx-pager a');

    var slider = el.bxSlider({
        mode        : 'fade',
        controls    : false,
        infiniteLoop: true,
        moveSlides  : 1,
        auto        : true,
        pause       : 5000,
        onSlideAfter: function () {
            slider.stopAuto();
            slider.startAuto();
        }
      });

    if(banner.length > 0){
      if(banner.length === 1){
        pager.hide();
      }else if (banner.length === 2){
        pitem.addClass('bx-2item');
      }else if (banner.length === 3){
        pitem.addClass('bx-3item');
      }
    }

    pitem.hover(function () {
        slider.stopAuto();
    }, function () {
        slider.startAuto();
    });

    pitem.bind('click', function () {
        var a_href =  $(this).attr('href');
        if(a_href){
            window.location.href = a_href;
        }
    });

  }

  function mainslider(){
    var el = $('.bxslider'),
      banner = $('.banner-slider'),
      pager = $('.bx-pager'),
      pitem = $('#bx-pager a'),
      slider = el.bxSlider({
        pagerCustom : pager,
        mode        : 'fade',
        controls    : false,
        infiniteLoop: true,
        moveSlides  : 1,
        auto        : true,
        pause       : 500000,
        onSlideAfter: function () {
            slider.stopAuto();
            slider.startAuto();
        }
      });

    if(banner.length > 0){
      if(banner.length === 1){
        pager.hide();
      }else if (banner.length === 2){
        pitem.addClass('bx-2item');
      }else if (banner.length === 3){
        pitem.addClass('bx-3item');
      }
    }

    pitem.hover(function () {
        slider.stopAuto();
    }, function () {
        slider.startAuto();
    });

    pitem.bind('click', function () {
        var a_href =  $(this).attr('href');
        if(a_href){
            window.location.href = a_href;
        }
    });

  }

  function hidehash(){
    var hl = $('.hide-hash');
    hl.each(function(){
      if(!$('html').hasClass('no-js')){
        $(this).attr('href','javascript:void(0);');
      }
    });
  }

  function searchOverload() {
    var buttonSearch = $('.navbar-form #toggle-search');
    buttonSearch.on('click', function () {
        var el = $(this);
        if(!el.parent().hasClass('open')) {
          el.parent().addClass('open');
          body.addClass('fixed');

          // Fix for iphone
          if(isMobile.apple.phone) {
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

    $(document).on('click', function(e) {
        if(!buttonSearch.is(e.target) && buttonSearch.has(e.target).length === 0 && $('.overlay').length> 0) {
          $('body,html').animate({
            scrollTop: 0
          }, 300);
          $('.navbar-form .dropdown').removeClass('open');
          body.removeClass('fixed');
          $('.overlay').remove();
        }
    });
    $('.block-login a').focus(function(e) {
        if(!buttonSearch.is(e.target) && buttonSearch.has(e.target).length === 0 && $('.overlay').length> 0) {
          $('body,html').animate({
            scrollTop: 0
          }, 300);
          $('.navbar-form .dropdown').removeClass('open');
          body.removeClass('fixed');
          $('.overlay').remove();
        }
    });
  }

  function fieldPlaceholder() {
    $('input, textarea').placeholder();
  }

  function announcementShowHide() {
    var announcemen = $('.alert'),
        close = announcemen.find('.close'),
        announcementItem = sessionStorage.getItem('announcement','');
        if(announcementItem !== null) {
          announcemen.hide();
        }
        close.on('click', function() {
          sessionStorage.setItem('announcement','hide');
          announcemen.hide();
        });
  }

  function datasrcImg() {
    var isPlatform = '';
    if(isMobile.phone){
        if(isMobile.apple.phone){
            isPlatform = 'iphone';
        }else if(isMobile.android.phone){
            isPlatform = 'android';
        } else { isPlatform = 'mobile'; }
    }else if(isMobile.android.phone){
        isPlatform = 'tablet';
    }
    $('img').each(function(){
      var el = $(this),
        dataPlatform = el.data('tg-'+isPlatform+'-src'),
        datamobilesrc = typeof(dataPlatform) !== 'undefined' ?  dataPlatform : el.data('tg-mobile-src'),
        datatabletsrc = typeof(dataPlatform) !== 'undefined' ?  dataPlatform : el.data('tg-tablet-src');
        if(isMobile.phone) {
          el.attr('src', datamobilesrc);
        } else { el.attr('src', datatabletsrc); }
    });
  }

  function scrollToElement(selector, time, verticalOffset) {
    var element = $(selector),
      offset = element.offset(),
      offsetTop = offset.top + verticalOffset;

    time = typeof (time) !== 'undefined' ? time : 1000;
    verticalOffset = typeof (verticalOffset) !== 'undefined' ? verticalOffset : 0;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
  }

  function formula () {
    if(isMobile.phone) {
      $('#txt-interactive-m').slider({
        ticks_labels: ['10k','50k'],
        step: 5,
        tooltip: 'always'
      });
    } else {
      $('#txt-interactive-d').slider({
        ticks_labels: ['10k','15k','20k','25k','30k','35k','40k','45k','50k'],
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
          if(top === null || top === 0 || undefined) { top = 0; }
          if(!(navbar).hasClass('affix')) {
            top+=top + (navbar.outerHeight(true) - navbar.innerHeight());
          }
          el.addClass('active').siblings().removeClass('active');
          $('html, body').stop().animate({
            scrollTop: (target.offset().top) - top
          }, 600, function() {
            // Web Accessibility
            document.activeElement.blur();
            heading.focus();
          });
    });
  }

  // Affix
  function affixTab(el) {
    el.affix({
      offset: {
        top: $(el).offset().top
      }
    });
  }

  // Functions end
  $.fn.setAllToMaxHeight = function () {
    return this.height(Math.max.apply(this, $.map(this, function (e) {
        return $(e).height();
    })));
  };

  $('#calculate-btn').on('click', function(e){
    var el = $(this),
     recalText = el.data('retext');

    e.preventDefault();
    $('.calculator-block .total').slideDown();
    el.text(recalText).attr('title', recalText);
  });

  function setNumbericType() {
    $('input[type=number]').on('input', function() {
      this.value = this.value.replace(/[^0-9\.]/g,'');
    });
  }

  //Active item when page load
  function scrollTopItem() {
    var hashItem = window.location.hash,
        sticky = $('.sticky-nav'),
        heightSticky = sticky.outerHeight(true),
        item = $(hashItem);
    if (item.length < 0) {
      var liItem = sticky.find('a', 'li').filter('[href="'+hashItem+'"]'),
          top = item.get(0).offsetTop;
          window.oo = item.get(0);
      if(sticky.is('[data-tab]')) {
        $('[href="'+hashItem+'"]').tab('show');
      } else {
        liItem
          .closest('li')
          .addClass('active')
          .siblings()
          .removeClass('active');
      }

      setTimeout(function() {
        var height = (sticky.hasClass('affix-top') ? heightSticky : (heightSticky + sticky.innerHeight()));
        if (!sticky.find('li').eq(0).hasClass('active')) {
          height = heightSticky + sticky.innerHeight();
        }
        console.log(item.get(0).offsetTop);
        console.log(top);
        $('html, body').animate({
          scrollTop: item.get(0).offsetTop - height +66
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

  // Accessibility for tab
  var setTabAccessibility = function() {
    $('a[data-toggle="tab"]').on('keydown', function(e) {
      if(e.which === 13) {
        $(this).click().focus();
      }
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      $(e.target).attr('aria-selected', 'true'); // newly activated tab
      $(e.relatedTarget).attr('aria-selected', 'false'); // previous active tab
    });
  };

  var stickyTab = function() {
    $('[data-tab].sticky-nav a').on('click.stickyTab', function(e) {
      $('.nav-heading').off('click.scr', 'li');
      e.preventDefault();
      $(this).tab('show');
      var href = $.attr(this, 'href');
      window.location.hash = href;
    });
  };

  $(window).bind('resize', resizeMainWindow);

  $(document).ready(function() {
    configFont();
    // detectbrowser();
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
    formula();
    hashto();
    setNumbericType();
    
    // checkActiveLink();
    setTabAccessibility();
  });

  $(window).load(function() {
    var scrollBtn = $('.btnScrollTo');
    if(scrollBtn.length) {
      scrollBtn.on('click', function (e) {
        e.preventDefault();
        scrollToElement($(scrollBtn.attr('href')), 500, 0);
      });
    }
    // affixTab($('.sticky-nav'));
    scrollTopItem();
  });

  $(window).scroll(function(){
    // checkActiveLink();
  });
});
