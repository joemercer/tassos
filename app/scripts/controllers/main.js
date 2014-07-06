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

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var card = CardsService.get();
    console.log(card);

    debugger;

  });
