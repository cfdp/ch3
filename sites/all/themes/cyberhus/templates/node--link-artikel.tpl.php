<article<?php print $attributes; ?>>

<?php print render($title_prefix); ?>
<header>
  <h2<?php print $title_attributes; ?>><?php print $title ?></h2>
</header>
<?php print render($title_suffix); ?>
<div<?php print $content_attributes; ?>>
<?php
    // We hide the comments and links now so that we can render them later.
	hide($content['comments']);
	hide($content['links']);
	print render($content['body']);
?>
</div>
<div class="clearfix">
	<?php if (!empty($content['links'])): ?>
		<nav class="links node-links clearfix"><?php print render($content['links']); ?></nav>
	<?php endif; ?>
  <?php
    /* Print related articles button */
    if (isset($node) && isset($node->field_tema_kategori['und'][0])) {
      $tid=$node->field_tema_kategori['und'][0]['tid'];
      $term = taxonomy_term_load($tid);
      $kategori_name = url("temaer/".$term->name);
      $kategori_name = str_replace('%20', '-', $kategori_name);
      print '<p><a href="' . $kategori_name . '" class="btn">Se alle artikler om ' . strtolower($term->name) . '</a></p>';
    }
  ?>
	<?php print render($content['comments']); ?>
</div>
</article>
