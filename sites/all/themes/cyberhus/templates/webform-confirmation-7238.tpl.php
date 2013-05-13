<?php
// $Id: webform-confirmation.tpl.php,v 1.1.2.3 2009/01/09 08:31:06 quicksketch Exp $

/**
 * @file
 * Customize confirmation screen after successful submission.
 *
 * This file may be renamed "webform-confirmation-[nid].tpl.php" to target a
 * specific webform e-mail on your site. Or you can leave it
 * "webform-confirmation.tpl.php" to affect all webform confirmations on your
 * site.
 *
 * Available variables:
 * - $node: The node object for this webform.
 * - $confirmation_message: The confirmation message input by the webform author.
 * - $sid: The unique submission ID of this submission.
 */
?>

<?php
	/*vi skal have fat i data for den aktuelle brugers profil (alder og køn)*/
	module_load_include('inc', 'webform', 'includes/webform.submissions');
	module_load_include('inc', 'webform', 'includes/webform.report');
	
	/* The section above is replacing this, which worked for the old webform version:
	 * include_once(drupal_get_path('module', 'webform') .'/webform_report.inc');
	 * include_once(drupal_get_path('module', 'webform') .'/webform_submissions.inc'); 
	 */
	
	$nid = arg(1); // need to hard-code nid if this is a custom page
	$sid = $_GET['sid'];
	$this_submission = webform_get_submission($nid, $sid);
	//alder og køn for den bruger, der er igang med at indsende formular
	$this_age = $this_submission->data[24]['value'][0];
	$this_sex = $this_submission->data[25]['value'][0];
	//vi samler alle sids der svarer til den aktuelle brugers alder og køn i $sid2
	$sid2 = array();
	$all_submissions = webform_get_submissions($nid);
	foreach ($all_submissions as $a){
		if (($a->data[24]['value'][0] == $this_age) &&  ($a->data[25]['value'][0] == $this_sex)){
					$sid2[] = $a->sid;
		}
		
	} 
	//$sql = "SELECT sid FROM {webform_submitted_data} WHERE nid = %d AND cid = 24 ";

?>

<div class="webform-confirmation"><?php print $confirmation_message ?></div>
  <?php if (count($sid2) == 1): ?>
  		<p>Du er den første i din kategori (køn/alder), der udfylder skemaet. Du kan derfor kun se dine egne resultater.</p>
  		<?php 
			//print(webform_results_analysis($node, $sid2)); 
			$resultat = webform_results_analysis($node, $sid2);
			print($resultat);
		?>	
  <?php else: ?>
		<p>Her kan du se, hvad andre på din alder og med dit køn har svaret. Tallene længst til højre angiver, hvor mange der har stemt på den tilhørende valgmulighed. Dine egne valg er medregnet i denne statistik.</p>
		<?php
			//print(webform_results_analysis($node, $sid2));
			$resultat = webform_results_analysis($node, $sid2);
			print($resultat);
			//var_dump($all_submissions);
		?>	
  <?php endif; ?>


<div class="links">
  <a href="/sites/default/files/flash/socialpejling/CyberhusQuiz.swf">Tilbage til quizzen.</a>
</div>


  
