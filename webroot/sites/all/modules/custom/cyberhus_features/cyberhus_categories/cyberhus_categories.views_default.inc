<?php
/**
 * @file
 * cyberhus_categories.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function cyberhus_categories_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'categories_reference';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'Categories reference';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Felt: Ord i ordforråd: Navn */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['label'] = '';
  $handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['name']['element_label_colon'] = FALSE;
  /* Sorteringskriterie: Ord i ordforråd: Vægt */
  $handler->display->display_options['sorts']['weight']['id'] = 'weight';
  $handler->display->display_options['sorts']['weight']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['sorts']['weight']['field'] = 'weight';
  /* Kontekstuelt filter: Ord i ordforråd: Indholdstyper (field_category_ct) */
  $handler->display->display_options['arguments']['field_category_ct_value']['id'] = 'field_category_ct_value';
  $handler->display->display_options['arguments']['field_category_ct_value']['table'] = 'field_data_field_category_ct';
  $handler->display->display_options['arguments']['field_category_ct_value']['field'] = 'field_category_ct_value';
  $handler->display->display_options['arguments']['field_category_ct_value']['exception']['value'] = '[node:content-type:machine-name]';
  $handler->display->display_options['arguments']['field_category_ct_value']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_category_ct_value']['default_argument_type'] = 'fixed';
  $handler->display->display_options['arguments']['field_category_ct_value']['default_argument_options']['argument'] = 'All';
  $handler->display->display_options['arguments']['field_category_ct_value']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_category_ct_value']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_category_ct_value']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_category_ct_value']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_category_ct_value']['validate']['fail'] = 'ignore';
  $handler->display->display_options['arguments']['field_category_ct_value']['limit'] = '0';
  /* Filterkriterie: Ordforråd: Internt navn */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'content_categories' => 'content_categories',
  );
  /* Filterkriterie: Ord i ordforråd: Status (field_letterbox_status) */
  $handler->display->display_options['filters']['field_letterbox_status_tid']['id'] = 'field_letterbox_status_tid';
  $handler->display->display_options['filters']['field_letterbox_status_tid']['table'] = 'field_data_field_letterbox_status';
  $handler->display->display_options['filters']['field_letterbox_status_tid']['field'] = 'field_letterbox_status_tid';
  $handler->display->display_options['filters']['field_letterbox_status_tid']['value'] = array(
    2403 => '2403',
  );
  $handler->display->display_options['filters']['field_letterbox_status_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_letterbox_status_tid']['vocabulary'] = 'letterbox_status';
  $handler->display->display_options['filters']['field_letterbox_status_tid']['hierarchy'] = 1;

  /* Display: Entity Reference - general */
  $handler = $view->new_display('entityreference', 'Entity Reference - general', 'entityreference_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'entityreference_style';
  $handler->display->display_options['style_options']['search_fields'] = array(
    'name' => 'name',
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entityreference_fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $translatables['categories_reference'] = array(
    t('Master'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Antal elementer'),
    t('- Alle -'),
    t('Forskydning'),
    t('« første'),
    t('‹ forrige'),
    t('næste ›'),
    t('sidste »'),
    t('Alle'),
    t('Entity Reference - general'),
  );

  $export['categories_reference'] = $view;

  $view = new view();
  $view->name = 'migrate_categories';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Migrate categories';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Migrate categories';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button'] = TRUE;
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Gendan';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['expose_sort_order'] = FALSE;
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '50';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['style_plugin'] = 'table';
  /* Overskrift: Global: Resumé af resultat */
  $handler->display->display_options['header']['result']['id'] = 'result';
  $handler->display->display_options['header']['result']['table'] = 'views';
  $handler->display->display_options['header']['result']['field'] = 'result';
  /* Felt: Indhold: Titel */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Felt: Indhold: Kategori */
  $handler->display->display_options['fields']['field_brevk_kategori']['id'] = 'field_brevk_kategori';
  $handler->display->display_options['fields']['field_brevk_kategori']['table'] = 'field_data_field_brevk_kategori';
  $handler->display->display_options['fields']['field_brevk_kategori']['field'] = 'field_brevk_kategori';
  $handler->display->display_options['fields']['field_brevk_kategori']['label'] = 'Kategori GAMMEL';
  $handler->display->display_options['fields']['field_brevk_kategori']['type'] = 'taxonomy_term_reference_plain';
  /* Felt: Indhold: Kategori NY */
  $handler->display->display_options['fields']['field_base_category']['id'] = 'field_base_category';
  $handler->display->display_options['fields']['field_base_category']['table'] = 'field_data_field_base_category';
  $handler->display->display_options['fields']['field_base_category']['field'] = 'field_base_category';
  $handler->display->display_options['fields']['field_base_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_base_category']['settings'] = array(
    'link' => 0,
  );
  /* Felt: Masse-handlinger: Indhold */
  $handler->display->display_options['fields']['views_bulk_operations']['id'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['table'] = 'node';
  $handler->display->display_options['fields']['views_bulk_operations']['field'] = 'views_bulk_operations';
  $handler->display->display_options['fields']['views_bulk_operations']['label'] = 'Handlinger';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['display_type'] = '0';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['enable_select_all_pages'] = 1;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['row_clickable'] = 1;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['force_single'] = 0;
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_settings']['entity_load_capacity'] = '10';
  $handler->display->display_options['fields']['views_bulk_operations']['vbo_operations'] = array(
    'action::views_bulk_operations_modify_action' => array(
      'selected' => 1,
      'postpone_processing' => 0,
      'skip_confirmation' => 0,
      'override_label' => 1,
      'label' => 'Tildel ny kategori',
      'settings' => array(
        'show_all_tokens' => 1,
        'display_values' => array(
          'brevkasse::field_base_category' => 'brevkasse::field_base_category',
        ),
      ),
    ),
  );
  /* Sorteringskriterie: Indhold: Oprettelsesdato */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filterkriterie: Indhold: Udgivet */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filterkriterie: Indhold: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'image' => 'image',
    'brevkasse' => 'brevkasse',
    'forum' => 'forum',
    'body_secret' => 'body_secret',
  );
  $handler->display->display_options['filters']['type']['exposed'] = TRUE;
  $handler->display->display_options['filters']['type']['expose']['operator_id'] = 'type_op';
  $handler->display->display_options['filters']['type']['expose']['label'] = 'Type';
  $handler->display->display_options['filters']['type']['expose']['operator'] = 'type_op';
  $handler->display->display_options['filters']['type']['expose']['identifier'] = 'type';
  $handler->display->display_options['filters']['type']['expose']['remember_roles'] = array(
    2 => '2',
    8 => 0,
    1 => 0,
    5 => 0,
    10 => 0,
    3 => 0,
    9 => 0,
    4 => 0,
    11 => 0,
  );
  $handler->display->display_options['filters']['type']['expose']['reduce'] = TRUE;
  /* Filterkriterie: Indhold: Kategori (field_brevk_kategori) */
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['id'] = 'field_brevk_kategori_tid';
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['table'] = 'field_data_field_brevk_kategori';
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['field'] = 'field_brevk_kategori_tid';
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['expose']['operator_id'] = 'field_brevk_kategori_tid_op';
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['expose']['label'] = 'Kategori GAMMEL';
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['expose']['operator'] = 'field_brevk_kategori_tid_op';
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['expose']['identifier'] = 'field_brevk_kategori_tid';
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['expose']['remember_roles'] = array(
    2 => '2',
    8 => 0,
    1 => 0,
    5 => 0,
    10 => 0,
    3 => 0,
    9 => 0,
    4 => 0,
    11 => 0,
  );
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_brevk_kategori_tid']['vocabulary'] = 'vocabulary_3';
  /* Filterkriterie: Indhold: Kategori NY (field_base_category) */
  $handler->display->display_options['filters']['field_base_category_target_id']['id'] = 'field_base_category_target_id';
  $handler->display->display_options['filters']['field_base_category_target_id']['table'] = 'field_data_field_base_category';
  $handler->display->display_options['filters']['field_base_category_target_id']['field'] = 'field_base_category_target_id';
  $handler->display->display_options['filters']['field_base_category_target_id']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_base_category_target_id']['expose']['operator_id'] = 'field_base_category_target_id_op';
  $handler->display->display_options['filters']['field_base_category_target_id']['expose']['label'] = 'Kategori NY';
  $handler->display->display_options['filters']['field_base_category_target_id']['expose']['use_operator'] = TRUE;
  $handler->display->display_options['filters']['field_base_category_target_id']['expose']['operator'] = 'field_base_category_target_id_op';
  $handler->display->display_options['filters']['field_base_category_target_id']['expose']['identifier'] = 'field_base_category_target_id';
  $handler->display->display_options['filters']['field_base_category_target_id']['expose']['remember_roles'] = array(
    2 => '2',
    8 => 0,
    1 => 0,
    5 => 0,
    10 => 0,
    3 => 0,
    9 => 0,
    4 => 0,
    11 => 0,
  );

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'admin/migrate-categories';
  $translatables['migrate_categories'] = array(
    t('Master'),
    t('Migrate categories'),
    t('mere'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Antal elementer'),
    t('- Alle -'),
    t('Forskydning'),
    t('« første'),
    t('‹ forrige'),
    t('næste ›'),
    t('sidste »'),
    t('Displaying @start - @end of @total'),
    t('Titel'),
    t('Kategori GAMMEL'),
    t('Kategori NY'),
    t('Handlinger'),
    t('- Vælg en handling -'),
    t('Tildel ny kategori'),
    t('Type'),
    t('Page'),
  );
  $export['migrate_categories'] = $view;

  return $export;
}
