<?php
namespace Deployer;


$INPUT_OPTION_VALUE_NONE = 1;
$INPUT_OPTION_VALUE_REQUIRED = 2;
$INPUT_OPTION_VALUE_OPTIONAL = 4;
$INPUT_OPTION_VALUE_IS_ARRAY = 8;

// Options
option('no-cim', null, $INPUT_OPTION_VALUE_NONE, 'Prevent config import at the end of deployment');
option('no-updb', null, $INPUT_OPTION_VALUE_NONE, 'Prevent database update at the end of deployment');
option('no-locale-update', null, $INPUT_OPTION_VALUE_NONE, 'Prevent locale update at the end of deployment');


desc('Post deployment drupal stuff');
task('deploy:drupal:post_deploy_updates', function () {

  $run_cache_rebuild = FALSE;

  if (input()->hasOption('no-updb') && empty(input()->getOption('no-updb'))) {
    set('rollback_db', 'true');
    writeln('Running update database');
    run("cd {{drush_exec_path}} && drush updatedb -y");
  } else {
    writeln('Skipping database updates');
  }

  if (get('drupal_core_version') > 7 && input()->hasOption('cim') && !empty(input()->getOption('cim'))) {
    set('rollback_db', 'true');
    writeln('Running config import');
    run("cd {{drush_exec_path}} && drush cim -y");
    $run_cache_rebuild = TRUE;
  } else {
    writeln('Skipping config import');
  }

  // you can disable locale update by setting disable_locale_update to true in config.yml
  if (!get('disable_locale_update', false) && input()->hasOption('no-locale-update') && empty(input()->getOption('no-locale-update'))) {
    set('rollback_db', 'true');
    writeln('Running locale updates');
    if(get('drupal_core_version') == 7) {
      run("cd {{drush_exec_path}} && drush l10n-update-refresh && drush l10n-update ");
    } else {
      run("cd {{drush_exec_path}} && drush locale-check && drush locale-update ");
    }
    $run_cache_rebuild = TRUE;
  } else {
    writeln('Skipping locale updates');
  }

  if($run_cache_rebuild){
    writeln('Rebuilding cache');
    if(get('drupal_core_version') == 7) {
      run("cd {{drush_exec_path}} && drush cc all");
    } else {
      run("cd {{drush_exec_path}} && drush cr");
    }
  } else {
    writeln('Skipping cache rebuild');
  }
})
  ->setPrivate();


