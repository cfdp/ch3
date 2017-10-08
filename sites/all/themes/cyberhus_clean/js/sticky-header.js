$(document).ready(function() {

  // Jump menu
  $('#edit-jump').change(function() {
    if($(this).val() != '') {
      $('#ctools-jump-menu').submit();
    }
  });


  $('div[id^=block-views-exp-frontpage-stream-page] > h2').on('click touch', function() {
    $('div[id^=block-views-exp-frontpage-stream-page] > .content').slideToggle(250);
  });

});

// $(window).on("scroll touchmove", function () {
//
//   var offsetTop = 100;
//
//   $('#header-wrapper').toggleClass('tiny', $(document).scrollTop() > offsetTop);
//
// });
