<?php

/**
 * @file
 * Default theme implementation for a single paragraph item.
 *
 * Available variables:
 * - $content: An array of content items. Use render($content) to print them
 *   all, or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. By default the following classes are available, where
 *   the parts enclosed by {} are replaced by the appropriate values:
 *   - entity
 *   - entity-paragraphs-item
 *   - paragraphs-item-{bundle}
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened into
 *   a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_entity()
 * @see template_process()
 */
?>

<?php
  // Color theme
  if(isset($content['field_pg_banner_color']['#items'][0]['value'])) {
    $bg_color = " bg-color-" . $content['field_pg_banner_color']['#items'][0]['value'];
  }
  else {
    $bg_color = " bg-color-default";
  }
?>

<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <div class="content"<?php print $content_attributes; ?>>
    <?php hide($content['field_pg_banner_color']); ?>
    <?php hide($content['field_pg_banner_image']); ?>
    <?php hide($content['field_pg_banner_link']); ?>
    <?php print render($content['field_pg_banner_image']); ?>
    <div class="content-aligner">
      <div class="content-inner<?php print $bg_color; ?>">
        <?php
        if(isset($content['field_pg_banner_link']['#items'][0]['url'])) {
          print '<a href="' . $content['field_pg_banner_link']['#items'][0]['url'] . '">';
          print render($content);
          print '</a>';
        }
        else {
          print render($content);
        }
        ?>
      </div>
    </div>
  </div>
</div>
