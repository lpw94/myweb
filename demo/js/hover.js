$(function() {
	// Top slider
	// Adjust list item margin
	var o = $(".color-chooser label"), 
    i = $(".buy-panel__image-item.top"), 
    s = $(".buy-panel__image-item.bottom"), 
    a = $(".buy-panel__buy-button, .btn--buy-fixed");
    o.on("click", function() {
        var e = $("#" + this.htmlFor), 
        t = s.attr("src");
        i.attr({src: t}), i.show(), $(".color-chooser__selected-color").text(e.val()), s.attr("src", e.data("src")), i.fadeOut("fast"), a.attr("href", e.data("buy-href"))
    });
	var isCor = 0;
	$(document).on('mouseenter', '.list-item-images', function(e) {
			$(this).find('.list-item-image').stop(true, true).css('opacity', 1).animate({
					opacity: 0
				}, 1000)
				.parent().siblings().find(".list-item-bg").stop(true, true).css('opacity', 0).animate({
					opacity: 1
				}, 1000);
			e.stopPropagation();
		})
		.on('mouseleave', '.list-item-images', function(e) {
			$(this).find('.list-item-image').stop(true, false).animate({
					opacity: 1
				}, 1000)
				.parent().siblings().find(".list-item-bg").stop(true, false).animate({
					opacity: 0
				}, 1000);
			e.stopPropagation();
		})




});