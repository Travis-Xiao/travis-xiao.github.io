var images, images_div;
var current_id = 400;
// total images amount
var images_count = 0;
var t = 0;
var c = 0;
var period = 5000;
// current comment page number
var current_page = 0;

$(document).ready(function() {
    images_div = $('.roundabouts');

	// load image names and paths
    $.getJSON("images.json",
        function(data) {
            images = data.images;
            $.each(data.images, function(i, item) {
				
				// dynamically create image tags and append to image list
                var img = $("<img/>").attr({
                    "src": item.path
                });
                var anchor = $('<a/>').append(img).attr({
                    href: "#"
                });
                $("<li/>").attr({
                    // text: item.name,
                    class: "image"
                }).append(anchor).appendTo(images_div);
                images_count++;
            });
			
			// set the first image as visible
            $(images_div.children()[0]).addClass('active');
			// start the image loop
            c = setInterval(carousel, period);
		}
	);
	// load comments
    load_comments("comments_0.json");
	// add listeners
	add_listeners();
});

var add_listeners = function () {
	// the mask is visible when the mouse is hovering
	$('.left-mask').mouseup(function() {
		clearInterval(c);
		alternate(current_id, --current_id, false);
		c = setInterval(carousel, period);
	});
	$('.right-mask').mouseup(function() {
		clearInterval(c);
		alternate(current_id, ++current_id, false);
		c = setInterval(carousel, period);
	});
	// add listeners to control the comment page turning
	$('.first-page').click (function() {
		load_comments("comments_0.json");
		current_page = 0;
	});
	$('.last-page').click (function() {
		load_comments("comments_2.json");
		current_page = 2;
	});
	$('.prev-page').click (function() {
		console.log(current_page);
		if (current_page > 0)
			load_comments("comments_" + (-- current_page) + ".json");
	});
	$('.next-page').click (function() {
		console.log(current_page);
		if (current_page < 2)
			load_comments("comments_" + (++ current_page) + ".json");
	});
	// the image title is visible when hovering the image
	var title_height = '40px';
	$('.control').mouseenter(function() {
		$('.image-title').animate({
			"margin-top":"40px"
		}, 800, function() {});
	});
	$('img').mouseenter(function() {
		$('.image-title').animate({
			"margin-top":"40px"
		}, 800, function() {});
	});
	$('.control').mouseout(function() {
		$('.image-title').animate({
			"margin-top":'0px'
		}, 800, function() {});
	});
	$('img').mouseout(function() {
		$('.image-title').animate({
			"margin-top":'0px'
		}, 800, function() {});
	});
}
// load comments from server asynchronously 
var load_comments = function (JSON_file) {
	var u = $('.comments').empty();
	$.getJSON(JSON_file, 
		function (data) {
			$.each(data.comments, function(i, item) {
				var content = $('<p/>');
				content[0].innerText = item.content;
				content.attr({
					class: 'note',
					display: 'inner-block'
				});
				var user = $('<p/>');
				user[0].innerText = item.user;
				user.attr({
					class: 'user',
					display: 'inner-block',
					float: 'left'
				});
				$('<li/>').attr({
					class: "comment"
				}).append(user).append(content).appendTo(u);
			});
		}
	);
}

var carousel = function() {
    //console.log(current_id + ": " + images_count);
    alternate(current_id, ++current_id, true);
}

// change the currently focused image
var alternate = function(id1, id2, is_infinite) {
    var o = $(images_div.children()[id1 % images_count]);
    var i = $(images_div.children()[(id2) % images_count]);
    o.fadeOut(1000, function() {
        o.removeClass('active');
        i.addClass('active');
        i.fadeIn(400);
    });
}