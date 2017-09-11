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
    return $term->name;
  }
}

/**
 * Display SVG icon.
 */
function cyberhus_clean_icon_display($id) {
  $markup = "";
  $markup .= "<svg class='icon'>";
  $markup .= "<use xlink:href='/" . path_to_theme() . "/assets/dist/svg/symbols.svg#$id' />";
  $markup .= "</svg>";

  return $markup;
}
