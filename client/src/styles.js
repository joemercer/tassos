var $ = require('jquery');

$(function(){
	"use strict";

	var $window = $(window);

	// # Nav
	// - when the nav covers the header, we reveal the same set of icons as part of the nav so that they can still be accessed
	// _______

	var $nav = $('.nav-container');

	var Nav = {
		$window: $window,
		$nav: $nav,
		navHeight: $nav.outerHeight(),
		navMarginTop: parseInt($nav.css('margin-top')),
		$navBuffer: $('.nav-fixed-buffer'),
		$header: $('.header .header-inner'),
		$headerCover: $('.header-cover'),
		setTrigger: function() {
			if (this.$nav.hasClass('fixed')) {
				this.trigger = this.$navBuffer.offset().top - this.navMarginTop;
			}
			else {
				this.trigger = this.$nav.offset().top - this.navMarginTop;
			}
		},
		maybeFixNav: function() {
			if (this.$window.scrollTop() >= this.trigger) {
				if (!this.$nav.hasClass('fixed')) {
					this.$nav.addClass('fixed');
					this.$navBuffer.removeClass('hide');
					this.$header.addClass('hide');
					this.$headerCover.removeClass('hide');
					this.$nav.find('.nav-inner-container').addClass('container');
				}
			}
			else {
				if (this.$nav.hasClass('fixed')) {
					this.$nav.removeClass('fixed');
					this.$navBuffer.addClass('hide');
					this.$header.removeClass('hide');
					this.$headerCover.addClass('hide');
					this.$nav.find('.nav-inner-container').removeClass('container');
				}
			}
		},
		toggleNav: function() {
			this.$nav.find('.nav').toggleClass('hide').promise().done(function(){
				// wait 50 ms for elements to un-hide
				window.setTimeout(function(){
					// !!! cache these yo
					$('.nav').toggleClass('opacity-hide');
					$('.nav-item').toggleClass('opacity-hide').toggleClass('active');
				}, 50);
			});
		}
	};

	// ## Fix nav to the top of the window

	Nav.setTrigger();
	Nav.maybeFixNav();

	$window.resize(function(e){
		// recalculate the trigger when window is resized
		Nav.setTrigger();
		Nav.maybeFixNav();
	});

	$window.scroll(function(){
		Nav.maybeFixNav();
	});

	// ## Toggle the nav open and closed

	$('.toggle-nav').click(function(e){
		Nav.toggleNav();
	});

	// # Slow scroll on Nav links
	// _____________________________

	$('.scroll-to').click(function(e){
		var scrollTarget = $(e.target).data().scrollTarget;
		var scrollTo = $(scrollTarget).offset().top - Nav.navHeight - Nav.navMarginTop + 1;
		$('html, body').animate({scrollTop: scrollTo}, 'slow');
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

	// # Rotate Effect
	// ________________

	$.fn.rotate = function(degrees) {
			$(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
										'-moz-transform' : 'rotate('+ degrees +'deg)',
										'-ms-transform' : 'rotate('+ degrees +'deg)',
										'transform' : 'rotate('+ degrees +'deg)'});
	};

	var $rotate = $('.rotate-effect');

	// !!! probably call this from the toggle-nav click handler
	$rotate.click(function(e){
		$rotate.rotate(360 * 4);
	});





});