<?php

/**
 * @file
 * Template overrides as well as (pre-)process and alter hooks for the
 * Cyberhus Evolution theme.
 */


/**
 * Overriding the menu_link hook to inject svg images
 *
 * NOTE: We use the menu_attributes id item to identify the svg file
 */
function cyberhus_evolution_menu_link__menu_andet(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';
  $menu_id = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  $menu_id = (isset($element['#attributes']['id'])) ? $element['#attributes']['id'] : 'articles';
  $element['#attributes']['class'][] = 'svg-menu';

  return '<li' . drupal_attributes($element['#attributes']) . '>' . file_get_contents(path_to_theme() . "/images/icons/svg/" . $menu_id . ".svg") . $output . $sub_menu . "</li>\n";
}

/**
 * Overriding the menu_link hook to inject svg images
 *
 * NOTE: We use the menu_attributes id item to identify the svg file
 */
function cyberhus_evolution_menu_link__menu_top_menu(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';
  $menu_id = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  $menu_id = (isset($element['#attributes']['id'])) ? $element['#attributes']['id'] : 'articles';
  $element['#attributes']['class'][] = 'svg-menu';

  return '<li' . drupal_attributes($element['#attributes']) . '>' . file_get_contents(path_to_theme() . "/images/icons/svg/" . $menu_id . ".svg") . $output . $sub_menu . "</li>\n";
}


/**
* Remove add forum topic link from forum pages
* @param Array $variables
*/
function cyberhus_evolution_menu_local_action($variables) {
  $link = $variables['element']['#link'];
  // Remove add new forum topic from /forum page
  if (arg(0) == 'forum' &&  substr($link['href'], 0, 14) == 'node/add/forum') {
    $output = null;
  }
  else {
    $output = '<li>';
    if (isset($link['href'])) {
      $output .= l($link['title'], $link['href'], isset($link['localized_options']) ? $link['localized_options'] : array());
    }
    elseif (!empty($link['localized_options']['html'])) {
      $output .= $link['title'];
    }
    else {
      $output .= check_plain($link['title']);
    }
    $output .= "</li>\n";
  }

  return $output;
}
