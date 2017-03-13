$(document).ready(function() {
	$('body').addClass('funds-selector-page');
	// $('.selectpicker').selectpicker();

	var btnManifying = $('.btn-searchfilter'),
			btnManifyingClose = $('.btn-searchclose');
	btnManifying.on('click',function(){
		var $t = $(this),
				p = $t.parent(),
				i = p.find('input');
		if($(window).width()<768){
			//submit search for mobile layout
			unit_filter();
		}else{
			if($t.hasClass('active')){
				//submit search when input already show and close search input
				unit_filter();
				$t.removeClass('active');
				$t.parent().removeClass('open');
			}else{
				//show search input
				$t.addClass('active');
				$t.parent().addClass('open');
				i.focus();
			}
		}
	});
	btnManifyingClose.on('click',function(){
		$(this).parent().removeClass('open');
		btnManifying.removeClass('active');
	});

	//hover document icon
	$('button[data-toggle-hover="true"]').hover(function() { 
		$(this).parent().find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
	}, function() { 
		$(this).parent().find('.dropdown-menu').stop(true, true).delay(200).fadeOut().hover(function() {
			$(this).stop(true, true);
		},function(){
			$(this).stop(true, true).delay(200).fadeOut();
		});
	}); 

	//expanded-table
	$('.expanded-table').on('click','button[data-toggle="collapse"]',function(){
		var $t = $(this),
				tr = $t.parents('tr');
				tr.toggleClass('expanded');
	});
	//expand-all
	$('button[data-toggle="collapse-all"]').each(function(index,item){
		var $t = $(item),
				target = $t.attr('data-target'),
				div;
			if(target.indexOf('#')!==-1){
				div = $(target);
			}else{
				div = $('.'+target);
			}
			var buttons = div.find('button[data-toggle="collapse"]');
			div.on('shown.bs.collapse', function () {
				var btn_mirror = div.find('button[data-toggle="collapse"].collapsed');
				if(btn_mirror.length==0){
					$t.removeClass('collapsed');
					$t.text('Collapse all');
				}
			});
			div.on('hidden.bs.collapse', function () {
				var btn_mirror = div.find('button[data-toggle="collapse"].collapsed');
				if(btn_mirror.length==buttons.length){
					$t.addClass('collapsed');
					$t.text('Expand all');
				}
			});
			$t.bind('click',function(e){
				buttons = div.find('button[data-toggle="collapse"]');
				if($t.hasClass('collapsed')){
					buttons.each(function(index,item){
						//console.log(item);
						if($(item).hasClass('collapsed')){
							$(item).trigger('click');
						}
					});
					$t.removeClass('collapsed');
					$t.text('Collapse all');
				}else{
					$t.addClass('collapsed');
					$t.text('Expand all');
					buttons.each(function(index,item){
						//console.log(item);
						if(!$(item).hasClass('collapsed')){
							$(item).trigger('click');
						}
					});
				}
			});
	});

	//filter on mobile
	$('.mobile-switch').bind('click',function(e){
		var $t = $(this);
		$t.toggleClass('open');
		$t.parents('.filter-block').toggleClass('active');
	});
	//reset collaspe after filter
	$('.selectpicker', '.filter-control').on('change', function () {
		$('button[data-toggle="collapse-all"]').addClass('collapsed');
	});
});






