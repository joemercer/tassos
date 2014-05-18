var $ = require('jquery');

$(function(){
	"use strict";

	var $window = $(window);

	// # Nav
	// - fixes the nav to the top of the screen
	// _______



	var $nav = $('.nav-container');
	var fixNavTrigger = $nav.offset().top;

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


});