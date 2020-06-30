<?php
namespace Deployer;

use Deployer\Exception\GracefulShutdownException;
use Deployer\Utility\Httpie;


desc('Process slack notification');
task('slack:notify', function () {
  if (!get('slack_webhook', false)) {
    return;
  }

  $attachment = [
    'title' => get('application', 'Unknown project'),
    'text' => get('slack_text'),
    'color' => get('slack_color'),
    'mrkdwn_in' => ['text'],
  ];

  Httpie::post(get('slack_webhook'))->body(['attachments' => [$attachment]])->send();
})
  ->shallow()
  ->setPrivate();

desc('Send slack notification about initiating deployment');
task('slack:notify:start', function () {

  set('slack_color', 'E6E6E6');

  $git_name = runLocally('git config --get user.name');
  $git_email = runLocally('git config --get user.email');
  if(empty($git_name) && empty($git_email)){
    throw new GracefulShutdownException('You need to specify Git user.name and user.email in your Git configuration.');
  }
  $git_user = !empty($git_name) ? (!empty($git_email) ? $git_name.' <'.$git_email.'>' : $git_name) : $git_email;

  set('slack_text', '_'.$git_user.'_ is deploying `{{branch}}` branch to *{{target}}*');

})
  ->once()
  ->shallow()
  ->setPrivate()
;


desc('Send slack notification about successful deployment');
task('slack:notify:success', function () {

  set('slack_color', '4AB441');
  set('slack_text', 'Deploy to *{{target}}* successful');

})
  ->once()
  ->setPrivate();

desc('Send slack notification about failed deployment');
task('slack:notify:failed', function () {

  set('slack_color', 'CF423F');
  set('slack_text', 'Deploy to *{{target}}* failed');

})
  ->once()
  ->setPrivate();

task('slack:check', function () {
  if (!get('slack_webhook', false)) {
    if(askConfirmation('No slack-hook found. Would you like to continue without sending slack notifications?')){
    } else {
      throw new GracefulShutdownException('Cancelling deploy');
    }
  }
})
  ->once()
  ->shallow()
  ->setPrivate();


after('slack:notify:start', 'slack:notify');

after('slack:notify:success', 'slack:notify');

after('slack:notify:failed', 'slack:notify');











// Title of project
set('slack_title', function () {
  return get('application', 'Project');
});

// Deploy message
set('slack_text', '_{{user}}_ deploying `{{branch}}` to *{{target}}*');
set('slack_success_text', 'Deploy to *{{target}}* successful');
set('slack_failure_text', 'Deploy to *{{target}}* failed');

// Color of attachment
set('slack_color', '#4d91f7');
set('slack_success_color', '#00c100');
set('slack_failure_color', '#ff0909');

desc('Notifying Slack');
task('slack:notify', function () {
  if (!get('slack_webhook', false)) {
    return;
  }

  $attachment = [
    'title' => get('slack_title'),
    'text' => get('slack_text'),
    'color' => get('slack_color'),
    'mrkdwn_in' => ['text'],
  ];

  Httpie::post(get('slack_webhook'))->body(['attachments' => [$attachment]])->send();
})
  ->once()
  ->shallow()
  ->setPrivate();

desc('Notifying Slack about deploy finish');
task('slack:notify:success', function () {
  if (!get('slack_webhook', false)) {
    return;
  }

  $attachment = [
    'title' => get('slack_title'),
    'text' => get('slack_success_text'),
    'color' => get('slack_success_color'),
    'mrkdwn_in' => ['text'],
  ];

  Httpie::post(get('slack_webhook'))->body(['attachments' => [$attachment]])->send();
})
  ->once()
  ->shallow()
  ->setPrivate();

desc('Notifying Slack about deploy failure');
task('slack:notify:failure', function () {
  if (!get('slack_webhook', false)) {
    return;
  }

  $attachment = [
    'title' => get('slack_title'),
    'text' => get('slack_failure_text'),
    'color' => get('slack_failure_color'),
    'mrkdwn_in' => ['text'],
  ];

  Httpie::post(get('slack_webhook'))->body(['attachments' => [$attachment]])->send();
})
  ->once()
  ->shallow()
  ->setPrivate();