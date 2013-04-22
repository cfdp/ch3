$ = jQuery;

$(function() {
	
	/**
	 * Custom Selects
	 */
	$('.form-select:visible').not('.customised-select').customSelect();


	/**
	 * Custom Checkboxes
	 */
	$('input:checkbox').screwDefaultButtons({ 
       checked: "url(/sites/all/themes/cyberhus/img/checkbox_checked.png)",
       unchecked:	"url(/sites/all/themes/cyberhus/img/checkbox_unchecked.png)",
       width:	 18,
       height:	 17
    });
	
});

/**
* bef menu
*/
function fix() {
	$('.form-type-bef-link a').click(function() {
	$('.form-type-bef-link').removeClass('selected');
	$(this).parent().addClass('selected');
});
}
	$(document).ready(function(){
	fix();
});
Drupal.behaviors.filter = {
	attach: function() {
	fix();
} 
}
