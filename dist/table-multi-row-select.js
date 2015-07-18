// TABLE MULTI ROW SELECT
// 2015-07-13 [mse]
// Ambry Genetics
// =============================================================================
// TODO: Convert this to a jQuery plugin
//
// tableMultiRowSelect.init({options})
// id: string         ( 'table-multi-row-select' )
// className: string  ( 'table-multi-row-select' )
// selected:  array   ( [] )
// rowOffset: integer ( 0 )

/*global window*/

"use strict";

var tableMultiRowSelect = (function () {

  var lastSelectedRow;
  var tableRows       = [];
  var selectedRows    = [];
  var options         = {};

  var defaultOptions  = {
    id:        'table-multi-row-select',
    className: 'table-multi-row-select',
    selected:  [],
    rowOffset: 0
  };

  function setSelectedRows(rows) {
    this.clearAll(); // make sure no remnants exist
    for (var i = 0; i < rows.length; i++) {
      var row = this.tableRows[rows[i]];
      if ( ! this.isGroupHeader(row) ) {
        (rows[i] < this.tableRows.length) ? row.className = 'selected' : null;
      }
    }
  }

  function getSelectedRows() {
    var _selectedRows = [];
    for (var i = 0; i < this.tableRows.length; i++) {
      this.tableRows[i].className == 'selected' ? _selectedRows.push(i) : '';
    }
    return _selectedRows;
  }

  function handleRowClick(clickedRow) {
    if (window.event.ctrlKey) {
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

  }

  function toggleRow(row) {
    if (!this.isGroupHeader (row)) {
      row.className = row.className == 'selected' ? '' : 'selected';
      this.lastSelectedRow = row;
    }
  }

  function isGroupHeader(row) {
    var tds = $('td',$(row));
    if ( $(tds[0]).attr('colspan') == 100) {
      return true;
    }

    return false;
  }

  function selectRowsBetweenIndexes(indexes) {
    indexes.sort(function (a, b) {
      return a - b;
    });

    for (var i = indexes[0]; i <= indexes[1]; i++) {
      var row = this.tableRows[i - 1 - this.options.rowOffset];
      if ( ! this.isGroupHeader(row) ) {
        row.className = 'selected';
      }
    }
  }

  function selectAll() {
    var _selectedRows = [];
    for (var i = 0; i < this.tableRows.length; i++) {
      if ( ! this.isGroupHeader(this.tableRows[i]) ) {
        _selectedRows.push(i);
        this.tableRows[i].className = 'selected';
      }
    }

    this.selectedRows = _selectedRows;
  }

  function clearAll() {
    for (var i = 0; i < this.tableRows.length; i++) {
      this.tableRows[i].className = '';
    }
  }

  function init(options) {

    var that     = this;
    this.options = $.extend(defaultOptions, options);

    var tableObj = $('#' + this.options.id );
    if ( ! tableObj ) {
      $('.' + this.options.className);
    }

    var tableRows = $('tbody tr', tableObj);
    if(tableRows) {

      // this class hacks with multi select interface so just explode it
      $(tableObj).removeClass('table-hover');

      this.tableRows = tableRows;
      $(tableRows).bind('mousedown', function(){
        if( isGroupHeader(this) ) {
          return false;
        }
        that.handleRowClick(this);
      });


      // set default selection
      that.setSelectedRows(this.options.selected);

    } else {
      console.error('Unable to find table. Make sure you have a table with id or class `%s`.', this.options.className);
    }

  }

  // return public methods and variables
  return {
    init:                       init,
    reload:                     init,
    getSelectedRows:            getSelectedRows,
    setSelectedRows:            setSelectedRows,
    clearAll:                   clearAll,
    selectAll:                  selectAll,
    handleRowClick:             handleRowClick,
    isGroupHeader:              isGroupHeader,
    toggleRow:                  toggleRow,
    selectRowsBetweenIndexes:   selectRowsBetweenIndexes
  };

})();

