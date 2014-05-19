var $ = require('jquery');

$(function(){
	"use strict";

	var $window = $(window);

	// # Nav
	// - fixes the nav to the top of the screen
	// _______

	var $nav = $('.nav-container');
	var fixNavTrigger = $nav.offset().top - 7;

	var $intro = $('#intro');
	var introMarginBottom = parseInt($intro.css('margin-bottom'));
	var navHeight = $nav.outerHeight() + parseInt($nav.css('margin-bottom'));

	$window.scroll(function(){
    if ($window.scrollTop() >= fixNavTrigger){
			if (!$nav.hasClass('fixed')) {
				$nav.addClass('fixed');
				$intro.css('margin-bottom', introMarginBottom + navHeight + 'px');
			}
    }
    else{
			if ($nav.hasClass('fixed')) {
				$nav.removeClass('fixed');
				$intro.css('margin-bottom', introMarginBottom + 'px');
			}
    }
	});

	// # Toggle the nav
	// _______________

	$('.toggle-nav').click(function(e){
		$nav.children('.nav').toggleClass('hide');

		// need display block on the list items
		// and margin top 50px
		// when there isn't enough horizontal room
	});

	// # Hover Links
	// _______________

	var colors = [
		'yellow',
		'amber',
		'orange',
		'sunset',
		'red',
		'fuchsia',
		'purple',
		'indigo',
		'blue',
		'aqua',
		'green',
		'lime'
	];

	var $links = $('.hover-link');

	$links.mouseenter(function(e){
		var $target = $(e.target).closest('.hover-link');
		var i = Math.floor(11.1111111 * Math.random());
		$target.addClass(colors[i]);
	});

	$links.mouseleave(function(e){
		var $target = $(e.target).closest('.hover-link');
		_($target.attr('class').split(/\s+/)).forEach(function(i){
			if (_(colors).contains(i)) {
				$target.removeClass(i);
			}
		});
	});


});