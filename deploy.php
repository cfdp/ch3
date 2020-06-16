<?php
namespace Deployer;

$INPUT_OPTION_VALUE_NONE = 1;
$INPUT_OPTION_VALUE_REQUIRED = 2;
$INPUT_OPTION_VALUE_OPTIONAL = 4;
$INPUT_OPTION_VALUE_IS_ARRAY = 8;

require 'deployer/recipe/drupal.php';
$deployer_config = require 'deployer/deploy_config.php';

// Project name
set('application', $deployer_config['application']);

//Set Drupal 7 site. Change if you use different site
set('drupal_site', $deployer_config['drupal_site']);

// Hosts
inventory('deployer/hosts.yml');

// Project repository
set('repository', $deployer_config['respository']);

// Deployment path
set('deployment_path', $deployer_config['deployment_path']);

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', $deployer_config['git_tty']);

//Drupal 7 shared dirs
set('shared_dirs', $deployer_config['shared_dirs']);

//Drupal 7 shared files
set('shared_files', $deployer_config['shared_files']);

//Drupal 7 writable dirs
set('writable_dirs', $deployer_config['writable_dirs']);
add('writable_dirs', []);
set('allow_anonymous_stats', $deployer_config['allow_anonymous_stats']);

// if deploy fails, should database be rolled back?
// @see sql and drupal recipes.
set('rollback_db', 'false');

// Options
option('no-updb', null, $INPUT_OPTION_VALUE_NONE, 'Prevent database update at the end of deployment');
option('no-locale-update', null, $INPUT_OPTION_VALUE_NONE, 'Prevent locale update at the end of deployment');

// Tasks
task('success', function(){
  writeln("✈︎ Deployment on <fg=cyan>{{hostname}}</fg=cyan> was successful.");
  writeln("<fg=magenta>♥ You're awesome! ♥</fg=magenta>");
})
  ->once()
  ->shallow()
  ->setPrivate();

// Deploy success:
after('deploy', 'success');

// Additional Drupal release stuff:
after('deploy:shared', 'deploy:maintenance_mode:enable');
before('deploy:symlink', 'deploy:db:dump');
before('cleanup', 'deploy:db:cleanup');
before('cleanup', 'deploy:drupal:post_deploy_updates');
after('deploy:drupal:post_deploy_updates', 'deploy:maintenance_mode:disable');

// [Optional] if deploy fails automatically unlock.
// Deploy failed:
after('deploy:failed', 'deploy:unlock');
