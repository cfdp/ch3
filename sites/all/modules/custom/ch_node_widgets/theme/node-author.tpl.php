<?php
  $type_label = cyberhus_clean_type_label($node->type);
?>

<div class="author-box">
  <div class="author-first">
    <div class="author-avatar">
      <?php
      if(isset($node->field_avatar[LANGUAGE_NONE])) {
        print cyberhus_clean_term_display($node->field_avatar[LANGUAGE_NONE][0]['target_id']);
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
    <div class="author-type"><?php print $type_label['singular'] . " " . t('by') ?></div>
    <div class="author-name">
      <?php
      if(isset($node->field_navn[LANGUAGE_NONE])) {
        print $node->field_navn[LANGUAGE_NONE][0]['safe_value'];
      }
      elseif(isset($node->field_forum_forf_navn[LANGUAGE_NONE])) {
        print $node->field_forum_forf_navn[LANGUAGE_NONE][0]['safe_value'];
      }
      else {
        print t("Anonymous");
      }
      ?>
    </div>
    <div class="author-gender">
      <?php
      if(isset($node->field_brevk_koen[LANGUAGE_NONE])) {
        print cyberhus_clean_term_display($node->field_brevk_koen[LANGUAGE_NONE][0]['tid']);
      }
      ?>
    </div>
    <div class="author-age">
      <?php
      if(isset($node->field_brevk_alder[LANGUAGE_NONE])) {
        print cyberhus_clean_term_display($node->field_brevk_alder[LANGUAGE_NONE][0]['tid']);
      }
      ?>
    </div>
    <div class="author-created"><?php print t('Created !interval ago', array('!interval' => format_interval(time() - $node->created))); ?></div>
  </div>
</div>
