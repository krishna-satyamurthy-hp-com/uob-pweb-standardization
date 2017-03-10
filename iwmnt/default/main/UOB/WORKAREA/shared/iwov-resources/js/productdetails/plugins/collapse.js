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
      console.log(1);
      var that = this,
        collapseBody = this.element.find('.collapse'),
        collapseNav = this.element.find('.collapse-nav');

      if(isMobile.phone) {
        var collapseID;
        this.element.on('click','.collapse-nav', function(e) {
          e.preventDefault();
          collapseID = $(this).attr('href');
          var el = $(this),
              collapsehash = that.element.find(collapseID),
              gridContent = el.parents('.grid-content'),
              timmer = null,
              collapseContent = that.element.find(collapseID).clone(),
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
        this.element.on('click','.collapse-nav', function(e) {
          e.preventDefault();
          var el = $(this),
              collapseID = el.attr('href'),
              collapsehash = that.element.find(collapseID),
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
        // collapseBody.on('click', '.collapse-nav', function () {
        //   var el = $(this),
        //       collapse = el.parents('.collapse');
        //   this.element.find('.grid-content').removeClass('active');
        //   if(collapse.is(':visible')) {
        //     collapse.slideUp('slow');
        //   }
        // });
      } // end desktop
    }
  };

  $.fn[pluginName] = function(options, params) {
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
