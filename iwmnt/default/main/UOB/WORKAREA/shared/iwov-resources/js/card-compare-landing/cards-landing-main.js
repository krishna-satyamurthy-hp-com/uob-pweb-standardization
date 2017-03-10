$(document).ready(function() {
    $('body').addClass('cards-landing-page');
    initMoreThanJustCardsBlock
});
var windowWidth = $(window).width(),
    windowHeight = $(window).height();
var resizeMainWindow = function() {
    var windowWidthNew = jQuery(window).width();
    var windowHeightNew = jQuery(window).height();
    if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
        windowWidth = windowWidthNew;
        windowHeight = windowHeightNew;
        initMoreThanJustCardsBlock();
    }
};
$(window).bind('resize', resizeMainWindow);

function initMoreThanJustCardsBlock() {
    if($('.image-item-wrap').length > 0){
        $('.image-item-wrap').css('height', 'auto');
        $('.image-item-wrap .content-text').css('height', 'auto');
        $('.image-item-wrap .img-wrapper').css('height', 'auto');
            
        // reset height card
        if(!isMobile.phone||$(window).width()>767){
            $('.image-item-wrap .content-text').setAllToMaxOuterHeight();
            $('.image-item-wrap .img-wrapper').setAllToMaxOuterHeight();
        }
    }
}

$.fn.setAllToMaxOuterHeight = function() {
    return this.outerHeight(Math.max.apply(this, $.map(this, function(e) {
        return $(e).outerHeight();
    })));
};