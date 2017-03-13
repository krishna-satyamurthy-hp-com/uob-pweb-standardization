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
      }
      calcLogin();

      if (windowHeight > windowWidth && !isMobile.phone) {
        var menulv2 = $('.menu-level2.open');
        var height = calcAllDivHeight(menulv2);
        menulv2.parent().css('min-height', height + 20);
      } else {
        $('.hasfoursub').css('min-height', 500);
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
    // if ($.browser.msie) {
    //   if (parseInt($.browser.version) < 10) {
    //       $('html').addClass('oldie');
    //   }
    // }
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
    // detectbrowser();
    menu();
    searchOverload();
    datasrcImg();
    hashto($('.nav-heading li'));
    affixTab($('.sticky-nav'));
    checkboxLoantenor();
    checkActiveLink();
    menuLogin();
    clickItemMenu();
  });

  $(window).load(function() {
    scrollTopItem();
  });

  $(window).scroll(function(){
    checkActiveLink();
  });

  // Functions
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

      $('.lv1').on('click', function (event) {
        var el = $(this).parent();
        el.siblings('.menu-level1').removeClass('open deactive');
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
    // menu desktop
    }
    $('.closetab').focus(function(e){
      closemenu();
    });
  }
  function closemenu() {
    $('.mainnav .open').removeClass('open');
    $('.submenu-level1').hide();
    $('.submenu-level1 .first').addClass('open');
  }
  function searchOverload() {
    var buttonSearch = $('.navbar-form #toggle-search');
    buttonSearch.bind('click', function () {
        var el = $(this);
        if(!el.parent().hasClass('open')) {
          el.parent().addClass('open');
          body.addClass('fixed');
          if (!$('.overlay').length) {
            body.append('<span class="overlay"></span>');
          } else {
            $('.overlay').css('display', 'block');
          }
        } else {
          el.parent().removeClass('open');
          body.removeClass('fixed');
          $('.overlay').css('display', 'none');
        }
        setTimeout(function(){
          $('#txt-search').focus();
        }, 300);
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
  
  // Hashto
  function hashto(el) {
    el.on('click', function (e) {
      var el = $(this),
          target = $(el.find('a').attr('href')),
          navbar = $('.sticky-nav'),
          top = navbar.height();

          if(top == null || top == 0 || undefined) { top = 0; }
          if(!(navbar).hasClass('affix')) {
            top+=top  - navbar.innerHeight();
          }
          el.addClass('active').siblings().removeClass('active');
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
  
  function checkboxLoantenor() {
    var ratesTenor = $('.rates-and-tenors-block'),
        itemClicked = ratesTenor.find('input'),
        infoTable = $('.infomation-tbl'),
        itemActive = infoTable.find('tbody tr');

    itemClicked.on('click', function (e) {
      var el = $(this),
          index = el.closest('.form-group').index('.form-group');
          
      if (el.is(':checked')) {
        itemActive.eq(index).addClass('active');
        if (itemActive.hasClass('active')) {
          infoTable.removeClass('hide');
        }
      } else {
        itemActive.eq(index).removeClass('active');
        if (!itemActive.hasClass('active')) {
          infoTable.addClass('hide');
        }
      }
    });
  }
  //Active item when page load
  function scrollTopItem() {
    var hashItem = window.location.hash,
        sticky = $('.sticky-nav'),
        heightSticky = sticky.outerHeight(true),
        item = $(hashItem);
    if (item.length) {
      var liItem = sticky.find('a', 'li').filter('[href="'+hashItem+'"]'),
          top = item.offset().top;

      liItem.closest('li').addClass('active').siblings().removeClass('active');
      setTimeout(function() {
        var height = (sticky.hasClass('affix-top') ? heightSticky : (heightSticky + sticky.innerHeight()));
        if (!sticky.find('li').eq(0).hasClass('active')) {
          height = heightSticky + sticky.innerHeight();
        }
        $('html, body').animate({
          scrollTop: top - height + heightSticky
        });
      }, 500);
    }
  }
  //Active link when scroll
  function checkActiveLink() {
    var sticky = $('.sticky-nav'),
        liItem = sticky.find('a', 'li'),
        heightSticky = sticky.outerHeight(true),
        height = (sticky.hasClass('affix-top') ? heightSticky : (heightSticky + sticky.innerHeight())),
        $window = $(window);

    if (sticky.length) {
      $('section').each(function(index){
        var el = $(this),
            item = liItem.filter('[href="#'+el.attr('id')+'"]');

        if($window.scrollTop() + $window.height() == $(document).height() || 
          $window.scrollTop() >= el.offset().top - height) {
          item.closest('li').addClass('active').siblings().removeClass('active');
        }
      });
    }
  }
  // login menu on mobile 
  function menuLogin() {
    var blockLogin = $('.block-login'),
        btn = blockLogin.find('button'),
        menu = $('.navbar-toggle'),
        buttonSearch = $('.navbar-form #toggle-search');
    if (isMobile.phone) {
      btn.on('click', function () {
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
      });
    }
  }
  // 
  function calcLogin() {
    var blockLogin = $('.block-login'),
        listItem = blockLogin.find('.list-unstyled');

    if(windowHeight < windowWidth){
      listItem.css('height', windowHeight - $('.navbar-header').height());
    } else {
      listItem.css('height', 'auto');
    }
  }
  //
  function clickItemMenu() {
    var main = $('.mainnav');
        item = main.find('li');

    item.on('click', function () {
        var el = $(this),
            height = calcAllDivHeight(el);

        if(windowHeight > windowWidth && !isMobile.phone && el.find('.submenu-level1 > ul').length){    
          el.find('.submenu-level1 > ul').css('min-height', height + 20);
        }
    });
  }
  //
  function calcAllDivHeight(el) {
    var totalHeight = 0;

    el.find('.side-bar > div').each(function () {
      totalHeight += $(this).outerHeight(true);
    });
    return totalHeight;
  }
});

function opennavpopup(url,width,height){
  window.open(url,'Bodyframe','toolbar=no,directories=no,scrollbars=yes,resizable=no, menubar=no,location=no,width='+width+',height='+height+',maximize=no,minimize=no,top=50,left=50');
}

function openpibnewpopup_top(){
  window.open('http://www.uob.com.sg//personal/ebanking/pib/assets/demo/index_2.html','Bodyframe','toolbar=no,directories=no,scrollbars=yes,resizable=no, menubar=no,location=no,width=800,height=600,maximize=no,minimize=no');
}
