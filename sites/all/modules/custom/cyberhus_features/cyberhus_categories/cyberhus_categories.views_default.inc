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
  $handler->display->display_options['style_plugin'] = 'table';
  /* Header: Global: Result summary */
  $handler->display->display_options['header']['result']['id'] = 'result';
  $handler->display->display_options['header']['result']['table'] = 'views';
  $handler->display->display_options['header']['result']['field'] = 'result';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Kategori */
  $handler->display->display_options['fields']['field_brevk_kategori']['id'] = 'field_brevk_kategori';
  $handler->display->display_options['fields']['field_brevk_kategori']['table'] = 'field_data_field_brevk_kategori';
  $handler->display->display_options['fields']['field_brevk_kategori']['field'] = 'field_brevk_kategori';
  $handler->display->display_options['fields']['field_brevk_kategori']['label'] = 'Kategori GAMMEL';
  $handler->display->display_options['fields']['field_brevk_kategori']['type'] = 'taxonomy_term_reference_plain';
  /* Field: Content: Kategori NY */
  $handler->display->display_options['fields']['field_base_category']['id'] = 'field_base_category';
  $handler->display->display_options['fields']['field_base_category']['table'] = 'field_data_field_base_category';
  $handler->display->display_options['fields']['field_base_category']['field'] = 'field_base_category';
  $handler->display->display_options['fields']['field_base_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_base_category']['settings'] = array(
    'link' => 0,
  );
  /* Field: Bulk operations: Content */
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
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
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
  /* Filter criterion: Content: Kategori (field_brevk_kategori) */
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
  /* Filter criterion: Content: Kategori NY (field_base_category) */
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
    t('more'),
    t('Udfør'),
    t('Gendan'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Items per page'),
    t('- All -'),
    t('Offset'),
    t('« first'),
    t('‹ previous'),
    t('next ›'),
    t('last »'),
    t('Displaying @start - @end of @total'),
    t('Title'),
    t('Kategori GAMMEL'),
    t('Kategori NY'),
    t('Handlinger'),
    t('- Choose an operation -'),
    t('Tildel ny kategori'),
    t('Type'),
    t('Page'),
  );
  $export['migrate_categories'] = $view;

  return $export;
}
