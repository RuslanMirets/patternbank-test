const swiperMasks = new Swiper(".preview-masks", {
	loop: true,
	spaceBetween: 10,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
});
const swiperArea = new Swiper(".preview-area", {
	loop: true,
	spaceBetween: 10,
	allowTouchMove: false,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	thumbs: {
		swiper: swiperMasks,
	},
});

const patternbank = () => {
	const imageContainer = $(".image-control-holder");
	const zoomSlider = $(".range-slider");

	zoomSlider.on("input change", function (e) {
		var zoomVal;
		zoomVal = $(this).val();
		return imageContainer.find(".pattern-background-image").css({
			"background-size": "" + zoomVal + "%",
		});
	});

	imageContainer.on("mousedown touchstart", function (e) {
		var containerSize,
			elepos,
			mousedown,
			patternBackground,
			patternBackgroundWidth,
			zoomLevel;
		e.preventDefault();
		patternBackground = $(this).find(".pattern-background-image");
		patternBackgroundWidth = patternBackground.width();
		mousedown = {
			x: e.originalEvent.pageX || e.originalEvent.touches[0].pageX,
			y: e.originalEvent.pageY || e.originalEvent.touches[0].pageY,
		};
		elepos = {
			x: parseFloat(
				patternBackground
					.css("backgroundPosition")
					.split(" ")[0]
					.replace("%", ""),
			),
			y: parseFloat(
				patternBackground
					.css("backgroundPosition")
					.split(" ")[1]
					.replace("%", ""),
			),
		};
		zoomLevel = parseInt(zoomSlider.val());
		containerSize = parseInt(patternBackgroundWidth);
		$(document).on("mouseup touchend", function (e) {
			return $(document).unbind("mousemove touchmove");
		});
		return $(document).on("mousemove touchmove", function (e) {
			var actualMovePercentage, mousepos, movePercentage;
			mousepos = {
				x:
					e.originalEvent.pageX ||
					e.originalEvent.changedTouches[0].pageX ||
					mousedown.x,
				y:
					e.originalEvent.pageY ||
					e.originalEvent.changedTouches[0].pageY ||
					mousedown.y,
			};
			if (mousedown !== mousepos) {
				movePercentage = {
					x: (100 * (mousepos.x - mousedown.x)) / patternBackgroundWidth,
					y: (100 * (mousepos.y - mousedown.y)) / patternBackgroundWidth,
				};
				actualMovePercentage = {
					x: (1.8 / (1 - zoomLevel / 100)) * movePercentage.x,
					y: (1.8 / (1 - zoomLevel / 100)) * movePercentage.y,
				};
				patternBackground.css({
					"background-position":
						elepos.x +
						actualMovePercentage.x +
						"% " +
						(elepos.y + actualMovePercentage.y) +
						"%",
				});
			}
		});
	});
};
patternbank();
