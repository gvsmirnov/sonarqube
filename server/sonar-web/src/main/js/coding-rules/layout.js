define([
    'backbone.marionette',
    'templates/coding-rules'
], function (Marionette, Templates) {

  var $ = jQuery;

  return Marionette.Layout.extend({
    template: Templates['coding-rules-layout'],
    topOffset: 30,

    regions: {
      filtersRegion: '.search-navigator-filters',
      facetsRegion: '.search-navigator-facets',
      workspaceHeaderRegion: '.search-navigator-workspace-header',
      workspaceListRegion: '.search-navigator-workspace-list'
    },

    initialize: function () {
      var that = this;
      $(window).on('scroll.search-navigator-layout', function () {
        that.onScroll();
      });
    },

    onClose: function () {
      $(window).off('scroll.search-navigator-layout');
    },

    onRender: function () {
      this.$('.search-navigator-side').isolatedScroll();
    },

    onScroll: function () {
      var scrollTop =  $(window).scrollTop();
      $('.search-navigator').toggleClass('sticky', scrollTop >= this.topOffset);
      this.$('.search-navigator-side').css({
        top: Math.max(0, Math.min(this.topOffset - scrollTop, this.topOffset))
      });
    }
  });

});
