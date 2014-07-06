'use strict';

/**
 * @ngdoc service
 * @name tassosApp.cards
 * @description
 * # cards
 * Service in the tassosApp.
 */
angular.module('tassosApp')
  .service('CardsService', function CardsService() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.get = function() {
    	return 'got a card';
    };

  });
