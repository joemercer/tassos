var Backbone = require('backbone');

var ArticlePreviewView = Backbone.View.extend({
  template: require('../../templates/articlePreview.hbs'),
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    debugger;
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  events: {
    'click': 'showDetails'
  },

  showDetails: function() {
    debugger;
  }
});

module.exports = ArticlePreviewsView = Backbone.View.extend({
  template: require('../../templates/articlePreviews.hbs'),
  initialize: function() {
    this.listenTo(this.collection, 'change', this.render);
    debugger;
  },
  articlePreviewView: ArticlePreviewView,
  render: function() {
    debugger;
  }
});
