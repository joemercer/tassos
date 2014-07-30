/*global Tabletop:false */

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

    this.cards = [];
    this.current = 0;

    this.get = function() {
    	if (!this.cards.length) {
    		return {
    			error: true,
    			message: 'Loading cards... hold on'
    		};
    	}

    	var toReturn = this.cards[this.current];

    	if (!toReturn) {
    		return {
    			error: true,
    			message: 'Ran out of cards :(',
    			title: 'Last card!',
    			description: 'Reload the page if you dare to play again'
    		};
    	}

    	this.current++;
    	return toReturn;
    };


    var spinzDeck = 'https://docs.google.com/spreadsheets/d/115idP64c_fvIxJw6zm6A8-feGbCjOeYxp3DnOPwMBhM/pubhtml';
    var firstDateDeck = 'https://docs.google.com/spreadsheets/d/1uQLtqSJPecrQw1LZrLWVS9hSaJWGSOfkKHaVbTswtzM/pubhtml';

    var publicSpreadsheetUrl = firstDateDeck;

    // check cache in local storage


    // load from spreadsheet 
    Tabletop.init({
    	key: publicSpreadsheetUrl,
    	simpleSheet: true,
    	parseNumbers: true,
			callback: angular.bind(this, function(data, tabletop) {
				this.cards = data;
			})
		});

  });
