define [
  'components/navigator/facets/base-facet'
  'templates/issues'
], (
  BaseFacet
  Templates
) ->

  class extends BaseFacet
    className: 'issues-facet-box'
    template: Templates['issues-base-facet']
