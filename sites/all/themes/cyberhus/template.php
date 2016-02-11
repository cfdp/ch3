<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 *
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

 /**
 * Output breadcrumb as an unorderd list with unique and first/last classes
 */
function cyberhus_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';
    $crumbs = '<ul class="breadcrumbs clearfix">';
    $array_size = count($breadcrumb);
    $i = 0;

    // Fjern elementer i breadcrumb på Node forms
    if(arg(0)=="node" && arg(1)=="add") {
    while ( $i < 1) {
      $crumbs .= '<li class="breadcrumb-' . $i;
      if ($i == 0) {
        $crumbs .= ' first';
      }
      $crumbs .=  '">' . $breadcrumb[$i] . '<span>&gt;</span></li>';
      $i++;
    }
    $crumbs .= "<li class='last'>".drupal_get_title()."</li>";
    $crumbs .= '</ul>';
    return $crumbs;
    }
    // Fjern elementer i breadcrumbs på Søgesiden
    if(arg(0)=="search" && arg(1)=="node") {
    while ( $i < 1) {
      $crumbs .= '<li class="breadcrumb-' . $i;
      if ($i == 0) {
        $crumbs .= ' first';
      }
      $crumbs .=  '">' . $breadcrumb[$i] . '<span>&gt;</span></li>';
      $i++;
    }
    $crumbs .= "<li class='last'>".drupal_get_title()."</li>";
    $crumbs .= '</ul>';
    return $crumbs;
    }
    else {
    while ( $i < $array_size) {
      $crumbs .= '<li class="breadcrumb-' . $i;
      if ($i == 0) {
        $crumbs .= ' first';
      }
      $crumbs .=  '">' . $breadcrumb[$i] . '<span>&gt;</span></li>';
      $i++;
    }
    $crumbs .= "<li class='last'>".drupal_get_title()."</li>";
    $crumbs .= '</ul>';
    return $crumbs;
    }
  }
}

/**
 * SEARCH BLOCK
 */

// Add some cool text to the search block form
function cyberhus_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'search_block_form') {
    // HTML5 placeholder attribute
    $form['search_block_form']['#attributes']['placeholder'] = t('Search here');
  }

  /* Altering the body secrets form to incorporate Ordet er dit and Lifehack funtionality */
  if ($form_id == 'body_secret_node_form') {
    $params = drupal_get_query_parameters();
    if (!empty($params)) {
      $keys = check_plain(key($params['edit']['field_secrets_category']['und']));
      if ( (array_key_exists('2327', $keys)) || (array_key_exists('2328', $keys)) ) {
        // Ordet er dit & Lifehack
        $form['body']['und'][0]['value']['#title'] = t('Lifehack');
      }
      else if ( (array_key_exists('2327', $keys)) || (array_key_exists('2329', $keys)) ) {
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

/**
 * TEXTAREAS
 */
function cyberhus_textarea($variables) {
  $element = $variables['element'];
  $element['#attributes']['name'] = $element['#name'];
  $element['#attributes']['id'] = $element['#id'];
  $element['#attributes']['cols'] = $element['#cols'];
  $element['#attributes']['rows'] = 8;
  _form_set_class($element, array('form-textarea'));

  $wrapper_attributes = array(
    'class' => array('form-textarea-wrapper'),
  );

  // Add resizable behavior.
  if (!empty($element['#resizable'])) {
    $wrapper_attributes['class'][] = 'resizable';
  }

  $output = '<div' . drupal_attributes($wrapper_attributes) . '>';
  $output .= '<textarea' . drupal_attributes($element['#attributes']) . '>' . check_plain($element['#value']) . '</textarea>';
  $output .= '</div>';
  return $output;
}

/**
 * AUTHOR PANE
 */
function cyberhus_preprocess_author_pane(&$variables) {
  $variables['show_template_location'] = TRUE;
}

/**
 * Rewrite title on body secrets / hemmeligheder page - Ordet er dit and Lifehack
 */
function cyberhus_preprocess_page(&$variables){
  $path = current_path();
  if ($path == "node/add/body-secret") {
    $params = drupal_get_query_parameters();
    if (!empty($params)) {
      $keys = check_plain(key($params['edit']['field_secrets_category']['und']));
      if ( (array_key_exists('2327', $keys)) || (array_key_exists('2328', $keys)) ) {
        // Ordet er dit & Lifehack
        drupal_set_title(t('Del dit Lifehack!'));
      }
      else if ( (array_key_exists('2327', $keys)) || (array_key_exists('2329', $keys)) ) {
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

/* Forum form - removed Homepage field*/
function cyberhus_form_comment_node_forum_form_alter(&$form) {
  $form['author']['homepage']['#access'] = FALSE;
}

function cyberhus_preprocess_node(&$vars) {
  $vars['date'] = format_date($vars['node']->created, 'custom', 'd/m/Y');
}

/* After shortenning the URLs for the brevkasse section, the new short names are being used in the select list on the add new brevkasse form page.
*  These have to be replaced with the long version names for user friendliness. We Achieve this by adding a new field on the taxonomy to hold the
*  long version names. We query for them and then alter the form select list options.
*/

function cyberhus_form_brevkasse_node_form_alter(&$form){

  //Select teh taxonomy vocabulary holding the values for the brevkasse categories
  $taxonomy = "vocabulary_3";

  //Query the DB for the extra dded fiedl holding the labels (long version names of the brevkasse categories)
  $results = db_select('field_data_field_brev_tax_label', 't')
    ->fields('t', array('entity_id', 'field_brev_tax_label_value'))
    ->condition("t.bundle", $taxonomy)
    ->execute();


  // Populate the selectlist with the new values
  $options = array();
  foreach ($results as $term)  {
    $form['field_brevk_kategori']['und']['#options'][$term->entity_id] = $term->field_brev_tax_label_value;
  }

}

// Remove all autogenerated taxonomy terms pages
function cyberhus_menu_alter(&$items) {
  unset($items['taxonomy/term/%taxonomy_term']);
  unset($items['taxonomy/term/%taxonomy_term/view']);
  unset($items['taxonomy/term/%taxonomy_term/feed']); // If you want to hide the feed as well.
}

function cyberhus_menu_link__menu_top_menu($variables) {
	$link = $variables['element'];
	$link['#attributes']['id'] = drupal_html_id($link['#title']);
  return '<li ' . drupal_attributes($link['#attributes']) . '><a href="/' . $link['#href'] . '" title="' . $link['#title'] . '"><img class="icon" src="/' . drupal_get_path('theme', 'cyberhus') . '/img/icons/' . $link['#attributes']['id'] . '.png"/><img class="icon_inv" src="/' . drupal_get_path('theme', 'cyberhus') . '/img/icons/' . $link['#attributes']['id'] . '_inv.png"/>' . $link['#title'] . '</a></li>';
}

