<?php foreach ($items as $delta => $item): ?>

<?php
  switch($item['#markup']) {
    case "Pige":
      $gender = 'woman';
    break;
    case "Dreng":
      $gender = 'man';
    break;
    default:
      $gender = 'binary';
    break;
  }
?>

<?php print cyberhus_clean_icon_display($gender); ?>

<?php endforeach; ?>
