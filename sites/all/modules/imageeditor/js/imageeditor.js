/*global Drupal: false, jQuery: false, Aviary: false, PaintWeb: false, pwlib: false */
/*jslint devel: true, browser: true, maxerr: 50, indent: 2 */
(function ($) {
  "use strict";

  if (typeof(Drupal.imageeditor) === 'undefined') {
    Drupal.imageeditor = {
      buildUrl: function(opt) {
        var url = opt.launch_url;
        var first_attr = true;
        // For non-clean URLs.
        if (url.indexOf('?') > -1) {
          first_attr = false;
        }
        for (var attribute in opt) {
          if (attribute !== 'launch_url') {
            if (first_attr) {
              url += '?' + attribute + '=' + encodeURIComponent(opt[attribute]);
              first_attr = false;
            }
            else {
              url += '&' + attribute + '=' + encodeURIComponent(opt[attribute]);
            }
          }
        }
        return url;
      },
      popup: {
        show: function(options, title) {
          title = title || '';
          var popup_window = window.open(Drupal.imageeditor.buildUrl(options), 'imageeditor', 'location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=yes,toolbar=no,channelmode=yes,fullscreen=yes');
          popup_window.focus();
        }
      },
      aviaryfeather: function() {
        if (typeof(Aviary) !== 'undefined' && typeof(Drupal.settings.imageeditor.aviary_feather) !== 'undefined') {
          var options = Drupal.settings.imageeditor.aviary_feather.options;
          options.onSave = function(imageID, newURL, hiResURL) {
            Drupal.settings.imageeditor.save.image = newURL;
            Drupal.settings.imageeditor.save.hiresimage = hiResURL;
            if (options.closeonsave) {
              Drupal.imageeditor.aviaryfeather.close();
            }
          };
          options.onClose = function(isDirty) {
            if (typeof Drupal.settings.imageeditor.save.image !== 'undefined') {
              Drupal.imageeditor.save();
            }
          };
          return new Aviary.Feather(options);
        }
        else {
          return {};
        }
      }(),
      paintweb: {
        save: function(ev) {
          ev.preventDefault();
          Drupal.imageeditor.overlay.hide();

          $.ajax({
            type: 'POST',
            url: Drupal.settings.imageeditor.paintweb.options.saveurl,
            async: false, // explicitly need the user to wait while we load...
            data: {'data': ev.dataURL, 'url': Drupal.settings.imageeditor.url},
            success: function(data) {
              ev.target.events.dispatch(new pwlib.appEvent.imageSaveResult(true));
              // Destroy the PaintWeb instance.
              ev.target.destroy();
              Drupal.settings.imageeditor.url = 'undefined';
              Drupal.settings.imageeditor.save.image = data;
              Drupal.imageeditor.save();
            },
            error: function(msg) {
              ev.target.events.dispatch(new pwlib.appEvent.imageSaveResult(false));
              // Destroy the PaintWeb instance.
              ev.target.destroy();
              Drupal.settings.imageeditor.url = 'undefined';
              alert('Failed saving: ' + msg);
            }
          });
        }
      },
      initialize: function(options) {
        //console.log(options);
        Drupal.imageeditor.save = options.callback;
        var editors_sort = [], uploaders_sort = [], editors_html = '', uploaders_html = '', html, data_html = '';
        $.each(options.editors, function(index, value) {editors_sort.push([index, value]);});
        editors_sort.sort(function(a, b) {return a[1] - b[1];});
        $.each(options.uploaders, function(index, value) {uploaders_sort.push([index, value]);});
        uploaders_sort.sort(function(a, b) {return a[1] - b[1];});

        $.each(editors_sort, function(index, value) {
          if (typeof(options.image) !== 'undefined' || Drupal.settings.imageeditor[value[0]].image_creation) {
            editors_html += Drupal.settings.imageeditor[value[0]].html;
          }
        });
        editors_html = '<div class="editors">' + editors_html + '</div>';
        if (typeof(options.image) !== 'undefined') {
          $.each(uploaders_sort, function(index, value) {uploaders_html += Drupal.settings.imageeditor[value[0]].html;});
          uploaders_html = '<div class="uploaders">' + uploaders_html + '</div>';
          $.each(options.image, function(index, value) {
            data_html = data_html + '<input type="hidden" class="'+index+'" value="'+value+'">';
            if (index === 'url') {
              data_html = data_html + '<input type="hidden" class="origurl" value="'+value+'">';
            }
          });
        }
        if (typeof(options.data) !== 'undefined') {
          $.each(options.data, function(index, value) {data_html = data_html + '<input type="hidden" class="'+index+'" value="'+value+'">';});
        }
        html = '<div class="imageeditor">' + data_html + editors_html + uploaders_html + '</div>';

        var $imageeditor_div = $(html), method = options.method || 'after';
        options.$element[method]($imageeditor_div);

        $imageeditor_div.find('div.editors').find('div').not('.paintweb, .deviantartmuro, .aviary-feather, .imageeditor-photobooth').unbind('click').click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          var codename = $(this).attr('class').split(' ')[0].replace(/-/g, '_');
          var url = $(this).parent().parent().find('.url').attr('value');
          var origurl = $(this).parent().parent().find('.origurl').attr('value');
          Drupal.settings.imageeditor.save = {};
          $(this).parent().parent().find('input').each(
            function(index) {
              Drupal.settings.imageeditor.save[$(this).attr('class')] = $(this).attr('value');
            }
          );
          var options = Drupal.settings.imageeditor[codename].options;
          if (typeof(url) !== 'undefined') {
            options[Drupal.settings.imageeditor[codename].image_url_param] = url;
            Drupal.settings.imageeditor.save.create = 0;
            var filename = origurl.replace(new RegExp('.*/', 'g'), '');
            $.cookie('imageeditor_filename', filename, {expires: 7, path: Drupal.settings.basePath});
            //filename = filename.replace(new RegExp('\\.[^\\.]*$', 'g'), '');
            if (codename === 'pixlr_editor' || codename === 'pixlr_express') {
              options.title = filename;
            }
            else if (codename === 'picmonkey') {
              options._title = filename;
              options._imageid = filename;
            }
          }
          else {
            delete options[Drupal.settings.imageeditor[codename].image_url_param];
            Drupal.settings.imageeditor.save.create = 1;
          }
          Drupal.imageeditor[Drupal.settings.imageeditor[codename].launch_type].show(options, $(this).attr('title'));
        });

        $imageeditor_div.find('div.aviary-feather').unbind('click').click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          Drupal.settings.imageeditor.save = {};
          Drupal.settings.imageeditor.save.create = 0;
          $(this).parent().parent().find('input').each(
            function(index) {
              Drupal.settings.imageeditor.save[$(this).attr('class')] = $(this).attr('value');
            }
          );
          var url = $(this).parent().parent().find('.url').attr('value');
          var options = {image: $('<img />').attr('src', Drupal.settings.imageeditor.aviary_feather.loading_url).get(0), url: url};
          if (Drupal.settings.imageeditor.aviary_feather.options.timestamp) {
            options.hiresUrl = url;
            //options.timestamp = Drupal.settings.imageeditor.aviary_feather.options.timestamp;
            //options.signature = Drupal.settings.imageeditor.aviary_feather.options.signature;
          }
          Drupal.imageeditor.aviaryfeather.launch(options);
        });

        $imageeditor_div.find('div.paintweb').unbind('click').click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          var url = $(this).parent().parent().find('.url').attr('value'),
            pw = new PaintWeb(), img = document.createElement('img'), canvas;
          Drupal.settings.imageeditor.save = {};
          $(this).parent().parent().find('input').each(
            function(index) {
              Drupal.settings.imageeditor.save[$(this).attr('class')] = $(this).attr('value');
            }
          );
          pw.config.configFile = Drupal.settings.imageeditor.paintweb.options.configFile;
          if (url) {
            Drupal.settings.imageeditor.save.create = 0;
            img.src = url;
            pw.config.imageLoad = img;
            Drupal.settings.imageeditor.url = url;
          }
          else {
            Drupal.settings.imageeditor.save.create = 1;
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', 600);
            canvas.setAttribute('height', 600);
            img.src = canvas.toDataURL('image/png');
            pw.config.imageLoad = img;
            Drupal.settings.imageeditor.url = 'undefined';
          }
          Drupal.imageeditor.overlay.show({}, $(this).attr('title'));
          var $placeholder = $('.imageeditor-modal');
          pw.config.guiPlaceholder = $placeholder.get(0);
          pw.config.viewportWidth = $placeholder.width() + 'px';
          pw.config.viewportHeight = ($placeholder.height() - 140) + 'px';
          pw.init(function (ev) {
            if (ev.state === PaintWeb.INIT_ERROR) {
              alert('PaintWeb failed loading!');
            }
          });
          pw.events.add('imageSave', Drupal.imageeditor.paintweb.save);
        });

        $imageeditor_div.find('div.deviantartmuro').unbind('click').click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          var url = $(this).parent().parent().find('.url').attr('value');
  
          Drupal.imageeditor.overlay.show({}, $(this).attr('title'));
          $('.imageeditor-modal').damuro({
            sandbox: Drupal.settings.imageeditor.deviantartmuro.options.sandbox
          });
        });

        $imageeditor_div.find('div.imageeditor-photobooth').unbind('click').click(function(event) {
          event.preventDefault();
          event.stopPropagation();
  
          Drupal.settings.imageeditor.save = {};
          $(this).parent().parent().find('input').each(
            function(index) {
              Drupal.settings.imageeditor.save[$(this).attr('class')] = $(this).attr('value');
            }
          );

          Drupal.imageeditor.overlay.show({}, $(this).attr('title'));
          var pb_div = document.createElement('div'), pbg_div = document.createElement('div');
          pb_div.id = 'imageeditor_photobooth';
          pbg_div.id = 'imageeditor_photobooth_gallery';
          $('.imageeditor-modal').append(pb_div);
          $('.imageeditor-modal').append(pbg_div);
          var $photobooth = $('#imageeditor_photobooth').width(640).height(480);
          /* jQuery case */
          $photobooth.photobooth().on('image', function(event, dataUrl) {
            $('#imageeditor_photobooth_gallery').append( '<img src="' + dataUrl + '" class="imageeditor-photobooth-gallery-thumb" width="160" height="120" style="display: none;">');
            if ($('.imageeditor-photobooth-gallery-thumb').length > 4) {
              $('.imageeditor-photobooth-gallery-thumb').first().fadeOut('slow', function() {
                $('.imageeditor-photobooth-gallery-thumb').first().remove();
                $('.imageeditor-photobooth-gallery-thumb').last().fadeIn('slow');
              });
            }
            else {
              $('.imageeditor-photobooth-gallery-thumb').last().fadeIn('slow');
            }
            $('.imageeditor-photobooth-gallery-thumb').last().css({cursor: 'pointer'}).click(function(event) {
              $photobooth.data('photobooth').destroy();
              Drupal.imageeditor.overlay.hide();
              $.ajax({
                type: 'POST',
                url: Drupal.settings.imageeditor.imageeditor_photobooth.options.saveurl,
                async: false, // explicitly need the user to wait while we load...
                data: {'data': $(this).attr('src'), 'url': Drupal.settings.imageeditor.url},
                success:
                  function(data) {
                    Drupal.settings.imageeditor.save.image = data;
                    Drupal.imageeditor.save();
                  },
                error: function(msg) {alert("Failed saving: " + msg);}
              });
            });
          });
        });

        $imageeditor_div.find('div.uploaders').find('div').unbind('click').click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          var codename = $(this).attr('class').split(' ')[0].replace(/-/g, '_');
          var $url = $(this).parent().parent().find('.url');
          var url = $url.attr('value');
          var filepath = $(this).parent().parent().find('.filepath').attr('value');
          $.ajax({
            type: 'POST',
            url: Drupal.settings.imageeditor[codename].upload_url,
            async: false, // explicitly need the user to wait while we load...
            data: {'filepath': filepath, 'url': url},
            success: function(data) {$url.attr('value', data);},
            error: function(msg) {alert("Failed uploading: " + msg);}
          });
        });
      } 
    };
  }

})(jQuery);
