<?php
  $type_label = cyberhus_clean_type_label($node->type);
?>

<div class="author-box">
  <div class="author-avatar"></div>
  <div class="author-type"><?php print $type_label['singular'] . " " . t('by') ?></div>
  <div class="author-name">
    <?php
    if(isset($node->field_navn[LANGUAGE_NONE])) {
      print $node->field_navn[LANGUAGE_NONE][0]['value'];
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
