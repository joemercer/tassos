var $ = require('jquery');
var _ = require('lodash');

var angular = require('angular');

var App = angular.module('Tassos', []);

App.controller('testController', function ($scope) {
  $scope.things = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});

$(function(){
	'use strict';

	var $window = $(window);

	console.log('jquery yo');

});