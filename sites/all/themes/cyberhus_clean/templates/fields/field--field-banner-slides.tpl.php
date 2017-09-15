<div class="flexslider-banner <?php print $classes; ?>"<?php print $attributes; ?>>

  <div class="field-items slides"<?php print $content_attributes; ?>>
    <?php foreach ($items as $delta => $item): ?>
      <div class="field-item slide <?php print $delta % 2 ? 'odd' : 'even'; ?>"<?php print $item_attributes[$delta]; ?>><?php print render($item); ?></div>
    <?php endforeach; ?>
  </div>

  <div class="flex-pager"></div>

  <div class="flex-navigation">
    <a href="#" class="flex-prev">
      <?php print cyberhus_clean_icon_display('arrow-left'); ?>
    </a>
    <a href="#" class="flex-next">
      <?php print cyberhus_clean_icon_display('arrow-right'); ?>
    </a>
  </div>

</div>
