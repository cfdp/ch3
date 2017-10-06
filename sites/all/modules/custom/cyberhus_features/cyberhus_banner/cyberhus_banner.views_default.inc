<?php
/**
 * @file
 * cyberhus_banner.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function cyberhus_banner_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'banner_ungi';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'Banner Ungi';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '1';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Field: Slides */
  $handler->display->display_options['fields']['field_banner_slides']['id'] = 'field_banner_slides';
  $handler->display->display_options['fields']['field_banner_slides']['table'] = 'field_data_field_banner_slides';
  $handler->display->display_options['fields']['field_banner_slides']['field'] = 'field_banner_slides';
  $handler->display->display_options['fields']['field_banner_slides']['label'] = '';
  $handler->display->display_options['fields']['field_banner_slides']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_banner_slides']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_banner_slides']['settings'] = array(
    'view_mode' => 'full',
  );
  $handler->display->display_options['fields']['field_banner_slides']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_banner_slides']['field_api_classes'] = TRUE;
  /* Contextual filter: Taxonomy term: Term ID */
  $handler->display->display_options['arguments']['tid']['id'] = 'tid';
  $handler->display->display_options['arguments']['tid']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['arguments']['tid']['field'] = 'tid';
  $handler->display->display_options['arguments']['tid']['default_action'] = 'default';
  $handler->display->display_options['arguments']['tid']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['tid']['default_argument_type'] = 'taxonomy_tid';
  $handler->display->display_options['arguments']['tid']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['tid']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['tid']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['tid']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['tid']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['tid']['validate_options']['vocabularies'] = array(
    'ung_i_byer' => 'ung_i_byer',
  );
  /* Filter criterion: Taxonomy vocabulary: Machine name */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'ung_i_byer' => 'ung_i_byer',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $translatables['banner_ungi'] = array(
    t('Master'),
    t('more'),
    t('Apply'),
    t('Reset'),
    t('Sort by'),
    t('Asc'),
    t('Desc'),
    t('Alle'),
    t('Block'),
  );
  $export['banner_ungi'] = $view;

  return $export;
}
