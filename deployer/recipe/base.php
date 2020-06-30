<?php
namespace Deployer;

require 'maintenance_mode.php';
require 'drupal_updates.php';
require 'slack.php';
require 'database_backup.php';

// if drupal core version is not set in config.yml, we use 8 as default
set('drupal_core_version', get('drupal_core_version', 8));

if(get('drupal_core_version') == 7) {
  require 'recipe/drupal7.php';
} else {
  require 'recipe/drupal8.php';
}

// The path drush commands should be executed from
// Can be overwritten in hosts.yml but defaults to {{deployment_path}}/current/webroot/sites/{{drupal_site}}/
set('drush_exec_path', get('drush_exec_path', '{{deployment_path}}/current/webroot/sites/{{drupal_site}}/'));

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
  $var = get('drush_path');
  writeln('Variable: '.$var);
});




//----- Configuring deployment -----//

// Perform database backup
before('deploy:symlink', 'deploy:db:dump');
before('cleanup', 'deploy:db:cleanup');

// Activate maintenance mode during deploys
after('deploy:shared', 'deploy:maintenance_mode:enable');
after('deploy:drupal:post_deploy_updates', 'deploy:maintenance_mode:disable');

// Perform drush updates
before('cleanup', 'deploy:drupal:post_deploy_updates');

// Perform rollback tasks on failed deploys
after('deploy:failed', 'deploy:db:rollback');
after('deploy:failed', 'rollback');
after('deploy:failed', 'deploy:maintenance_mode:disable');
after('deploy:failed', 'deploy:unlock');

// Integrate with slack
before('deploy', 'slack:check');
after('deploy:info', 'slack:notify:start');
after('success', 'slack:notify:success');
after('deploy:failed', 'slack:notify:failed');

// Show success message after deploy
after('deploy', 'success');
