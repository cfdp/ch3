<?php

/**
 * Implements hook_preprocess_page().
 */
function cyberhus_evolution_preprocess_page(&$vars) {
  /* Add Google Fonts with Web Font Loader js */
  drupal_add_js('https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js', 'external');
  drupal_add_js("jQuery(document).ready(WebFont.load({google: {families: ['Lato:400,700,italic', 'Merriweather:700']}}));", 'inline');

  /* Rewrite title on body secrets / hemmeligheder page - Ordet er dit and Lifehack */
  $path = current_path();
  if ($path == "node/add/body-secret") {
    $params = drupal_get_query_parameters();
    if (!empty($params['edit']['field_secrets_category']['und'])) {
      $keys = array_keys($params['edit']['field_secrets_category']['und']);
      if ( (in_array('2327', $keys)) && (in_array('2328', $keys)) ) {
        // Ordet er dit & Lifehack
        drupal_set_title(t('Del dit Lifehack!'));
      }
      else if ( (in_array('2327', $keys)) && (in_array('2329', $keys)) ) {
        // Ordet er dit & Virkelighed
        drupal_set_title(t('Del din virkelighed!'));
      }
      else if ($keys == "2327") {
        // Ordet er dit
        drupal_set_title(t('Ordet er dit!'));
      }
      else if ($keys == "2328") {
        // Lifehacks
        drupal_set_title(t('Del dit Lifehack!'));
      }
    }
  }
}
