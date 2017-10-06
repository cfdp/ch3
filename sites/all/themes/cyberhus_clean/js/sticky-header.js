$(document).ready(function() {

  $('#edit-jump').change(function() {
    if($(this).val() != '') {
      $('#ctools-jump-menu').submit();
    }
  });

});

// $(window).on("scroll touchmove", function () {
//
//   var offsetTop = 100;
//
//   $('#header-wrapper').toggleClass('tiny', $(document).scrollTop() > offsetTop);
//
// });
