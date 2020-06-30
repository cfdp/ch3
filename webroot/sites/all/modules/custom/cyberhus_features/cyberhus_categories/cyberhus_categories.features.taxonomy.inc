<?php
/**
 * @file
 * cyberhus_categories.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function cyberhus_categories_taxonomy_default_vocabularies() {
  return array(
    'content_categories' => array(
      'name' => 'Kategorier',
      'machine_name' => 'content_categories',
      'description' => 'Kategorier som bruges på tværs af flere forskellige indholdstyper.',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
