var slide_value = 10000;

var credit;
var debit;
var total_spend;
var salary;
var transaction;

var interest_earned = 0;
var bonus_interest = 1216;
var total_interest = 0;

var cash_rebate = 0;
var add_cash_rebate = 0;
var total_cash_rebate = 0;

var total = 0;

var tickLabel;
var interactiveSlider;

$(function () {
// 	$('.how-it-works .default').hover(function() {
// 		$(this).addClass('active');
// 		$(this).children('td').eq(1).css('background', 'url("/assets/common/images/2013/deposits/bg_how_sharp.png") #5ca8d7 no-repeat');
// 		$(this).siblings().removeClass('active');
// 	}, function(){
// 		$('.how-it-works .default').removeClass('active');
// 		$(this).children('td').eq(1).css('background', '#e2e2e2');
// 	});
//

    $('.cal-text').on('keyup change', function () {
        credit = $('#credit-spend').val();
        debit = $('#debit-spend').val();
        salary = $('#salary-amt').val();
        transaction = $('#transaction').prop('checked');

        interest_savings(slide_value);
    });
});

function formulaProductDetail() {
    credit = $('#credit-spend').val();
    credit = parseInt(credit);
    debit = $('#debit-spend').val();
    debit = parseInt(debit);
    salary = $('#salary-amt').val();
    transaction = $('#transaction').prop('checked');
    total = $('#tot-int-cash-rebate').html(),
        tickLabel = ['10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k'],
        interactiveSlider = 'txt-interactive-d';

    if (isMobile.phone) {
        tickLabel = ['10k', '50k'];
        interactiveSlider = 'txt-interactive-m';
    }

    $('#' + interactiveSlider).slider({
        ticks_labels: tickLabel,
        tooltip: 'always',
        step: 5,
        formatter: function (value) {
            value = value * 1000;
            slide_value = value;
            transaction = $('#transaction').prop('checked');
            interest_savings(value);
            return value / 1000 + "k";
        }

    });


}

function interest_savings(ui) {
    interest_earned = ui * 0.0005;
    bonus_interest = 0;

    if (debit == '') {
        debit = 0;
    } else {
        debit = parseInt(debit);
    }

    if (credit == '') {
        credit = 0;
    } else {
        credit = parseInt(credit);
    }

    total_spend = credit + debit;
    if (total_spend >= 500) {
        giro_interest_rebate(ui);
    } else {
        bonus_interest += interest_earned;
        total_interest = bonus_interest;
    }

    if (credit >= 2000) {
        cash_rebate = 300 * 4;
        total_interest = bonus_interest;
        total_cash_rebate = cash_rebate;
        total = total_interest + total_cash_rebate;
    } else if (credit >= 1000) {
        cash_rebate = 100 * 4;
        total_interest = bonus_interest;
        total_cash_rebate = cash_rebate;
        total = total_interest + total_cash_rebate;
    } else if (credit >= 500) {
        cash_rebate = 50 * 4;
        total_interest = bonus_interest;
        total_cash_rebate = cash_rebate;
        total = total_interest + total_cash_rebate;
    } else {
        total_interest = bonus_interest;
        total_cash_rebate = 0;
        total = total_interest + total_cash_rebate;
    }

    $('#oa-int').html("S$" + commaSeparateNumber(total_interest.toFixed(2)));
    $('#oc-cash-rebate').html("S$" + commaSeparateNumber(total_cash_rebate.toFixed(2)));
    $('#tot-int-cash-rebate').html("S$" + commaSeparateNumber(total.toFixed(2)));
}
function giro_interest_rebate(ui) {
    if (salary >= 2000 || transaction == true) {
        switch (ui) {
            case 10000:
                bonus_interest = 150;
                break;
            case 15000:
                bonus_interest = 250;
                break;
            case 20000:
                bonus_interest = 350;
                break;
            case 25000:
                bonus_interest = 450;
                break;
            case 30000:
                bonus_interest = 550;
                break;
            case 35000:
                bonus_interest = 716.5;
                break;
            case 40000:
                bonus_interest = 883;
                break;
            case 45000:
                bonus_interest = 1049.5;
                break;
            case 50000:
                bonus_interest = 1216;
                break;
        }
        // console.log("transaction true", bonus_interest);
    } else {
        switch (ui) {
            case 10000:
                bonus_interest = 100;
                break;
            case 15000:
                bonus_interest = 175;
                break;
            case 20000:
                bonus_interest = 250;
                break;
            case 25000:
                bonus_interest = 325;
                break;
            case 30000:
                bonus_interest = 400;
                break;
            case 35000:
                bonus_interest = 500;
                break;
            case 40000:
                bonus_interest = 600;
                break;
            case 45000:
                bonus_interest = 700;
                break;
            case 50000:
                bonus_interest = 800;
                break;
        }

    }
}

function base_interest(ui) {

}
function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}
// rebate-calc

var item_p = 0;
var item_g = 0;
var item_d = 0;
var item_r = 0;
var item_o = 0;
var total = 0;
var rebate = 0;
var interest = 0;


function rebate_calc() {
    item_p = $('#item-petrol').val();
    item_p = parseFloat(item_p) || 0;
    item_g = $('#item-groceries').val();
    item_g = parseFloat(item_g) || 0;
    item_d = $('#item-dining').val();
    item_d = parseFloat(item_d) || 0;
    item_r = $('#item-bill-payment').val();
    item_r = parseFloat(item_r) || 0;
    item_o = $('#item-other-spend').val();
    item_o = parseFloat(item_o) || 0;

    total = item_p + item_g + item_d + item_r + item_o;

    if (total >= 2000) {
        rebate = 1200;
        interest = 'and up to 3.33% interest p.a. on savings<br class="hidden-xs" />in UOB One Account<sup>^</sup>';
    } else if (total >= 1000) {
        rebate = 400;
        interest = 'and up to 3.33% interest p.a. on savings<br class="hidden-xs" />in UOB One Account<sup>^</sup>';
    } else if (total >= 500) {
        rebate = 200;
        interest = 'and up to 3.33% interest p.a. on savings<br class="hidden-xs" />in UOB One Account<sup>^</sup>';
    } else {
        rebate = 0;
        interest = '';
    }

    $('#total-spend').html('S$' + commaSeparateNumber(total));
    $('#cash-rebate').html('S$' + commaSeparateNumber(rebate));
    $('#interest').html(interest);
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}


var firstHrefNav;


function initScrollLeft(){
    var stickyNav = $('.sticky-nav ul'),
        stickyNavLi = $('.sticky-nav ul li'),
        scrollLeft = 0;

    if (!stickyNav.hasScrollBarX()) {
    } else {
        stickyNavLi.each(function (idx, el) {
            var el = $(this),
                elIdx = el.index(),
                elWidth = el.width();


            stickyNavLi.eq(elIdx).attr('data-scroll-left-index', scrollLeft);
            scrollLeft += elWidth
        });

        $(window).scroll(function () {
            clearTimeout($.data(this, "scrollCheck"));
            $.data(this, "scrollCheck", setTimeout(function () {
                var heading = $('.nav-heading');
                var navActive = $('.nav-heading li.active');
                tabScrollLeft(navActive, heading.width()/heading.children().length);
            }, 250));
        });
    }
}
function getFirstStickyNav(){
    var listStickyNav = $('.sticky-nav ul li');

    firstHrefNav = $(listStickyNav.get(0)).find('a').attr('href');
}

function tabScrollLeft(el, item){
    var stickyNav = $('.sticky-nav ul'),
        scrollLeft = el.attr('data-scroll-left-index');

    if(stickyNav.hasScrollBarX()){
        stickyNav.animate({scrollLeft: scrollLeft - item}, 500);
        // stickyNav.scrollLeft(scrollLeft);
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
        $('.section-title').each(function(){
            var el = $(this),
                item = liItem.filter('[href="#'+el.attr('id')+'"]');

            if($window.scrollTop() + $window.height() === $(document).height() ||
                $window.scrollTop() >= el.offset().top - height) {
                item.closest('li').addClass('active').siblings().removeClass('active');
            }
        });

    }
}

function hashtoFixed() {
    var headingNav = $('.nav-heading');
    headingNav.off('click.scr', 'li').on('click.scr', 'li', function (e) {
        var el = $(this),
            href = el.find('a').attr('href'),
            target = $(el.find('a').attr('href')),
            heading = target.find('> .heading2'),
            navbar = $('.sticky-nav'),
            heightSticky = navbar.outerHeight(true),
            top = navbar.height(),
            marTop = parseInt($('.sticky-nav').css('margin-top').replace('px',"")),
            opOffset = 60,
            firstTop = 0;

        e.preventDefault();
        heading.attr('tabindex', '1'); // Web Accessibility
        if(top === null || top === 0 || undefined) { top = 0; }

        if(!(navbar).hasClass('affix')) {
            top+=top + (navbar.outerHeight(true) - navbar.innerHeight());
        }

        var plustop = (navbar.hasClass('affix-top') ? heightSticky : 0);
        // top += $('.affix + #overview').css('padding-top');

        if(!el.hasClass('active')) {

            if (href == firstHrefNav) {
                firstTop = heightSticky;
            }
            $('html, body').stop().animate({
                // scrollTop: (target.offset().top) - top + plustop + firstTop
                scrollTop: (heading.offset().top) - headingNav.outerHeight(true) - 25
            }, 600, function () {
                // Web Accessibility
                document.activeElement.blur();
                heading.focus();
            });
        } else {
            if (href == firstHrefNav) {
                firstTop = heightSticky - opOffset;
            }
            
            $('html, body').stop().animate({
                scrollTop: (target.offset().top) - top + firstTop
            }, 600, function () {
                // Web Accessibility
                document.activeElement.blur();
                heading.focus();
            });

        }

        el.addClass('active').siblings().removeClass('active');

        window.location.hash = el.find('a').attr('href');

        tabScrollLeft(el, headingNav.width()/headingNav.children().length);
    });
}

function scrollTopItemFixed() {
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
            liItem
                .closest('li')
                .addClass('active')
                .siblings()
                .removeClass('active');
        }

        if (hashItem == firstHrefNav) {
            setTimeout(function() {
                var height = (sticky.hasClass('affix-top') ? heightSticky : (heightSticky + sticky.innerHeight()));
                if (!sticky.find('li').eq(0).hasClass('active')) {
                    height = heightSticky + sticky.innerHeight();
                }
                $('html, body').animate({
                    scrollTop: item.get(0).offsetTop - height
                });
            }, 600);

        }

    }
}



// end functions
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

$.fn.hasScrollBarX = function() {
    if(this.length > 0) {
        return this.get(0).scrollWidth > this.width();
    } else {
        return false;
    }

};

$.fn.stopScroll = function( options ) {
    options = $.extend({
        delay: 250,
        callback: function() {}
    }, options);

    return this.each(function() {
        var $element = $( this ),
            element = this;
        $element.scroll(function() {
            clearTimeout( $.data( element, "scrollCheck" ) );
            $.data( element, "scrollCheck", setTimeout(function() {
                options.callback();
            }, options.delay ) );
        });
    });
};

$(document).ready(function () {
    formulaProductDetail();
    initScrollLeft();

    $('.item-input').on('focusin', function (e) {
        if ($(this).val() <= 0) {
            $(this).val('');
        }
    });
    $('.item-input').on('focusout', function (e) {
        if ($(this).val() == '' || $(this).val() <= 0) {
            $(this).val(0);
        } else {
            $(this).val(parseFloat($(this).val(), 10));
        }
    });

    $('#calculate-btn').on('click', function (e) {
        var el = $(this),
            recalText = el.data('retext'),
            curText = el.text(),
            totalPart = $('#calculate-cash-rebate .total'),
            display = $('#calculate-cash-rebate .total').css('display');

        e.preventDefault();

        if (display == 'inline-block' || display == 'block') {
            totalPart.slideUp();
            $(".item-input").prop('disabled', false);
        } else {
            totalPart.slideDown();
            $(".item-input").prop('disabled', true);
        }
        el.text(recalText).attr('title', recalText);
        el.data('retext', curText);

        rebate_calc();
    });

    $('.btn_recalculate').on('click', function (e) {
        e.preventDefault();

        $('.btn_calculate').css('display', 'block');
        $('.btn_recalculate').css('display', 'none');
        $('.result').css('display', 'none');
        $(".item-input").prop('disabled', false);
    });

    $(window).load(function () {
        getFirstStickyNav();
        hashtoFixed();
        scrollTopItemFixed();
    });


    $(window).scroll(function(){
        checkActiveLink();
    });
    
});


