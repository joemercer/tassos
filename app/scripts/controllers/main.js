/*global $:false */
'use strict';

/**
 * @ngdoc function
 * @name tassosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tassosApp
 */
angular.module('tassosApp')
  .controller('MainCtrl', function ($scope, CardsService) {

    $scope.card = {
    	title: 'Press \'Next card\'',
    	description: 'You gotta if you wanna start the game o_O'
    };

    $scope.next = function() {
    	$scope.card = CardsService.get();

    	if ($scope.card.secondspin > 0) {
    		$scope.spin();
    	}
    };

    $scope.degrees = 0;
    $scope.spin = function() {
    	$scope.degrees += 360 + (720 * Math.random());
    	$('.spinner').css({'-webkit-transform' : 'rotate('+ $scope.degrees +'deg)',
											 	 '-moz-transform' : 'rotate('+ $scope.degrees +'deg)',
												 '-ms-transform' : 'rotate('+ $scope.degrees +'deg)',
												 'transform' : 'rotate('+ $scope.degrees +'deg)'});
    };

  });
