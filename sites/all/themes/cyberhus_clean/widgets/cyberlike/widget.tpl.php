<?php
/**
 * @file
 * widget.tpl.php
 *
 * Cyberlike widget theme for Vote Up/Down
 */
?>
<div class="vud-widget vud-widget-cyberlike" id="<?php print $id; ?>">
  <?php if ($class_up) : ?>

    <?php if ($show_links): ?>

      <?php if ($show_up_as_link): ?>
        <a href="<?php print $link_up; ?>" rel="nofollow" class="<?php print $link_class_up; ?>" title="<?php print t('Vote up!'); ?>">
      <svg class="icon"><use xlink:href="/<?php print drupal_get_path('theme', 'cyberhus_clean'); ?>/assets/dist/svg/symbols.svg#heart" /></svg>
        </a>

      <?php endif; ?>

    <?php endif; ?>

    <?php if ($show_reset): ?>
      <a href="<?php print $link_reset; ?>" rel="nofollow" class="<?php print $link_class_reset; ?>" title="<?php print $reset_long_text; ?>">
        <svg class="icon"><use xlink:href="/<?php print drupal_get_path('theme', 'cyberhus_clean'); ?>/assets/dist/svg/symbols.svg#heart" /></svg>
      </a>
    <?php endif; ?>

    <?php if(!$show_up_as_link && !$show_reset) : ?>

    <svg class="icon liked"><use xlink:href="/<?php print drupal_get_path('theme', 'cyberhus_clean'); ?>/assets/dist/svg/symbols.svg#heart" /></svg>

    <?php endif; ?>

    <div class="cyberlike-votes-display"><?php print $unsigned_points; ?></div>
  <?php endif; ?>

</div>
