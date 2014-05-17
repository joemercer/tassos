var $ = require('jquery');

$(function(){
	"use strict";

	var $window = $(window);

	// # Nav
	// - fixes the nav to the top of the screen
	// _______


	var $nav = $('.nav-container');
	var fixNavTrigger = $nav.offset().top;
	$window.scroll(function(){
    if ($window.scrollTop() >= fixNavTrigger){
			if (!$nav.hasClass('fixed')) {
				$nav.addClass('fixed');
			}
    }
    else{
			if ($nav.hasClass('fixed')) {
				$nav.removeClass('fixed');
			}
    }
	});


});