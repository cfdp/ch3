<?php
namespace Deployer;

require 'recipe/common.php';
require 'maintenance_mode.php';
require 'drupal_updates.php';
require 'slack.php';
require 'database_backup.php';

// if drupal core version is not set in config.yml, we use 8 as default
set('drupal_core_version', 8);

// The path drush commands should be executed from
// Can be overwritten in config.yml but defaults to {{deploy_path}}/current/webroot/sites/{{drupal_site}}/
set('drush_exec_path', '{{deploy_path}}/current/webroot/sites/{{drupal_site}}/');

// Database should only be rolled back on fail, if backup was performed successfully and changes were
// actually made to it. This flag is set to false, but changes to true when updates and config imports
// are performed. See database_backup.php and updates.php
set('rollback_db', 'false');


//----- Tasks -----//
task('success', function(){
  writeln("✈︎ Deployment on <fg=cyan>{{hostname}}</fg=cyan> was successful.");
  writeln("<fg=magenta>♥ You're awesome! ♥</fg=magenta>");
})
  ->once()
  ->shallow()
  ->setPrivate();

// Output variables for debugging configuration
task('debug', function() {
  $var = get('drush_exec_path');
  writeln('Variable: '.$var);
});




//----- Configuring deployment -----//
task('deploy', [
  'slack:check',
  'deploy:info',
  'slack:notify:start',
  'deploy:prepare',
  'deploy:lock',
  'deploy:release',
  'deploy:update_code',
  'deploy:shared',
  'deploy:writable',
  'deploy:maintenance_mode:enable',
  'deploy:db:dump',
  'deploy:symlink',
  'deploy:drupal:post_deploy_updates',
  'deploy:maintenance_mode:disable',
  'deploy:unlock',
  'deploy:db:cleanup',
  'cleanup',
  'slack:notify:success',
  'success'
]);

// Perform rollback tasks on failed deploys
task('deploy:failed', [
  'deploy:db:rollback',
  'rollback',
  'deploy:maintenance_mode:disable',
  'deploy:unlock',
  'slack:notify:failed'
]);

