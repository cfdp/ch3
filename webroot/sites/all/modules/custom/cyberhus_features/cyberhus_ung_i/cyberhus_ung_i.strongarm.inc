<?php
/**
 * @file
 * cyberhus_ung_i.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function cyberhus_ung_i_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'pathauto_taxonomy_term_ung_i_byer_pattern';
  $strongarm->value = '';
  $export['pathauto_taxonomy_term_ung_i_byer_pattern'] = $strongarm;

  return $export;
}
