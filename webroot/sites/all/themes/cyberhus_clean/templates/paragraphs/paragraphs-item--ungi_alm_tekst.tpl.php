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
    if($content['field_ungi_size'][0]['#title'] == "100%"){
      $custom_class = "wide";
    }
    else{
      $custom_class = "narrow";
    }
    if (isset($content['field_ungi_a_t_embed']) && $content['field_ungi_a_t_embed']['#items'][0]['value'] === '1') {
      $custom_class .= " cim-chat-embedded";
    }
?>

<div class="<?php print $classes; ?> <?php print $custom_class; ?>">
<h2><?php print render($content['field_ungi_a_t_titel'][0]['#markup']); ?></h2>
<p><?php print render($content['field_ungi_a_t_indhold'][0]['#markup']); ?></p>
</div>
