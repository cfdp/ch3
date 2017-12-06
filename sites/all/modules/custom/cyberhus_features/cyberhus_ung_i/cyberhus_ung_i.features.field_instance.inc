<?php
/**
 * @file
 * cyberhus_ung_i.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function cyberhus_ung_i_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'node-brevkasse-field_brevk_ungi'.
  $field_instances['node-brevkasse-field_brevk_ungi'] = array(
    'bundle' => 'brevkasse',
    'default_value' => NULL,
    'default_value_function' => 'entityreference_prepopulate_field_default_value',
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'entityreference',
        'settings' => array(
          'bypass_access' => 1,
          'link' => 0,
        ),
        'type' => 'entityreference_label',
        'weight' => 4,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_brevk_ungi',
    'label' => 'Ung i',
    'required' => 0,
    'settings' => array(
      'behaviors' => array(
        'prepopulate' => array(
          'action' => 'disable',
          'action_on_edit' => 0,
          'fallback' => 'hide',
          'providers' => array(
            'og_context' => FALSE,
            'url' => 1,
          ),
          'skip_perm' => 0,
          'status' => 1,
        ),
        'taxonomy-index' => array(
          'status' => TRUE,
        ),
      ),
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(
        'match_operator' => 'CONTAINS',
        'path' => '',
        'size' => 60,
      ),
      'type' => 'options_select',
      'weight' => 16,
    ),
  );

  // Exported field_instance:
  // 'paragraphs_item-ungi_alm_tekst-field_ungi_at_indhold'.
  $field_instances['paragraphs_item-ungi_alm_tekst-field_ungi_at_indhold'] = array(
    'bundle' => 'ungi_alm_tekst',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 2,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_at_indhold',
    'label' => 'Indhold',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => '',
        'maxlength_js_enforce' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'maxlength_js_truncate_html' => 0,
        'rows' => 5,
      ),
      'type' => 'text_textarea',
      'weight' => 2,
    ),
  );

  // Exported field_instance:
  // 'paragraphs_item-ungi_alm_tekst-field_ungi_at_titel'.
  $field_instances['paragraphs_item-ungi_alm_tekst-field_ungi_at_titel'] = array(
    'bundle' => 'ungi_alm_tekst',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 1,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_at_titel',
    'label' => 'Titel',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 1,
    ),
  );

  // Exported field_instance: 'paragraphs_item-ungi_alm_tekst-field_ungi_size'.
  $field_instances['paragraphs_item-ungi_alm_tekst-field_ungi_size'] = array(
    'bundle' => 'ungi_alm_tekst',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Vælg bredden på dette element',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'taxonomy',
        'settings' => array(),
        'type' => 'taxonomy_term_reference_link',
        'weight' => 0,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_size',
    'label' => 'Bredde',
    'required' => 1,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(),
      'type' => 'options_select',
      'weight' => 0,
    ),
  );

  // Exported field_instance: 'paragraphs_item-ungi_blog-field_ungi_blog_about'.
  $field_instances['paragraphs_item-ungi_blog-field_ungi_blog_about'] = array(
    'bundle' => 'ungi_blog',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Kort beskrivelse af denne blog',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 2,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_blog_about',
    'label' => 'Om denne blog',
    'required' => 1,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 1,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => '',
        'maxlength_js_enforce' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'maxlength_js_truncate_html' => 0,
        'rows' => 5,
      ),
      'type' => 'text_textarea',
      'weight' => 2,
    ),
  );

  // Exported field_instance: 'paragraphs_item-ungi_blog-field_ungi_blog_title'.
  $field_instances['paragraphs_item-ungi_blog-field_ungi_blog_title'] = array(
    'bundle' => 'ungi_blog',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 1,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_blog_title',
    'label' => 'Blog titel',
    'required' => 1,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 1,
    ),
  );

  // Exported field_instance: 'paragraphs_item-ungi_blog-field_ungi_blog_user'.
  $field_instances['paragraphs_item-ungi_blog-field_ungi_blog_user'] = array(
    'bundle' => 'ungi_blog',
    'default_value' => NULL,
    'default_value_function' => '',
    'deleted' => 0,
    'description' => 'Vælg forfatter til de blogindlæg der ønskes at vise',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'entityreference',
        'settings' => array(
          'bypass_access' => 1,
          'link' => 0,
        ),
        'type' => 'entityreference_label',
        'weight' => 3,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_blog_user',
    'label' => 'Vælg bruger',
    'required' => 1,
    'settings' => array(
      'behaviors' => array(
        'prepopulate' => array(
          'status' => 0,
        ),
      ),
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'entityreference',
      'settings' => array(
        'match_operator' => 'CONTAINS',
        'path' => '',
        'size' => 60,
      ),
      'type' => 'entityreference_autocomplete_tags',
      'weight' => 3,
    ),
  );

  // Exported field_instance: 'paragraphs_item-ungi_blog-field_ungi_size'.
  $field_instances['paragraphs_item-ungi_blog-field_ungi_size'] = array(
    'bundle' => 'ungi_blog',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Vælg bredden på dette element',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'taxonomy',
        'settings' => array(),
        'type' => 'taxonomy_term_reference_link',
        'weight' => 0,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_size',
    'label' => 'Bredde',
    'required' => 1,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(),
      'type' => 'options_select',
      'weight' => 0,
    ),
  );

  // Exported field_instance:
  // 'paragraphs_item-ungi_brevkasse-field_ungi_lb_description'.
  $field_instances['paragraphs_item-ungi_brevkasse-field_ungi_lb_description'] = array(
    'bundle' => 'ungi_brevkasse',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Tilføj en beskrivelse af denne brevkasse',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 2,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_lb_description',
    'label' => 'Om denne brevkasse',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 1,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => '',
        'maxlength_js_enforce' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'maxlength_js_truncate_html' => 0,
        'rows' => 5,
      ),
      'type' => 'text_textarea',
      'weight' => 2,
    ),
  );

  // Exported field_instance:
  // 'paragraphs_item-ungi_brevkasse-field_ungi_lb_title'.
  $field_instances['paragraphs_item-ungi_brevkasse-field_ungi_lb_title'] = array(
    'bundle' => 'ungi_brevkasse',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_plain',
        'weight' => 1,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_lb_title',
    'label' => 'Brevkasse titel',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 1,
    ),
  );

  // Exported field_instance: 'paragraphs_item-ungi_brevkasse-field_ungi_size'.
  $field_instances['paragraphs_item-ungi_brevkasse-field_ungi_size'] = array(
    'bundle' => 'ungi_brevkasse',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Vælg bredden på dette element',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'taxonomy',
        'settings' => array(),
        'type' => 'taxonomy_term_reference_link',
        'weight' => 0,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_size',
    'label' => 'Bredde',
    'required' => 1,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(),
      'type' => 'options_select',
      'weight' => 0,
    ),
  );

  // Exported field_instance:
  // 'paragraphs_item-ungi_iframe_embed-field_ungi_iframe_embed'.
  $field_instances['paragraphs_item-ungi_iframe_embed-field_ungi_iframe_embed'] = array(
    'bundle' => 'ungi_iframe_embed',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 0,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_iframe_embed',
    'label' => 'Chat embed',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 0,
          2 => 0,
          3 => 3,
          4 => 0,
          6 => 0,
          'admin_html' => 0,
        ),
        'allowed_formats_toggle' => 1,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => '',
        'maxlength_js_enforce' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'maxlength_js_truncate_html' => 0,
        'rows' => 3,
      ),
      'type' => 'text_textarea',
      'weight' => 1,
    ),
  );

  // Exported field_instance:
  // 'paragraphs_item-ungi_lokale_tilbud-field_ungi_lt_indhold'.
  $field_instances['paragraphs_item-ungi_lokale_tilbud-field_ungi_lt_indhold'] = array(
    'bundle' => 'ungi_lokale_tilbud',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 2,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_lt_indhold',
    'label' => 'Indhold',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => '',
        'maxlength_js_enforce' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'maxlength_js_truncate_html' => 0,
        'rows' => 5,
      ),
      'type' => 'text_textarea',
      'weight' => 3,
    ),
  );

  // Exported field_instance:
  // 'paragraphs_item-ungi_lokale_tilbud-field_ungi_lt_titel'.
  $field_instances['paragraphs_item-ungi_lokale_tilbud-field_ungi_lt_titel'] = array(
    'bundle' => 'ungi_lokale_tilbud',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 1,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_lt_titel',
    'label' => 'Titel',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 2,
    ),
  );

  // Exported field_instance:
  // 'paragraphs_item-ungi_lokale_tilbud-field_ungi_size'.
  $field_instances['paragraphs_item-ungi_lokale_tilbud-field_ungi_size'] = array(
    'bundle' => 'ungi_lokale_tilbud',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Vælg bredden på dette element',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'taxonomy',
        'settings' => array(),
        'type' => 'taxonomy_term_reference_link',
        'weight' => 0,
      ),
      'paragraphs_editor_preview' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'paragraphs_item',
    'field_name' => 'field_ungi_size',
    'label' => 'Bredde',
    'required' => 1,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(),
      'type' => 'options_select',
      'weight' => 0,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_chat_url'.
  $field_instances['taxonomy_term-ung_i_byer-field_chat_url'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 13,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_chat_url',
    'label' => 'Chat URL',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 9,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_chatbeskrivelse'.
  $field_instances['taxonomy_term-ung_i_byer-field_chatbeskrivelse'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 12,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_chatbeskrivelse',
    'label' => 'Chatbeskrivelse',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 8,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_chatnavn'.
  $field_instances['taxonomy_term-ung_i_byer-field_chatnavn'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 11,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_chatnavn',
    'label' => 'Chatnavn',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 7,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_chatport'.
  $field_instances['taxonomy_term-ung_i_byer-field_chatport'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 15,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_chatport',
    'label' => 'Chatport',
    'required' => 0,
    'settings' => array(
      'max' => '',
      'min' => '',
      'prefix' => '',
      'suffix' => '',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'number',
      'settings' => array(
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
      ),
      'type' => 'number',
      'weight' => 11,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_chattype'.
  $field_instances['taxonomy_term-ung_i_byer-field_chattype'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 14,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_chattype',
    'label' => 'Chattype',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
      ),
      'type' => 'options_select',
      'weight' => 10,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-ung_i_byer-field_letterbox_notifications'.
  $field_instances['taxonomy_term-ung_i_byer-field_letterbox_notifications'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => 'Vælg, om der skal sendes notifikationer ud til rådgivere, når et spørgsmål er klar til at blive besvaret',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 4,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_letterbox_notifications',
    'label' => 'Send notifikationer',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(
        'display_label' => 1,
      ),
      'type' => 'options_onoff',
      'weight' => 16,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_lokation'.
  $field_instances['taxonomy_term-ung_i_byer-field_lokation'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 10,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_lokation',
    'label' => 'Lokation',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'geolocation_googlemaps',
      'settings' => array(
        'marker_draggable' => 1,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'scrollwheel' => 1,
      ),
      'type' => 'geolocation_googlemap',
      'weight' => 8,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_ungi_content'.
  $field_instances['taxonomy_term-ung_i_byer-field_ungi_content'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'paragraphs',
        'settings' => array(
          'view_mode' => 'full',
        ),
        'type' => 'paragraphs_view',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_ungi_content',
    'label' => 'Vælg indhold',
    'required' => 0,
    'settings' => array(
      'add_mode' => 'button',
      'allowed_bundles' => array(
        'banner_slide' => -1,
        'ungi_alm_tekst' => 'ungi_alm_tekst',
        'ungi_blog' => 'ungi_blog',
        'ungi_brevkasse' => 'ungi_brevkasse',
        'ungi_iframe_embed' => 'ungi_iframe_embed',
        'ungi_lokale_tilbud' => 'ungi_lokale_tilbud',
      ),
      'bundle_weights' => array(
        'banner_slide' => -12,
        'ungi_alm_tekst' => -11,
        'ungi_blog' => -7,
        'ungi_brevkasse' => -8,
        'ungi_iframe_embed' => -10,
        'ungi_lokale_tilbud' => -9,
      ),
      'default_edit_mode' => 'preview',
      'title' => 'Indholdselement',
      'title_multiple' => 'Indholdselementer',
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 0,
      'module' => 'paragraphs',
      'settings' => array(),
      'type' => 'paragraphs_embed',
      'weight' => 2,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-ung_i_byer-field_ungi_lb_discl_bool'.
  $field_instances['taxonomy_term-ung_i_byer-field_ungi_lb_discl_bool'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => 'Når en bruger opretter et spørgsmål i brevkassen til en ung-i by, kan der vises en tilpasset disclaimer-tekst øverst på formularen, hvis denne checkbox afmærkes og de tilhørende felter udfyldes.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 3,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_ungi_lb_discl_bool',
    'label' => 'Vis tilpasset disclaimertekst på brevkasseformular',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(
        'display_label' => 1,
      ),
      'type' => 'options_onoff',
      'weight' => 17,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-ung_i_byer-field_ungi_lb_discl_label'.
  $field_instances['taxonomy_term-ung_i_byer-field_ungi_lb_discl_label'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Denne tekst indsættes som etiket på disclaimer-feltet',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 1,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_ungi_lb_discl_label',
    'label' => 'Tilpasset disclaimertekst-etiket',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'size' => 60,
      ),
      'type' => 'text_textfield',
      'weight' => 18,
    ),
  );

  // Exported field_instance:
  // 'taxonomy_term-ung_i_byer-field_ungi_lb_disclaimer'.
  $field_instances['taxonomy_term-ung_i_byer-field_ungi_lb_disclaimer'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Tekst som vises øverst på oprettelsesformularen for brevkassespørgsmål i forbindelse med en checkbox.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 2,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_ungi_lb_disclaimer',
    'label' => 'Disclaimer-tekst på brevkasse-formular',
    'required' => 0,
    'settings' => array(
      'better_formats' => array(
        'allowed_formats' => array(
          1 => 1,
          2 => 2,
          3 => 3,
          4 => 4,
          6 => 6,
          'admin_html' => 'admin_html',
        ),
        'allowed_formats_toggle' => 0,
        'default_order_toggle' => 0,
        'default_order_wrapper' => array(
          'formats' => array(
            1 => array(
              'weight' => -10,
            ),
            2 => array(
              'weight' => -9,
            ),
            3 => array(
              'weight' => -8,
            ),
            4 => array(
              'weight' => -7,
            ),
            6 => array(
              'weight' => -6,
            ),
            'admin_html' => array(
              'weight' => 0,
            ),
          ),
        ),
      ),
      'text_processing' => 0,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'maxlength_js' => '',
        'maxlength_js_enforce' => 0,
        'maxlength_js_label' => 'Content limited to @limit characters, remaining: <strong>@remaining</strong>',
        'maxlength_js_truncate_html' => 0,
        'rows' => 5,
      ),
      'type' => 'text_textarea',
      'weight' => 19,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_ungi_lb_open'.
  $field_instances['taxonomy_term-ung_i_byer-field_ungi_lb_open'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => 'Slå til hvis det skal være muligt at oprette spørgsmål i brevkassen.',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 7,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_ungi_lb_open',
    'label' => 'Opret spørgsmål',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(
        'display_label' => 1,
      ),
      'type' => 'options_onoff',
      'weight' => 15,
    ),
  );

  // Exported field_instance: 'taxonomy_term-ung_i_byer-field_ungi_lb_state'.
  $field_instances['taxonomy_term-ung_i_byer-field_ungi_lb_state'] = array(
    'bundle' => 'ung_i_byer',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 6,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_ungi_lb_state',
    'label' => 'Vis brevkassen',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(
        'display_label' => 1,
      ),
      'type' => 'options_onoff',
      'weight' => 14,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Blog titel');
  t('Bredde');
  t('Brevkasse titel');
  t('Chat URL');
  t('Chat embed');
  t('Chatbeskrivelse');
  t('Chatnavn');
  t('Chatport');
  t('Chattype');
  t('Denne tekst indsættes som etiket på disclaimer-feltet');
  t('Disclaimer-tekst på brevkasse-formular');
  t('Indhold');
  t('Kort beskrivelse af denne blog');
  t('Lokation');
  t('Når en bruger opretter et spørgsmål i brevkassen til en ung-i by, kan der vises en tilpasset disclaimer-tekst øverst på formularen, hvis denne checkbox afmærkes og de tilhørende felter udfyldes.');
  t('Om denne blog');
  t('Om denne brevkasse');
  t('Opret spørgsmål');
  t('Send notifikationer');
  t('Slå til hvis det skal være muligt at oprette spørgsmål i brevkassen.');
  t('Tekst som vises øverst på oprettelsesformularen for brevkassespørgsmål i forbindelse med en checkbox.');
  t('Tilføj en beskrivelse af denne brevkasse');
  t('Tilpasset disclaimertekst-etiket');
  t('Titel');
  t('Ung i');
  t('Vis brevkassen');
  t('Vis tilpasset disclaimertekst på brevkasseformular');
  t('Vælg bredden på dette element');
  t('Vælg bruger');
  t('Vælg forfatter til de blogindlæg der ønskes at vise');
  t('Vælg indhold');
  t('Vælg, om der skal sendes notifikationer ud til rådgivere, når et spørgsmål er klar til at blive besvaret');

  return $field_instances;
}
