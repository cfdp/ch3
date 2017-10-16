<?php
/**
 * @file
 * Admin pages for the Opeka Popup Widgets module.
 */


/**
 * Admin settings form for Opeka Popup Widgets.
 */
function opeka_popup_widgets_admin_form($form, &$form_state) {
  form_load_include($form_state, 'admin.inc');

  $form['opeka_reg_pair_url'] = array(
    '#type' => 'textfield',
    '#title' => t('1-to-1 chat registration form'),
    '#description' => t('URL to a registration form, where counselors can enter data after a 1-to-1 chat.'),
    '#required' => FALSE,
    '#default_value' => variable_get('opeka_reg_pair_url', ''),
  );


  return system_settings_form($form);
}
