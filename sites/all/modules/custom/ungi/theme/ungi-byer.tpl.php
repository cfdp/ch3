<div id="page">
	<h2>Ung i...</h2>
	<div id="ungi-intro">
		<div id="ungi-map">
			<?php foreach ($cities as $city): ?>
				<a class="ungi-dot" title="<?php print $city->name; ?>" href="<?php print $city->url; ?>" style="margin-left: <?php print $city->x; ?>px; margin-top: <?php print $city->y; ?>px;">&nbsp;</a>
			<?php endforeach; ?>
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
	<div id="ungi-cities">
		<ul>
			<?php foreach ($cities as $city): ?>
				<li class="ungi-city">
					<span class="ungi-third ungi-cityname">
						<h2><?php print $city->name; ?></h2>
					</span><span class="ungi-third">
						<a class="btn" href="<?php print $city->url; ?>">Tilbud i kommunen</a>
					</span><span class="ungi-third">
						<a class="btn" href="<?php print $city->chaturl; ?>">Ingen chat tilrådighed</a>
					</span><br/>
					<p><b>OBS: </b><?php print $city->chatdesc; ?></p><br/>
					<hr/>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</div>