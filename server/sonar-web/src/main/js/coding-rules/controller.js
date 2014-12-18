define([
    'components/navigator/controller'
], function (Controller) {

  var $ = jQuery;

  return Controller.extend({
    allFacets: ['languages', 'repositories', 'tags', 'qprofile', 'debt_characteristics', 'severities', 'statuses'],
    facetsFromServer: ['languages', 'repositories', 'tags'],
    pageSize: 200,
    ruleFields: ['name', 'lang', 'langName', 'sysTags', 'tags'],


    _searchParameters: function () {
      return {
        p: this.options.app.state.get('page'),
        ps: this.pageSize,
        facets: true,
        f: this.ruleFields.join()
      };
    },

    fetchList: function (firstPage) {
      firstPage = firstPage == null ? true : firstPage;
      if (firstPage) {
        this.options.app.state.set({ selectedIndex: 0, page: 1 }, { silent: true });
      }

      var that = this,
          url = baseUrl + '/api/rules/search',
          options = _.extend(this._searchParameters(), this.options.app.state.get('query')),
          p = window.process.addBackgroundProcess();
      return $.get(url, options).done(function (r) {
        var rules = that.options.app.list.parseRules(r);
        if (firstPage) {
          that.options.app.list.reset(rules);
        } else {
          that.options.app.list.add(rules);
        }
        that.options.app.list.setIndex();
        that.options.app.facets.reset(that._allFacets());
        that.options.app.facets.add(r.facets, { merge: true });
        that.enableFacets(that._enabledFacets());
        that.options.app.state.set({
          page: r.p,
          pageSize: r.ps,
          total: r.total,
          maxResultsReached: r.p * r.ps >= r.total
        });
        window.process.finishBackgroundProcess(p);
      }).fail(function () {
        window.process.failBackgroundProcess(p);
      });
    },

    requestFacet: function (id) {
      var url = baseUrl + '/api/rules/search',
          facet = this.options.app.facets.get(id),
          options = _.extend({ facets: true, ps: 1 }, this.options.app.state.get('query'));
      return $.get(url, options).done(function (r) {
        var facetData = _.findWhere(r.facets, { property: id });
        if (facetData) {
          facet.set(facetData);
        }
      });
    },

    parseQuery: function () {
      var q = Controller.prototype.parseQuery.apply(this, arguments);
      delete q.asc;
      delete q.s;
      return q;
    }

  });

});
