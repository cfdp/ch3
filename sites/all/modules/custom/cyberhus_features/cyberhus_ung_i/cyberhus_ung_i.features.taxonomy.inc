<?php
/**
 * @file
 * cyberhus_ung_i.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function cyberhus_ung_i_taxonomy_default_vocabularies() {
  return array(
    'ung_i_byer' => array(
      'name' => 'Ung i byer',
      'machine_name' => 'ung_i_byer',
      'description' => 'Liste af byer der anvendes i "ung i".',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'ungi_size' => array(
      'name' => 'Størrelse',
      'machine_name' => 'ungi_size',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
