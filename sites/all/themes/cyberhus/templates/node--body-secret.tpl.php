<article<?php print $attributes; ?>>
<?php print $user_picture; ?>
<?php print render($title_prefix); ?>
<?php print render($title_suffix); ?>
<?php if ($display_submitted): ?>
<?php endif; ?>
<div<?php print $content_attributes; ?>>
<div class="body_secret_icon"></div>
<span class="date"><?php print $date; ?></span>
<?php
      // We hide the comments and links now so that we can render them later.
hide($content['comments']);
hide($content['links']);
print render($content['body']);
?>

<span class="bottom_info">
	<?php 
	$gender = render($content['field_brevk_koen']);
	if(strpos($gender, "oplyse") != false){
		$gender = "Anonym";
	}
	print "Af " . $gender . " " . render($content['field_brevk_alder']); ?>
</span>		
</div>
<a href="/kropshemligheder/alle" class="btn">Se alle kropshemmeligheder</a>
<a href="/kropshemmeligheder" class="btn">Del din kropshemmelighed</a>
<div class="clearfix">
	<?php if (!empty($content['links'])): ?>
		<nav class="links node-links clearfix"><?php print render($content['links']); ?></nav>
	<?php endif; ?>

	<?php print render($content['comments']); ?>
</div>
</article>