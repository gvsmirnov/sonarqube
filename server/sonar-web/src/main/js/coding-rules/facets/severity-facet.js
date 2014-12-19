define([
    'coding-rules/facets/base-facet',
    'templates/coding-rules'
], function (BaseFacet, Templates) {

  return BaseFacet.extend({
    template: Templates['coding-rules-severity-facet'],
    severities: ['BLOCKER', 'MINOR', 'CRITICAL', 'INFO', 'MAJOR'],

    sortValues: function (values) {
      var order = this.severities;
      return _.sortBy(values, function (v) {
        return order.indexOf(v.val);
      });
    },

    getValues: function () {
      return this.severities.map(function (s) {
        return { val: s };
      });
    },

    serializeData: function () {
      return _.extend(BaseFacet.prototype.serializeData.apply(this, arguments), {
        values: this.sortValues(this.getValues())
      });
    }
  });

});
