<div id="page">
	<div id="ungi-intro">
		<div id="ungi-map">
			<?php foreach ($cities as $city): ?>
				<?php if ($city->y > 0): ?>
					<a class="ungi-dot" title="<?php print $city->name; ?>" href="<?php print $city->url; ?>" style="margin-left: <?php print $city->x; ?>px; margin-top: <?php print $city->y; ?>px;">&nbsp;</a>
				<?php endif; ?>
			<?php endforeach; ?>
			<img src="/<?php print drupal_get_path('module', 'ungi'); ?>/images/map_condensed.png"/>
		</div>
		<div id="ungi-desc">
			<h2>Leder du efter rådgivningstilbud i din egen kommune?</h2>
			<p>På Cyberhus sidder vi altid klar til at møde dig på <a href="/chat">chatten</a>. Her kan du anonymt stille spørgsmål til vores rådgivere og andre unge. Vi kan også hjælpe dig med at finde lokale rådgivningstilbud i din egen kommune.</p>
                        <p>Her på siden kan du se en oversigt over forskellige rådgivningstilbud i nogle af landets kommuner - du finder dem på listen herunder eller ved at klikke på danmarkskortet.</p>
			<h3>Du kan nu chatte med din egen kommune</h3>
			<p>Nogle kommuner har en lokal chat på Cyberhus, hvor du kan chatte helt anonymt med rådgivere fra din kommune. Du finder åbningstiderne for chatten ved at klikke ind under de enkelte kommuner.</p>
			<h3>Kan du ikke finde din kommunes rådgivningstilbud på listen?</h3>
			<p>Så smut ind på <a href="/chat">Cyberhus’ chat</a>. Her kan du altid søge hjælp, og vores rådgivere sidder klar til at lytte, svare på spørgsmål og finde den rette rådgivning tæt på dig.</p>
		</div>
	</div>
	<br/>
	<hr/>
	<div id="ungi-cities">
		<ul>
			<?php foreach ($cities as $city): ?>
				<li class="ungi-city">
					<span class="ungi-half ungi-cityname">
						<h2><a href="<?php print $city->url; ?>"><?php print $city->name; ?></a></h2>
						<?php if (!empty($city->chaturl)): ?>
							<p class="chat-desc"><b>OBS: </b><?php print $city->chatdesc; ?></p>
						<?php else: ?>
							<p class="chat-desc">&nbsp;</p>
						<?php endif ?>
					</span><span class="ungi-half">
						<a class="btn" href="<?php print $city->url; ?>">Tilbud i kommunen</a>
						<?php if (!empty($city->chaturl)): ?>
							<iframe src="/sites/all/themes/cyberhus/chat-inline-widget/widget.html?base_url=<?php print $city->chaturl; ?>&port=<?php print $city->chatport; ?>&chat_name=<?php print $city->chatname; ?>&chat_type=<?php print $city->chattype; ?>"></iframe>
						<?php else: ?>
							<a class="btn chat-closed" href="<?php print $city->chaturl; ?>">Ingen chat tilrådighed</a>
						<?php endif ?>
					</span><br/>

					<hr/>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</div>