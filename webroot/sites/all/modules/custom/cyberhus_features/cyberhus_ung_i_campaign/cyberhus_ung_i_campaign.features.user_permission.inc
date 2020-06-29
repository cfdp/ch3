<?php

/**
 * @file
 * cyberhus_ung_i_campaign.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function cyberhus_ung_i_campaign_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create campaign_landing content'.
  $permissions['create campaign_landing content'] = array(
    'name' => 'create campaign_landing content',
    'roles' => array(
      'Admin' => 'Admin',
      'Redaktør' => 'Redaktør',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete any campaign_landing content'.
  $permissions['delete any campaign_landing content'] = array(
    'name' => 'delete any campaign_landing content',
    'roles' => array(
      'Admin' => 'Admin',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete own campaign_landing content'.
  $permissions['delete own campaign_landing content'] = array(
    'name' => 'delete own campaign_landing content',
    'roles' => array(
      'Admin' => 'Admin',
      'Redaktør' => 'Redaktør',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit any campaign_landing content'.
  $permissions['edit any campaign_landing content'] = array(
    'name' => 'edit any campaign_landing content',
    'roles' => array(
      'Admin' => 'Admin',
      'Redaktør' => 'Redaktør',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit own campaign_landing content'.
  $permissions['edit own campaign_landing content'] = array(
    'name' => 'edit own campaign_landing content',
    'roles' => array(
      'Admin' => 'Admin',
      'Redaktør' => 'Redaktør',
    ),
    'module' => 'node',
  );

  return $permissions;
}
