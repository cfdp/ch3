<?php
/**
 * @file
 * cyberhus_banner.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function cyberhus_banner_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "bean_admin_ui" && $api == "bean") {
    return array("version" => "5");
  }
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function cyberhus_banner_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function cyberhus_banner_image_default_styles() {
  $styles = array();

  // Exported image style: banner_large.
  $styles['banner_large'] = array(
    'label' => 'banner_large',
    'effects' => array(
      16 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 1920,
          'height' => 400,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_paragraphs_info().
 */
function cyberhus_banner_paragraphs_info() {
  $items = array(
    'banner_slide' => array(
      'name' => 'Banner Slide',
      'bundle' => 'banner_slide',
      'locked' => '1',
    ),
  );
  return $items;
}
