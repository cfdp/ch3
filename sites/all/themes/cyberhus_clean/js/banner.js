$ = jQuery;

$(document).ready(function() {

  $('.flexslider-banner').flexslider({
    selector: '.slides > .slide',
    controlsContainer: $(".flex-pager"),
    customDirectionNav: $(".flex-navigation a"),
    allowOneSlide: false,
    useCSS: true,
    start: function() {
      $('.flexslider-banner').addClass("loaded");
    }
  });

});
