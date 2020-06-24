<?php

/**
 * @file
 * cyberhus_ung_i_campaign.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function cyberhus_ung_i_campaign_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
  if ($module == "video_embed_field" && $api == "default_video_embed_styles") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function cyberhus_ung_i_campaign_node_info() {
  $items = array(
    'campaign_landing' => array(
      'name' => t('Kampagne landingside'),
      'base' => 'node_content',
      'description' => t('Opret en kampagneside til en kommune, hvor du kan indsætte en video, titel og beskrivelse. Samt muligheden for at chatte.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
