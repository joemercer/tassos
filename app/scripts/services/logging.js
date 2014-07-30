/*global angular:false */
/*global Dropbox:false */
'use strict';

/**
 * @ngdoc service
 * @name tassosApp.logging
 * @description
 * # logging
 * Service in the tassosApp.
 */
angular.module('tassosApp')
  .service('Logging', function Logging() {

  	this.logger = null;
  	this.backlog = [];
  	this.userId = localStorage.getItem('tassos_user_id');

  	// create a new userId
  	// this should be checked against the existing userIds to prevent duplicates
  	if (!this.userId) {
  		this.userId = Math.floor(10000*Math.random());
  		localStorage.setItem('tassos_user_id', this.userId);
  	}

		this.log = function(item) {
			item.timestamp = (new Date()).getTime();
			item.userId = this.userId;

			if (!this.logger) {
				this.backlog.push(item);
				return;
			}

			this.logger.insert(item);
		}; 

		this.output = function() {
			if (!this.logger) {
				console.log('no logger');
				return;
			}

			// or log out more helpful queries
			console.log(this.logger.query());
		};

  	this.dropbox = new Dropbox.Client({
  		key: 'dg7kh1gl7wv9gj2',
  		secret: 'hp1rh6n8ia9fabr',
  		token: '05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu'
  	});

		if (this.dropbox.isAuthenticated()) {
		  var datastoreManager = this.dropbox.getDatastoreManager();
			datastoreManager.openDefaultDatastore(angular.bind(this, function (error, datastore) {
		    if (error) {
		      console.log('Error opening default datastore: ' + error);
		    }

		    this.logger = datastore.getTable('logs');

		    for (var i=0; i<this.backlog.length; ++i) {
		    	this.logger.insert(this.backlog[i]);
		    }
		    this.backlog = [];
			}));
		}

  });
