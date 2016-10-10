<?php

/**
 * @file
 * Contains a pre-process hook for 'html'.
 */

/**
 * Implements hook_preprocess_TEMPLATE().
 */
function cyberhus_evolution_preprocess_html(&$variables) {
  // Only add sidebar chat on prod and staging site
  global $base_url;
  if (($base_url == "https://cyberhus.dk") || ($base_url == "https://udvikling.cyberhus.dk")) {
    $options = array(
      'group' => JS_THEME,
    );
    drupal_add_js(drupal_get_path('theme', 'cyberhus_evolution'). '/js/curachat.embed.js', $options);
  }

  // add content type to body classes
  $node = menu_get_object();
  $type = isset($node->type) ? $node->type : 'none';
  $type = ($type == 'none' && arg(0) == 'node' && arg(1) == 'add') ? arg(2) : $type;
  $content_type_class = 'content-type-'.$type;
  $variables['attributes_array']['class'][] = $content_type_class;

}
