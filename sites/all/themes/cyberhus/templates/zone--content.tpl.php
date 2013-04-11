<?php if ($wrapper): ?><div<?php print $attributes; ?>><?php endif; ?>  

<?php 
// Oprettet en if/else for at tildele nye divs til forsiden specifikt
?>
<?php if (drupal_is_front_page()) 
{ ?> <div id="forside_wrapper">
	<div<?php print $content_attributes; ?>>    
        
    <?php if ($messages): ?>
      <div id="messages" class="grid-<?php print $columns; ?>"><?php print $messages; ?></div>
    <?php endif; ?>
    <?php print $content; ?>
  </div>
</div>
<?php if ($wrapper): ?></div><?php endif; ?><?php
}
else {
	?><div<?php print $content_attributes; ?>>    
        
    <?php if ($messages): ?>
      <div id="messages" class="grid-<?php print $columns; ?>"><?php print $messages; ?></div>
    <?php endif; ?>
    <?php print $content; ?>
  </div>
<?php if ($wrapper): ?></div><?php endif; ?><?php
}
?>
  