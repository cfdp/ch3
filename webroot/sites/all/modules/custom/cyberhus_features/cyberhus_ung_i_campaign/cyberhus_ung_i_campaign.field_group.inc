<?php

/**
 * @file
 * cyberhus_ung_i_campaign.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function cyberhus_ung_i_campaign_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_column_left|node|campaign_landing|default';
  $field_group->group_name = 'group_column_left';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'campaign_landing';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Venstre kolonne',
    'weight' => '0',
    'children' => array(
      0 => 'field_video_embed',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Venstre kolonne',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'group-column-left field-group-div',
        'description' => '',
        'show_label' => '0',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'none',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_column_left|node|campaign_landing|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_column_right|node|campaign_landing|default';
  $field_group->group_name = 'group_column_right';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'campaign_landing';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Højre kolonne',
    'weight' => '7',
    'children' => array(
      0 => 'body',
      1 => 'field_long_headline',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Højre kolonne',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'group-column-right field-group-div',
        'description' => '',
        'show_label' => '0',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'none',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_column_right|node|campaign_landing|default'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Højre kolonne');
  t('Venstre kolonne');

  return $field_groups;
}
