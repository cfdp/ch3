<?php
/**
 * @file
 * cyberhus_banner.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function cyberhus_banner_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'create any banner bean'.
  $permissions['create any banner bean'] = array(
    'name' => 'create any banner bean',
    'roles' => array(),
    'module' => 'bean',
  );

  // Exported permission: 'delete any banner bean'.
  $permissions['delete any banner bean'] = array(
    'name' => 'delete any banner bean',
    'roles' => array(),
    'module' => 'bean',
  );

  // Exported permission: 'edit any banner bean'.
  $permissions['edit any banner bean'] = array(
    'name' => 'edit any banner bean',
    'roles' => array(),
    'module' => 'bean',
  );

  // Exported permission: 'view any banner bean'.
  $permissions['view any banner bean'] = array(
    'name' => 'view any banner bean',
    'roles' => array(
      'Admin' => 'Admin',
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'bean',
  );

  return $permissions;
}
