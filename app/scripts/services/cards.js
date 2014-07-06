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

    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/115idP64c_fvIxJw6zm6A8-feGbCjOeYxp3DnOPwMBhM/pubhtml';

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
    			message: 'Ran out of cards :('
    		};
    	}

    	this.current++;
    	return toReturn;
    };



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
