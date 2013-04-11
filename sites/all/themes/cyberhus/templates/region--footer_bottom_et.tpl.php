<div<?php print $attributes; ?>>
  <div<?php print $content_attributes; ?>>
      <?php print $content; ?>
  </div>
  	<?php
		  	$header_contact_facebook = theme_get_setting('header_contact_facebook', 'cyberhus'); 	 		 ?>
		   <?php if (!empty($header_contact_facebook)): ?>
		   <div class="social">
			   <h2 class="block-title">Facebook</h2>
              <a class="facebook_bottom" href="<?php print $header_contact_facebook; ?>"><?php print $header_contact_facebook; ?></a>
              <p><a href="<?php print $header_contact_facebook; ?>">facebook.dk/cyberhus</a></p>
              <?php endif; ?>      
		 </div>
</div>


	  
