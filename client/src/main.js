var App = require('./start');
var app = new App();
app.start();

var $ = require('jquery');

$(function(){
	$('img').click(function(){
		window.App.router.navigate('blog', {trigger: true});
	});
});
