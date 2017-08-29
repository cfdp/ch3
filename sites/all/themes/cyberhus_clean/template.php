<?php

/**
 * Overriding the menu_link hook to inject svg images
 *
 * NOTE: We use the menu_attributes id item to identify the svg file
 */
function cyberhus_clean_menu_link__menu_top_menu(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';
  $menu_id = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  $menu_id = (isset($element['#attributes']['id'])) ? $element['#attributes']['id'] : 'articles';

  $svg =   '<svg class="icon"><use xlink:href="/' . path_to_theme() . '/assets/dist/svg/symbols.svg#' . $menu_id . '" /></svg>';

  $element['#localized_options']['html'] = TRUE;

  $output = l($svg . $element['#title'], $element['#href'], $element['#localized_options']);

  $element['#attributes']['class'][] = 'svg-menu';

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu .
  '</li>';
}
