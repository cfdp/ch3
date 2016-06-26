<?php

/**
 * Implements hook_preprocess_page().
 */
function cyberhus_evolution_preprocess_page(&$vars) {
  // Add Google Fonts with Web Font Loader js
  drupal_add_js('https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js', 'external');
  drupal_add_js("jQuery(document).ready(WebFont.load({google: {families: ['Lato:400,700', 'Merriweather:700']}}));", 'inline');
}
