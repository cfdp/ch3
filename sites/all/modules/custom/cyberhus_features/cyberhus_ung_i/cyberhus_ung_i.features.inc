<?php
/**
 * @file
 * cyberhus_ung_i.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function cyberhus_ung_i_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function cyberhus_ung_i_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_paragraphs_info().
 */
function cyberhus_ung_i_paragraphs_info() {
  $items = array(
    'ungi_alm_tekst' => array(
      'name' => 'Alm tekst',
      'bundle' => 'ungi_alm_tekst',
      'locked' => '1',
    ),
    'ungi_blog' => array(
      'name' => 'Blog',
      'bundle' => 'ungi_blog',
      'locked' => '1',
    ),
    'ungi_brevkasse' => array(
      'name' => 'Brevkasse',
      'bundle' => 'ungi_brevkasse',
      'locked' => '1',
    ),
    'ungi_iframe_embed' => array(
      'name' => 'Iframe embed (chat)',
      'bundle' => 'ungi_iframe_embed',
      'locked' => '1',
    ),
    'ungi_lokale_tilbud' => array(
      'name' => 'Lokale tilbud',
      'bundle' => 'ungi_lokale_tilbud',
      'locked' => '1',
    ),
  );
  return $items;
}
