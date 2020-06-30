$(document).ready(function() {

  // Jump menu
  $('#edit-jump').change(function() {
    if($(this).val() != '') {
      $('#ctools-jump-menu').submit();
    }
  });

});
