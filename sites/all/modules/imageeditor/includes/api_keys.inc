<?php
/**
 * @file
 * Different API keys for Image Editor editors/uploaders.
 */

/**
 * Implements hook_imageeditor_api_keys().
 */
function imageeditor_imageeditor_api_keys() {
  $api_keys = array(
    'imageeditor_picmonkey_api_key' => array(
      'display_name' => t('PicMonkey API key'),
      'link' => 'https://docs.google.com/document/pub?id=1OhlOYcCvJiV44c13XpDx0HJV3UArKgRya3lq_Ahr5T0',
      'description' => t('API key for PicMonkey image editor')),
    'imageeditor_aviary_api_key' => array(
      'display_name' => t('Aviary Feather API key'),
      'link' => 'http://developers.aviary.com/getfeatherkey',
      'description' => t('API key for Aviary Feather')),
    'imageeditor_sumopaint_api_key' => array(
      'display_name' => t('Sumo Paint API key'),
      'link' => 'http://www.sumopaint.com/getpartner/',
      'description' => t('API key for Sumo Paint image editor')),
    'imageeditor_imageshack_api_key' => array(
      'display_name' => t('ImageShack API key'),
      'link' => 'http://stream.imageshack.us/xmlapi/',
      'description' => t('API key for ImageShack Upload service')),
    /*'imageeditor_dabbleboard_api_key' => array(
      'display_name' => t('Dabbleboard API key'),
      'link' => 'https://www.dabbleboard.com/account/settings',
      'description' => t('API key for Dabbleboard')),*/
  );

  return $api_keys;
}
