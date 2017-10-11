$ = jQuery;

// Scroll to top

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


// Scroll to Related Content

$(document).ready(function() {

  if ($('.related-link').length) {

    var relatedOffset = $('#related-content').offset();

    $('.related-link').on('click', function (e) {
      e.preventDefault();

      $('html,body').animate({
        scrollTop: relatedOffset.top
      }, 750);
    });
  }

});
