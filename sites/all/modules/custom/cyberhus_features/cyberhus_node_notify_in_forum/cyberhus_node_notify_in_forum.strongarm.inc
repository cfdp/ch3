<?php
/**
 * @file
 * cyberhus_node_notify_in_forum.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function cyberhus_node_notify_in_forum_strongarm() {
  $export = array();

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_notify_cron';
  $strongarm->value = 0;
  $export['node_notify_cron'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_notify_enabled_by_default';
  $strongarm->value = array(
    'blog' => 0,
    'poll' => 0,
    'forum' => 0,
    'blank_page' => 0,
    'body_secret' => 0,
    'brevkasse' => 0,
    'chat' => 0,
    'historie' => 0,
    'image' => 0,
    'link_artikel' => 0,
    'page' => 0,
    'simpel_side_med_view' => 0,
    'tema_side' => 0,
    'ungi_side' => 0,
    'webform' => 0,
  );
  $export['node_notify_enabled_by_default'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_notify_enabled_types';
  $strongarm->value = array(
    'forum' => 'forum',
    'blog' => 0,
    'poll' => 0,
    'blank_page' => 0,
    'body_secret' => 0,
    'brevkasse' => 0,
    'chat' => 0,
    'historie' => 0,
    'image' => 0,
    'link_artikel' => 0,
    'page' => 0,
    'simpel_side_med_view' => 0,
    'tema_side' => 0,
    'ungi_side' => 0,
    'webform' => 0,
  );
  $export['node_notify_enabled_types'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_notify_expires';
  $strongarm->value = '-1 month';
  $export['node_notify_expires'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_notify_log';
  $strongarm->value = 0;
  $export['node_notify_log'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_notify_template_body';
  $strongarm->value = 'Hi [subscriber:name],

[comment:author] has commented on: "[comment:node:title]"

----
[comment:title]

[comment:body]
----

You can view the comment at the following url
[comment:url]

You can stop receiving emails when someone replies to this post,
by going to [subscription:unsubscribe-url]

-- [site:name] team
[site:url]';
  $export['node_notify_template_body'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_notify_template_subject';
  $strongarm->value = 'New comment on "[comment:node:title]" by [comment:author]';
  $export['node_notify_template_subject'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'queue_mail_keys';
  $strongarm->value = 'node_notify_*';
  $export['queue_mail_keys'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'queue_mail_queue_time';
  $strongarm->value = '15';
  $export['queue_mail_queue_time'] = $strongarm;

  $strongarm = new stdClass();
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'queue_mail_send_on_cron';
  $strongarm->value = 1;
  $export['queue_mail_send_on_cron'] = $strongarm;

  return $export;
}
