<?php

/**
 * @file
 * Provide views data for the Entity Pager module.
 */

/**
 * Implements hook_views_plugins().
 */
function entity_pager_views_plugins() {
  $plugins = array(
    // Display, style, row, argument default, argument validator and access.
    'style' => array(
      'entity_pager' => array(
        'title' => t('Entity Pager'),
        'help' => t('Displays extra information on a Entity such as Next and Previous links'),
        'handler' => 'EntityPagerViewsPluginStyle',
        'theme' => 'views_view_table',
        'uses row plugin' => FALSE,
        'uses row class' => TRUE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
        'help topic' => 'style-table',
      ),
    ),
  );

  return $plugins;
}
