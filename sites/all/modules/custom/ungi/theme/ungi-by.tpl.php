<div id="page" class="ungi-city">
	<div id="ungi-city">
		<div id="ungi-desc">
			<h2><?php print $city->name ?></h2>
    <div id="ungi-map">
      <?php if ($city->y > 0): ?>
        <span class="ungi-dot" title="<?php print $city->name; ?>" style="margin-left: <?php print $city->x; ?>px; margin-top: <?php print $city->y; ?>px;">&nbsp;</span>
      <?php endif; ?>
      <img src="/<?php print drupal_get_path('module', 'ungi'); ?>/images/smallmap_condensed.png"/>
    </div>
			<div class="ungi-desc"><?php print $city->desc; ?></div>
			<h3>Chat</h3>
			<?php if (!empty($city->chaturl)): ?>
        <iframe src="<?php print $city->chaturl . "/header/" . $city->chattype; ?>"></iframe>
				<p class="chat-desc"><?php print $city->chatdesc; ?></p>
			<?php else: ?>
				<p><?php print $city->name ?> Kommune har endnu ikke en lokal chat på Cyberhus, men du er mere end velkommen til at benytte <a href="/chat">Cyberhus’ egen chat</a>, hvor du kan snakke med rådgiverne og andre unge.</p>
			<?php endif ?>
		</div>
	</div>
	<br/>
	<h3>Tilbud i <?php print $city->name; ?></h3>
	<div id="ungi-nodes" class="view-ung-i-visning view-id-ung_i_visning">
		<?php /* print render($nodes); */ ?>
	</div>

    <?php
    // Print views "Ung i" views block
    $blockObject = block_load('views', 'ung_i_tilbud-block');
    $block = _block_get_renderable_array(_block_render_blocks(array($blockObject)));
    $output = drupal_render($block);
    print $output;
  ?>
</div>
