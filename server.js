// require() is node's way of loading modules
// npm modules should be defined in the package.json

// Express: http://expressjs.com/
var express = require('express');

// utilities for dealing with file paths
var path = require('path');

// http interface
var http = require('http');

// Express previously used Connect middleware
// which is now split up into independent modules
// see https://github.com/senchalabs/connect#middleware

// logging
var morgan = require('morgan');

// error handling
var errorhandler = require('errorhandler');

// set up the Express app
var app = express();

// assign the port
app.set('port', process.env.PORT || 3300);

// load some middleware
// app.use() is Express's way of loading middleware

// log every request
app.use(morgan('dev'));

// serve back anything in the public directory
// no path (e.g. /) will default to load index.html
app.use('/', express.static(path.join(__dirname, 'public')));

// dump out errors in development only
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

// boot up the server and listen on the assigned port
http.createServer(app).listen(app.get('port'), function() {
	console.log('Server up: http://localhost:' + app.get('port'));
});
