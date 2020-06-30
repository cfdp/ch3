<?php

/**
 * @file
 * cyberhus_ung_i_campaign.default_video_embed_styles.inc
 */

/**
 * Implements hook_default_video_embed_styles().
 */
function cyberhus_ung_i_campaign_default_video_embed_styles() {
  $export = array();

  $video_embed_style = new stdClass();
  $video_embed_style->disabled = FALSE; /* Edit this to true to make a default video_embed_style disabled initially */
  $video_embed_style->api_version = 1;
  $video_embed_style->name = 'stripped';
  $video_embed_style->title = 'Stripped';
  $video_embed_style->data = array(
    'youtube' => array(
      'width' => '',
      'height' => '',
      'theme' => 'dark',
      'autoplay' => 1,
      'vq' => 'large',
      'rel' => 0,
      'showinfo' => 0,
      'modestbranding' => 0,
      'iv_load_policy' => '3',
      'controls' => '0',
      'autohide' => '1',
      'class' => '',
    ),
    'vimeo' => array(
      'width' => '100%',
      'height' => '100%',
      'color' => 'ffffff',
      'portrait' => 0,
      'title' => 0,
      'byline' => 0,
      'autoplay' => 1,
      'loop' => 1,
      'froogaloop' => 1,
      'class' => '',
    ),
    'data__active_tab' => 'edit-data-vimeo',
  );
  $export['stripped'] = $video_embed_style;

  return $export;
}
