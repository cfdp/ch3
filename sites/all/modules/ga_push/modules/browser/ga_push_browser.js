(function ($) {
  Drupal.behaviors.ga_push_browser = {
    attach: function (context, settings) {
      Drupal.settings.ga_push_browser = Drupal.settings.ga_push_browser || {};
      $.each(Drupal.settings.ga_push_browser, function(index, value) {
        $(value['selector'], context).once('ga_push_browser_listener', function () {
          $elem = $(this);
          $elem.bind(value['bind'], function() {
            if (typeof(_gaq) == 'object') {
              // Make sure the fourth argument is numeric and if not, set to 0.
              value['push'][3] = Number(value['push'][3]) || 0;
              _gaq.push(['_trackEvent', value['push'][0], value['push'][1], value['push'][2] , value['push'][3]]);
            }
          });
        });
      });
    }
  };
})(jQuery);