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

function cyberhus_evolution_form_alter(&$form, &$form_state, $form_id) {
  /* Altering the body secrets form to incorporate Ordet er dit
  and Lifehack funtionality */
  if ($form_id == 'body_secret_node_form') {
    $params = drupal_get_query_parameters();
    if (!empty($params['edit']['field_secrets_category']['und'])) {
      $keys = array_keys($params['edit']['field_secrets_category']['und']);
      if ( (in_array('2327', $keys)) && (in_array('2328', $keys)) ) {
        // Ordet er dit & Lifehack
        $form['body']['und'][0]['value']['#title'] = t('Lifehack');
      }
      else if ( (in_array('2327', $keys)) && (in_array('2329', $keys)) ) {
        // Ordet er dit & Virkelighed
        $form['body']['und'][0]['value']['#title'] = t('Virkelighed');
      }
      else if ($keys == "2327") {
        // Ordet er dit
        $form['body']['und'][0]['value']['#title'] = t('Ordet er dit');
      }
      else if ($keys == "2328") {
        // Lifehacks
        $form['body']['und'][0]['value']['#title'] = t('Lifehack');
      }
      else if ($keys == "2329") {
        // Lifehacks
        $form['body']['und'][0]['value']['#title'] = t('Virkelighed');
      }
    }
  }
}
