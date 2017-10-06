<?php
/**
 * @file
 * cyberhus_stream.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function cyberhus_stream_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'frontpage_stream';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Content stream';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Forside';
  $handler->display->display_options['css_class'] = 'content-stream frontpage';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mere';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'better_exposed_filters';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Udfør';
  $handler->display->display_options['exposed_form']['options']['reset_button'] = TRUE;
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Nulstil';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortér efter';
  $handler->display->display_options['exposed_form']['options']['expose_sort_order'] = FALSE;
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Stigende';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Faldende';
  $handler->display->display_options['exposed_form']['options']['autosubmit'] = TRUE;
  $handler->display->display_options['exposed_form']['options']['bef'] = array(
    'general' => array(
      'allow_secondary' => 0,
      'secondary_label' => 'Avancerede indstillinger',
      'collapsible_label' => NULL,
      'combine_rewrite' => NULL,
      'reset_label' => NULL,
      'bef_filter_description' => NULL,
      'any_label' => NULL,
      'filter_rewrite_values' => NULL,
    ),
    'field_base_category_target_id_1' => array(
      'bef_format' => 'default',
      'more_options' => array(
        'bef_select_all_none' => FALSE,
        'bef_collapsible' => 0,
        'is_secondary' => 0,
        'any_label' => '- Kategori -',
        'bef_filter_description' => '',
        'tokens' => array(
          'available' => array(
            0 => 'global_types',
            'secondary_label' => NULL,
            'collapsible_label' => NULL,
            'combine_rewrite' => NULL,
            'reset_label' => NULL,
            'bef_filter_description' => NULL,
            'any_label' => NULL,
            'filter_rewrite_values' => NULL,
          ),
          'secondary_label' => NULL,
          'collapsible_label' => NULL,
          'combine_rewrite' => NULL,
          'reset_label' => NULL,
          'bef_filter_description' => NULL,
          'any_label' => NULL,
          'filter_rewrite_values' => NULL,
        ),
        'rewrite' => array(
          'filter_rewrite_values' => '',
          'secondary_label' => NULL,
          'collapsible_label' => NULL,
          'combine_rewrite' => NULL,
          'reset_label' => NULL,
          'bef_filter_description' => NULL,
          'any_label' => NULL,
        ),
        'secondary_label' => NULL,
        'collapsible_label' => NULL,
        'combine_rewrite' => NULL,
        'reset_label' => NULL,
        'filter_rewrite_values' => NULL,
      ),
      'secondary_label' => NULL,
      'collapsible_label' => NULL,
      'combine_rewrite' => NULL,
      'reset_label' => NULL,
      'bef_filter_description' => NULL,
      'any_label' => NULL,
      'filter_rewrite_values' => NULL,
    ),
    'field_brevk_koen_tid' => array(
      'bef_format' => 'default',
      'more_options' => array(
        'bef_select_all_none' => FALSE,
        'bef_collapsible' => 0,
        'is_secondary' => 0,
        'any_label' => '- Køn -',
        'bef_filter_description' => '',
        'tokens' => array(
          'available' => array(
            0 => 'global_types',
            1 => 'vocabulary',
            'secondary_label' => NULL,
            'collapsible_label' => NULL,
            'combine_rewrite' => NULL,
            'reset_label' => NULL,
            'bef_filter_description' => NULL,
            'any_label' => NULL,
            'filter_rewrite_values' => NULL,
          ),
          'secondary_label' => NULL,
          'collapsible_label' => NULL,
          'combine_rewrite' => NULL,
          'reset_label' => NULL,
          'bef_filter_description' => NULL,
          'any_label' => NULL,
          'filter_rewrite_values' => NULL,
        ),
        'rewrite' => array(
          'filter_rewrite_values' => '',
          'secondary_label' => NULL,
          'collapsible_label' => NULL,
          'combine_rewrite' => NULL,
          'reset_label' => NULL,
          'bef_filter_description' => NULL,
          'any_label' => NULL,
        ),
        'secondary_label' => NULL,
        'collapsible_label' => NULL,
        'combine_rewrite' => NULL,
        'reset_label' => NULL,
        'filter_rewrite_values' => NULL,
      ),
      'secondary_label' => NULL,
      'collapsible_label' => NULL,
      'combine_rewrite' => NULL,
      'reset_label' => NULL,
      'bef_filter_description' => NULL,
      'any_label' => NULL,
      'filter_rewrite_values' => NULL,
    ),
    'field_brevk_alder_tid' => array(
      'bef_format' => 'default',
      'more_options' => array(
        'bef_select_all_none' => 0,
        'bef_collapsible' => 0,
        'is_secondary' => 0,
        'any_label' => '- Alder -',
        'bef_filter_description' => '',
        'tokens' => array(
          'available' => array(
            0 => 'global_types',
            1 => 'vocabulary',
            'secondary_label' => NULL,
            'collapsible_label' => NULL,
            'combine_rewrite' => NULL,
            'reset_label' => NULL,
            'bef_filter_description' => NULL,
            'any_label' => NULL,
            'filter_rewrite_values' => NULL,
          ),
          'secondary_label' => NULL,
          'collapsible_label' => NULL,
          'combine_rewrite' => NULL,
          'reset_label' => NULL,
          'bef_filter_description' => NULL,
          'any_label' => NULL,
          'filter_rewrite_values' => NULL,
        ),
        'rewrite' => array(
          'filter_rewrite_values' => '',
          'secondary_label' => NULL,
          'collapsible_label' => NULL,
          'combine_rewrite' => NULL,
          'reset_label' => NULL,
          'bef_filter_description' => NULL,
          'any_label' => NULL,
        ),
        'secondary_label' => NULL,
        'collapsible_label' => NULL,
        'combine_rewrite' => NULL,
        'reset_label' => NULL,
        'filter_rewrite_values' => NULL,
      ),
      'secondary_label' => NULL,
      'collapsible_label' => NULL,
      'combine_rewrite' => NULL,
      'reset_label' => NULL,
      'bef_filter_description' => NULL,
      'any_label' => NULL,
      'filter_rewrite_values' => NULL,
    ),
    'secondary_label' => NULL,
    'collapsible_label' => NULL,
    'combine_rewrite' => NULL,
    'reset_label' => NULL,
    'bef_filter_description' => NULL,
    'any_label' => NULL,
    'filter_rewrite_values' => NULL,
  );
  $handler->display->display_options['exposed_form']['options']['input_required'] = 0;
  $handler->display->display_options['exposed_form']['options']['text_input_required_format'] = '1';
  $handler->display->display_options['pager']['type'] = 'load_more';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['pager']['options']['more_button_text'] = 'Vis mere';
  $handler->display->display_options['pager']['options']['effects']['speed'] = 'slow';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'stream-item type-[type_1]';
  $handler->display->display_options['style_options']['default_row_class'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Forbindelse: Indhold: Forfatter */
  $handler->display->display_options['relationships']['uid']['id'] = 'uid';
  $handler->display->display_options['relationships']['uid']['table'] = 'node';
  $handler->display->display_options['relationships']['uid']['field'] = 'uid';
  /* Forbindelse: Entity Reference: Referenced Entity */
  $handler->display->display_options['relationships']['field_avatar_target_id']['id'] = 'field_avatar_target_id';
  $handler->display->display_options['relationships']['field_avatar_target_id']['table'] = 'field_data_field_avatar';
  $handler->display->display_options['relationships']['field_avatar_target_id']['field'] = 'field_avatar_target_id';
  $handler->display->display_options['relationships']['field_avatar_target_id']['label'] = 'Avatar';
  /* Felt: Indhold: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  /* Felt: Indhold: Titel */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_type'] = 'h2';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['element_wrapper_type'] = 'div';
  $handler->display->display_options['fields']['title']['element_wrapper_class'] = 'stream-title';
  $handler->display->display_options['fields']['title']['element_default_classes'] = FALSE;
  /* Felt: Indhold: Type */
  $handler->display->display_options['fields']['type']['id'] = 'type';
  $handler->display->display_options['fields']['type']['table'] = 'node';
  $handler->display->display_options['fields']['type']['field'] = 'type';
  $handler->display->display_options['fields']['type']['label'] = '';
  $handler->display->display_options['fields']['type']['exclude'] = TRUE;
  $handler->display->display_options['fields']['type']['element_label_colon'] = FALSE;
  /* Felt: Indhold: Navn */
  $handler->display->display_options['fields']['field_navn']['id'] = 'field_navn';
  $handler->display->display_options['fields']['field_navn']['table'] = 'field_data_field_navn';
  $handler->display->display_options['fields']['field_navn']['field'] = 'field_navn';
  $handler->display->display_options['fields']['field_navn']['label'] = '';
  $handler->display->display_options['fields']['field_navn']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_navn']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_navn']['empty'] = 'Anonym';
  $handler->display->display_options['fields']['field_navn']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_navn']['empty_zero'] = TRUE;
  /* Felt: Felt: Alder */
  $handler->display->display_options['fields']['field_brevk_alder']['id'] = 'field_brevk_alder';
  $handler->display->display_options['fields']['field_brevk_alder']['table'] = 'field_data_field_brevk_alder';
  $handler->display->display_options['fields']['field_brevk_alder']['field'] = 'field_brevk_alder';
  $handler->display->display_options['fields']['field_brevk_alder']['label'] = '';
  $handler->display->display_options['fields']['field_brevk_alder']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_brevk_alder']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_brevk_alder']['type'] = 'taxonomy_term_reference_plain';
  /* Felt: Felt: Køn */
  $handler->display->display_options['fields']['field_brevk_koen']['id'] = 'field_brevk_koen';
  $handler->display->display_options['fields']['field_brevk_koen']['table'] = 'field_data_field_brevk_koen';
  $handler->display->display_options['fields']['field_brevk_koen']['field'] = 'field_brevk_koen';
  $handler->display->display_options['fields']['field_brevk_koen']['label'] = '';
  $handler->display->display_options['fields']['field_brevk_koen']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_brevk_koen']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_brevk_koen']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_brevk_koen']['field_api_classes'] = TRUE;
  /* Felt: Indhold: Oprettelsesdato */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['exclude'] = TRUE;
  $handler->display->display_options['fields']['created']['element_type'] = '0';
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['element_wrapper_type'] = 'div';
  $handler->display->display_options['fields']['created']['date_format'] = 'time span';
  $handler->display->display_options['fields']['created']['second_date_format'] = 'long';
  /* Felt: Global: Tilpasset tekst */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<div class="stream-metadata-item meta-type">[type]</div>
<div class="stream-metadata-item meta-author">Af [field_navn] [field_brevk_koen] [field_brevk_alder] &middot; [created]</div>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing']['element_wrapper_class'] = 'stream-metadata';
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = FALSE;
  /* Felt: Ord i ordforråd: Billede */
  $handler->display->display_options['fields']['field_avatar_image']['id'] = 'field_avatar_image';
  $handler->display->display_options['fields']['field_avatar_image']['table'] = 'field_data_field_avatar_image';
  $handler->display->display_options['fields']['field_avatar_image']['field'] = 'field_avatar_image';
  $handler->display->display_options['fields']['field_avatar_image']['relationship'] = 'field_avatar_target_id';
  $handler->display->display_options['fields']['field_avatar_image']['label'] = '';
  $handler->display->display_options['fields']['field_avatar_image']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_avatar_image']['alter']['path'] = 'node/[nid]';
  $handler->display->display_options['fields']['field_avatar_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_avatar_image']['element_wrapper_class'] = 'stream-avatar';
  $handler->display->display_options['fields']['field_avatar_image']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_avatar_image']['empty'] = '<a href="/node/[nid]"><img src="/sites/all/themes/cyberhus_clean/assets/img/default.png" /></a>';
  $handler->display->display_options['fields']['field_avatar_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_avatar_image']['settings'] = array(
    'image_style' => 'avatar_medium',
    'image_link' => '',
  );
  /* Felt: Felt: Billede */
  $handler->display->display_options['fields']['field_billede']['id'] = 'field_billede';
  $handler->display->display_options['fields']['field_billede']['table'] = 'field_data_field_billede';
  $handler->display->display_options['fields']['field_billede']['field'] = 'field_billede';
  $handler->display->display_options['fields']['field_billede']['label'] = '';
  $handler->display->display_options['fields']['field_billede']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_billede']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_billede']['element_wrapper_class'] = 'stream-image';
  $handler->display->display_options['fields']['field_billede']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_billede']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_billede']['empty_zero'] = TRUE;
  $handler->display->display_options['fields']['field_billede']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_billede']['settings'] = array(
    'image_style' => 'large',
    'image_link' => 'content',
  );
  /* Felt: Indhold: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['exclude'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['max_length'] = '300';
  $handler->display->display_options['fields']['body']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['body']['alter']['html'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['element_wrapper_class'] = 'stream-body';
  $handler->display->display_options['fields']['body']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['body']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['body']['empty_zero'] = TRUE;
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '300',
  );
  /* Felt: Indhold: Spørgsmål */
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['id'] = 'field_brevk_spoergsmaal';
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['table'] = 'field_data_field_brevk_spoergsmaal';
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['field'] = 'field_brevk_spoergsmaal';
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['label'] = '';
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['alter']['max_length'] = '300';
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['alter']['html'] = TRUE;
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['element_wrapper_class'] = 'stream-body';
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['hide_empty'] = TRUE;
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['empty_zero'] = TRUE;
  $handler->display->display_options['fields']['field_brevk_spoergsmaal']['settings'] = array(
    'trim_length' => '300',
  );
  /* Felt: Global: Tilpasset tekst */
  $handler->display->display_options['fields']['nothing_1']['id'] = 'nothing_1';
  $handler->display->display_options['fields']['nothing_1']['table'] = 'views';
  $handler->display->display_options['fields']['nothing_1']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing_1']['label'] = '';
  $handler->display->display_options['fields']['nothing_1']['alter']['text'] = '[field_billede][body][field_brevk_spoergsmaal]';
  $handler->display->display_options['fields']['nothing_1']['element_type'] = '0';
  $handler->display->display_options['fields']['nothing_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['nothing_1']['element_wrapper_class'] = 'stream-content';
  $handler->display->display_options['fields']['nothing_1']['element_default_classes'] = FALSE;
  /* Felt: Indhold: Link */
  $handler->display->display_options['fields']['view_node']['id'] = 'view_node';
  $handler->display->display_options['fields']['view_node']['table'] = 'views_entity_node';
  $handler->display->display_options['fields']['view_node']['field'] = 'view_node';
  $handler->display->display_options['fields']['view_node']['label'] = '';
  $handler->display->display_options['fields']['view_node']['element_type'] = '0';
  $handler->display->display_options['fields']['view_node']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['view_node']['element_wrapper_class'] = 'stream-link';
  $handler->display->display_options['fields']['view_node']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['view_node']['text'] = 'Læs mere';
  /* Felt: Indhold: Cyberlike */
  $handler->display->display_options['fields']['field_cyberlike']['id'] = 'field_cyberlike';
  $handler->display->display_options['fields']['field_cyberlike']['table'] = 'field_data_field_cyberlike';
  $handler->display->display_options['fields']['field_cyberlike']['field'] = 'field_cyberlike';
  $handler->display->display_options['fields']['field_cyberlike']['label'] = '';
  $handler->display->display_options['fields']['field_cyberlike']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_cyberlike']['element_wrapper_class'] = 'stream-like';
  $handler->display->display_options['fields']['field_cyberlike']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_cyberlike']['click_sort_column'] = 'vud_widget';
  $handler->display->display_options['fields']['field_cyberlike']['field_api_classes'] = TRUE;
  /* Felt: Indhold: Kommentarantal */
  $handler->display->display_options['fields']['comment_count']['id'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['table'] = 'node_comment_statistics';
  $handler->display->display_options['fields']['comment_count']['field'] = 'comment_count';
  $handler->display->display_options['fields']['comment_count']['label'] = '';
  $handler->display->display_options['fields']['comment_count']['element_type'] = '0';
  $handler->display->display_options['fields']['comment_count']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['element_wrapper_class'] = 'stream-comments';
  $handler->display->display_options['fields']['comment_count']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['comment_count']['separator'] = '';
  /* Felt: Indhold: Type */
  $handler->display->display_options['fields']['type_1']['id'] = 'type_1';
  $handler->display->display_options['fields']['type_1']['table'] = 'node';
  $handler->display->display_options['fields']['type_1']['field'] = 'type';
  $handler->display->display_options['fields']['type_1']['label'] = '';
  $handler->display->display_options['fields']['type_1']['element_type'] = '0';
  $handler->display->display_options['fields']['type_1']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['type_1']['element_wrapper_type'] = 'div';
  $handler->display->display_options['fields']['type_1']['element_wrapper_class'] = 'stream-type-icon';
  $handler->display->display_options['fields']['type_1']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['type_1']['machine_name'] = TRUE;
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
    'blog' => 'blog',
    'brevkasse' => 'brevkasse',
    'forum' => 'forum',
    'body_secret' => 'body_secret',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filterkriterie: Indhold: Type */
  $handler->display->display_options['filters']['type_1']['id'] = 'type_1';
  $handler->display->display_options['filters']['type_1']['table'] = 'node';
  $handler->display->display_options['filters']['type_1']['field'] = 'type';
  $handler->display->display_options['filters']['type_1']['value'] = array(
    'image' => 'image',
    'blog' => 'blog',
    'brevkasse' => 'brevkasse',
    'forum' => 'forum',
    'body_secret' => 'body_secret',
  );
  $handler->display->display_options['filters']['type_1']['group'] = 1;
  $handler->display->display_options['filters']['type_1']['exposed'] = TRUE;
  $handler->display->display_options['filters']['type_1']['expose']['operator_id'] = 'type_1_op';
  $handler->display->display_options['filters']['type_1']['expose']['label'] = 'Type';
  $handler->display->display_options['filters']['type_1']['expose']['operator'] = 'type_1_op';
  $handler->display->display_options['filters']['type_1']['expose']['identifier'] = 'type_1';
  $handler->display->display_options['filters']['type_1']['expose']['remember_roles'] = array(
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
  $handler->display->display_options['filters']['type_1']['expose']['reduce'] = TRUE;
  /* Filterkriterie: Felt: Køn (field_brevk_koen) */
  $handler->display->display_options['filters']['field_brevk_koen_tid']['id'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['table'] = 'field_data_field_brevk_koen';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['field'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_brevk_koen_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['operator_id'] = 'field_brevk_koen_tid_op';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['label'] = 'Køn';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['operator'] = 'field_brevk_koen_tid_op';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['identifier'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['remember_roles'] = array(
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
  $handler->display->display_options['filters']['field_brevk_koen_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['vocabulary'] = 'k_n';
  /* Filterkriterie: Felt: Alder (field_brevk_alder) */
  $handler->display->display_options['filters']['field_brevk_alder_tid']['id'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['table'] = 'field_data_field_brevk_alder';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['field'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_brevk_alder_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['operator_id'] = 'field_brevk_alder_tid_op';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['label'] = 'Alder';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['operator'] = 'field_brevk_alder_tid_op';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['identifier'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['remember_roles'] = array(
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
  $handler->display->display_options['filters']['field_brevk_alder_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['vocabulary'] = 'alder';
  /* Filterkriterie: Indhold: Ung i (field_brevk_ungi) */
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['id'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['table'] = 'field_data_field_brevk_ungi';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['field'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['operator'] = 'empty';

  /* Display: Front page */
  $handler = $view->new_display('page', 'Front page', 'page');
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['path'] = 'frontpage';

  /* Display: Brevkasse */
  $handler = $view->new_display('page', 'Brevkasse', 'page_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Brevkasse';
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'content-stream brevkasse';
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sorteringskriterie: Indhold: Opdateringsdato */
  $handler->display->display_options['sorts']['changed']['id'] = 'changed';
  $handler->display->display_options['sorts']['changed']['table'] = 'node';
  $handler->display->display_options['sorts']['changed']['field'] = 'changed';
  $handler->display->display_options['sorts']['changed']['order'] = 'DESC';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'brevkasse' => 'brevkasse',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filterkriterie: Indhold: Kategori NY (field_base_category) */
  $handler->display->display_options['filters']['field_base_category_target_id_1']['id'] = 'field_base_category_target_id_1';
  $handler->display->display_options['filters']['field_base_category_target_id_1']['table'] = 'field_data_field_base_category';
  $handler->display->display_options['filters']['field_base_category_target_id_1']['field'] = 'field_base_category_target_id';
  $handler->display->display_options['filters']['field_base_category_target_id_1']['group'] = 1;
  $handler->display->display_options['filters']['field_base_category_target_id_1']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_base_category_target_id_1']['expose']['operator_id'] = 'field_base_category_target_id_1_op';
  $handler->display->display_options['filters']['field_base_category_target_id_1']['expose']['label'] = 'Kategori';
  $handler->display->display_options['filters']['field_base_category_target_id_1']['expose']['operator'] = 'field_base_category_target_id_1_op';
  $handler->display->display_options['filters']['field_base_category_target_id_1']['expose']['identifier'] = 'field_base_category_target_id_1';
  $handler->display->display_options['filters']['field_base_category_target_id_1']['expose']['remember_roles'] = array(
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
  /* Filterkriterie: Felt: Køn (field_brevk_koen) */
  $handler->display->display_options['filters']['field_brevk_koen_tid']['id'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['table'] = 'field_data_field_brevk_koen';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['field'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_brevk_koen_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['operator_id'] = 'field_brevk_koen_tid_op';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['label'] = 'Køn';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['operator'] = 'field_brevk_koen_tid_op';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['identifier'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['remember_roles'] = array(
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
  $handler->display->display_options['filters']['field_brevk_koen_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['vocabulary'] = 'k_n';
  /* Filterkriterie: Felt: Alder (field_brevk_alder) */
  $handler->display->display_options['filters']['field_brevk_alder_tid']['id'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['table'] = 'field_data_field_brevk_alder';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['field'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_brevk_alder_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['operator_id'] = 'field_brevk_alder_tid_op';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['label'] = 'Alder';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['operator'] = 'field_brevk_alder_tid_op';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['identifier'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['remember_roles'] = array(
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
  $handler->display->display_options['filters']['field_brevk_alder_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['vocabulary'] = 'alder';
  /* Filterkriterie: Indhold: Ung i (field_brevk_ungi) */
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['id'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['table'] = 'field_data_field_brevk_ungi';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['field'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['operator'] = 'empty';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['group'] = 1;
  $handler->display->display_options['path'] = 'brevkasse-ny';

  /* Display: Ung til ung */
  $handler = $view->new_display('page', 'Ung til ung', 'page_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Ung til ung';
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'content-stream ung-til-ung';
  $handler->display->display_options['exposed_block'] = TRUE;
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'forum' => 'forum',
    'body_secret' => 'body_secret',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filterkriterie: Indhold: Type */
  $handler->display->display_options['filters']['type_1']['id'] = 'type_1';
  $handler->display->display_options['filters']['type_1']['table'] = 'node';
  $handler->display->display_options['filters']['type_1']['field'] = 'type';
  $handler->display->display_options['filters']['type_1']['value'] = array(
    'image' => 'image',
    'forum' => 'forum',
    'body_secret' => 'body_secret',
  );
  $handler->display->display_options['filters']['type_1']['group'] = 1;
  $handler->display->display_options['filters']['type_1']['exposed'] = TRUE;
  $handler->display->display_options['filters']['type_1']['expose']['operator_id'] = 'type_1_op';
  $handler->display->display_options['filters']['type_1']['expose']['label'] = 'Type';
  $handler->display->display_options['filters']['type_1']['expose']['operator'] = 'type_1_op';
  $handler->display->display_options['filters']['type_1']['expose']['identifier'] = 'type_1';
  $handler->display->display_options['filters']['type_1']['expose']['remember_roles'] = array(
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
  $handler->display->display_options['filters']['type_1']['expose']['reduce'] = TRUE;
  /* Filterkriterie: Felt: Køn (field_brevk_koen) */
  $handler->display->display_options['filters']['field_brevk_koen_tid']['id'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['table'] = 'field_data_field_brevk_koen';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['field'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_brevk_koen_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['operator_id'] = 'field_brevk_koen_tid_op';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['label'] = 'Køn';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['operator'] = 'field_brevk_koen_tid_op';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['identifier'] = 'field_brevk_koen_tid';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['expose']['remember_roles'] = array(
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
  $handler->display->display_options['filters']['field_brevk_koen_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_brevk_koen_tid']['vocabulary'] = 'k_n';
  /* Filterkriterie: Felt: Alder (field_brevk_alder) */
  $handler->display->display_options['filters']['field_brevk_alder_tid']['id'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['table'] = 'field_data_field_brevk_alder';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['field'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['group'] = 1;
  $handler->display->display_options['filters']['field_brevk_alder_tid']['exposed'] = TRUE;
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['operator_id'] = 'field_brevk_alder_tid_op';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['label'] = 'Alder';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['operator'] = 'field_brevk_alder_tid_op';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['identifier'] = 'field_brevk_alder_tid';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['expose']['remember_roles'] = array(
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
  $handler->display->display_options['filters']['field_brevk_alder_tid']['type'] = 'select';
  $handler->display->display_options['filters']['field_brevk_alder_tid']['vocabulary'] = 'alder';
  /* Filterkriterie: Indhold: Ung i (field_brevk_ungi) */
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['id'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['table'] = 'field_data_field_brevk_ungi';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['field'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['operator'] = 'empty';
  $handler->display->display_options['path'] = 'ung-til-ung';

  /* Display: Related */
  $handler = $view->new_display('block', 'Related', 'block_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Relateret indhold';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'load_more';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['pager']['options']['more_button_text'] = 'Vis mere';
  $handler->display->display_options['pager']['options']['effects']['speed'] = 'slow';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sorteringskriterie: Global: Tilfældig */
  $handler->display->display_options['sorts']['random']['id'] = 'random';
  $handler->display->display_options['sorts']['random']['table'] = 'views';
  $handler->display->display_options['sorts']['random']['field'] = 'random';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'forum' => 'forum',
    'body_secret' => 'body_secret',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  /* Filterkriterie: Indhold: Ung i (field_brevk_ungi) */
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['id'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['table'] = 'field_data_field_brevk_ungi';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['field'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['filters']['field_brevk_ungi_target_id']['operator'] = 'empty';
  $handler->display->display_options['block_description'] = 'Node: Related content';

  /* Display: Brevkasse kommune */
  $handler = $view->new_display('block', 'Brevkasse kommune', 'block_2');
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'load_more';
  $handler->display->display_options['pager']['options']['items_per_page'] = '3';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['quantity'] = '9';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Antal elementer';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['expose']['offset_label'] = 'Forskydning';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« første';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ forrige';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'næste ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'sidste »';
  $handler->display->display_options['pager']['options']['more_button_text'] = 'Vis mere';
  $handler->display->display_options['pager']['options']['effects']['speed'] = 'slow';
  $handler->display->display_options['defaults']['empty'] = FALSE;
  /* Opførsel ved ingen resultater: Global: Ufiltreret tekst */
  $handler->display->display_options['empty']['area_text_custom']['id'] = 'area_text_custom';
  $handler->display->display_options['empty']['area_text_custom']['table'] = 'views';
  $handler->display->display_options['empty']['area_text_custom']['field'] = 'area_text_custom';
  $handler->display->display_options['empty']['area_text_custom']['empty'] = TRUE;
  $handler->display->display_options['empty']['area_text_custom']['content'] = '<p><em>Der er endnu ingen spørgsmål i brevkassen.</em></p>';
  $handler->display->display_options['defaults']['sorts'] = FALSE;
  /* Sorteringskriterie: Indhold: Opdateringsdato */
  $handler->display->display_options['sorts']['changed']['id'] = 'changed';
  $handler->display->display_options['sorts']['changed']['table'] = 'node';
  $handler->display->display_options['sorts']['changed']['field'] = 'changed';
  $handler->display->display_options['sorts']['changed']['order'] = 'DESC';
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  /* Kontekstuelt filter: Indhold: Ung i (field_brevk_ungi) */
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['id'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['table'] = 'field_data_field_brevk_ungi';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['field'] = 'field_brevk_ungi_target_id';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['exception']['title'] = 'Alle';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['default_argument_type'] = 'taxonomy_tid';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['specify_validation'] = TRUE;
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['validate']['type'] = 'taxonomy_term';
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['validate_options']['vocabularies'] = array(
    'ung_i_byer' => 'ung_i_byer',
  );
  $handler->display->display_options['arguments']['field_brevk_ungi_target_id']['validate']['fail'] = 'empty';
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
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
    'brevkasse' => 'brevkasse',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  $handler->display->display_options['block_description'] = 'Brevkasse kommune';
  $translatables['frontpage_stream'] = array(
    t('Master'),
    t('Forside'),
    t('mere'),
    t('Udfør'),
    t('Nulstil'),
    t('Sortér efter'),
    t('Stigende'),
    t('Faldende'),
    t('Avancerede indstillinger'),
    t('- Køn -'),
    t('- Alder -'),
    t('Vælg et filter og klik på Anvend for at se resultater'),
    t('Antal elementer'),
    t('- Alle -'),
    t('Forskydning'),
    t('« første'),
    t('‹ forrige'),
    t('næste ›'),
    t('sidste »'),
    t('Vis mere'),
    t('forfatter'),
    t('Avatar'),
    t('Anonym'),
    t('<div class="stream-metadata-item meta-type">[type]</div>
<div class="stream-metadata-item meta-author">Af [field_navn] [field_brevk_koen] [field_brevk_alder] &middot; [created]</div>'),
    t('<a href="/node/[nid]"><img src="/sites/all/themes/cyberhus_clean/assets/img/default.png" /></a>'),
    t('[field_billede][body][field_brevk_spoergsmaal]'),
    t('Læs mere'),
    t('.'),
    t('Type'),
    t('Køn'),
    t('Alder'),
    t('Front page'),
    t('Brevkasse'),
    t('- Kategori -'),
    t('Kategori'),
    t('Ung til ung'),
    t('Related'),
    t('Relateret indhold'),
    t('Node: Related content'),
    t('Brevkasse kommune'),
    t('<p><em>Der er endnu ingen spørgsmål i brevkassen.</em></p>'),
    t('Alle'),
  );
  $export['frontpage_stream'] = $view;

  return $export;
}
