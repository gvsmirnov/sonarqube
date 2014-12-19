define [
  'backbone.marionette'
  'templates/coding-rules-old'
], (
  Marionette
  Templates
) ->

  class CodingRulesStatusView extends Marionette.ItemView
    template: Templates['coding-rules-actions']


    collectionEvents:
      'all': 'render'


    ui:
      orderChoices: '.navigator-actions-order-choices'
      bulkChange: '.navigator-actions-bulk'


    events:
      'click .navigator-actions-order': 'toggleOrderChoices'
      'click @ui.orderChoices': 'sort'
      'click @ui.bulkChange': 'bulkChange'


    onRender: ->
      unless @collection.sorting.sortText
        while not @collection.sorting.sortText
          @collection.sorting.sortText = @$('[data-sort=' + @collection.sorting.sort + ']:first').text()
        @render()


    toggleOrderChoices: (e) ->
      e.stopPropagation()
      @ui.orderChoices.toggleClass 'open'
      if @ui.orderChoices.is '.open'
        jQuery('body').on 'click.coding_rules_actions', =>
          @ui.orderChoices.removeClass 'open'


    sort: (e) ->
      e.stopPropagation()
      @ui.orderChoices.removeClass 'open'
      jQuery('body').off 'click.coding_rules_actions'
      el = jQuery(e.target)
      sort = el.data 'sort'
      asc = el.data 'asc'
      if sort != null && asc != null
        @collection.sorting = sort: sort, sortText: el.text(), asc: asc
        @options.app.fetchFirstPage()


    bulkChange: (e) ->
      e.stopPropagation()
      @options.app.codingRulesBulkChangeDropdownView.toggle()


    serializeData: ->
      _.extend super,
        canWrite: @options.app.canWrite
        paging: @collection.paging
        sorting: @collection.sorting
