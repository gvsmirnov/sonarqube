define([
  'coding-rules/facets/custom-labels-facet'
], function (CustomLabelsFacet) {

  return CustomLabelsFacet.extend({

    getLabelsSource: function () {
      var repos = this.options.app.repositories;
      return _.object(_.pluck(repos, 'key'), _.pluck(repos, 'name'));
    }

  });

});
