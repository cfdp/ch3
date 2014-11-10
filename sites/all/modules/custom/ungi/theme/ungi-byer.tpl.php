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
            <?php print et('Ung i forside'); ?>
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
                            <iframe src="<?php print $city->chaturl; ?>"></iframe>

                        <?php else: ?>
                            <a class="btn chat-closed" href="<?php print $city->chaturl; ?>">Ingen chat til rådighed</a>
                        <?php endif ?>
                    </span><br/>

                    <hr/>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>
