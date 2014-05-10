// var App = require('./start');
// var app = new App();
// app.start();

var $ = require('jquery');

$(function(){
	"use strict";
	$('img').click(function(){
		window.App.router.navigate('blog', {trigger: true});
	});

	var $window = $(window);

	// # Nav
	// - fix the nav

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
