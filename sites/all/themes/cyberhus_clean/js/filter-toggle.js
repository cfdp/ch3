$ = jQuery;

$(document).ready(function() {

  // Filter toggle
  $('div[id^=block-views-exp-frontpage-stream-page] > h2').on('click touch', function() {
    $('div[id^=block-views-exp-frontpage-stream-page] > .content').slideToggle(250);
    $(this).toggleClass('open');
  });

});
