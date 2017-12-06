<?php
/**
 * @file
 * cyberhus_ung_i.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function cyberhus_ung_i_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_chat_info|taxonomy_term|ung_i_byer|form';
  $field_group->group_name = 'group_chat_info';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'ung_i_byer';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Chat opsætning',
    'weight' => '7',
    'children' => array(
      0 => 'field_chatnavn',
      1 => 'field_chatbeskrivelse',
      2 => 'field_chat_url',
      3 => 'field_chattype',
      4 => 'field_chatport',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Chat opsætning',
      'instance_settings' => array(
        'required_fields' => 0,
        'id' => '',
        'classes' => 'group-chat-info field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'collapsed',
    ),
  );
  $field_groups['group_chat_info|taxonomy_term|ung_i_byer|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_ungi_content|taxonomy_term|ung_i_byer|form';
  $field_group->group_name = 'group_ungi_content';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'ung_i_byer';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Indhold',
    'weight' => '4',
    'children' => array(
      0 => 'field_ungi_info',
      1 => 'field_ungi_chat_embed',
      2 => 'field_ungi_chat_desc',
      3 => 'field_ungi_brevkasse_desc',
      4 => 'field_ungi_offer_desc',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-ungi-content field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_ungi_content|taxonomy_term|ung_i_byer|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_ungi_settings|taxonomy_term|ung_i_byer|form';
  $field_group->group_name = 'group_ungi_settings';
  $field_group->entity_type = 'taxonomy_term';
  $field_group->bundle = 'ung_i_byer';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Brevkasse indstillinger',
    'weight' => '3',
    'children' => array(
      0 => 'field_ungi_lb_open',
      1 => 'field_ungi_lb_state',
      2 => 'field_letterbox_notifications',
      3 => 'field_ungi_lb_discl_bool',
      4 => 'field_ungi_lb_discl_label',
      5 => 'field_ungi_lb_disclaimer',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Brevkasse indstillinger',
      'instance_settings' => array(
        'required_fields' => 1,
        'id' => '',
        'classes' => 'group-ungi-settings field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'collapsed',
    ),
  );
  $field_groups['group_ungi_settings|taxonomy_term|ung_i_byer|form'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Brevkasse indstillinger');
  t('Chat opsætning');
  t('Indhold');

  return $field_groups;
}
