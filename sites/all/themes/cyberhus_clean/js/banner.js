$ = jQuery;

$(document).ready(function() {

  $('.flexslider-banner').flexslider({
    selector: '.slides > .slide',
    controlsContainer: $(".flex-pager"),
    customDirectionNav: $(".flex-navigation a"),
    allowOneSlide: false,
    useCSS: true,
    slideshowSpeed: 5000,
    pauseOnHover: true,
    start: function() {
      $('.flexslider-banner').addClass("loaded");
    }
  });

});
