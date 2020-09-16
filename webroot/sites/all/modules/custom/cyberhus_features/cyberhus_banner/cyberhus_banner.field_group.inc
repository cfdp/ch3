<?php
/**
 * @file
 * cyberhus_banner.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function cyberhus_banner_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_banner_advanced|bean|banner|form';
  $field_group->group_name = 'group_banner_advanced';
  $field_group->entity_type = 'bean';
  $field_group->bundle = 'banner';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Avanceret',
    'weight' => '3',
    'children' => array(
      0 => 'revision',
      1 => 'view_mode',
      2 => 'redirect',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-banner-advanced field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_banner_advanced|bean|banner|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_banner_content|paragraphs_item|banner_slide|form';
  $field_group->group_name = 'group_banner_content';
  $field_group->entity_type = 'paragraphs_item';
  $field_group->bundle = 'banner_slide';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Indhold',
    'weight' => '1',
    'children' => array(
      0 => 'field_pg_banner_body',
      1 => 'field_pg_banner_link',
      2 => 'field_pg_banner_head',
      3 => 'field_pg_banner_color',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-banner-content field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_banner_content|paragraphs_item|banner_slide|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_ungi_banner|taxonomy_term|ung_i_byer|form';
  $field_group->group_name = 'group_ungi_banner';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'ung_i_byer';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Banner',
    'weight' => '3',
    'children' => array(
      0 => 'field_banner_slides',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-ungi-banner field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_ungi_banner|taxonomy_term|ung_i_byer|form'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Avanceret');
  t('Banner');
  t('Indhold');

  return $field_groups;
}
