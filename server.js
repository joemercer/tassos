// require() is node's way of loading modules
// npm modules should be defined in the package.json

// Express: http://expressjs.com/
// express uses connect middleware: http://www.senchalabs.org/connect/
// app.use() is express's way of loading middleware
var express = require('express');

// utilities for dealing with file paths
var path = require('path');

// http interface
var http = require('http');

// set up express
var app = express();

// assign the port
app.set('port', process.env.PORT || 3300);

// log every request
// for details see: https://gist.github.com/leommoore/7524073
app.use(express.logger('dev'));

// parse json request bodies providing the object as req.body
app.use(express.json());

// serve back anything in the public directory
// no path (e.g. /) will default to load index.html
app.use('/', express.static(path.join(__dirname, 'public')));

// dump out errors in development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// boot up the server and listen on the assigned port
http.createServer(app).listen(app.get('port'), function() {
	console.log('Server up: http://localhost:' + app.get('port'));
});
