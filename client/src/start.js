var Backbone = require('backbone');
// var Controller = require('./controller');
var Router = require('./router');
var Articles = require('./collections/articles');

// (function($){

//   console.log('hello');

// })($);

module.exports = App = function App() {};

App.prototype.start = function(){

  // fetch data
  $.getJSON('data/database.json', function(data) {
    console.log('!!! got data:', data);

    var articles = new Articles(data.articles);
    App.data = {
      articles: articles
    };

  });

  // start the router
  if (Backbone.history) {
    App.router = new Router();
    var match = Backbone.history.start({pushState: true});
    if (!match) {
      // initial url didn't match a route
    }
  }

  // save home ???

};
