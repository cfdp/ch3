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
}
