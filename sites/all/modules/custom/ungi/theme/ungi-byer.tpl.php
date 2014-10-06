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
            <h2>Find rådgivning i din kommune</h2>
				<p>Cyberhus samarbejder med alle kommuner i landet, men nogle af dem har vi en særlig aftale med. De kan findes på listen herunder eller ved at klikke på danmarkskortet. Under hver kommune kan du finde kommunens lokale rådgivningstilbud.</p>
				<h3>Står din kommune ikke herunder?</h3>
				<p>Så smut ind på <a href="/chat">chatten</a>, hvor vores rådgivere kan hjælpe dig med at finde den rette rådgivning nær dig.</p>
				<h3>Nyt - Den lokale chat!</h3>
				<p>Nogle kommuner har en lokal chat på Cyberhus, hvor du kan chatte helt anonymt med din kommune. Under de enkelte kommuner kan du se åbningstider for chatten.</p>
				<p>Har din kommune endnu ikke oprettet en chat, er du selvfølgelig stadig mere end velkommen til at benytte <a href="/chat">Cyberhus’ chat</a>, hvor du kan komme i kontakt med Cyberhus’ rådgivere og andre unge.</p>
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
								<p class="chat-desc"><b>OBS: </b><?php print $city->chatdesc; ?></p>
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