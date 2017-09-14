<?php $type_label = cyberhus_clean_type_label($node->type); ?>

<div class="node-nav">
  <div class="node-nav-prev">
    <a href="#"><?php print cyberhus_clean_icon_display('arrow-left') . t('Previous'); ?></a>
  </div>
  <div class="node-nav-all">
    <a href="#"><?php print cyberhus_clean_icon_display('grid') . t('All @type', array('@type' => $type_label['plural'])); ?></a>
  </div>
  <div class="node-nav-next">
    <a href="#"><?php print cyberhus_clean_icon_display('arrow-right') . t('Next'); ?></a>
  </div>
</div>
