<?php
/**
 * @file
 * Rules implementation
 */

/**
 * Implements hook_rules_action_info
 */
function ga_push_rules_action_info() {

  $items['ga_push_action_push_event'] = array(
    'label' => t('Ga push: event'),
    'group' => t('Others'),
    'parameter' => array(
      'category' => array(
        'type' => 'text',
        'label' => t('Category'),
        'description' => t('The name you supply for the group of objects you want to track.'),
      ),
      'action' => array(
        'type' => 'text',
        'label' => t('Action'),
        'description' => t('A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.'),
        'translatable' => TRUE,
      ),
      'label' => array(
        'type' => 'text',
        'label' => t('Label'),
        'description' => t('An optional string to provide additional dimensions to the event data.'),
        'translatable' => TRUE,
        'optional' => TRUE,
      ),
      'value' => array(
        'type' => 'text',
        'label' => t('Value'),
        'description' => t("An integer that you can use to provide numerical data about the user event."),
        'optional' => TRUE,
      ),
      'non-interaction' => array(
        'type' => 'text',
        'label' => t('Non interaction'),
        'description' => t("A boolean that when set to true, indicates that the event hit will not be used in bounce-rate calculation. (Not compatible with SSGA method)."),
        'options list' => 'ga_push_get_event_non_interaction_option_list',
        'default value' => FALSE,
        'optional' => TRUE,
      ),
      'method' => array(
        'type' => 'text',
        'label' => t('Method'),
        'description' => t("Select the method"),
        'options list' => 'ga_push_get_methods_option_list_event',
        'default value' => GA_PUSH_METHOD_DEFAULT,
        'optional' => FALSE,
      ),
    ),
  );

  return $items;
}

/**
 * Add a push form a rule action
 */
function ga_push_action_push_event($category, $action, $label, $value, $non_interaction, $method) {
  $push = array(
    'category'        => $category,
    'action'          => $action,
    'label'           => $label,
    'value'           => (int) $value,
    'non-interaction' => (bool) $non_interaction,
  );
  ga_push_add($push, GA_PUSH_TYPE_EVENT, $method);
}