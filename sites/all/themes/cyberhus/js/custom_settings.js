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