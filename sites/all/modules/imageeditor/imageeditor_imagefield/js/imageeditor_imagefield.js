/*global Drupal: false, jQuery: false */
/*jslint devel: true, browser: true, maxerr: 50, indent: 2 */
(function ($) {
  "use strict";

  Drupal.behaviors.imageeditor_imagefield = {};
  Drupal.behaviors.imageeditor_imagefield.attach = function(context, settings) {
    $.each(Drupal.settings.imageeditor_imagefield, function(index, value) {
      var field_name = index, editors = value.editors, uploaders = value.uploaders;
      $.each(this.items, function(index, value) {
        var $removebutton, $createimage, $imagewidget, options;
        $removebutton = $('input[id^="'+value+'-remove-button"]', context);
        $createimage = $('a#'+value+'-imageeditor-source', context);
        if ($removebutton.size() && !$removebutton.hasClass('imageeditor-imagefield-processed')) {
          $removebutton.addClass('imageeditor-imagefield-processed');
          if ($removebutton.parents('div.image-widget-data').size()) {
            $imagewidget = $removebutton.parents('div.image-widget-data');
          }
          else {
            $imagewidget = $removebutton.parents('tr').find('div.image-widget-data');
          }
          var url = $imagewidget.find('span.file').find('a').attr('href'),
            $element = Drupal.settings.imageeditor_imagefield[field_name].imageeditor_icons_position === 'top' ? $imagewidget.children().first() : $imagewidget.children().last();
          options = {
            editors: editors,
            uploaders: uploaders,
            image: {url: url},
            data: {field_name: field_name, element_id: value},
            $element: $element,
            method: Drupal.settings.imageeditor_imagefield[field_name].imageeditor_icons_position === 'top' ? 'before' : 'after',
            callback: Drupal.imageeditor_imagefield.save
          };
          Drupal.imageeditor.initialize(options);
        }
        else if ($createimage.size() && !$createimage.hasClass('imageeditor-imagefield-processed')) {
          $createimage.addClass('imageeditor-imagefield-processed');
          var $imageeditor_source = $createimage.parents('div.image-widget-data').find('div.filefield-source-imageeditor');
          options = {
            editors: editors,
            uploaders: uploaders,
            data: {field_name: field_name, element_id: value},
            $element: $imageeditor_source.find('div'),
            method: 'replaceWith',
            callback: Drupal.imageeditor_imagefield.save
          };
          if (Drupal.settings.imageeditor_imagefield[field_name].source_imageeditor_image) {
            options.image = {url: Drupal.settings.imageeditor_imagefield[field_name].source_imageeditor_image};
          }
          Drupal.imageeditor.initialize(options);
          // Launch the editor upon clicking on the "Create image" link if there is only one editor.
          var $editors = $imageeditor_source.find('div.editors').find('div');
          if ($editors.length === 1) {
            $createimage.click(function(event) {
              $editors.click();
            });
          }
        }
      });
      //TODO: remove the processed values from Drupal.settigns - as the AJAX callback returns all the field values
      //Drupal.settings.imageeditor_imagefield[field_name].items = [];
    });
  };

  Drupal.imageeditor_imagefield = {
    save: function() {
      var edit_id = Drupal.settings.imageeditor.save.element_id.replace(/[0-9]+$/, '');
      // Save as new image.
      Drupal.settings.imageeditor.save.replace = Drupal.settings.imageeditor.save.replace || Drupal.settings.imageeditor_imagefield[Drupal.settings.imageeditor.save.field_name].imageeditor_replace;
      if (Drupal.settings.imageeditor.save.create || !Drupal.settings.imageeditor.save.replace) {
        // Upload new element.
        $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {
          var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$');
          return regex.test(this.id);
        }).click();
        $('input[id^="'+edit_id+'"][id*="-filefield-remote-url"]').filter(function() {
          var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-url(-[0-9]+)?$');
          return regex.test(this.id);
        }).val(Drupal.settings.imageeditor.save.image);
        $('input[id^="'+edit_id+'"][id*="-filefield-remote-transfer"]').filter(function() {
          var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-transfer(-[0-9]+)?$');
          return regex.test(this.id);
        }).mousedown();
      }
      // Replace the original image.
      else {
        if (typeof $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$'); return regex.test(this.id);})[0] !== 'undefined') {
          // Fill in remote url.
          $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {
            var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$');
            return regex.test(this.id);
          }).click();
          $('input[id^="'+edit_id+'"][id*="-filefield-remote-url"]').filter(function() {
            var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-url(-[0-9]+)?$');
            return regex.test(this.id);
          }).val(Drupal.settings.imageeditor.save.image);
          // Call submit through remove button.
          $('input[id^="'+Drupal.settings.imageeditor.save.element_id+'-remove-button"]').mousedown();
        }
        else {
          // Remove element.
          $('input[id^="'+Drupal.settings.imageeditor.save.element_id+'-remove-button"]').mousedown();
          // Upload new element in 0.5 seconds.
          setTimeout(function(){Drupal.imageeditor_imagefield.internal();}, 500);
        }
      }
    },
    internal: function() {
      var edit_id = Drupal.settings.imageeditor.save.element_id.replace(/[0-9]+$/, '');
      if (typeof $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$'); return regex.test(this.id);})[0] !== 'undefined') {
        $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {
          var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$');
          return regex.test(this.id);
        }).click();
        $('input[id^="'+edit_id+'"][id*="-filefield-remote-url"]').filter(function() {
          var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-url(-[0-9]+)?$');
          return regex.test(this.id);
        }).val(Drupal.settings.imageeditor.save.image);
        $('input[id^="'+edit_id+'"][id*="-filefield-remote-transfer"]').filter(function() {
          var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-transfer(-[0-9]+)?$');
          return regex.test(this.id);
        }).mousedown();
      }
      else {
        setTimeout(function(){Drupal.imageeditor_imagefield.internal();}, 500);
      }
    }
  };

})(jQuery);
