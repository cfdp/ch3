<div id="page">
    <h2><?php print $city->name ?></h2>
    <div id="ungi-intro">
        <div id="ungi-map">
            <?php if ($city->y > 0): ?>
                <a class="ungi-dot" title="<?php print $city->name; ?>" href="<?php print $city->url; ?>" style="margin-left: <?php print $city->x; ?>px; margin-top: <?php print $city->y; ?>px;">&nbsp;</a>
            <?php endif; ?>
            <img src="/<?php print drupal_get_path('module', 'ungi'); ?>/images/map.png"/>
        </div>
        <div id="ungi-desc">
            <h2>Hjælp i kommunerne</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.</p>
        </div>
    </div>
    <br/>
    <hr/>
	 <h3>Tilbud i kommunen</h3>
    <div id="ungi-nodes" class="view-ung-i-visning view-id-ung_i_visning">
        <?php print render($nodes); ?>
    </div>
</div>