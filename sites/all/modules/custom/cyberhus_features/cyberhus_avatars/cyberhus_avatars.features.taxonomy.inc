<?php
/**
 * @file
 * cyberhus_avatars.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function cyberhus_avatars_taxonomy_default_vocabularies() {
  return array(
    'avatars' => array(
      'name' => 'Avatars',
      'machine_name' => 'avatars',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
