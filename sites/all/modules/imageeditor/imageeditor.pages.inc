<?php
/**
 * @file
 * Different pages for Image Editor module.
 */

/**
 * AJAX callback to save the image.
 */
function imageeditor_save($service = NULL) {
  if (!$service) {
    return '';
  }

  // Prepare temporary directory.
  $directory = imageeditor_temporary_directory();
  if (!file_prepare_directory($directory, FILE_CREATE_DIRECTORY)) {
    watchdog('imageeditor', 'Directory %directory could not be created.', array('%directory' => $directory), WATCHDOG_WARNING);
    drupal_json_output('There was an error saving your image. Please contact site administrator.');
    exit;
  }

  $editors = imageeditor_editors();
  // Process image per service.
  if (isset($editors[$service]['save_callback']) && function_exists($editors[$service]['save_callback'])) {
    $editors[$service]['save_callback']();
  }

  return '';
}

/**
 * AJAX callback to close the editor.
 */
function imageeditor_close($service = NULL) {
  if (!$service) {
    return '';
  }

  $js_code = 'if (parent) {';
  $js_code .= 'parent.Drupal.imageeditor.overlay.hide();';
  $js_code .= '}';
  $js_code .= 'else {';
  $js_code .= 'self.close();';
  $js_code .= '}';

  drupal_add_js($js_code, 'inline');
  return '';
}

/**
 * AJAX callback to upload the image to external service.
 */
function imageeditor_upload($service = NULL) {
  $uploaders = imageeditor_uploaders();
  if (!array_key_exists($service, $uploaders)) {
    drupal_json_output('');
    exit;
  }

  global $base_url;
  // TODO: need to fix this somehow... @see imageeditor_inline_url_to_uri().
  $filepath = '@' . drupal_realpath(str_replace($base_url . '/', '', $_POST['url']));

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_VERBOSE, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
  curl_setopt($ch, CURLOPT_TIMEOUT, 120);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_URL, $uploaders[$service]['upload_url']);
  $post_callback = $uploaders[$service]['post_callback'];
  if (function_exists($post_callback)) {
    $post = $post_callback($filepath);
  }
  curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

  $response = curl_exec($ch);
  curl_close($ch);

  $output = '';
  $response_callback = $uploaders[$service]['response_callback'];
  if (function_exists($response_callback)) {
    $output = $response_callback($response);
  }

  drupal_json_output($output);
  exit;
}

/**
 * Page callback for jQuery webcam image editor.
 */
function imageeditor_webcam() {
  drupal_add_js('sites/all/libraries/jquery-webcam/jquery.webcam.js');
  drupal_add_js(drupal_get_path('module', 'imageeditor') . '/js/imageeditor.webcam.js');
  drupal_add_js(array('imageeditor' => array('webcam' => array('swffile' => '/sites/all/libraries/jquery-webcam/jscam.swf'))), 'setting');
  
  $output = '<div id="imageeditor_webcam_status"></div>';
  $output .= '<div id="imageeditor_webcam"></div>';
  $output .= '<div id="imageeditor_webcam_cams"></div>';
  $output .= theme('item_list', array(
    'title' => 'Available options',
    'items' => array(
      array('data' => t('Take a picture instantly'), 'id' => 'imageeditor_webcam_capture'),
      array('data' => t('Take a picture after 5 seconds'), 'id' => 'imageeditor_webcam_capture5')
    ),
  ));
  
  return $output;
}

/**
 * Page callback for ScriptCam image editor.
 */
function imageeditor_scriptcam() {
  drupal_add_js('sites/all/libraries/swfobject/src/swfobject.js');
  drupal_add_js('sites/all/libraries/jquery-scriptcam/scriptcam.js');
  drupal_add_js(drupal_get_path('module', 'imageeditor') . '/js/imageeditor.scriptcam.js');
  drupal_add_js(array('imageeditor' => array('scriptcam' => array('path' => '/sites/all/libraries/jquery-scriptcam/'))), 'setting');

  $output = '<div id="imageeditor_scriptcam_status"></div>';
  $output .= '<div id="imageeditor_scriptcam"></div>';
  $output .= '<select id="imageeditor_scriptcam_cams"></select>';
  $output .= '<select id="imageeditor_scriptcam_mics"></select>';
  
  return $output;
}
