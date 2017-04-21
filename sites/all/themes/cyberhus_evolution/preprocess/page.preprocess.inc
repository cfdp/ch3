<?php

/**
 * Implements hook_preprocess_page().
 */
function cyberhus_evolution_preprocess_page(&$vars) {
  $path = current_path();
  /*Secrets / Hemmeligheder node type - rewrite title*/
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
      else if ($keys == "2335") {
        // Enable 2 act
        drupal_set_title(t('Share your secret!'));
      }
    }
  }
  /* Customize breadcrumb  - note that Pollim breadcrumbs are generated in
  layouts/cybersimple/cybersimple-layout.preprocess.inc */
  $crumbs = array();
  if ($node = menu_get_object()) {
    // We're on a node page...
    switch ($node->type) {
      case 'chat':
        if (!empty($node->field_kampagneside)) {
          $crumbs[] = l(t('Zoom'), 'zoom');
        }
        break;
      case 'brevkasse':
        $crumbs[] = l(t('Brevkasse'), 'brevkasse');
        $tid = $node->field_brevk_kategori;
        if (!($tid == NULL)) { // some  nodes have no term
          $tid = $node->field_brevk_kategori;
          $tid = $tid['und'][0]['tid'];
          $term = taxonomy_term_load($tid);
          $name = $term->name;
          $crumbs[] = l($name, 'brevkasse/'.$name);
        }
        break;
      case 'forum':
        $tid = $node->forum_tid;
        $term = taxonomy_term_load($tid);
        $name = $term->name;
        $crumbs[] = l(t('Forum'), 'forum');
        $crumbs[] = l($name, 'forum/'.$tid);
        break;
      case 'ungi_side':
        $crumbs[] = l(t('Ung i'), 'ung-i');
        break;
      case 'historie':
        $crumbs[] = l(t('Fortællinger'), 'livsfortaellinger');
        break;
      case 'blog':
        $account = user_load($node->uid);
        $blog_name = isset($account->profile_blogname) ? ($account->profile_blogname) : ("Anonym");
        $blog_url = "blog/".$node->uid;
        $crumbs[] = l(t('Blogs'), 'blogs');
        if (!($blog_name == NULL)) {
          $crumbs[] = l($blog_name, $blog_url);
        }
        break;
      case 'body_secret':
        $crumbs[] = l(t('Hemmeligheder'), 'hemmeligheder/alle');
        break;
      case 'image':
        $crumbs[] = l(t('Billeder'), 'billeder');
        break;
      case 'brevkasse':
        $crumbs[] = l(t('Brevkasse'), 'brevkasse');
        break;
      case 'link_artikel':
        $crumbs[] = l(t('Artikler'), 'artikler');
        $term = field_get_items('node', $node, 'field_tema_kategori');
        // Make sure the article has a term
        if ($term[0] != '') {
          $output = field_view_value('node', $node, 'field_tema_kategori', $term[0]);
          $term_name = $output["#title"];
          // We need to replace spaces in term name with dashes for the URL
          $pattern = '/[\s]/';
          $replacement = '-';
          $term_name_preg = preg_replace($pattern, $replacement, $term_name);
          $crumbs[] = l($term_name, 'temaer/'.$term_name_preg);
        }

        break;
    }
  }
  else {
    // We're on a non-node page so we build crumbs by path where we have 2+ levels
    // eg. forum > forum-name

    // Retrieve an array which contains the path pieces
    $path_args = explode('/', current_path()); // Remember current_path() take system path
    if (count($path_args) == 1) {
      if ($path_args[0] == 'blogs') {
        $crumbs[] = l(t('Blogs'), 'blogs/alle');
      }
    }
    else if (count($path_args) == 2) {
      if ($path_args[0] == 'brevkasse') {
        $crumbs[] = l(t('Brevkasse'), 'brevkasse');
      }
      else if ($path_args[0] == 'forum') {
        $crumbs[] = l(t('Forum'), 'forum');
      }
      else if ($path_args[0] == 'blog') {
        $crumbs[] = l(t('Blogs'), 'blogs');
      }
      else if ($path_args[0] == 'ung-i') {
        $crumbs[] = l(t('Ung i'), 'ung-i');
      }
    }
    else if ($path_args[0] == 'node' && $path_args[1] == 'add') {
      if ($path_args[2] == 'brevkasse') {
        $crumbs[] = l(t('Brevkasse'), 'brevkasse');
      }
      else if ($path_args[2] == 'forum') {
        $crumbs[] = l(t('Forum'), 'forum');
      }
      else if ($path_args[2] == 'blog') {
        $crumbs[] = l(t('Blogs'), 'blogs');
      }
      else if ($path_args[2] == 'body_secret') {
        $crumbs[] = l(t('Hemmeligheder'), 'hemmeligheder/alle');
      }
      else if ($path_args[2] == 'image') {
        $crumbs[] = l(t('Billeder'), 'billeder');
      }
      else if ($path_args[2] == 'historie') {
        $crumbs[] = l(t('Fortællinger'), 'livsfortaellinger');
      }
    }
  }
  drupal_set_breadcrumb($crumbs);


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
      else if (in_array('2327', $keys)) {
        // Ordet er dit
        drupal_set_title(t('Ordet er dit!'));
      }
      else if (in_array('2328', $keys)) {
        // Lifehacks
        drupal_set_title(t('Del dit Lifehack!'));
      }
      else if (in_array('2335', $keys)) {
        // Enable 2 act
        drupal_set_title(t('Share your secret!'));
      }
    }
  }
  else if ($path == "node/add/forum/2334") {
    drupal_set_title(t('New forum post'));
  }
}
