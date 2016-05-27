$(function() {
	(function() {
		var $navcur = $(".nav-current");
		var $nav = $("#nav");
		var current = ".current";
		var crt = $(".current");
		var itemW = $nav.find(current).innerWidth(); //默认当前位置宽度
		var defLeftW = $nav.find(current).position().left; //默认当前位置Left值
		//添加默认下划线
		$navcur.width(itemW);
		$navcur.css({
			"left": defLeftW
		});

		$nav.find("a").hover(function() {
			var index = $(this).index(); //获取滑过元素索引值
			var leftW = $(this).position().left; //获取滑过元素Left值
			var currentW = $nav.find("a").eq(index).innerWidth(); //获取滑过元素Width值
			$navcur.stop().animate({
				left: leftW,
				width: currentW
			}, 300);
		}, function() {
			$navcur.stop().animate({
				left: defLeftW,
				width: itemW
			}, 300)
		})
	})();

	$(window).scroll(function() {
		//获取窗口已滚动的高度
		var windowScrollTop = $(window).scrollTop();
		var oTools = $("#gotop");
		//如果大约240PX，就渐显出“回到顶部”，否则即隐藏
		if (windowScrollTop > 240) {
			oTools.fadeIn();
		} else {
			oTools.fadeOut();
		}
	});
	$("#gotop").click(function() {
		//点击“回到顶部”，滚动到顶部，并带动画效果
		$("html,body").animate({
			scrollTop: 0
		}, 300);
	});
});