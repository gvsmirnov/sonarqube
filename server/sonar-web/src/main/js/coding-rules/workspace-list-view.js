define([
  'components/navigator/workspace-list-view',
  'coding-rules/workspace-list-item-view',
  'templates/coding-rules'
], function (WorkspaceListView, WorkspaceListItemView, Templates) {

  var $ = jQuery;

  return WorkspaceListView.extend({
    template: Templates['coding-rules-workspace-list'],
    itemView: WorkspaceListItemView,
    itemViewContainer: '.js-list',

    events: function () {
      return {
        'click .js-tag': 'onTagClick',
        'click .js-lang': 'onLangClick'
      };
    },

    onTagClick: function (e) {
      var tag = $(e.currentTarget).data('tag');
      this.selectTag(tag);
    },

    onLangClick: function (e) {
      var lang = $(e.currentTarget).data('lang');
      this.selectLang(lang);
    },

    selectTag: function (tag) {
      this.options.app.state.setQuery({ tags: tag });
    },

    selectLang: function (lang) {
      this.options.app.state.setQuery({ languages: lang });
    }
  });

});
