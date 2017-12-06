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
    
    $blog_authors = array();

    foreach($content['field_ungi_blog_user']['#items'] as $item) {
        $blog_authors[] = $item['entity']->name;
    }

    if($content['field_ungi_size'][0]['#title'] == "100%"){
      $custom_class = "wide";
    }
    else{
      $custom_class = "narrow";
    }
?>

<div class="<?php print $classes; ?> <?php print $custom_class; ?>"<?php print $attributes; ?>>
            
    <h2><?php print t("Latest blog posts"); ?></h2>
        <div class="sidebar">
            <div class="sidebar-wrapper">
            <h3><?php print render($content['field_ungi_blog_title'][0]['#markup']); ?></h3>
            <?php print render($content['field_ungi_blog_about'][0]['#markup']); ?>
            </div>
        </div>
    <div class="main-content">
    <?php print views_embed_view('blogs_oversigter', 'page_2', implode(' ', $blog_authors)); ?> 
    </div>
</div>