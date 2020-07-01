<?php
namespace Deployer;

$config_file = 'deployer/config.yml';
if (!is_file($config_file) || !is_readable($config_file)) {
  echo 'Could not find configuration file';
  exit;
}

// Include recipes
require 'deployer/recipe/base.php';

// Load config file
inventory($config_file);

