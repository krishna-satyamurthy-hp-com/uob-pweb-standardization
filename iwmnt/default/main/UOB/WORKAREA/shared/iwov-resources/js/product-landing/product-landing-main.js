$(document).ready(function() {
  $('body').addClass('product-landing');
  $("[data-scrollto]").on('click.scrollto', function(e){
    e.preventDefault();
    var cur = $(this),
        sticky = $('.sticky-nav'),
        heightSticky = sticky.outerHeight(true);

    setTimeout(function(){
      var element = $(cur.data('scrollto')),
          offset = element.parent('.tab-content').offset(),
          offsetTop = offset.top ;
        if(sticky.hasClass('affix')) {
          $('html, body').animate({
            scrollTop: offsetTop - heightSticky -10
          }, 600);
        }
    }, 400);
  });

  var maxLiHeight = 0;
  $('.sticky-nav li').each(function() {
    if ($(this).height() > maxLiHeight) maxLiHeight = $(this).height();
  });

  $('.sticky-nav li').each(function() {
    if ($(this).height() < maxLiHeight) $(this).height(maxLiHeight + "px");
  });
});