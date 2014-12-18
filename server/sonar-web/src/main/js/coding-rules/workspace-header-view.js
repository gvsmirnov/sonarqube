define([
  'components/navigator/workspace-header-view',
  'templates/coding-rules'
], function (WorkspaceHeaderView, Templates) {

  return WorkspaceHeaderView.extend({
    template: Templates['coding-rules-workspace-header']
  });

});
