$ = jQuery;

var scrollTopOffset = 100; // Offset
var scrollBottomOffset = 100; // Offset

function backToTopInit () {
  var scrollTop = $(window).scrollTop();
  var scrollBottom = $(window).scrollTop() + $(window).height();
  if (scrollTop > scrollTopOffset) {
    $('#back-to-top').addClass('show');
  }
  else {
    $('#back-to-top').removeClass('show');
  }
  if(scrollBottom < scrollBottomOffset) {
    $('#back-to-top').addClass('bottom-offset');
  }
}

$(document).ready(function() {

  if ($('#back-to-top').length) {

    backToTopInit();

    $('#back-to-top').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 750);
    });
  }

});

$(window).on('scroll', function () {

  backToTopInit();

});
