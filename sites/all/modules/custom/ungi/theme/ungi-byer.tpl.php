<div id="page">
  <div id="ungi-intro">
    <div id="ungi-desc">
      <?php print et('Ung i forside'); ?>
    </div>
  </div>
  <div id="ungi-cities">
    <h3>Alle Ung-i byer</h3>
    <ul>
      <?php foreach ($cities as $city): ?>
        <li class="ungi-city">
          <span class="ungi-half ungi-cityname">
                        <h2><a href="<?php print $city->url; ?>"><?php print $city->name; ?></a></h2>
                        <?php if (!empty($city->chaturl)): ?>
                            <p class="chat-desc"><?php print $city->chatdesc; ?></p>
                        <?php else: ?>
                            <p class="chat-desc">&nbsp;</p>
                        <?php endif ?>
                    </span><span class="ungi-half">
                        <a class="btn" href="<?php print $city->url; ?>">Tilbud i kommunen</a>
                        <?php if (!empty($city->chaturl)): ?>
                          <div class="ungi-chat-wrapper"><span class="chat-label">Chat</span>
          <iframe class="curachat-widgets-inline" src="<?php print $city->chaturl . "/inline/" . $city->chattype; ?>"></iframe>
  </div>
  <?php else: ?>
    <div class="ungi-chat-wrapper">
      <span class="ungi-chat-closed">Ingen chat til rådighed</span>
    </div>
    <?php endif ?>
      </span>
      </li>
      <?php endforeach; ?>
        </ul>
</div>
</div>
