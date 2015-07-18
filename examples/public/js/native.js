// NATIVE.JS
// 2015-07-13 [mse]
// Ambry Genetics
// =============================================================================


console.log('DEV ===== native js =====');

$(function() {

  var appOptions = {
    selected:  [0, 2, 4, 6]
  };

  var tableMultiRowSelect = new TableMultiRowSelect({selected: [2,4]});
  tableMultiRowSelect.init();
  tableMultiRowSelect.reload(appOptions);

  $('#tblMulti_ClearAll').bind('click', function(){
    tableMultiRowSelect.clearAll();
    $('#tblMulti_GetSelected').click();
  });

  $('#tblMulti_SelectAll').bind('click', function(){
    tableMultiRowSelect.selectAll();
    $('#tblMulti_GetSelected').click();
  });

  $('#tblMulti_GetSelected').bind('click', function(){
    var rows = tableMultiRowSelect.getSelectedRows();
    $('#tblMulti_Selected').text(rows);
  });

  $('#tblMulti_SetSelected').bind('click', function(){
    tableMultiRowSelect.setSelectedRows([0, 2, 4, 6, 7]);
    $('#tblMulti_GetSelected').click();
  });

});

