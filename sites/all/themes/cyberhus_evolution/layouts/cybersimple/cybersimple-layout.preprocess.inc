<?php

function cyberhus_evolution_preprocess_cybersimple_layout(&$variables) {
  /* Customize breadcrumb for Pollims */
  $crumbs = array();
  if (isset($variables['page']['content']['system_main']['pollim'])) {
    $variables['pollim'] = TRUE;
    $pollim_id = key($variables['page']['content']['system_main']['pollim']);
/*    if ($variables['page']['content']['system_main']['pollim'][$pollim_id]['#bundle'] == "kampagne") {
      $crumbs[] = l(t('Zoom'), 'zoom');
      $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';
      // Override Drupal core breadcrumb item imploding (no arrow).
      $output .= '<ul class="breadcrumb"><li>' . implode('</li><li>', $crumbs) . '</li></ul>';
      $variables['breadcrumb'] = $output;
    }*/
  }
}