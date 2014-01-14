<?php
/**
 * @file
 * Different overlays for Image Editor module.
 */

/**
 * Implements hook_imageeditor_overlays().
 */
function imageeditor_imageeditor_overlays() {
  $overlays = array(
    'custom' => array(
      'name' => t('Image Editor custom overlay'),
      'initialize_callback' => 'imageeditor_overlay_custom_initialize_callback',
    ),
    'jqueryuidialog' => array(
      'name' => t('jQuery UI Dialog'),
      'initialize_callback' => 'imageeditor_overlay_jqueryuidialog_initialize_callback',
    ),
  );
  if (module_exists('colorbox')) {
    $overlays['colorbox'] = array(
      'name' => t('Colorbox'),
      'initialize_callback' => 'imageeditor_overlay_colorbox_initialize_callback',
    );
  }
  if (module_exists('shadowbox')) {
    $overlays['shadowbox'] = array(
      'name' => t('Shadowbox'),
      'initialize_callback' => 'imageeditor_overlay_shadowbox_initialize_callback',
    );
  }
  if (module_exists('fancybox')) {
    $overlays['fancybox'] = array(
      'name' => t('fancyBox'),
      'initialize_callback' => 'imageeditor_overlay_fancybox_initialize_callback',
    );
  }

  return $overlays;
}

function imageeditor_overlay_custom_initialize_callback() {
  $path = drupal_get_path('module', 'imageeditor');
  drupal_add_js($path . '/js/overlays/custom.js', array('scope' => 'footer', 'weight' => 0));
  drupal_add_css($path . '/css/overlays/custom.css');
}

function imageeditor_overlay_jqueryuidialog_initialize_callback() {
  // Add jQueryUI.dialog.
  drupal_add_library('system', 'ui.dialog');
  $path = drupal_get_path('module', 'imageeditor');
  drupal_add_js($path . '/js/overlays/jqueryuidialog.js', array('scope' => 'footer', 'weight' => 0));
}

function imageeditor_overlay_colorbox_initialize_callback() {
  // Add Colorbox library defined in colorbox module.
  //drupal_add_library('colorbox', 'colorbox');
  $path = drupal_get_path('module', 'imageeditor');
  drupal_add_js($path . '/js/overlays/colorbox.js', array('scope' => 'footer', 'weight' => 0));
}

function imageeditor_overlay_shadowbox_initialize_callback() {
  // Add Shadowbox library defined in shadowbox module.
  //drupal_add_library('shadowbox', 'shadowbox');
  $path = drupal_get_path('module', 'imageeditor');
  drupal_add_js($path . '/js/overlays/shadowbox.js', array('scope' => 'footer', 'weight' => 0));
}

function imageeditor_overlay_fancybox_initialize_callback() {
  // Add fancyBox library defined in fancybox module.
  //drupal_add_library('fancybox', 'fancybox');
  $path = drupal_get_path('module', 'imageeditor');
  drupal_add_js($path . '/js/overlays/fancybox.js', array('scope' => 'footer', 'weight' => 0));
}
