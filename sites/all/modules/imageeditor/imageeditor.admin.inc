<?php
/**
 * @file
 * Admin settings for the Image Editor module.
 */

/**
 * Image Editor module API keys and other settings form.
 */
function imageeditor_settings_form() {
  $form = array();

  $form['title'] = array(
    '#type' => 'item',
    '#title' => t('API keys'),
    '#description' => t('Enter API keys for needed image editors and upload services. These keys are global for the whole site.'),
  );

  foreach(imageeditor_api_keys() as $codename => $api_key) {
    $form[$codename . '_display_name'] = array(
      '#type' => 'markup',
      '#markup' => $api_key['display_name'],
    );
    $form[$codename] = array(
      '#type'          => 'textfield',
      '#default_value' => variable_get($codename, ''),
      '#size'          => 50,
      '#maxlength'     => 100,
      '#required'      => FALSE,
    );
    $form[$codename . '_description'] = array(
      '#type' => 'markup',
      '#markup' => $api_key['description'],
    );
    $form[$codename . '_link'] = array(
      '#type' => 'markup',
      '#markup' => l($api_key['link'], $api_key['link'], array('attributes' => array('target' => '_blank'))),
    );
  }

  $options = array();
  foreach (imageeditor_overlays() as $codename => $overlay) {
    $options[$codename] = $overlay['name'];
  }
  $form['imageeditor_overlay_type'] = array(
    '#type' => 'radios',
    '#title' => t('Image Editor overlay type'),
    '#description' => t('Choose Image Editor modal window type.'),
    '#options' => $options,
    '#default_value' => variable_get('imageeditor_overlay_type', 'custom'),
  );

  foreach (imageeditor_editors() as $codename => $editor) {
    if (isset($editor['settings_form_callback']) && function_exists($editor['settings_form_callback'])) {
      $form[$codename] = $editor['settings_form_callback']();
    }
  }

  $form['#theme'] = 'imageeditor_settings_form';
  return system_settings_form($form);
}

/**
 * Theme function for admin settings form.
 */
function theme_imageeditor_settings_form($variables) {
  $form = $variables['form'];
  $output = '';
  $output .= drupal_render($form['title']);

  $header = array(t('Name'), t('API key'), t('Description'), t('Get API key'));
  $rows = array();

  foreach(imageeditor_api_keys() as $codename => $api_key) {
    $row = array();
    $row[] = drupal_render($form[$codename . '_display_name']);
    $row[] = drupal_render($form[$codename]);
    $row[] = drupal_render($form[$codename . '_description']);
    $row[] = drupal_render($form[$codename . '_link']);
    $rows[] = array('data' => $row);
  }
  $output .= theme('table', array('header' => $header, 'rows' => $rows));

  $output .= drupal_render_children($form);

  return $output;
}
