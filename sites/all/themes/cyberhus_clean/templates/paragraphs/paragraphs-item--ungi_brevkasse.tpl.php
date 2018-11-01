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

?>

<div class="<?php print $classes; ?> <?php print $custom_class; ?>"<?php print $attributes; ?>>
            
    <?php if($lb_state) : ?>
    <h2 id="ung-i-brevkasse"><?php print t("Letter box"); ?></h2>
        <div class="sidebar">
            <div class="sidebar-wrapper">
            <?php print render($content['field_ung_i_lb_description'][0]['#markup']); ?>
            <?php if($lb_open) : ?>
                <a href="<?php print url('node/add/brevkasse', array('query' => array('field_brevk_ungi' => $term->tid))); ?>" class="button"><?php print t("Create question"); ?></a>
            <?php endif; ?>
            </div>
        </div>
    <div class="main-content">
    <?php print views_embed_view('frontpage_stream', 'block_2'); ?>
    </div>
    <?php endif; ?>
    
</div>

