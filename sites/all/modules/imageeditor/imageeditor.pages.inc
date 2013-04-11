<?php
function imageeditor_save($service= NULL) {
  if (in_array($service, array('pixlr', 'aviary', 'picnik', 'picmonkey', 'fotoflexer', 'sumopaint', 'paintweb', 'svgedit', 'snipshot'))) {
    if (in_array($service, array('pixlr', 'fotoflexer', 'sumopaint', 'paintweb', 'svgedit', 'snipshot'))) {$image_param = 'image';}
    elseif ($service == 'aviary') {$image_param = 'imageurl';}
    elseif ($service == 'picnik' || $service == 'picmonkey') {$image_param = 'file';}
    
    // Create directory for services that need to save locally
    if (in_array($service, array('sumopaint', 'paintweb', 'svgedit'))) {
      $directory = file_default_scheme() . '://imageeditor/temp';
      if (!file_prepare_directory($directory, FILE_CREATE_DIRECTORY)) {
        watchdog('imageeditor', 'Directory %directory could not be created.', array('%directory' => $directory), WATCHDOG_WARNING);
        drupal_json_output('There was an error saving your image. Please contact site administrator.');
        exit;
      }
    }
    
    if (in_array($service, array('pixlr', 'picnik', 'picmonkey', 'fotoflexer', 'snipshot'))) {
      if (isset($_GET[$image_param])) {
        $image = rawurldecode($_GET[$image_param]);
      }
    }
    elseif ($service == 'aviary') {
      if (isset($_POST[$image_param])) {
        $image = rawurldecode($_POST[$image_param]);
      }
      elseif (isset($_GET[$image_param])) {
        $image = rawurldecode($_GET[$image_param]);
      }
    }
    elseif ($service == 'sumopaint') {
      if (isset($_POST['data'])) {
        if ($_POST['url']) {
          $uri = $directory . '/' . basename($_POST['url']);
        }
        else {
          $uri = $directory . '/' . md5($_POST['data']) . '.png';
        }
        $file = file_unmanaged_save_data(base64_decode($_POST['data']), $uri);
        $image = file_create_url($file);
      }
    }
    elseif ($service == 'paintweb') {
      if (isset($_POST['data'])) {
        if ($_POST['url'] && $_POST['url'] != 'undefined') {
          $uri = $directory . '/' . basename($_POST['url']);
        }
        else {
          $uri = $directory . '/' . md5($_POST['data']) . '.png';
        }
        $file = file_unmanaged_save_data(base64_decode($_POST['data']), $uri);
        drupal_json_output(file_create_url($file));
        exit;
      }
    }
    elseif ($service == 'svgedit') {
      if (isset($_POST['output_png'])) {
        $uri = $directory . '/' . md5($_POST['output_png']) . '.png';
        $file = file_unmanaged_save_data(base64_decode(substr($_POST['output_png'], 22)), $uri);
        $image = file_create_url($file);
      }
    }
    
    $js_code = '';
    if (in_array($service, array('pixlr', 'picnik', 'picmonkey', 'paintweb', 'snipshot'))) {$parent_type = 'parent';}
    elseif (in_array($service, array('aviary', 'svgedit'))) {$parent_type = 'parent.parent';}
    elseif (in_array($service, array('fotoflexer', 'sumopaint'))) {$parent_type = 'opener';}
    $js_code .= 'if(' . $parent_type . ') {';
    if (in_array($service, array('picnik', 'picmonkey')) && isset($_GET['_imageid'])) {
      $js_code .= $parent_type . '.Drupal.settings.imageeditor.save.replace = "' . 1 . '";';
    }
    elseif (in_array($service, array('picnik', 'picmonkey')) && !isset($_GET['_imageid'])) {
      $js_code .= $parent_type . '.Drupal.settings.imageeditor.save.replace = "' . 0 . '";';
    }
    $js_code .= $parent_type . '.Drupal.settings.imageeditor.save.image = "' . $image . '";';
    $js_code .= $parent_type . '.Drupal.imageeditor.save();';
    if (in_array($service, array('pixlr', 'aviary', 'picnik', 'picmonkey', 'paintweb', 'svgedit', 'snipshot'))) {$js_code .= $parent_type . '.Drupal.imageeditor.overlay.hide();';}
    elseif (in_array($service, array('fotoflexer', 'sumopaint'))) {$js_code .= 'self.close();';}
    $js_code .= '}';
  }
  
  drupal_add_js($js_code, 'inline');
  return '';
}

function imageeditor_close($service = NULL) {
  $js_code = '';
  if (in_array($service, array('pixlr', 'picnik', 'picmonkey', 'aviary'))) {
    $js_code .= 'if(parent) {';
    $js_code .= 'parent.Drupal.imageeditor.overlay.hide();';
    $js_code .= '}';
  }
  elseif ($service == 'fotoflexer') {
    $js_code .= 'self.close();';
  }
  
  /*$js_code .= 'if(parent) {';
  $js_code .= 'parent.Drupal.imageeditor.overlay.hide();';
  $js_code .= '}';
  $js_code .= 'else {';
  $js_code .= 'self.close();';
  $js_code .= '}';*/
  
  drupal_add_js($js_code, 'inline');
  return '';
}

function imageeditor_upload($service = NULL) {
  global $base_url;
  $filepath = '@' . drupal_realpath(str_replace($base_url . '/', '', $_POST['url']));
  
  //Imageshack needs mimetype to be added
  if ($service == 'imageshack_upload') {
    $type = file_get_mimetype($_POST['filepath']);
    $filepath = $filepath . ';type=' . $type;
  }
  
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_VERBOSE, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
  curl_setopt($ch, CURLOPT_TIMEOUT, 120);
  curl_setopt($ch, CURLOPT_POST, true);
  if ($service == 'pixlr_upload') {
    $url = 'http://pixlr.com/store/';
    $post = array(
      'image' => $filepath,
    );
  }
  elseif ($service == 'immio_upload') {
    $url = 'http://imm.io/store/';
    $post = array(
      'image' => $filepath,
    );
  }
  elseif ($service == 'imageshack_upload') {
    $url = 'http://www.imageshack.us/upload_api.php';
    $post = array(
      'fileupload' => $filepath,
      'key' => variable_get('imageeditor_imageshack_api_key', ''),
      'xml' => 'yes',
    );
  }
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
  
  $response = curl_exec($ch);
  curl_close($ch);
  
  if ($service == 'pixlr_upload') {
    drupal_json_output($response);
    exit;
  }
  elseif ($service == 'immio_upload') {
    $result = drupal_json_decode($response);
    if ($result['success']) {
      drupal_json_output($result['payload']['uri']);
      exit;
    }
    else {
      drupal_json_output($result['payload']);
      exit;
    }
  }
  elseif ($service == 'imageshack_upload') {
    $xml = simplexml_load_string($response);
    if ($xml) {
      if (isset($xml->error)) {
        drupal_json_output($xml->error);
        exit;
      }
      else {
        drupal_json_output($xml->links->image_link);
        exit;
      }
    }
  }
}
