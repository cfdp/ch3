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

  $svg = '<svg class="icon"><use xlink:href="/' . path_to_theme() . '/assets/dist/svg/symbols.svg#' . $menu_id . '" /></svg>';
  $element['#localized_options']['html'] = TRUE;
  $output = l($svg . $element['#title'], $element['#href'], $element['#localized_options']);
  $element['#attributes']['class'][] = 'svg-menu';

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu .
  '</li>';
}

/**
 * Implements hook_form_alter().
 */
function cyberhus_clean_form_alter(&$form, &$form_state) {

  switch($form['#id']) {

    case "views-exposed-form-frontpage-stream-page":
    case "views-exposed-form-frontpage-stream-page-1":
    case "views-exposed-form-frontpage-stream-page-2":
      // Unset description
      unset($form['field_brevk_alder_tid']['#description']);
      unset($form['field_brevk_koen_tid']['#description']);
    break;
    case "custom-search-blocks-form-1":
      // Placeholder
      $form['custom_search_blocks_form_1']['#attributes']['placeholder'] = t('Seach here');
      // Svg icon
      $form['custom_search_blocks_form_1']['#prefix'] = '<svg class="icon"><use xlink:href="/' . path_to_theme() . '/assets/dist/svg/symbols.svg#search" /></svg>';
    break;
  }
}

/**
 * Implements theme_radio().
 */
function cyberhus_clean_radio($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'radio';
  element_set_attributes($element, array('id', 'name', '#return_value' => 'value'));

  if (isset($element['#return_value']) && $element['#value'] !== FALSE && $element['#value'] == $element['#return_value']) {
    $element['#attributes']['checked'] = 'checked';
  }
  _form_set_class($element, array('form-radio'));

  $markup = '<input' . drupal_attributes($element['#attributes']) . ' />';

  // Gender icons
  if($variables['element']['#name'] == 'field_brevk_koen[und]') {
    switch($variables['element']['#return_value']) {
      case 2149:
        $markup .= cyberhus_clean_icon_display('man');
      break;
      case 2150:
        $markup .= cyberhus_clean_icon_display('woman');
      break;
      case 2350:
        $markup .= cyberhus_clean_icon_display('binary');
      break;
    }
  }

  return $markup;
}

function cyberhus_clean_select($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id', 'name', 'size'));
  _form_set_class($element, array('form-select'));

  return '<div class="select-wrapper"><select' . drupal_attributes($element['#attributes']) . '>' . form_select_options($element) . '</select>' . cyberhus_clean_icon_display('up-down') . "</div>";
}

/**
 * Implements hook_preprocess_node().
 */
function cyberhus_clean_preprocess_node(&$variables) {

  if ($variables['node']) {

    $node = $variables['node'];

    switch ($node->type) {
      case 'brevkasse':
      case 'image':
      case 'forum':
        $variables['theme_hook_suggestion'] = 'node__shared';
      break;
    }
  }
}

/**
 * Implements hook_preprocess_html().
 */
function cyberhus_clean_preprocess_html(&$variables) {

  if ($node = menu_get_object()) {

    $node_types_adv = array(
      'brevkasse', 'forum', 'image'
    );

    if(in_array($node->type, $node_types_adv)) {
      $variables['classes_array'][] = 'page-node-adv';
    }
    else {
      $variables['classes_array'][] = 'page-node-basic';
    }
  }

  $view = views_get_page_view();
  if ( isset($view) ) {
    $variables['classes_array'][] = 'page-' . $view->name;
  }
}

function cyberhus_clean_breadcrumb(&$variables) {

  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    $output .= '<div class="breadcrumb">' . implode(' » ', $breadcrumb) . '</div>';
    return $output;
  }
}

/**
 * Type label
 * Map a content type machine name to a human readable label.
 */
function cyberhus_clean_type_label($type) {

  switch($type) {

    case "image":
      return array(
        'singular' => t('image'),
        'plural' => t('images'),
      );
    break;
    case "forum":
      return array(
        'singular' => t('question'),
        'plural' => t('questions'),
      );
    break;
    case "brevkasse":
      return array(
        'singular' => t('letter box question'),
        'plural' => t('letter box questions'),
      );
    break;
    case "body_secret":
      return array(
        'singular' => t('secret'),
        'plural' => t('secrets'),
      );
    break;
  }
}

/**
 * Display taxonomy term.
 */
function cyberhus_clean_term_display($tid) {

  $term = taxonomy_term_load($tid);

  if($term) {

    // Gender
    if($term->vocabulary_machine_name == 'k_n') {
      switch($term->name) {
        case "Pige":
          $gender = 'woman';
        break;
        case "Dreng":
          $gender = 'man';
        break;
        default:
          $gender = 'binary';
        break;
      }
      return cyberhus_clean_icon_display($gender);
    }
    else {
      return $term->name;
    }
  }
}

/**
 * Display SVG icon.
 */
function cyberhus_clean_icon_display($id) {
  $markup = "";
  $markup .= "<svg class='icon'>";
  $markup .= "<use xlink:href='/" . drupal_get_path('theme', 'cyberhus_clean') . "/assets/dist/svg/symbols.svg#$id' />";
  $markup .= "</svg>";

  return $markup;
}
