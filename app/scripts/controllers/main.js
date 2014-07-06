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

    $scope.getCard = function() {
    	$scope.card = CardsService.get();
    };

  });
