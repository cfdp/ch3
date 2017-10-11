<?php

/**
 * @file
 * Default theme implementation to display a term.
 *
 * Available variables:
 * - $name: (deprecated) The unsanitized name of the term. Use $term_name
 *   instead.
 * - $content: An array of items for the content of the term (fields and
 *   description). Use render($content) to print them all, or print a subset
 *   such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $term_url: Direct URL of the current term.
 * - $term_name: Name of the current term.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the following:
 *   - taxonomy-term: The current template type, i.e., "theming hook".
 *   - vocabulary-[vocabulary-name]: The vocabulary to which the term belongs to.
 *     For example, if the term is a "Tag" it would result in "vocabulary-tag".
 *
 * Other variables:
 * - $term: Full term object. Contains data that may not be safe.
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $page: Flag for the full page state.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the term. Increments each time it's output.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * @see template_preprocess()
 * @see template_preprocess_taxonomy_term()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>

<div id="taxonomy-term-<?php print $term->tid; ?>" class="<?php print $classes; ?>">

  <div class="content<?php print ' chat-state-' . $chat_state?>">
    <?php hide($content['field_ungi_offer_desc']); ?>
    <?php hide($content['field_ungi_brevkasse_desc']); ?>
    <?php
     if(!$chat_state) {
       hide($content['field_ungi_chat_embed']);
       hide($content['field_ungi_chat_desc']);
     }
     ?>
    <?php print render($content); ?>
    <div class="local-offers">
      <?php print render($content['field_ungi_offer_desc']); ?>
      <?php
        $name = str_replace(' ','-', $term->name);
        $name = strtolower($name);
      ?>
      <a href="<?php print url('ung-i/' . $name . '/lokale-tilbud'); ?>" class="button"><?php print t("See all offers"); ?></a>
    </div>
  </div>

</div>

<?php if($lb_state) : ?>
  <h2 id="related-content"><?php print t("Letter box"); ?></h2>
  <div class="node-related ungi">
  <div class="node-related-sidebar">
    <div class="block">
    <?php print render($content['field_ungi_brevkasse_desc']); ?>
    <?php if($lb_open) : ?>
    <a href="<?php print url('node/add/brevkasse', array('query' => array('field_brevk_ungi' => $term->tid))); ?>" class="button"><?php print t("Create question"); ?></a>
    <?php endif; ?>
    </div>
  </div>
    <div class="node-related-content">
      <?php print views_embed_view('frontpage_stream', 'block_2'); ?>
    </div>
  </div>
<?php endif; ?>
