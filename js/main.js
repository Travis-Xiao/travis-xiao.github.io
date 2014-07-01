var images;
var para;
var chapters;
var curr_index = 1;
var scroll_position = 0;
$(document).ready(function() {
	var h = window.innerHeight - 18;
	var w = window.innerWidth;
	$.notify("Scroll or press up/down", "success", 
		{	position:"top",
			autoHideDelay: 1000,
			showAnimation: 'slideDown',
			// show animation duration
			showDuration: 40,
			// hide animation
			hideAnimation: 'slideUp',
			// hide animation duration
			hideDuration: 20,
			});
	chapters = $(".chapter");
	para = $(".headline");
	scroll_position = $(window).scrollTop();
	var div_height = window.innerHeight;
	// curr_index = scroll_position / div_height + 1;
	init();
});