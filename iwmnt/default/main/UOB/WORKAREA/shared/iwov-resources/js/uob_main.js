;jQuery(function($) {
  var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      body = $('body');

  var resizeMainWindow = function(e) {
      var windowWidthNew = jQuery(window).width();
      var windowHeightNew = jQuery(window).height();
      if (windowWidth != windowWidthNew || windowHeight != windowHeightNew) {
          windowWidth = windowWidthNew;
          windowHeight = windowHeightNew;
          stickybar();
      }
  };
  function detectbrowser() {
    jQuery.uaMatch = function (ua) {
      ua = ua.toLowerCase();
      var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || /(trident)[\/]([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
      return {
          browser: match[1] || "",
          version: match[2] || "0"
      };
    };
    matched = jQuery.uaMatch(navigator.userAgent);
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
  function configFont(argument) {
    WebFontConfig = {
      google: { families: [ 'Lato:100,300,400,700,900'] }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
  }

  $(window).bind('resize', resizeMainWindow);

  $(document).ready(function() {
    configFont();
    detectbrowser();
    menu();
    mainslider();
    stickybar();
    sidebar();
    hidehash();
    searchOverload();
    datasrcImg();
    fieldPlaceholder();
    announcementShowHide();
    collapseBenefit();
    formula();
    hashto($('.nav-heading a'));
    affixTab($('.sticky-nav'));
    

  });

  $(window).load(function() {

    $('.btnScrollTo').bind('click', function (event) {
        scrollToElement($('.tbl-content'), 500, 0);
    });  
  });


  // Functions
  function sidebar() {
    var lis = $('.side-wideget li'),
        key = $('.key-wideget li'),
        olis = $('.out-dock li'),
        out = $('.out-dock'),
        socialTab = $('.social-tab');
    if(isMobile.phone){
      socialTab.bind('click',function(event){
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
      var lastScrollTop = 0;
      if($('.m-wideget').hasClass('on')) {
        $(window).scroll(function(event){
          var st = $(this).scrollTop();
          if (st > lastScrollTop){
            $('.m-wideget').hide();
            $('.w-close').trigger('click');
          } else {          
            $('.m-wideget').show();
          }
          lastScrollTop = st;
        });
      }
    }else{
      olis.bind('mouseenter', function (event) {
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
      lis.bind('mouseenter', function (event) {
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
    var level1 = $('.sublink1');
    var level2 = $('.sublink2');
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
        var el = $(this);
            parent = el.parent();
            e.preventDefault();
        if(parent.hasClass('open')) {
          parent.removeClass('open');
          var i = $('.menu-level1.open').index();
          $('.mainnav > li:lt('+ i +')').show();
        }
      });

      level2.on('click', function (e) {
        var el = $(this);
            parent = el.parent(),
            oldnote = el.closest('.menu-level1');
            e.preventDefault();
        if(parent.hasClass('open')) {
          oldnote.removeClass('deactive');
          parent.removeClass('open');
          var i = $('.menu-level2.open').index();
          $('.menu-level2:lt('+ i +')').show();
        }
      });

      $('.lv1').on('click', function (event) {
        var el = $(this).parent();
        el.siblings('.menu-level1').removeClass('open');
        el.addClass('open');
        var i = $('.menu-level1.open').index();
        $('.mainnav > li:lt('+ i +')').hide();
      });
      $('.lv2').on('click', function (event) {
        var il = $(this).parent(),
            oldnote = il.closest('.menu-level1');
        il.siblings('.menu-level2').removeClass('open');
        // if(il.hasClass('open')){
        //   oldnote.removeClass('deactive');
        //   var i = $('.menu-level2.open').index();
        //   $('.menu-level2:lt('+ i +')').show();
        //   il.removeClass('open');
        // }else{
        //   oldnote.addClass('deactive');
        //   il.addClass('open');
        //   var i = $('.menu-level2.open').index();
        //   $('.menu-level2:lt('+ i +')').hide();
        // }
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
      $('#header').bind('mouseenter',function(){
        closemenu();
      });
    // menu tablet
    }else{
      $('.menu-level1').bind('mouseenter', function (event) {
        var el = $(this);
        closemenu();
        el.find('.submenu-level1').slideDown('fast');
        $(this).addClass('open');
      }).bind('mouseleave', function (event) {      
        $(this).find('.submenu-level1').slideUp('fast');
        $(this).removeClass('open');      
      });
      $('.menu-level2').bind('mouseenter', function (event) {
        $(this).siblings('.menu-level2').removeClass('open');
        $(this).addClass('open');
      }).bind('mouseleave', function (event) {
        $(this).removeClass('open');
        $('.submenu-level1 .first').addClass('open');
      });

      // tab detection
      $(".sublink1").focus(function(){
        var el = $(this).parent();
        el.siblings().removeClass('open');  
        el.addClass('open');
        el.siblings().find('.submenu-level1').stop(true).slideUp('fast');
        el.find('.submenu-level1').stop(true).slideDown('fast');
        $('.navbar-right .open').removeClass('open');
      });
      $(".sublink2").focus(function (event) {
        var el = $(this).parent();
        el.siblings('.menu-level2').removeClass('open');
        el.addClass('open');
      });
      var notMouseAction = true;
      $('.btn-focus').bind('mousedown',function(e){
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
        if (e.keyCode == 27) {
          closemenu();
        }
      });
      $('#header').bind('mouseenter',function(){
        closemenu();
      });
    // menu desktop  
    }
    $('.closetab').focus(function(e){
      closemenu();
      $('.d-wideget').find('.active').removeClass('active');
    });
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
          // wrapperWidth = $('.wrapper').width();
		  wrapperWidth = $('.iw_component .container .row').width();
      if(windowWidth>wrapperWidth){
        sidebar.css('right',(windowWidth-wrapperWidth)/2-15);
      }else{
          sidebar.css('right','-15px');
      } 
    }
  }
  function mainslider(){
    var el = $('.bxslider'),
        banner = $('.banner-slider'),
        pager = $('.bx-pager'),
        pitem = $('#bx-pager a');

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
      if(banner.length == 1){
        pager.hide();
      }else if (banner.length == 2){
        pitem.addClass('bx-2item');
      }else if (banner.length == 3){
        pitem.addClass('bx-3item');
      }  
    }

    pitem.hover(function () {
        slider.stopAuto();
    }, function () {
        slider.startAuto();
    });

    pitem.bind('click', function (event) {
        a_href =  $(this).attr('href')
        if(a_href){
            window.location.href = a_href;
        }
    });

  }
  function hidehash(){
    var hl = $('.hide-hash');
    hl.each(function(){
      var hash = $(this).attr('href');
      if(!$('html').hasClass('no-js')){
        $(this).attr('href','javascript:void(0);');
      }
    });
  }

  function searchOverload() {
    var buttonSearch = $('.navbar-form #toggle-search');
    buttonSearch.bind('click', function () {
        var el = $(this);
        if(!el.parent().hasClass('open')) {
          el.parent().addClass('open');
          body.addClass('fixed');
          body.append('<span class="overlay"></span>');
        } else { 
          el.parent().removeClass('open');
          body.removeClass('fixed');
          $('.overlay').remove();
        }
        setTimeout(function(){
          $('#txt-search').focus();
        }, 300);  
    })
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
        })
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
    $('img').each(function(index){
      var el = $(this),
        dataPlatform = el.data('tg-'+isPlatform+'-src'),
        datamobilesrc = typeof(dataPlatform) !='undefined' ?  dataPlatform : el.data('tg-mobile-src'),
        datatabletsrc = typeof(dataPlatform) !='undefined' ?  dataPlatform : el.data('tg-tablet-src');
        if(isMobile.phone) {
          el.attr('src', datamobilesrc);
        } else { el.attr('src', datatabletsrc); }
    });
  }

  function scrollToElement(selector, time, verticalOffset) {
    time = typeof (time) != 'undefined' ? time : 1000;
    verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
  }
  function collapseBenefit() {
    var collapseParent = $('.collapse-block'),
        collapseBody = $(collapseParent).find('.collapse'),
        collapseNav = $(collapseParent).find('.collapse-nav');
        
    if(isMobile.phone) {
      var collapseID;
      collapseParent.on('click','.collapse-nav', function(e) {
        e.preventDefault();
        collapseID = $(this).attr('href');
        var el = $(this),
            collapsehash = $(collapseParent).find(collapseID),
            gridContent = el.parents('.grid-content'),
            timmer = null,
            collapseContent = $(collapseParent).find(collapseID).clone(),
            appendHtml = '<div class="appended collapse-body"></div>'
        if($('.appended').length === 0) {
          gridContent.after(appendHtml);
          $(collapseContent).appendTo(gridContent);
          collapsehash.remove();
        }
        if(gridContent.hasClass('active')) {
          gridContent.removeClass('active');
          $(collapseID).slideUp('slow');
        } else {
          gridContent.addClass('active');
          $(collapseID).slideDown('slow');
        }
      });
    } else {
      collapseParent.on('click','.grid-content .collapse-nav', function(e) {
        e.preventDefault();
        var el = $(this),
            collapseID = el.attr('href'),
            collapsehash = $(collapseParent).find(collapseID),
            gridContent = el.parents('.grid-content'),
            timmer = null;
        // append content for mobile
        if(gridContent.siblings().hasClass('active')) {
          collapsehash.siblings().slideUp('slow');
          gridContent.siblings().removeClass('active');
          clearTimeout(timmer);  
          timmer = setTimeout(function() {
            collapsehash.slideDown('slow');
            gridContent.addClass('active');
          },700);
        } else {
          if(gridContent.hasClass('active')) {
            collapsehash.slideUp('slow');
            setTimeout(function() {
              gridContent.removeClass('active');
            },600);
          } else {
            collapsehash.slideDown('slow');
            gridContent.addClass('active');
          }  
        }
      });
      collapseBody.on('click', '.collapse-nav', function () {
        var el = $(this),
            collapse = el.parents('.collapse');
        collapseParent.find('.grid-content').removeClass('active');
        if(collapse.is(':visible')) {
          collapse.slideUp('slow');
        }
      });
    } // end desktop
  }

  function formula () {
    if(isMobile.phone) {
      $("#txt-interactive-m").slider({
        ticks_labels: ['10k','50k'],
        step: 5
      });
    } else {
      $("#txt-interactive-d").slider({
        ticks_labels: ['10k','15k','20k','25k','30k','35k','40k','45k','50k'],
        step: 5
      });
    }
    
  }

  // Hashto
  function hashto(el) {
    el.on('click', function (e) {
      // e.preventDefault();
      var el = $(this),
          target = $(el.attr('href')),
          top = $('.sticky-nav').height();
          if(top == null || top == 0 || undefined) {
            top = 0;
          }
          el.parent().siblings().removeClass('active');
          el.parent().addClass('active');
          $('html, body').animate({
            scrollTop: (target.offset().top) - top
        }, 600);
    })
  }

  // Affix
  function affixTab(el) {
    el.affix({
      offset: {
        top: function(){
          return(this.top = $(el).offset().top)
        }
      }
    });
  }

  // Functions end
  $.fn.setAllToMaxHeight = function () {
    return this.height(Math.max.apply(this, $.map(this, function (e) {
        return $(e).height()
    })));
  };

  $('#calculate-btn').on('click', function(){
    $('.calculator-block .total').slideDown();
    $('#calculate-btn').text("Recalculate");
    preventDefault();
  })
});