$(function () {
  // Top slider
  $(window).on('resize', function () {
    $('.list-slides').css('height', (810 * $(document).width() / 1920) | 0)
  });
  $('.list-slides')
    .css('height', (810 * $(document).width() / 1920) | 0)
    .flexslider({
      animation: 'slide',
      animationLoop: true,
      controlNav: true,
      directionNav: true,
      slideshow: true,
      pauseOnHover: true,
      manualControls: '.list-slide-nav li',
      namespace: 'list-slide-'
    });

  // Adjust list item margin
  $(window).on('resize', function () {
		var width = $('.list-items').width(),
		perWidth = 320,
		count = width / perWidth,
		perLine = Math.min(count | 0, 4),
		margin = (((width / perLine - perWidth) | 0) / 2) | 0;
		$('.list-item').css({'margin-left': margin,'margin-right': margin});
		if(typeof(istablet)!='undefined' && istablet == 1){
			var tblist = $(".list-item")
			var d = margin*0.9
			for(var i = 0; i<tblist.length; i++){
				if(i%3==0)	tblist.eq(i).css({'margin-left': margin+d,'margin-right': margin-d})
				if(i%3==2)	tblist.eq(i).css({'margin-left': margin-d,'margin-right': margin+d})
			}
		}
	   
  });

  var cls_filter = 'list-filter-val-selected',
    cls_compare = 'list-item-compare-selected',
    buyTimeout,
    tooltip;
  function toggleNoResultTooltip(show) {
    //var tooltip = $('#cbg-main .list-filter-noresult-tooltip');
    //show ? tooltip.fadeIn() : tooltip.fadeOut();
  }
  function wpjam_get_query_string(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);console.log("r:"+r)
	if (r!=null){
	   return unescape(r[2]);
	}else{
	   return '';
	}
}
var isCor = 0;
  $(document)
    .on('click', '.list-filter-toggle', function (e) {
      $('.list-filter-menus').slideToggle();
      toggleNoResultTooltip(false);
      e.stopPropagation();
    })
    .on('click', '.list-filter-val', function (e) {
      $(this).toggleClass(cls_filter);
    })
    .on('click', '.list-item-compare', function (e) {
      var $compareText = $(this).find('.compare-text');
      if ($(this).hasClass(cls_compare)) {
        $(this).removeClass(cls_compare);
        $compareText.text($compareText.data('compare-text'));
        $(document).trigger('compare', [false, e.target]);
      } else {
        if ($('.list-compare-body').find('.list-compare-item').length >= 3) {
          if (tooltip) {
            tooltip.hide();
          }
          tooltip = $(this).siblings('.list-item-compare-tooltip').show();
          e.stopPropagation();
          return;
        }
        $(this).addClass(cls_compare);
        $compareText.attr('data-compare-text', $.trim($(this).text()));
        $compareText.text($compareText.data('cancel-text'));
        $(document).trigger('compare', [true, e.target]);
      }
    })
	.on('click', '[data-pros-id]', function (e) {
	    isCor = 1;
		if(isCor==1){
			var query_sid = wpjam_get_query_string('sid');
			var btnId = $(this).attr("data-pros-id");
			console.log("data-pro-id:"+btnId);
			//alert("erwq")
			_paq.push(['trackLink',btnId, 'link', query_sid]);
		}
    })
    .on('click', function () {
      toggleNoResultTooltip(false);
      if (tooltip) {
        tooltip.hide();
      }
    })
    .on('click', '.list-compare-cancel', function (e) {
      var dDocName = $(this).closest('.list-compare-item').remove().attr("dDocName");
      $('.list-items').find('[ddocname="' + dDocName + '"] .list-item-compare').click();
      var compare = $('.list-compare-body').children('.list-compare-item').length;
      $('.list-compare-btn')[compare > 1 ? "show" : "hide"]();
      $('.list-compare')[compare ? 'show' : 'hide']();
      scroll();
      e.preventDefault();
    })
    .on('compare', function (e, add, target) {
      target = $(target).closest('.list-item');
      var dDocName = target.attr("dDocName");
      if (!add) {
        $('.list-compare').find('[dDocName="' + dDocName + '"]').remove();
      } else {
        //$('<div class="list-compare-item" data-class="' + target.data('class') + '"><a class="list-compare-cancel" href="#">&nbsp;</a>' +
        $('<div class="list-compare-item" dDocName="' + dDocName + '"><a class="list-compare-cancel" href="#">&nbsp;</a>' +
              '<img src="' + target.find('.list-item-image').prop('src') + '"/>' +
              '<div class="list-compare-name"><div class="list-compare-mask"></div><div class="list-compare-pname">' + target.find('.list-item-title').html() +
              '</div></div>' + '</div>'
            ).attr("dDocName", dDocName).appendTo('.list-compare-body');
      }
      var compare = $('.list-compare-body').children('.list-compare-item').length;

      if (compare > 1) {
        $('.list-compare-btn').show();
      } else {
        $('.list-compare-btn').hide();
      }
      $('.list-compare')[compare ? 'show' : 'hide']();
      scroll();
    })
   .on('mouseenter', '.list-item-images', function (e) {
     $(this).find('.list-item-image').stop(true, true).css('opacity', 1).animate({
       opacity: 0
     }, 1000)
       .parent().siblings().find(".list-item-bg").stop(true, true).css('opacity', 0).animate({
         opacity: 1
       }, 1000);
     e.stopPropagation();
   })
    .on('mouseleave', '.list-item-images', function (e) {
      $(this).find('.list-item-image').stop(true, false).animate({
        opacity: 1
      }, 1000)
        .parent().siblings().find(".list-item-bg").stop(true, false).animate({
          opacity: 0
        }, 1000);
      e.stopPropagation();
    })
    .on('mouseenter', '.list-item-buy', function (e) {
      clearTimeout(buyTimeout);
      var $buyIcon = $(this);
      buyTimeout = setTimeout(function () {
        $(e.target).closest('.list-item-footer').find('.list-item-place').show();
        $buyIcon.addClass('cbg-icon-cart-large active');
      }, 200);
      e.stopPropagation();
    })
    .on('mouseleave', '.list-item-footer', function (e) {
      clearTimeout(buyTimeout);
      $(this).find('.list-item-place').hide();
      $(this).find('.list-item-buy').removeClass('cbg-icon-cart-large active');
      e.stopPropagation();
    });

  var buyItem;
  $(document).on('mouseenter', '.list-slide-buy-toggle', function (e) {
    if (buyItem) {
      buyItem.stop(true, false).fadeOut();
    }
    buyItem = $(e.target).siblings('.list-slide-buy-item').stop(true, false).fadeIn();
    e.stopPropagation();
  })
  .on('mouseleave', '.list-slide-btn', function (e) {
    if (buyItem) {
      buyItem.fadeOut();
    }
  });

  // Selected items panel
  var scrollTimeout,
	$list = $('.list-items'),
	$compare = $('.list-compare'),
	listOffset,
	listHeight,
	breadcumbHeight = $('.list-main .cbg-nav').height(),
	mainNavHeight = $('#cbg-main-nav-wrapper').height();
  $(window).on('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(scroll, 300);
  }).on('resize', function () {
    listOffset = $list.offset();
    listHeight = $list.height();
  }).trigger('resize');

  function scroll() {
    var t = 0;
    var st = (document.body.scrollTop || document.documentElement.scrollTop);
    var oft = $list.offset().top;
    var t = Math.max(st - oft + breadcumbHeight + mainNavHeight, 0);
    if (t + $compare.height() > listHeight) {
      t = listHeight - $compare.height();
    }
    $compare.stop(true, true).animate({ 'margin-top': t }, 500);
  }
});

