define([
  'backbone.marionette'
], function (Marionette) {

  return Marionette.CollectionView.extend({

    itemViewOptions: function () {
      return {
        app: this.options.app
      };
    },

    collectionEvents: function () {
      return {
        'change:enabled': 'updateState'
      };
    },

    updateState: function () {
      var enabledFacets = this.collection.filter(function (model) {
            return model.get('enabled');
          }),
          enabledFacetIds = enabledFacets.map(function (model) {
            return model.id;
          });
      this.options.app.state.set({facets: enabledFacetIds});
    }

  });

});
