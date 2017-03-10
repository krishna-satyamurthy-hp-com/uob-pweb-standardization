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
            gridContent = el.parents('.grid-content'),
            boxContent = el.parents('.image-item-wrap-box');

          if(boxContent.length > 0){
            gridContent = boxContent;
          }
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
            isCollapseBlockTop = el.parents('.image-item-wrap-box').length,
            hasActive = $('.active', that.element).length,
            gridContent = el.parents('.grid-content'),
            boxContent = el.parents('.image-item-wrap-box'),
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
          } else if (isCollapseBlockTop) {
            dCheckPoint = boxContent.offset().top - 70;
            if(collapseEl.is(':hidden') && hasActive) {
              $('.active', that.element).removeClass('active');
              $('.collapse:visible', that.element).slideUp(400);
              clearTimeout($.data(this, 'timer'));
              $.data(this, 'timer', setTimeout($.proxy(function(){
                collapseEl.slideDown(600);
                boxContent.addClass('active');
              }, this), 400));
            } else if(hasActive) {
              $('.active', that.element).removeClass('active');
              $('.collapse:visible', that.element).slideUp(400);
            } else {
              collapseEl.slideDown(600);
              gridContent.addClass('active');
              boxContent.addClass('active');
            }

          }
          else {
            console.log('deungger');
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
$(document).ready(function () {
    formulaProductDetail();
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

});

$(window).load(function () {
    
});

