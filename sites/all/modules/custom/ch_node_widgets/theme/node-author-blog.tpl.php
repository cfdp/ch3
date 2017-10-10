<?php
  $user = user_load($node->uid);
?>

<div class="author-box">
  <div class="author-first">
    <div class="author-avatar">
      <?php
      if(!empty($user->picture)) {
        print theme('image_style', array('path' => $user->picture->uri, 'style_name' => 'avatar_large'));
      }
      // Default
      else {
        $terms = taxonomy_get_term_by_name('default', 'avatars');
        print cyberhus_clean_term_display(key($terms));
      }
      ?>
    </div>
  </div>
  <div class="author-second">
    <div class="author-type"><?php print t('Written by') ?></div>
    <div class="author-name">
      <?php
      if(isset($user->profile_fulde_navn[LANGUAGE_NONE])) {
        print $user->profile_fulde_navn[LANGUAGE_NONE][0]['value'];
      }
      else {
        print $user->name;
      }
      ?>
    </div>
    <div class="author-created"><?php print t('Created !interval ago', array('!interval' => format_interval(time() - $node->created))); ?></div>
  </div>
</div>
