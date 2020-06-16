<?php
/* (c) Mikkel Mandal <mma@novicell.dk>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Deployer;

desc('Post deployment drupal stuff');
task('deploy:drupal:post_deploy_updates', function () {
  $run_cache_rebuild = FALSE;

  if (input()->hasOption('no-updb') && empty(input()->getOption('no-updb'))) {
    writeln('Running update database');
    run("cd {{deployment_path}} && drush updatedb -y");
    set('rollback_db', 'true');
  } else {
    writeln('Skipping database updates');
  }

  if (input()->hasOption('no-locale-update') && empty(input()->getOption('no-locale-update'))) {
    writeln('Running locale updates');
    run("cd {{deployment_path}} && drush l10n-update-refresh && drush l10n-update ");
    $run_cache_rebuild = TRUE;
    set('rollback_db', 'true');
  } else {
    writeln('Skipping locale updates');
  }

  if($run_cache_rebuild){
    writeln('Rebuilding cache');
    run("cd {{deploy_path}}/current/webroot/sites/mercantec.dk && drush cc all");
  } else {
    writeln('Skipping cache rebuild');
  }
})
  ->setPrivate();

task('deploy:drupal:pre_deploy', function () {
  if ((!input()->hasOption('cim') || empty(input()->getOption('cim'))) && (!input()->hasOption('no-cim') || empty(input()->getOption('no-cim')))) {
    if(askConfirmation('Would you like to import configuration after deploy?')){
      input()->setOption('cim','true');
    } else {
      input()->setOption('cim',NULL);
    }
  }
})
  ->once()
  ->shallow()
  ->setPrivate();
