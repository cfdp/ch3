(function ($) {

Drupal.behaviors.imageeditor_imagefield = {};
Drupal.behaviors.imageeditor_imagefield.attach = function(context, settings) {
  //to show as overlay over the image preview
  /*$imageeditor_divs_existing.each(
    function(index) {
      var field_name = $(this).find('.field_name').attr('value');
      if (Drupal.settings.imageeditor_imagefield.[field_name]['imageeditor_icons_position'] == 1) {
        $(this).parent().css({'position': 'relative', 'width': '100px'}).hover(
          function() {
            $(this).find('.imageeditor').css({'position': 'absolute', 'top': 0}).show();
          },
          function() {
            $(this).find('.imageeditor').hide();
          }
        ).find('.imageeditor').hide();
      }
    }
  );*/
  
  $.each(Drupal.settings.imageeditor_imagefield, function(index, value) {
  //TODO: remove the processed values from Drupal.settigns - as the AJAX callback returns all the field values
    var field_name = index, editors = value.editors, uploaders = value.uploaders;
    $.each(this.items, function(index, value) {
      var element_id = value;
      $removebutton = $('input#'+value+'-remove-button', context);
      $createimage = $('a#'+value+'-imageeditor-source', context);
      if ($removebutton.size()) {
        if ($removebutton.not('.imageeditor-imagefield-processed').size()) {
          $removebutton.addClass('imageeditor-imagefield-processed');
          if ($removebutton.parents('div.image-widget-data').size()) {
            $imagewidget = $removebutton.parents('div.image-widget-data');
          }
          else {
            $imagewidget = $removebutton.parents('tr').find('div.image-widget-data');
          }
          var url = $imagewidget.find('span.file').find('a').attr('href'),
          $element = $imagewidget.children().last();
          var options = {editors: editors, uploaders: uploaders, image: {url: url}, data: {field_name: field_name, element_id: element_id}, $element: $element, callback: Drupal.imageeditor_imagefield.save};
          Drupal.imageeditor.initialize(options);
        }
      }
      else if ($createimage.size()) {
        if ($createimage.not('.imageeditor-imagefield-processed').size()) {
          $createimage.addClass('imageeditor-imagefield-processed');
          $imageeditor_source = $createimage.parents('div.image-widget-data').find('div.filefield-source-imageeditor');
          var options = {editors: editors, uploaders: uploaders, data: {field_name: field_name, element_id: element_id}, $element: $imageeditor_source.find('div'), callback: Drupal.imageeditor_imagefield.save};
          if (Drupal.settings.imageeditor_imagefield[field_name].source_imageeditor_image) {
            options.image = {url: Drupal.settings.imageeditor_imagefield[field_name].source_imageeditor_image};
          }
          Drupal.imageeditor.initialize(options);
          //launch the editor upon clicking on the "Create image" link if there is only one editor
          $editors = $imageeditor_source.find('div.editors').find('div');
          if ($editors.length == 1) {
            $createimage.click(function(event) {
              $editors.click();
            });
          }
        }
      }
    });
  });
};

Drupal.imageeditor_imagefield = {
  save: function() {
    var edit_id = Drupal.settings.imageeditor.save.element_id.replace(/[0-9]+$/, '');
    //SAVE NEW
    if (Drupal.settings.imageeditor.save.create || !Drupal.settings.imageeditor_imagefield[Drupal.settings.imageeditor.save.field_name]['imageeditor_replace']) {
      //upload new element
      $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$'); return regex.test(this.id);}).click();
      $('input[id^="'+edit_id+'"][id$="-filefield-remote-url"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-url$'); return regex.test(this.id);}).val(Drupal.settings.imageeditor.save.image);
      $('input[id^="'+edit_id+'"][id$="-filefield-remote-transfer"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-transfer$'); return regex.test(this.id);}).mousedown();
    }
    //REPLACE
    else {
      if (typeof $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$'); return regex.test(this.id);})[0] != 'undefined') {
        //fill in remote url
        $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$'); return regex.test(this.id);}).click();
        $('input[id^="'+edit_id+'"][id$="-filefield-remote-url"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-url$'); return regex.test(this.id);}).val(Drupal.settings.imageeditor.save.image);
        //call submit through remove button
        $('input[id="'+Drupal.settings.imageeditor.save.element_id+'-remove-button"]').mousedown();
      }
      else {
        //remove element
        $('input[id="'+Drupal.settings.imageeditor.save.element_id+'-remove-button"]').mousedown();
        //upload new element in .5 seconds
        setTimeout(function(){Drupal.imageeditor_imagefield.internal();}, 500);
      }
    }
  },
  internal: function() {
    var edit_id = Drupal.settings.imageeditor.save.element_id.replace(/[0-9]+$/, '');
    if (typeof $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$'); return regex.test(this.id);})[0] != 'undefined') {
      $('a[id^="'+edit_id+'"][id$="-remote-source"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-remote-source$'); return regex.test(this.id);}).click();
      $('input[id^="'+edit_id+'"][id$="-filefield-remote-url"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-url$'); return regex.test(this.id);}).val(Drupal.settings.imageeditor.save.image);
      $('input[id^="'+edit_id+'"][id$="-filefield-remote-transfer"]').filter(function() {var regex = new RegExp('^'+edit_id+'[0-9]+-filefield-remote-transfer$'); return regex.test(this.id);}).mousedown();
    }
    else {
      setTimeout(function(){Drupal.imageeditor_imagefield.internal();}, 500);
    }
  }
};

})(jQuery);
