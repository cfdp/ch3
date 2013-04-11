(function ($) {

if (typeof(Drupal.imageeditor) == 'undefined') {
Drupal.imageeditor = function() {
  function windowSize() {
    var w = 0, h = 0;
    if(!(document.documentElement.clientWidth == 0)) {
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
    }
    else {
      w = document.body.clientWidth;
      h = document.body.clientHeight;
    }
    return {width:w,height:h};
  }
  function buildUrl(opt) {
    var url = opt.launch_url;
    var first_attr = 'yes';
    if (url.indexOf('?') > -1) {first_attr = 'no';} //for non-clean URLs
    for (var attribute in opt) {
      if(attribute !== 'launch_url') {
        if (first_attr == 'yes') {
          url += "?"+ attribute +"="+ escape(opt[attribute]);
          first_attr = 'no';
        }
        else {
          url += "&"+ attribute +"="+ escape(opt[attribute]);
        }
      }
    }
    return url;
  }
  function paintweb_save(ev) {
    ev.preventDefault();
    var tmp = ev.dataURL.split(',');
    Drupal.imageeditor.overlay.hide();
    
    $.ajax({
      type: 'POST',
      url: Drupal.settings.imageeditor.paintweb.options.saveurl,
      async: false, // explicitly need the user to wait while we load...
      data: {'data': tmp[1], 'url': Drupal.settings.imageeditor.url},
      success: 
        function(data) {
          Drupal.settings.imageeditor.save.image = data;
          Drupal.imageeditor.save();
        },
      error: function(msg) {alert("Failed saving: " + msg);}
    });
    Drupal.settings.imageeditor.url = 'undefined';
    
    //pw.events.dispatch(new appEvent.imageSaveResult(true));
    //pw.events.dispatch(new appEvent.imageSaveResult(false));
  };
  var bo = {
    ie: window.ActiveXObject,
    ie6: window.ActiveXObject && (document.implementation != null) && (document.implementation.hasFeature != null) && (window.XMLHttpRequest == null),
    quirks: document.compatMode==='BackCompat'
  };
  return {
    overlay: {
      show: function(options) {
        var iframe = document.createElement('iframe'),
        div = document.createElement('div'),
        idiv = document.createElement('div'),
        div_close = document.createElement('div');
        iframe.className = 'imageeditor-iframe';
        div.className = 'imageeditor-external';
        idiv.className = 'imageeditor-internal';
        div_close.className = 'imageeditor-close';
        
        if((bo.ie && bo.quirks) || bo.ie6) {
          var size = windowSize();
          div.style.position = 'absolute';
          div.style.width = size.width + 'px';
          div.style.height = size.height + 'px';
          div.style.setExpression('top', "(t=document.documentElement.scrollTop||document.body.scrollTop)+'px'");
          div.style.setExpression('left', "(l=document.documentElement.scrollLeft||document.body.scrollLeft)+'px'");
        }
        
        if((bo.ie && bo.quirks) || bo.ie6) {
          idiv.style.position = 'absolute';
          idiv.style.setExpression('top', "40+((t=document.documentElement.scrollTop||document.body.scrollTop))+'px'");
          idiv.style.setExpression('left', "40+((l=document.documentElement.scrollLeft||document.body.scrollLeft))+'px'");
        }
        
        document.body.appendChild(div);
        idiv.style.width = (div.offsetWidth - 80) +'px';
        idiv.style.height = (div.offsetHeight - 80) +'px';
        document.body.appendChild(idiv);
        idiv.appendChild(div_close);
        
        if (typeof options != 'undefined') {
          iframe.style.width = (div.offsetWidth - 80) +'px';
          iframe.style.height = (div.offsetHeight - 80) +'px';
          iframe.src = buildUrl(options);
          idiv.appendChild(iframe);
        }
        
        $('div.imageeditor-close').click(
          function() {
            Drupal.imageeditor.overlay.hide();
          }
        );
      },
      hide: function() {
        $('.imageeditor-external').remove();
        $('.imageeditor-internal').remove();
        $('.imageeditor-close').remove();
      }
    },
    popup: {
      show: function(options) {
        popup_window = window.open(buildUrl(options), 'imageeditor', 'location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=yes,toolbar=no,channelmode=yes,fullscreen=yes');
        popup_window.focus();
      }
    },
    aviaryfeather: function() {
      if (typeof(Aviary) != 'undefined' && typeof(Drupal.settings.imageeditor.aviary_feather) != 'undefined') {
        var options = Drupal.settings.imageeditor.aviary_feather.options;
        options.onSave = function(imageID, newURL, hiResURL) {
          Drupal.settings.imageeditor.save.image = newURL;
          Drupal.settings.imageeditor.save.hiresimage = hiResURL;
        };
        options.onClose = function(isDirty) {
          if (typeof Drupal.settings.imageeditor.save.image != 'undefined') {
            Drupal.imageeditor.save();
          }
        };
        return new Aviary.Feather(options);
      }
      else {
        return {};
      };
    }(),
    initialize: function(options) {
      //console.log(options);
      Drupal.imageeditor.save = options.callback;
      var editors_sort = [], uploaders_sort = [], editors_html = '', uploaders_html = '', html = '', data_html = '';
      $.each(options.editors, function(index, value) {editors_sort.push([index, value]);});
      editors_sort.sort(function(a, b) {return a[1] - b[1];});
      $.each(options.uploaders, function(index, value) {uploaders_sort.push([index, value]);});
      uploaders_sort.sort(function(a, b) {return a[1] - b[1];});
      
      $.each(editors_sort, function(index, value) {
        if (typeof(options.image) != 'undefined' || value[0] != 'aviary_feather') {
          editors_html += Drupal.settings.imageeditor[value[0]].html;
        }
      });
      editors_html = '<div class="editors">' + editors_html + '</div>';
      if (typeof(options.image) != 'undefined') {
        $.each(uploaders_sort, function(index, value) {uploaders_html += Drupal.settings.imageeditor[value[0]].html;});
        uploaders_html = '<div class="uploaders">' + uploaders_html + '</div>';
        $.each(options.image, function(index, value) {data_html = data_html + '<input type="hidden" class="'+index+'" value="'+value+'">';});
      }
      if (typeof(options.data) != 'undefined') {
        $.each(options.data, function(index, value) {data_html = data_html + '<input type="hidden" class="'+index+'" value="'+value+'">';});
      }
      html = '<div class="imageeditor">' + data_html + editors_html + uploaders_html + '</div>';
      
      var $imageeditor_div = $(html);
      $imageeditor_div.insertAfter(options.$element);
      
      $imageeditor_div.find('div.editors').find('div').not('.paintweb, .aviary-feather').unbind('click').click(
        function(event) {
          event.preventDefault();
          event.stopPropagation();
          var codename = $(this).attr('class').split(' ')[0].replace(/-/g, '_');
          var url = $(this).parent().parent().find('.url').attr('value');
          Drupal.settings.imageeditor.save = new Object();
          $(this).parent().parent().find('input').each(
            function(index) {
              Drupal.settings.imageeditor.save[$(this).attr('class')] = $(this).attr('value');
            }
          );
          //Drupal.settings.imageeditor.save.replace = Drupal.settings.imageeditor[field_name]['imageeditor_replace'];
          var options = Drupal.settings.imageeditor[codename].options;
          if (typeof(url) != 'undefined') {
            options[Drupal.settings.imageeditor[codename]['image_url_param']] = url;
            Drupal.settings.imageeditor.save.create = 0;
            //if (codename == 'picnik') {options['_imageid'] = element_id;}
          }
          else {
            delete options[Drupal.settings.imageeditor[codename]['image_url_param']];
            Drupal.settings.imageeditor.save.create = 1;
            //if (codename == 'picnik') {delete options['_imageid'];}
          }
          Drupal.imageeditor[Drupal.settings.imageeditor[codename]['launch_type']].show(options);
        }
      );
      
      $imageeditor_div.find('div.aviary-feather').unbind('click').click(
        function(event) {
          event.preventDefault();
          event.stopPropagation();
          Drupal.settings.imageeditor.save = new Object();
          Drupal.settings.imageeditor.save.create = 0;
          $(this).parent().parent().find('input').each(
            function(index) {
              Drupal.settings.imageeditor.save[$(this).attr('class')] = $(this).attr('value');
            }
          );
          //Drupal.settings.imageeditor.save.replace = Drupal.settings.imageeditor[field_name]['imageeditor_replace'];
          var url = $(this).parent().parent().find('.url').attr('value');
          var options = {image: $('<img />').attr('src', Drupal.settings.imageeditor.aviary_feather.loading_url).get(0), url: url};
          if (Drupal.settings.imageeditor.aviary_feather.options.timestamp) {
            options.hiresUrl = url;
       	    //options.timestamp = Drupal.settings.imageeditor.aviary_feather.options.timestamp;
       	    //options.signature = Drupal.settings.imageeditor.aviary_feather.options.signature;
          }
          //console.log(options);
          Drupal.imageeditor.aviaryfeather.launch(options);
        }
      );
      
      $imageeditor_div.find('div.paintweb').unbind('click').click(
        function(event) {
          event.preventDefault();
          event.stopPropagation();
          var url = $(this).parent().parent().find('.url').attr('value');
          Drupal.settings.imageeditor.save = new Object();
          $(this).parent().parent().find('input').each(
            function(index) {
              Drupal.settings.imageeditor.save[$(this).attr('class')] = $(this).attr('value');
            }
          );
          //Drupal.settings.imageeditor.save.replace = Drupal.settings.imageeditor[field_name]['imageeditor_replace'];
          pw = new PaintWeb();
          pw.config.configFile = Drupal.settings.imageeditor.paintweb.options.configFile;
          if (url) {
            Drupal.settings.imageeditor.save.create = 0;
            var img = document.createElement('img');
            img.src = url;
            pw.config.imageLoad = img;
            Drupal.settings.imageeditor.url = url;
          }
          else {
            Drupal.settings.imageeditor.save.create = 1;
            var canvas = document.createElement('canvas');
            canvas.setAttribute('width', 600);
            canvas.setAttribute('height', 600);
            var img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            pw.config.imageLoad = img;
            Drupal.settings.imageeditor.url = 'undefined';
          }
          Drupal.imageeditor.overlay.show();
          pw.config.guiPlaceholder = $('.imageeditor-internal').get(0);
          pw.config.viewportWidth = $('.imageeditor-internal').width() + 'px';
          pw.config.viewportHeight = ($('.imageeditor-internal').height() - 140) + 'px';
          pw.init(function (ev) {
            if (ev.state === PaintWeb.INIT_ERROR) {
              alert('PaintWeb failed loading!');
            }
          });
          pw.events.add('imageSave', paintweb_save);
          //delete pw;
          delete img;
          delete canvas;
        }
      );
      
      $imageeditor_div.find('div.uploaders').find('div').unbind('click').click(
        function(event) {
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
        }
      );
    } 
  };
}();
}

})(jQuery);
