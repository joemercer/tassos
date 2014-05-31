var $ = require('jquery');

// # Rotate Effect
// ________________

$.fn.rotate = function(degrees) {
		$(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
									'-moz-transform' : 'rotate('+ degrees +'deg)',
									'-ms-transform' : 'rotate('+ degrees +'deg)',
									'transform' : 'rotate('+ degrees +'deg)'});
};

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
		$navItems: $nav.find('.nav-item'),
		$navItemsContainer: $nav.find('.nav'),
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
			if (this.$navItemsContainer.hasClass('hide')) {
				this.$navItemsContainer.removeClass('hide');
				// wait 50 ms for elements to un-hide
				window.setTimeout(function(){
					Nav.$navItemsContainer.removeClass('opacity-hide');
					Nav.$navItems.removeClass('opacity-hide').addClass('active');

					// hard set to the final state for multiple fast clicks
					Nav.$navItemsContainer.removeClass('hide');
				}, 50);
			}
			else {
				this.$navItemsContainer.addClass('opacity-hide');
				this.$navItems.addClass('opacity-hide').removeClass('active');
				// wait 3s for elements to finish animation
				// !!! perhaps put in a promise thing
				window.setTimeout(function(){
					Nav.$navItemsContainer.addClass('hide');

					// hard set to the final state for multiple fast clicks
					Nav.$navItemsContainer.addClass('opacity-hide');
					Nav.$navItems.addClass('opacity-hide').removeClass('active');
				}, 3000);
			}
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

	var rotateOffset = 0;
	$('.toggle-nav').click(function(e){
		Nav.toggleNav();
		rotateOffset = rotateOffset + (360 * 6);
		$(this).rotate(rotateOffset);
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

});