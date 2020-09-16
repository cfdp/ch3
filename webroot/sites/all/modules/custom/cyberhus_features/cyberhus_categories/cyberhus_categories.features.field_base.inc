<?php
/**
 * @file
 * cyberhus_categories.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function cyberhus_categories_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_base_category'.
  $field_bases['field_base_category'] = array(
    'active' => 1,
    'cardinality' => 1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_base_category',
    'field_permissions' => array(
      'type' => 0,
    ),
    'indexes' => array(
      'target_id' => array(
        0 => 'target_id',
      ),
    ),
    'locked' => 0,
    'module' => 'entityreference',
    'settings' => array(
      'handler' => 'views',
      'handler_settings' => array(
        'behaviors' => array(
          'views-select-list' => array(
            'status' => 1,
          ),
        ),
        'view' => array(
          'args' => array(
            0 => '[node:content-type:machine-name]',
          ),
          'display_name' => 'entityreference_1',
          'view_name' => 'categories_reference',
        ),
      ),
      'target_type' => 'taxonomy_term',
      'views_base_columns' => array(),
      'views_base_table' => 0,
    ),
    'translatable' => 0,
    'type' => 'entityreference',
  );

  // Exported field_base: 'field_category_ct'.
  $field_bases['field_category_ct'] = array(
    'active' => 1,
    'cardinality' => -1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_category_ct',
    'field_permissions' => array(
      'type' => 0,
    ),
    'indexes' => array(
      'value' => array(
        0 => 'value',
      ),
    ),
    'locked' => 0,
    'module' => 'list',
    'settings' => array(
      'allowed_values' => array(
        'brevkasse' => 'Brevkassespørgsmål',
        'forum' => 'Spørgsmål',
        'image' => 'Billede',
        'body_secret' => 'Hemmelighed',
        'blog' => 'Blogindlæg',
      ),
      'allowed_values_function' => '',
      'views_base_columns' => array(),
      'views_base_table' => 0,
    ),
    'translatable' => 0,
    'type' => 'list_text',
  );

  return $field_bases;
}
