<?php
/**
 * @file
 * cyberhus_avatars.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function cyberhus_avatars_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function cyberhus_avatars_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function cyberhus_avatars_image_default_styles() {
  $styles = array();

  // Exported image style: avatar_large.
  $styles['avatar_large'] = array(
    'label' => 'avatar_large',
    'effects' => array(
      19 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 256,
          'height' => 256,
          'upscale' => 0,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: avatar_medium.
  $styles['avatar_medium'] = array(
    'label' => 'avatar_medium',
    'effects' => array(
      18 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 160,
          'height' => 160,
          'upscale' => 0,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: avatar_thumbnail.
  $styles['avatar_thumbnail'] = array(
    'label' => 'avatar_thumbnail',
    'effects' => array(
      17 => array(
        'name' => 'image_scale',
        'data' => array(
          'width' => 40,
          'height' => 40,
          'upscale' => 0,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}
