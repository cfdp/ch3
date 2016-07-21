<article<?php print $attributes; ?>>
  <?php print $user_picture; ?>
  <?php print render($title_prefix); ?>


  <header>
    <h2<?php print $title_attributes; ?>><?php print $title ?></h2>
  </header>

  <?php print render($title_suffix); ?>
  <?php if ($display_submitted): ?>
  <footer class="submitted"><?php print $date; ?> -- <?php print $name; ?></footer>
  <?php endif; ?>

  <div<?php print $content_attributes; ?>>

    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
  </div>

  <div class="clearfix">
    <?php if (!empty($content['links'])): ?>
      <nav class="links node-links clearfix">
        <?php print render($content['links']); ?>
      </nav>
      <div id="jquery_ajax_load_target"></div>
    <?php endif; ?>

    <?php
      // Print views "load more" comments block
      $blockObject = block_load('views', 'comments-block_1');
      $block = _block_get_renderable_array(_block_render_blocks(array($blockObject)));
      $output = drupal_render($block);
      print $output;
    ?>
  </div>
</article>
