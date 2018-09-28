 <?php

/**
 * Top menu: Overriding the menu_link hook to inject svg images
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

  $svg = '<svg class="icon"><use xlink:href="/' . path_to_theme() . '/assets/dist/svg/symbols.min.svg#' . $menu_id . '" /></svg>';
  $element['#localized_options']['html'] = TRUE;
  $output = l($svg . $element['#title'], $element['#href'], $element['#localized_options']);
  $element['#attributes']['class'][] = 'svg-menu';

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu .
  '</li>';
}

/**
 * Mobile menu: Overriding the menu_link hook to inject svg images
 *
 * NOTE: We use the menu_attributes id item to identify the svg file
 */
function cyberhus_clean_menu_link__menu_mobile_menu(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';
  $menu_id = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }

  $menu_id = (isset($element['#attributes']['id'])) ? $element['#attributes']['id'] : 'articles';

  $svg = '<svg class="icon"><use xlink:href="/' . path_to_theme() . '/assets/dist/svg/symbols.min.svg#' . $menu_id . '" /></svg>';
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

  if(preg_match("/views-exposed-form-frontpage-stream/", $form['#id'])) {
      // Unset description
      unset($form['alder']['#description']);
      unset($form['koen']['#description']);
  }
  if(preg_match('/custom-search-blocks-form-1*/', $form['#id'])) {
      // Placeholder
      $form['custom_search_blocks_form_1']['#attributes']['placeholder'] = t('Search here');
      // Svg icon
      $form['custom_search_blocks_form_1']['#prefix'] = '<svg class="icon"><use xlink:href="/' . path_to_theme() . '/assets/dist/svg/symbols.min.svg#search" /></svg>';
  }
  if($form['#id'] == "ctools-jump-menu") {
    // Ung i - Jump menu
    $form['jump']['#options'][''] = t('I live in...');
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

/**
 * Implements theme_select().
 */
function cyberhus_clean_select($variables) {
  $element = $variables['element'];
  element_set_attributes($element, array('id', 'name', 'size'));
  _form_set_class($element, array('form-select'));

  return '<div class="select-wrapper"><select' . drupal_attributes($element['#attributes']) . '>' . form_select_options($element) . '</select>' . cyberhus_clean_icon_display('up-down') . "</div>";
}

/**
 * Implements hook_preprocess_html().
 */
function cyberhus_clean_preprocess_html(&$variables) {

  // Add necessary body classes.

  // Nodes
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

  // Views
  $view = views_get_page_view();
  if ( isset($view) ) {
    $variables['classes_array'][] = 'page-' . $view->name;
  }
}

/**
 * Implements hook_preprocess_page().
 */
function cyberhus_clean_preprocess_page(&$variables) {

  // Add necessary body classes and section variables.
  $variables['sub_section'] = 'default';

  // URL parametres
  if (arg(0) == 'blogs' || arg(0) == 'blog') {
    $variables['sub_section'] = 'blog';
  }

  // Nodes
  elseif ($node = menu_get_object()) {

    $ung_til_ung_types = array(
      'forum', 'image', 'body_secret'
    );
    if(in_array($node->type, $ung_til_ung_types)) {
      $variables['sub_section'] = 'ung_til_ung';
    }
    if($node->type == 'brevkasse') {
      $variables['sub_section'] = 'brevkasse';
    }
    if($node->type == 'blog') {
      $variables['sub_section'] = 'blog';
    }
  }

  // Terms
  elseif ($term = menu_get_object('taxonomy_term', 2)) {
    if($term->vocabulary_machine_name == 'ung_i_byer') {
      $variables['sub_section'] = 'ung_i';
    }
  }
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
 * Implements hook_preprocess_term().
 */
function cyberhus_clean_preprocess_taxonomy_term(&$variables) {

  $term = $variables['term'];

  switch($term->vocabulary_machine_name) {
    case "ung_i_byer":
      // Settings for the letter box and chat
      $variables['lb_state'] = 0;
      $variables['lb_open'] = 0;
      $variables['chat_state'] = 0;
      if(isset($term->field_ungi_lb_state['und'][0]['value'])) {
        $variables['lb_state'] = $term->field_ungi_lb_state['und'][0]['value'];
      }
      if(isset($term->field_ungi_lb_open['und'][0]['value'])) {
        $variables['lb_open'] = $term->field_ungi_lb_open['und'][0]['value'];
      }
      if(isset($term->field_ungi_chat_state['und'][0]['value'])) {
        $variables['chat_state'] = $term->field_ungi_chat_state['und'][0]['value'];
      }
    break;
  }
}

/**
 * Implements hook_preprocess_entity().
 */
function cyberhus_clean_preprocess_entity(&$variables) {
  if ($variables['entity_type'] == 'paragraphs_item') {
    $term = menu_get_object('taxonomy_term', 2);
    $variables['term'] = $term;
      
    // Settings for the letter box and chat
    $variables['lb_state'] = 0;
    $variables['lb_open'] = 0;
    $variables['chat_state'] = 0;
    if(isset($term->field_ungi_lb_state['und'][0]['value'])) {
    $variables['lb_state'] = $term->field_ungi_lb_state['und'][0]['value'];
    }
    if(isset($term->field_ungi_lb_open['und'][0]['value'])) {
    $variables['lb_open'] = $term->field_ungi_lb_open['und'][0]['value'];
    }
    if(isset($term->field_ungi_chat_state['und'][0]['value'])) {
    $variables['chat_state'] = $term->field_ungi_chat_state['und'][0]['value'];
    }
  }
}

/**
 * Implements hook_preprocess_block().
 */
function cyberhus_clean_preprocess_block(&$variables) {

  switch($variables['block_html_id']) {
    case "block-views-exp-frontpage-stream-page":
    case "block-views-exp-frontpage-stream-page-1":
    case "block-views-exp-frontpage-stream-page-2":
      $variables['theme_hook_suggestions'][] = 'block__exposed_filter';
    break;
  }
}

/**
 * Implements theme_breadcrumb().
 */
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
    case "blog":
      return array(
        'singular' => t('blog post'),
        'plural' => t('blog posts'),
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
    elseif($term->vocabulary_machine_name == 'avatars') {
      return theme('image_style',
        array('path' => $term->field_avatar_image[LANGUAGE_NONE][0]['uri'], 'style_name' => 'avatar_large')
      );
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
  $markup .= "<svg class='icon icon-$id'>";
  $markup .= "<use xlink:href='/" . drupal_get_path('theme', 'cyberhus_clean') . "/assets/dist/svg/symbols.min.svg#$id' />";
  $markup .= "</svg>";

  return $markup;
}
