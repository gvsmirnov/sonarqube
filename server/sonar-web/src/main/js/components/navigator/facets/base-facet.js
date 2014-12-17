define([
    'backbone.marionette'
], function (Marionette) {

  var $ = jQuery;

  return Marionette.ItemView.extend({
    modelEvents: function () {
      return {
        'change': 'render'
      };
    },

    events: function () {
      return {
        'click .js-issues-facet-toggle': 'toggle',
        'click .js-issues-facet': 'toggleFacet'
      };
    },

    onRender: function () {
      this.$el.toggleClass('issues-facet-box-collapsed', !this.model.get('enabled'));
      var property = this.model.get('property'),
          value = this.options.app.state.get('query')[property];
      if (typeof value === 'string') {
        value.split(',').forEach(function (s) {
          var facet = this.$('.js-issues-facet').filter('[data-value="' + s + '"]');
          if (facet.length > 0) {
            facet.addClass('active');
          }
        });
      }
    },

    toggle: function () {
      this.options.app.controller.toggleFacet(this.model.id);
    },

    getValue: function () {
      return this.$('.js-issues-facet.active').map(function () {
        return $(this).data('value');
      }).get().join();
    },

    toggleFacet: function (e) {
      $(e.currentTarget).toggleClass('active');
      var property = this.model.get('property'),
          obj = {};
      obj[property] = this.getValue();
      this.options.app.state.updateFilter(obj);
    },

    disable: function () {
      var property = this.model.get('property'),
          obj = {};
      obj[property] = null;
      this.options.app.state.updateFilter(obj);
    },

    sortValues: function (values) {
      return _.sortBy(values, function (v) {
        return -v.count;
      });
    },

    serializeData: function () {
      return _.extend(Marionette.ItemView.prototype.serializeData.apply(this, arguments), {
        values: this.sortValues(this.model.getValues())
      });
    }
  });

});
