var init = function() {
	for (var i = 1; i < chapters.size(); i ++) {
		var chp = chapters[i];
		// chp.hidden = true;
		// img.css("display", "none");
	}

	document.onscroll = function () {
        var p = $(window).scrollTop();
        console.log(p + ":scroll:" + scroll_position + ":" + curr_index);
        if ((p == scroll_position + 40 || p == scroll_position + 100) && curr_index < 5) {
        	curr_index = curr_index + 1;
        	$('html, body').animate({
        		scrollTop: $("#chapter" + curr_index).offset().top
        	}, 400);
        } else if ((p == scroll_position - 40 || p == scroll_position - 100) && curr_index > 1) {
        	curr_index = curr_index - 1;
        	$('html, body').animate({
        		scrollTop: $("#chapter" + curr_index).offset().top
        	}, 400);
        }
        scroll_position = p;
	};
};