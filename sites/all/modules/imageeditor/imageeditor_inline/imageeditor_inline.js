(function ($) {

Drupal.behaviors.imageeditor_inline = {};
Drupal.behaviors.imageeditor_inline.attach = function(context, settings) {
  var $images = $('img:not('+Drupal.settings.imageeditor_inline.ignore+')', context);
  
  if (Drupal.settings.imageeditor_inline.access_check == 1) {
    var images = [];
    $images.each(function(index, Element) {
      var origurl = $(this).attr('src');
      //regexp to detect and remove 'styles/style_name/scheme_name/'
      //Styles are using $scheme . '://styles/' . $style_name . '/' . $scheme . '/' . $path
      var fullurl = origurl.replace(new RegExp('styles/[0-9a-zA-z_]+/[0-9a-zA-z_]+/','g'), '');
      images.push(fullurl);
    });
    $.ajax({
      type: 'POST',
      url: Drupal.settings.imageeditor_inline.access_check_url,
      async: false,
      data: {'images': images.toString()},
      success: function(data) {Drupal.settings.imageeditor_inline.access = data;},
      error: function(msg) {alert("Something went wrong: " + msg);}
    });
  }
  
  Drupal.imageeditor_inline.initialize($images);
};

Drupal.imageeditor_inline = {
  initialize: function($images) {
    var self = this;
    
    $images.each(function(index, Element) {
      if (!$(this).hasClass('imageeditor-inline-processed') && (Drupal.settings.imageeditor_inline.access_check == 0 || Drupal.settings.imageeditor_inline.access[index])) {
        if (this.naturalWidth == 0 || this.naturalHeight == 0) {
          this.onload = function() { self.addInlineEditor.call(this); };
        }
        else {
          self.addInlineEditor.call(this);
        }
      }
    });
  },
  save: function() {
    $.ajax({
      type: 'POST',
      url: Drupal.settings.imageeditor_inline.save_url,
      async: true,
      data: {'image': Drupal.settings.imageeditor.save.image, 'fullurl': Drupal.settings.imageeditor.save.fullurl, 'origurl': Drupal.settings.imageeditor.save.origurl},
      success: function(data) {alert(data);},
      error: function(msg) {alert("Something went wrong: " + msg);}
    });
  },
  addInlineEditor: function() {
    $(this).addClass('imageeditor-inline-processed');
    if (this.naturalWidth >= Drupal.settings.imageeditor_inline.min_dimention || this.naturalHeight >= Drupal.settings.imageeditor_inline.min_dimention) {
      var origurl = $(this).attr('src');
      //regexp to detect and remove 'styles/style_name/scheme_name/'
      //Styles are using $scheme . '://styles/' . $style_name . '/' . $scheme . '/' . $path
      var fullurl = origurl.replace(new RegExp('styles/[0-9a-zA-z_]+/[0-9a-zA-z_]+/','g'), '');
      $(this).wrap("<span class='imageeditor-inline-wrapper'></span>");
      
      var options = {editors: Drupal.settings.imageeditor_inline.editors, uploaders: Drupal.settings.imageeditor_inline.uploaders, image: {url: fullurl}, data: {fullurl: fullurl, origurl: origurl}, $element: $(this), callback: Drupal.imageeditor_inline.save};
      Drupal.imageeditor.initialize(options);
      
      if (Drupal.settings.imageeditor_inline.icons_position == 1) {
        var $imageeditor_inline_wrapper_div = $(this).parents('span.imageeditor-inline-wrapper');
        var $imageeditor_div = $imageeditor_inline_wrapper_div.css({'position': 'relative'}).find('div.imageeditor');
        $imageeditor_div.css({'position': 'absolute', 'bottom': '0px'}).hide();
        $imageeditor_inline_wrapper_div.hover(
          function(event) {
            $imageeditor_div.stop(true, true).fadeIn();
          },
          function(event) {
            $imageeditor_div.stop(true, true).fadeOut();
          }
        );
      }
    }
  }
};

})(jQuery);
