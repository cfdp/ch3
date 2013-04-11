<?php
/**
 * Imageeditor module API keys and other settings form.
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
  
  $form['aviary_feather'] = array(
    '#type' => 'fieldset',
    '#title' => t('Special Aviary Feather options'),
    '#description' => t('Aviary Feather editor allows for additional options'),
  );
  $form['aviary_feather']['imageeditor_aviary_feather_version'] = array(
    '#type' => 'select',
    '#title' => t('Version'),
    '#description' => t('Choose Aviary Feather version.'),
    '#options' => array(
      1 => 1,
      2 => 2,
    ),
    '#default_value' => variable_get('imageeditor_aviary_feather_version', 2),
    '#weight' => 5,
  );
  $form['aviary_feather']['imageeditor_aviary_feather_tools'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Tools'),
    '#description'   => t('Specify comma-separated string of tools. See !link.',
      array('!link' => l(t('Aviary documentation'), 'http://www.aviary.com/web-documentation',
        array('external' => TRUE, 'fragment' => 'constructor-config-tools', 'attributes' => array('target' => '_blank'))))),
    '#default_value' => variable_get('imageeditor_aviary_feather_tools', 'all'),
    '#size'          => 100,
    '#maxlength'     => 150,
    '#required'      => TRUE,
    '#weight'        => 10,
  );
  $form['aviary_feather']['imageeditor_aviary_feather_theme'] = array(
    '#type' => 'select',
    '#title' => t('Theme'),
    '#description' => t('Choose color theme for Aviary Feather editor.'),
    '#options' => array(
      'bluesky' => 'bluesky',
      'darkblue' => 'darkblue',
      'lightblue' => 'lightblue',
      'green' => 'green',
      'red' => 'red',
      'black' => 'black',
      'silver' => 'silver'
    ),
    '#default_value' => variable_get('imageeditor_aviary_feather_theme', 'bluesky'),
    '#weight' => 15,
  );
  $form['aviary_feather']['imageeditor_aviary_feather_secret'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Secret API key'),
    '#description'   => t('Secret API key is needed to edit high resolution images.'),
    '#default_value' => variable_get('imageeditor_aviary_feather_secret', ''),
    '#size'          => 50,
    '#maxlength'     => 100,
    '#required'      => FALSE,
    '#weight'        => 20,
  );
  
  $form['#theme'] = 'imageeditor_settings_form';
  return system_settings_form($form);
}
