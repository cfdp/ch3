<?php
namespace Deployer;


desc('Enable maintenance mode');
task('deploy:maintenance_mode:enable', function () {
  run("cd {{drush_exec_path}} && drush vset --exact maintenance_mode 1 ");
  if(get('drupal_core_version') == 7) {
    run("cd {{drush_exec_path}} && drush cc all");
  } else {
    run("cd {{drush_exec_path}} && drush cr");
  }
})
  ->setPrivate();


desc('Disable maintenance mode');
task('deploy:maintenance_mode:disable', function () {
  run("cd {{drush_exec_path}} && drush vset --exact maintenance_mode 0 ");
  if(get('drupal_core_version') == 7) {
    run("cd {{drush_exec_path}} && drush cc all");
  } else {
    run("cd {{drush_exec_path}} && drush cr");
  }
})
  ->setPrivate();


