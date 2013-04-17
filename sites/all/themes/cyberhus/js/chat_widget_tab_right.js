$ = jQuery;

$(function() {
	
	/**
	 * RIGHT SIDE TABS
	 */
	$(".region-tabs-right .slideout").hover(
		
		function() {
		
			var right_space = 0;
		
		
			$(this).stop(true,true).animate({ 
				
				right: -40
			
			},200);
		
		},
		function() {
		
			$(this).stop(true,true).animate({ 
				
				right: -260
			
			},200);
		
		}
	);
	
});