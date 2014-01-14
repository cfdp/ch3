<?php
/**
 * @file
 * External service uploaders for Image Editor module.
 */

/**
 * Implements hook_imageeditor_uploaders().
 */
function imageeditor_imageeditor_uploaders() {
  $uploaders = array(
    'pixlr_upload' => array(
      'name' => t('Pixlr Upload'),
      'description' => t('Upload to http://pixlr.com service'),
      'class' => 'pixlr-upload',
      'site' => 'http://pixlr.com/',
      'api_key' => FALSE,
      'upload_url' => 'http://pixlr.com/store/',
      'post_callback' => 'imageeditor_uploader_pixlr_upload_post_callback',
      'response_callback' => 'imageeditor_uploader_pixlr_upload_response_callback',
    ),
    'immio_upload' => array(
      'name' => t('imm.io Upload'),
      'description' => t('Upload to http://imm.io service'),
      'class' => 'immio-upload',
      'site' => 'http://imm.io/api/',
      'api_key' => FALSE,
      'upload_url' => 'http://imm.io/store/',
      'post_callback' => 'imageeditor_uploader_immio_upload_post_callback',
      'response_callback' => 'imageeditor_uploader_immio_upload_response_callback',
    ),
    'imageshack_upload' => array(
      'name' => t('ImageShack Upload'),
      'description' => t('Upload to http://imageshack.us service'),
      'class' => 'imageshack-upload',
      'site' => 'http://imageshack.us/',
      'api_key' => TRUE,
      'api_key_codename' => 'imageeditor_imageshack_api_key',
      'upload_url' => 'http://www.imageshack.us/upload_api.php',
      'post_callback' => 'imageeditor_uploader_imageshack_upload_post_callback',
      'response_callback' => 'imageeditor_uploader_imageshack_upload_response_callback',
    ),
  );

  return $uploaders;
}

function imageeditor_uploader_pixlr_upload_post_callback($filepath) {
  return array(
    'image' => $filepath,
  );
}

function imageeditor_uploader_pixlr_upload_response_callback($response) {
  return $response;
}

function imageeditor_uploader_immio_upload_post_callback($filepath) {
  return array(
    'image' => $filepath,
  );
}

function imageeditor_uploader_immio_upload_response_callback($response) {
  $result = drupal_json_decode($response);
  if ($result['success']) {
    return $result['payload']['uri'];
  }
  else {
    return $result['payload'];
  }
}

function imageeditor_uploader_imageshack_upload_post_callback($filepath) {
  // Imageshack needs mimetype to be added.
  $type = file_get_mimetype($filepath);
  $filepath = $filepath . ';type=' . $type;
  return array(
    'fileupload' => $filepath,
    'key' => variable_get('imageeditor_imageshack_api_key', ''),
    'xml' => 'yes',
  );
}

function imageeditor_uploader_imageshack_upload_response_callback($response) {
  $xml = simplexml_load_string($response);
  if ($xml) {
    if (isset($xml->error)) {
      return (string) $xml->error;
    }
    else {
      return (string) $xml->links->image_link;
    }
  }
}
