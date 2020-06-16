<?php
/* (c) Mikkel Mandal <mma@novicell.dk>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Deployer;

desc('Enable maintenance mode');
task('deploy:maintenance_mode:enable', function () {
  run("cd {{deployment_path}} && drush vset --exact maintenance_mode 1 ");
  run("cd {{deployment_path}} && drush cc all");
})
  ->setPrivate();

desc('Disable maintenance mode');
task('deploy:maintenance_mode:disable', function () {
  run("cd {{deployment_path}} && drush vset --exact maintenance_mode 0 ");
  run("cd {{deployment_path}} && drush cc all");
})
  ->setPrivate();
