define [
  'backbone.marionette'
  'templates/component-viewer'
  'component-viewer/header/base-header'
  'component-viewer/time-changes-popup'
], (
  Marionette
  Templates
  BaseHeaderView
  TimeChangesPopupView
) ->

  $ = jQuery


  class extends BaseHeaderView
    template: Templates['issues-header']


    events:
      'click .js-issues-bulk-change': 'issuesBulkChange'
      'click .js-issues-time-changes': 'issuesTimeChanges'

      'click .js-filter-current-issue': 'filterByCurrentIssue'
      'click .js-filter-all-issues': 'filterByAllIssues'
      'click .js-filter-rule': 'filterByRule'
      'click .js-filter-fixed-issues': 'filterByFixedIssues'
      'click .js-filter-unresolved-issues': 'filterByUnresolvedIssues'
      'click .js-filter-false-positive-issues': 'filterByFalsePositiveIssues'
      'click .js-filter-BLOCKER-issues': 'filterByBlockerIssues'
      'click .js-filter-CRITICAL-issues': 'filterByCriticalIssues'
      'click .js-filter-MAJOR-issues': 'filterByMajorIssues'
      'click .js-filter-MINOR-issues': 'filterByMinorIssues'
      'click .js-filter-INFO-issues': 'filterByInfoIssues'


    issuesBulkChange: ->
      issues = @source.get('activeIssues')?.map (issue) -> issue.key
      if issues.length > 0
        url = "#{baseUrl}/issues/bulk_change_form?issues=#{issues.join()}"
        openModalWindow url, {}


    issuesTimeChanges: (e) ->
      e.stopPropagation()
      $('body').click()
      popup = new TimeChangesPopupView
        triggerEl: $(e.currentTarget)
        main: @options.main
        bottom: true
        prefix: 'Added'
      popup.render()
      popup.on 'change', (period) => @main.enablePeriod period, 'issues'


    filterByCurrentIssue: (e) ->
      @header.filterLines e, 'filterByCurrentIssue'
      @state.set 'activeHeaderItem', '.js-filter-current-issues'


    filterByAllIssues: (e) ->
      @header.filterLines e, 'filterByAllIssues'
      @state.set 'activeHeaderItem', '.js-filter-all-issues'


    filterByFixedIssues: (e) ->
      @header.filterLines e, 'filterByFixedIssues'
      @state.set 'activeHeaderItem', '.js-filter-fixed-issues'


    filterByUnresolvedIssues: (e) ->
      @header.filterLines e, 'filterByUnresolvedIssues'
      @state.set 'activeHeaderItem', '.js-filter-unresolved-issues'


    filterByFalsePositiveIssues: (e) ->
      @header.filterLines e, 'filterByFalsePositiveIssues'
      @state.set 'activeHeaderItem', '.js-filter-false-positive-issues'


    filterByRule: (e) ->
      rule = $(e.currentTarget).data 'rule'
      @header.filterLines e, 'filterByRule', rule
      @state.set 'activeHeaderItem', ".js-filter-rule[data-rule='#{rule}']"


    filterByBlockerIssues: (e) ->
      @header.filterLines e, 'filterByBlockerIssues'
      @state.set 'activeHeaderItem', '.js-filter-BLOCKER-issues'


    filterByCriticalIssues: (e) ->
      @header.filterLines e, 'filterByCriticalIssues'
      @state.set 'activeHeaderItem', '.js-filter-CRITICAL-issues'


    filterByMajorIssues: (e) ->
      @header.filterLines e, 'filterByMajorIssues'
      @state.set 'activeHeaderItem', '.js-filter-MAJOR-issues'


    filterByMinorIssues: (e) ->
      @header.filterLines e, 'filterByMinorIssues'
      @state.set 'activeHeaderItem', '.js-filter-MINOR-issues'


    filterByInfoIssues: (e) ->
      @header.filterLines e, 'filterByInfoIssues'
      @state.set 'activeHeaderItem', '.js-filter-INFO-issues'


    serializeData: ->
      _.extend super, period: @state.get('period')?.toJSON()