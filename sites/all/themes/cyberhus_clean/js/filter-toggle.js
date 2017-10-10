$ = jQuery;

$(document).ready(function() {

  // Filter toggle
  $('div[id^=block-views-exp-frontpage-stream-page] > h2').on('click touch', function() {
    $('div[id^=block-views-exp-frontpage-stream-page] > .content').slideToggle(250);
    $(this).toggleClass('open');
  });

});

Drupal.behaviors.streamFilterReset = {
  attach: function (context, settings) {

		// Reset all values in the form
		$('#edit-reset').once('resetStream', function(e) {
			$(this).click(function(e) {
				e.preventDefault();

        $('div[id^=block-views-exp-frontpage-stream-page] select').each(function() {
				  $(this).val('All');
        });

        $('#edit-submit-frontpage-stream').click();
			});
		});
	}
}
