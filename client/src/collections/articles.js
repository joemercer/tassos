var Backbone = require('backbone');
var Article = require('../models/article');

module.exports = Articles = Backbone.Collection.extend({
    model:  Article
});
