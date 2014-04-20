// require() is node's way of loading modules
// non core modules should be defined in the package.json
var express = require('express');

// ???
var http = require('http');
var path = require('path');

// set up express
var app = express();

// assign the port
app.set('port', process.env.PORT || 3300);

// ???
app.use(express.logger('dev'));

// ???
app.use(express.json());

// serve back anything in the public directory
// no path (e.g. /) will default to load public/index.html
app.use('/', express.static(path.join(__dirname, 'public')));

// ??? how does it know developement
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// boot up the server and listen on the assigned port
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
