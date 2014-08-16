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
  .controller('MainCtrl', function ($scope, Logging, CardsService) {

    $scope.card = {
    	title: 'What\'s your favorite song?',
    	description: '',
        cardnumber: 0
    };

    $scope.next = function() {
    	$scope.card = CardsService.get();
        $scope.hasBeenRated = false;

    	Logging.log({
    		type: 'next_card_requested',
    		cardNumber: $scope.card.cardnumber
    	});

    	if ($scope.card.secondspin > 0) {
    		$scope.spin();
    	}

    	// Logging.output();
    };

    $scope.degrees = 0;
    $scope.spin = function() {
    	$scope.degrees += 360 + (720 * Math.random());
    	if ((-45 < (($scope.degrees - 180) % 360) - 360) && ((($scope.degrees - 180) % 360) - 360 < 45) || (-45 < (($scope.degrees - 180) % 360)) && ((($scope.degrees - 180) % 360) < 45)) {
    		$scope.degrees += 90;
    	}

    	$('.spinner').css({'-webkit-transform' : 'rotate('+ $scope.degrees +'deg)',
											 	 '-moz-transform' : 'rotate('+ $scope.degrees +'deg)',
												 '-ms-transform' : 'rotate('+ $scope.degrees +'deg)',
												 'transform' : 'rotate('+ $scope.degrees +'deg)'});
    };

    $scope.hasBeenRated = false;

    $scope.rateGood = function() {
        if (!canRate()){
            return; 
        } 
        Logging.log({
            type:'card_rated',
            cardNumber: $scope.card.cardnumber,
            cardRating:'Good'
        });
        $scope.hasBeenRated = true;
    };
    $scope.rateMeh = function(){
        if (!canRate()){
            return; 
        } 
        Logging.log({
            type:'card_rated',
            cardNumber: $scope.card.cardnumber,
            cardRating:'Meh'
        });
        $scope.hasBeenRated = true;
    };
    $scope.rateBad = function(){
        if (!canRate()){
            return; 
        } 
        Logging.log({
            type:'card_rated',
            cardNumber: $scope.card.cardnumber,
            cardRating:'Bad'
        });
        $scope.hasBeenRated = true;
    };

    var canRate = function(){
        return isFinite($scope.card.cardnumber);
    };
  });
