// TABLE MULTI ROW SELECT
// 2015-07-13 [mse]
// Ambry Genetics
// =============================================================================
// TODO: Convert this to a jQuery plugin
//
// tableMultiRowSelect.init({options})
// - id: string         ( 'table-multi-row-select' )
// - className: string  ( 'table-multi-row-select' )
// - selected:  array   ( [] ) default selected rows
// - rowOffset: integer ( 0 ) this is rarely required but just in case (used in work conditions)

/*global window*/

"use strict";


( function( window, undefined ) {

  function TableMultiRowSelect(options) {

    // module variables
    var lastSelectedRow;
    var tableRows       = [];
    var selectedRows    = [];

    var defaultOptions  = {
      id:        'table-multi-row-select',
      className: 'table-multi-row-select',
      selected:  [],
      rowOffset: 0
    };

    defaultOptions = $.extend(defaultOptions, options);

    // module methods
    this.init = function(options) {

      var that     = this;
      this.options = $.extend(defaultOptions, options);

      var tableObj = $('#' + this.options.id );
      if ( tableObj.length === 0 ) {
        tableObj   = $('.' + this.options.className);
      }

      // setup click listener for all table rows
      var tableRows = $('tbody tr', tableObj);
      if(tableRows) {
        this.tableRows = tableRows;
        $(tableRows).bind('mousedown', function(){
          if( that.isGroupHeader(this) ) {
            return false;
          }
          that.handleRowClick(this);
        });

        // set default selection if supplied
        that.setSelectedRows(this.options.selected);

      } else {
        console.error('Unable to find table reference. Make sure you have a table with id or class `%s`.', this.options.className);
      }

    };

    this.reload = function(options) {
      this.init(options);
    };

    this.clearAll = function() {
      for (var i = 0; i < this.tableRows.length; i++) {
        this.tableRows[i].className = '';
      }
    };

    this.isGroupHeader = function(row) {
      var tds = $('td',$(row));
      if ( $(tds[0]).attr('colspan') == 100) {
        return true;
      }

      return false;
    };

    this.setSelectedRows = function(rows) {
      this.clearAll(); // make sure no remnants exist
      for (var i = 0; i < rows.length; i++) {
        var row = this.tableRows[rows[i]];
        if ( ! this.isGroupHeader(row) ) {
          row.className = 'selected';
        }
      }
    };

    this.getSelectedRows = function() {
      var _selectedRows = [];
      for (var i = 0; i < this.tableRows.length; i++) {
        if ( this.tableRows[i].className === 'selected' ) {
          _selectedRows.push(i);
        }
      }
      return _selectedRows;
    };

    this.handleRowClick = function(clickedRow) {
      if (window.event.ctrlKey) {
        window.event.preventDefault();
        this.toggleRow(clickedRow);
      }

      if (window.event.button === 0) {
        if (! window.event.ctrlKey && ! window.event.shiftKey) {
          this.clearAll();
          this.toggleRow(clickedRow);
        }

        if (window.event.shiftKey) {
          this.selectRowsBetweenIndexes([this.lastSelectedRow.rowIndex, clickedRow.rowIndex]);
        }
      }

      this.selectedRows = this.getSelectedRows();

    };

    this.toggleRow = function(row) {
      if (!this.isGroupHeader (row)) {
        row.className = row.className == 'selected' ? '' : 'selected';
        this.lastSelectedRow = row;
      }
    };

    this.selectRowsBetweenIndexes = function(indexes) {

      indexes.sort(function (a, b) {
        return a - b;
      });

      for (var i = indexes[0]; i <= indexes[1]; i++) {
        var row = this.tableRows[i - 1 - this.options.rowOffset];
        if ( ! this.isGroupHeader(row) ) {
          row.className = 'selected';
        }
      }
    };

    this.selectAll = function() {
      var _selectedRows = [];
      for (var i = 0; i < this.tableRows.length; i++) {
        if ( ! this.isGroupHeader(this.tableRows[i]) ) {
          _selectedRows.push(i);
          this.tableRows[i].className = 'selected';
        }
      }

      this.selectedRows = _selectedRows;
    };

  }

  // expose access to the constructor
  window.TableMultiRowSelect = TableMultiRowSelect;

} )( window );

