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

		this.log = function(item) {
			item.timestamp = (new Date()).getTime();
			// !!! add support for tracking the user

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

		    this.logger = datastore.getTable('test');

		    for (var i=0; i<this.backlog.length; ++i) {
		    	this.logger.insert(this.backlog[i]);
		    }
		    this.backlog = [];
			}));
		}

  });
