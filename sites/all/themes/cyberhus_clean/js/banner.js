$ = jQuery;

$(document).ready(function() {
  $('.flexslider-banner').flexslider({
    selector: '.slides > .slide',
    controlsContainer: $(".flex-pager"),
    customDirectionNav: $(".flex-navigation a")
  });
});
