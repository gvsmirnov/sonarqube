define([
  'components/navigator/workspace-list-item-view',
  'templates/coding-rules'
], function (WorkspaceListItemView, Templates) {

  return WorkspaceListItemView.extend({
    className: 'coding-rule',
    template: Templates['coding-rules-workspace-list-item'],

    modelEvents: {
      'change': 'render'
    },

    events: {
      'click': 'selectCurrent'
    },

    selectCurrent: function () {
      this.options.app.state.set({ selectedIndex: this.model.get('index') });
    }
  });

});
