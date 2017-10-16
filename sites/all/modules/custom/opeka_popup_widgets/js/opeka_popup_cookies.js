(function ($) {
  Drupal.behaviors.opeka_popup_widgets_popup = {
    attach: function(context, settings) {
      $('body').not('.sliding-popup-processed').addClass('sliding-popup-processed').each(function() {
        try {
          var enabled = Drupal.settings.opeka_popup_widgets.popup_enabled;
          if(!enabled) {
            return;
          }
          if (!Drupal.opeka_popup_widgets.cookiesEnabled()) {
            return;
          }
          var status = Drupal.opeka_popup_widgets.getCurrentStatus();
          var clicking_confirms = Drupal.settings.opeka_popup_widgets.popup_clicking_confirmation;
          var agreed_enabled = Drupal.settings.opeka_popup_widgets.popup_agreed_enabled;
          var popup_hide_agreed = Drupal.settings.opeka_popup_widgets.popup_hide_agreed;
          if (status == 0) {
            var next_status = 1;
            if (clicking_confirms) {
              $('a, input[type=submit]').bind('click.opeka_popup_widgets', function(){
                if(!agreed_enabled) {
                  Drupal.opeka_popup_widgets.setStatus(1);
                  next_status = 2;
                }
                Drupal.opeka_popup_widgets.changeStatus(next_status);
              });
            }

            $('.agree-button').click(function(){
              if(!agreed_enabled) {
                Drupal.opeka_popup_widgets.setStatus(1);
                next_status = 2;
              }
              Drupal.opeka_popup_widgets.changeStatus(next_status);
            });

            Drupal.opeka_popup_widgets.createPopup(Drupal.settings.opeka_popup_widgets.popup_html_info);
          } else if(status == 1) {
            Drupal.opeka_popup_widgets.createPopup(Drupal.settings.opeka_popup_widgets.popup_html_agreed);
            if (popup_hide_agreed) {
              $('a, input[type=submit]').bind('click.opeka_popup_widgets_hideagreed', function(){
                Drupal.opeka_popup_widgets.changeStatus(2);
              });
            }

          } else {
            return;
          }
        }
        catch(e) {
          return;
        }
      });
    }
  }

  Drupal.opeka_popup_widgets = {};

  Drupal.opeka_popup_widgets.createPopup = function(html) {
    var popup = $(html)
      .attr({"id": "sliding-popup"})
      .height(Drupal.settings.opeka_popup_widgets.popup_height)
      .width(Drupal.settings.opeka_popup_widgets.popup_width)
      .hide();
    if(Drupal.settings.opeka_popup_widgets.popup_position) {
      popup.prependTo("body");
      var height = popup.height();
      popup.show()
        .attr({"class": "sliding-popup-top"})
        .css({"top": -1 * height})
        .animate({top: 0}, Drupal.settings.opeka_popup_widgets.popup_delay);
    } else {
      popup.appendTo("body");
      height = popup.height();
      popup.show()
        .attr({"class": "sliding-popup-bottom"})
        .css({"bottom": -1 * height})
        .animate({bottom: 0}, Drupal.settings.opeka_popup_widgets.popup_delay)
    }
    Drupal.opeka_popup_widgets.attachEvents();
  }

  Drupal.opeka_popup_widgets.attachEvents = function() {
	var clicking_confirms = Drupal.settings.opeka_popup_widgets.popup_clicking_confirmation;
    var agreed_enabled = Drupal.settings.opeka_popup_widgets.popup_agreed_enabled;
    $('.find-more-button').click(function(){
      if (Drupal.settings.opeka_popup_widgets.popup_link_new_window) {
        window.open(Drupal.settings.opeka_popup_widgets.popup_link);
      }
      else{
        window.location.href = Drupal.settings.opeka_popup_widgets.popup_link;
      }
    });
    $('.agree-button').click(function(){
      var next_status = 1;
      if(!agreed_enabled) {
        Drupal.opeka_popup_widgets.setStatus(1);
        next_status = 2;
      }
      if (clicking_confirms) {
        $('a, input[type=submit]').unbind('click.opeka_popup_widgets');
      }
      Drupal.opeka_popup_widgets.changeStatus(next_status);
    });
    $('.hide-popup-button').click(function(){
      Drupal.opeka_popup_widgets.changeStatus(2);
    });
  }

  Drupal.opeka_popup_widgets.getCurrentStatus = function(chatName) {
	name = 'opeka-widgets-declined-'+chatName;
	value = Drupal.opeka_popup_widgets.getCookie(name);
	return value;
  }


  Drupal.opeka_popup_widgets.setStatus = function(chatName) {
    var date = new Date();
    date.setDate(date.getDate() + 1); // Remember for this day
    var cookie = "opeka-widgets-declined-" + chatName + "=yes;expires=" + date.toUTCString() + ";path=" + Drupal.settings.basePath;

    document.cookie = cookie;
  }

  Drupal.opeka_popup_widgets.hasAgreed = function() {
    var status = Drupal.opeka_popup_widgets.getCurrentStatus();
    if(status == 1 || status == 2) {
      return true;
    }
    return false;
  }


  /**
   * Verbatim copy of Drupal.comment.getCookie().
   */
  Drupal.opeka_popup_widgets.getCookie = function(name) {
    var search = name + '=';
    var returnValue = '';

    if (document.cookie.length > 0) {
      offset = document.cookie.indexOf(search);
      if (offset != -1) {
        offset += search.length;
        var end = document.cookie.indexOf(';', offset);
        if (end == -1) {
          end = document.cookie.length;
        }
        returnValue = decodeURIComponent(document.cookie.substring(offset, end).replace(/\+/g, '%20'));
      }
    }

    return returnValue;
  };

  Drupal.opeka_popup_widgets.cookiesEnabled = function() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
      if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
      }
    return (cookieEnabled);
  }

})(jQuery);
